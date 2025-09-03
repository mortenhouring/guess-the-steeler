class GuessTheSteelerGame {
    constructor() {
        this.players = [];
        this.usedQuestions = new Set();
        this.currentQuestion = null;
        this.score = { correct: 0, incorrect: 0 };
        this.gameMode = 'classic'; // classic, legacy, newPlayers
        this.nflverse = new NFLVerseIntegration();
        this.sleeperAPI = new SleeperAPIIntegration();
        
        // DOM elements
        this.screens = {
            menu: document.getElementById('menu-screen'),
            loading: document.getElementById('loading-screen'),
            game: document.getElementById('game-screen'),
            feedback: document.getElementById('feedback-screen'),
            gameOver: document.getElementById('game-over-screen'),
            leaderboard: document.getElementById('leaderboard-screen'),
            error: document.getElementById('error-screen')
        };
        
        this.elements = {
            correctCount: document.getElementById('correct-count'),
            incorrectCount: document.getElementById('incorrect-count'),
            questionText: document.getElementById('question-text'),
            answerInput: document.getElementById('answer-input'),
            submitBtn: document.getElementById('submit-btn'),
            feedbackResult: document.getElementById('feedback-result'),
            playerImage: document.getElementById('player-image'),
            playerName: document.getElementById('player-name'),
            playerTrivia: document.getElementById('player-trivia'),
            nextBtn: document.getElementById('next-btn'),
            finalCorrect: document.getElementById('final-correct'),
            finalIncorrect: document.getElementById('final-incorrect'),
            accuracy: document.getElementById('accuracy'),
            restartBtn: document.getElementById('restart-btn'),
            retryBtn: document.getElementById('retry-btn'),
            
            // Menu elements
            classicModeBtn: document.getElementById('classic-mode-btn'),
            legacyModeBtn: document.getElementById('legacy-mode-btn'),
            newPlayerModeBtn: document.getElementById('new-player-mode-btn'),
            leaderboardBtn: document.getElementById('leaderboard-btn'),
            
            // Navigation elements
            headerMenuBtn: document.getElementById('header-menu-btn'),
            backToMenuBtn: document.getElementById('back-to-menu-btn'),
            
            // Leaderboard elements
            leaderboardEntries: document.getElementById('leaderboard-entries')
        };
        
        this.bindEvents();
        this.showScreen('menu');
    }
    
    bindEvents() {
        this.elements.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.elements.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitAnswer();
        });
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.restart());
        this.elements.retryBtn.addEventListener('click', () => this.init());
        
        // Menu event listeners
        this.elements.classicModeBtn.addEventListener('click', () => this.startGame('classic'));
        this.elements.legacyModeBtn.addEventListener('click', () => this.startGame('legacy'));
        this.elements.newPlayerModeBtn.addEventListener('click', () => this.startGame('newPlayers'));
        this.elements.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        
        // Navigation event listeners
        this.elements.headerMenuBtn.addEventListener('click', () => this.returnToMenu());
        this.elements.backToMenuBtn.addEventListener('click', () => this.showScreen('menu'));
    }
    
    startGame(mode) {
        this.gameMode = mode;
        this.init();
    }
    
    returnToMenu() {
        this.score = { correct: 0, incorrect: 0 };
        this.usedQuestions.clear();
        this.updateScore();
        this.showScreen('menu');
    }
    
    async init() {
        this.showScreen('loading');
        try {
            await this.loadPlayers();
            // Add a small delay to show the loading screen
            setTimeout(() => {
                this.nextQuestion();
            }, 1500);
        } catch (error) {
            console.error('Failed to load players:', error);
            this.showScreen('error');
        }
    }
    
    async loadPlayers() {
        try {
            let rawPlayers;
            
            console.log(`Loading players for game mode: ${this.gameMode}`);
            
            // For classic mode, try to use Sleeper API first
            if (this.gameMode === 'classic') {
                try {
                    console.log('Attempting to load current roster from Sleeper API...');
                    rawPlayers = await this.sleeperAPI.getCurrentSteelersRoster();
                    console.log(`Loaded ${rawPlayers.length} players from Sleeper API`);
                } catch (apiError) {
                    console.warn('Sleeper API failed, falling back to static data:', apiError);
                    rawPlayers = PlayerData.classic;
                }
            } else {
                // For legacy and newPlayers modes, always use static data
                console.log(`Using static data for ${this.gameMode} mode`);
                switch (this.gameMode) {
                    case 'legacy':
                        rawPlayers = PlayerData.legacy;
                        break;
                    case 'newPlayers':
                        rawPlayers = PlayerData.newPlayers;
                        break;
                    default:
                        rawPlayers = PlayerData.classic;
                        break;
                }
            }
            
            // Enhance player data with NFLverse integration
            this.players = this.nflverse.enhancePlayerData(rawPlayers);
            
            if (this.players.length === 0) {
                throw new Error('No players loaded');
            }
        } catch (error) {
            throw new Error('Unable to load Steelers roster');
        }
    }
    
    // Remove the old getFallbackRoster method since we now use PlayerData
    // async getFallbackRoster() { ... }
    
    generateQuestion() {
        const availablePlayers = this.players.filter(player => 
            !this.usedQuestions.has(`name-${player.name}`) && 
            !this.usedQuestions.has(`number-${player.number}`)
        );
        
        if (availablePlayers.length === 0) {
            this.endGame();
            return null;
        }
        
        const player = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
        const questionType = Math.random() < 0.5 ? 'name' : 'number';
        
        let question, answer, questionKey;
        
        if (questionType === 'name') {
            // Use past tense for legacy mode
            if (this.gameMode === 'legacy') {
                question = `What number did ${player.name} wear?`;
            } else {
                question = `What number does ${player.name} wear?`;
            }
            answer = player.number.toString();
            questionKey = `name-${player.name}`;
        } else {
            question = `Who wears jersey number ${player.number}?`;
            answer = player.name;
            questionKey = `number-${player.number}`;
        }
        
        this.usedQuestions.add(questionKey);
        
        return {
            question,
            answer,
            player,
            type: questionType
        };
    }
    
    nextQuestion() {
        this.currentQuestion = this.generateQuestion();
        
        if (!this.currentQuestion) {
            return;
        }
        
        this.elements.questionText.textContent = this.currentQuestion.question;
        this.elements.answerInput.value = '';
        this.elements.answerInput.focus();
        this.showScreen('game');
    }
    
    submitAnswer() {
        const userAnswer = this.elements.answerInput.value.trim();
        
        if (!userAnswer) {
            // Add visual feedback for empty input
            this.elements.answerInput.style.borderColor = '#FF8C00';  // Use accessible orange
            setTimeout(() => {
                this.elements.answerInput.style.borderColor = '';
            }, 1000);
            return;
        }
        
        const isCorrect = this.checkAnswer(userAnswer, this.currentQuestion.answer);
        
        if (isCorrect) {
            this.score.correct++;
            this.elements.feedbackResult.textContent = 'Correct!';
            this.elements.feedbackResult.className = 'result correct';
        } else {
            this.score.incorrect++;
            this.elements.feedbackResult.textContent = `Incorrect. The answer is ${this.currentQuestion.answer}`;
            this.elements.feedbackResult.className = 'result incorrect';
        }
        
        this.updateScore();
        this.showPlayerInfo().then(() => {
            this.showScreen('feedback');
        });
    }
    
    checkAnswer(userAnswer, correctAnswer) {
        const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return normalize(userAnswer) === normalize(correctAnswer);
    }
    
    async showPlayerInfo() {
        const player = this.currentQuestion.player;
        
        // Use enhanced image loading with fallback
        const imageUrl = await this.nflverse.loadPlayerImage(player);
        
        this.elements.playerImage.src = imageUrl;
        this.elements.playerImage.alt = player.name;
        this.elements.playerName.textContent = `${player.name} #${player.number} - ${player.position}`;
        this.elements.playerTrivia.textContent = player.trivia;
    }
    
    updateScore() {
        this.elements.correctCount.textContent = this.score.correct;
        this.elements.incorrectCount.textContent = this.score.incorrect;
    }
    
    endGame() {
        const total = this.score.correct + this.score.incorrect;
        const accuracy = total > 0 ? Math.round((this.score.correct / total) * 100) : 0;
        
        this.elements.finalCorrect.textContent = this.score.correct;
        this.elements.finalIncorrect.textContent = this.score.incorrect;
        this.elements.accuracy.textContent = `${accuracy}%`;
        
        // Save score to leaderboard
        this.saveScore({
            correct: this.score.correct,
            incorrect: this.score.incorrect,
            accuracy: accuracy,
            mode: this.gameMode,
            date: new Date().toLocaleDateString()
        });
        
        this.showScreen('gameOver');
    }
    
    saveScore(scoreData) {
        try {
            let leaderboard = JSON.parse(localStorage.getItem('steelersLeaderboard') || '[]');
            
            leaderboard.push(scoreData);
            
            // Sort by correct answers first, then by accuracy
            leaderboard.sort((a, b) => {
                if (b.correct !== a.correct) {
                    return b.correct - a.correct;
                }
                return b.accuracy - a.accuracy;
            });
            
            // Keep only top 10 scores
            leaderboard = leaderboard.slice(0, 10);
            
            localStorage.setItem('steelersLeaderboard', JSON.stringify(leaderboard));
        } catch (error) {
            console.error('Failed to save score:', error);
        }
    }
    
    showLeaderboard() {
        try {
            const leaderboard = JSON.parse(localStorage.getItem('steelersLeaderboard') || '[]');
            const entriesContainer = this.elements.leaderboardEntries;
            
            entriesContainer.innerHTML = '';
            
            if (leaderboard.length === 0) {
                entriesContainer.innerHTML = '<div class="leaderboard-item empty">No scores yet - be the first!</div>';
            } else {
                leaderboard.slice(0, 3).forEach((score, index) => {
                    const entry = document.createElement('div');
                    entry.className = 'leaderboard-item';
                    
                    const modeDisplay = {
                        'classic': 'Current Roster',
                        'legacy': 'Legacy',
                        'newPlayers': 'New Players'
                    };
                    
                    entry.innerHTML = `
                        <span class="rank">${index + 1}</span>
                        <span class="score">${score.correct}/${score.correct + score.incorrect}</span>
                        <span class="accuracy">${score.accuracy}%</span>
                        <span class="mode">${modeDisplay[score.mode] || score.mode}</span>
                    `;
                    
                    entriesContainer.appendChild(entry);
                });
            }
            
            this.showScreen('leaderboard');
        } catch (error) {
            console.error('Failed to load leaderboard:', error);
        }
    }
    
    restart() {
        this.score = { correct: 0, incorrect: 0 };
        this.usedQuestions.clear();
        this.updateScore();
        this.showScreen('menu');
    }
    
    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.add('hidden'));
        this.screens[screenName].classList.remove('hidden');
        
        // Show/hide header menu button based on screen
        if (screenName === 'game' || screenName === 'feedback') {
            this.elements.headerMenuBtn.classList.remove('hidden');
        } else {
            this.elements.headerMenuBtn.classList.add('hidden');
        }
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GuessTheSteelerGame();
});