class GuessTheSteelerGame {
    constructor() {
        this.players = [];
        this.usedQuestions = new Set();
        this.currentQuestion = null;
        this.score = { correct: 0, incorrect: 0 };
        
        // DOM elements
        this.screens = {
            loading: document.getElementById('loading-screen'),
            game: document.getElementById('game-screen'),
            feedback: document.getElementById('feedback-screen'),
            gameOver: document.getElementById('game-over-screen'),
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
            retryBtn: document.getElementById('retry-btn')
        };
        
        this.bindEvents();
        this.init();
    }
    
    bindEvents() {
        this.elements.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.elements.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitAnswer();
        });
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.restartBtn.addEventListener('click', () => this.restart());
        this.elements.retryBtn.addEventListener('click', () => this.init());
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
            // Due to CORS restrictions, we'll use a fallback roster for now
            // In a production environment, you'd use a backend service or CORS proxy
            this.players = await this.getFallbackRoster();
            
            if (this.players.length === 0) {
                throw new Error('No players loaded');
            }
        } catch (error) {
            throw new Error('Unable to load Steelers roster');
        }
    }
    
    async getFallbackRoster() {
        // Fallback roster with current 2024 Steelers players
        // In production, this would be dynamically scraped
        return [
            {
                name: "Kenny Pickett",
                number: 8,
                position: "QB",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23000'%3EK. Pickett%0A%238%3C/text%3E%3C/svg%3E",
                trivia: "First-round pick from Pittsburgh, hometown hero leading the Steel Curtain offense."
            },
            {
                name: "Najee Harris",
                number: 22,
                position: "RB",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23000'%3EN. Harris%0A%2322%3C/text%3E%3C/svg%3E",
                trivia: "Alabama product and first-round pick, known for his powerful running style and pass-catching ability."
            },
            {
                name: "T.J. Watt",
                number: 90,
                position: "LB",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23000'%3ET.J. Watt%0A%2390%3C/text%3E%3C/svg%3E",
                trivia: "Defensive Player of the Year winner and brother of NFL star J.J. Watt."
            },
            {
                name: "Minkah Fitzpatrick",
                number: 39,
                position: "S",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23000'%3EM. Fitzpatrick%0A%2339%3C/text%3E%3C/svg%3E",
                trivia: "All-Pro safety acquired from Miami, known for his game-changing interceptions."
            },
            {
                name: "Cam Heyward",
                number: 97,
                position: "DT",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EC. Heyward%0A%2397%3C/text%3E%3C/svg%3E",
                trivia: "Team captain and defensive anchor, son of former NFL player Craig 'Ironhead' Heyward."
            },
            {
                name: "George Pickens",
                number: 14,
                position: "WR",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EG. Pickens%0A%2314%3C/text%3E%3C/svg%3E",
                trivia: "Georgia standout known for spectacular catches and explosive speed downfield."
            },
            {
                name: "Diontae Johnson",
                number: 18,
                position: "WR",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3ED. Johnson%0A%2318%3C/text%3E%3C/svg%3E",
                trivia: "Toledo product with exceptional route-running ability and reliable hands."
            },
            {
                name: "Pat Freiermuth",
                number: 88,
                position: "TE",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23000'%3EP. Freiermuth%0A%2388%3C/text%3E%3C/svg%3E",
                trivia: "Penn State tight end known as 'The Muth', excellent red zone target."
            },
            {
                name: "Alex Highsmith",
                number: 56,
                position: "LB",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23000'%3EA. Highsmith%0A%2356%3C/text%3E%3C/svg%3E",
                trivia: "Charlotte product who developed into a premier pass rusher opposite T.J. Watt."
            },
            {
                name: "Jaylen Warren",
                number: 30,
                position: "RB",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EJ. Warren%0A%2330%3C/text%3E%3C/svg%3E",
                trivia: "Undrafted free agent from Oklahoma State who earned a roster spot with his versatility."
            },
            {
                name: "Calvin Austin III",
                number: 19,
                position: "WR",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23000'%3EC. Austin III%0A%2319%3C/text%3E%3C/svg%3E",
                trivia: "Memphis speedster drafted for his return ability and deep threat potential."
            },
            {
                name: "Broderick Jones",
                number: 76,
                position: "OT",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EB. Jones%0A%2376%3C/text%3E%3C/svg%3E",
                trivia: "Georgia offensive tackle and first-round pick protecting the quarterback's blind side."
            },
            {
                name: "Joey Porter Jr.",
                number: 24,
                position: "CB",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23000'%3EJ. Porter Jr.%0A%2324%3C/text%3E%3C/svg%3E",
                trivia: "Son of former Steelers linebacker Joey Porter, following in his father's footsteps."
            },
            {
                name: "Russell Wilson",
                number: 3,
                position: "QB",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3ER. Wilson%0A%233%3C/text%3E%3C/svg%3E",
                trivia: "Super Bowl champion quarterback bringing veteran leadership to Pittsburgh."
            },
            {
                name: "Arthur Smith",
                number: 35,
                position: "FB",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EA. Smith%0A%2335%3C/text%3E%3C/svg%3E",
                trivia: "Fullback who excels in short-yardage situations and goal-line packages."
            }
        ];
    }
    
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
            question = `What number does ${player.name} wear?`;
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
            this.elements.answerInput.style.borderColor = '#DC3545';
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
        this.showPlayerInfo();
        this.showScreen('feedback');
    }
    
    checkAnswer(userAnswer, correctAnswer) {
        const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return normalize(userAnswer) === normalize(correctAnswer);
    }
    
    showPlayerInfo() {
        const player = this.currentQuestion.player;
        this.elements.playerImage.src = player.image;
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
        
        this.showScreen('gameOver');
    }
    
    restart() {
        this.score = { correct: 0, incorrect: 0 };
        this.usedQuestions.clear();
        this.updateScore();
        this.nextQuestion();
    }
    
    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.add('hidden'));
        this.screens[screenName].classList.remove('hidden');
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GuessTheSteelerGame();
});