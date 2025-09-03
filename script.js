class GuessTheSteelerGame {
    constructor() {
        this.players = [];
        this.usedQuestions = new Set();
        this.currentQuestion = null;
        this.score = { correct: 0, incorrect: 0 };
        this.gameMode = 'classic'; // classic, legacy, newPlayers, fantasy
        this.nflverse = new NFLVerseIntegration();
        this.sleeperApi = new SleeperApiIntegration();
        
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
            fantasyModeBtn: document.getElementById('fantasy-mode-btn'),
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
        this.elements.fantasyModeBtn.addEventListener('click', () => this.startGame('fantasy'));
        this.elements.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        
        // Navigation event listeners
        this.elements.headerMenuBtn.addEventListener('click', () => this.returnToMenu());
        this.elements.backToMenuBtn.addEventListener('click', () => this.showScreen('menu'));
    }
    
    startGame(mode) {
        console.log(`Starting game in mode: ${mode}`);
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
            console.log(`Loading players for mode: ${this.gameMode}`);
            // Load players based on selected game mode
            let rawPlayers;
            switch (this.gameMode) {
                case 'legacy':
                    rawPlayers = PlayerData.legacy;
                    break;
                case 'newPlayers':
                    rawPlayers = PlayerData.newPlayers;
                    break;
                case 'fantasy':
                    // For fantasy mode, use current roster with enhanced fantasy data
                    rawPlayers = PlayerData.classic;
                    break;
                case 'classic':
                default:
                    rawPlayers = PlayerData.classic;
                    break;
            }
            
            // Enhance player data with NFLverse integration
            this.players = this.nflverse.enhancePlayerData(rawPlayers);
            
            // For fantasy mode, enhance with Sleeper API data
            if (this.gameMode === 'fantasy') {
                console.log('Loading fantasy data from Sleeper API...');
                this.players = await this.enhanceWithFantasyData(this.players);
            }
            
            if (this.players.length === 0) {
                throw new Error('No players loaded');
            }
        } catch (error) {
            throw new Error('Unable to load Steelers roster');
        }
    }
    
    async enhanceWithFantasyData(players) {
        try {
            const enhancedPlayers = [];
            
            // Process players in batches to avoid overwhelming the API
            for (const player of players) {
                try {
                    const enhancedPlayer = await this.sleeperApi.enhancePlayerWithFantasyData(player);
                    enhancedPlayers.push(enhancedPlayer);
                } catch (error) {
                    console.warn(`Failed to enhance ${player.name} with fantasy data:`, error);
                    enhancedPlayers.push(player); // Add without fantasy data
                }
                
                // Small delay to be respectful to the API
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            return enhancedPlayers;
        } catch (error) {
            console.warn('Failed to enhance players with fantasy data, using basic data:', error);
            return players; // Return without fantasy enhancement
        }
    }
    
    // Remove the old getFallbackRoster method since we now use PlayerData
    // async getFallbackRoster() { ... }
    
    generateQuestion() {
        // For fantasy mode, try to generate fantasy-specific questions
        if (this.gameMode === 'fantasy') {
            const fantasyQuestion = this.sleeperApi.generateFantasyQuestion(this.players);
            if (fantasyQuestion) {
                return this.adaptFantasyQuestion(fantasyQuestion);
            }
            // Fall back to regular questions if no fantasy data available
        }
        
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
    
    adaptFantasyQuestion(fantasyQuestion) {
        // Adapt fantasy question to our game format
        const questionKey = `fantasy-${fantasyQuestion.player.name}-${fantasyQuestion.type}`;
        
        // Check if we've already used this type of question for this player
        if (this.usedQuestions.has(questionKey)) {
            return null; // Let it fall back to regular questions
        }
        
        this.usedQuestions.add(questionKey);
        
        return {
            question: fantasyQuestion.question,
            answer: fantasyQuestion.answer,
            player: fantasyQuestion.player,
            type: 'fantasy',
            fantasyType: fantasyQuestion.type,
            explanation: fantasyQuestion.explanation,
            correctRange: fantasyQuestion.correctRange, // For numeric answers with tolerance
            options: fantasyQuestion.options // For multiple choice questions
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
        // Handle fantasy questions with numeric ranges
        if (this.currentQuestion.type === 'fantasy' && this.currentQuestion.correctRange) {
            const userNum = parseFloat(userAnswer);
            const [min, max] = this.currentQuestion.correctRange;
            return !isNaN(userNum) && userNum >= min && userNum <= max;
        }
        
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
        
        // Show appropriate trivia based on game mode and question type
        let triviaText = player.trivia;
        
        if (this.currentQuestion.type === 'fantasy' && this.currentQuestion.explanation) {
            triviaText = this.currentQuestion.explanation;
        } else if (this.gameMode === 'fantasy' && player.fantasy) {
            const fantasyTrivia = this.sleeperApi.getFantasyTrivia(player);
            if (fantasyTrivia) {
                triviaText = `${player.trivia} Fantasy stats: ${fantasyTrivia}`;
            }
        }
        
        this.elements.playerTrivia.textContent = triviaText;
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
                        'newPlayers': 'New Players',
                        'fantasy': 'Fantasy'
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