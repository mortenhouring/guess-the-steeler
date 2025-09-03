// Sleeper API Integration Module
// This module handles integration with Sleeper fantasy football API to enhance trivia with real-time data

class SleeperApiIntegration {
    constructor() {
        this.baseUrl = 'https://api.sleeper.app/v1';
        this.cache = new Map();
        this.cacheExpiry = 15 * 60 * 1000; // 15 minutes
        this.currentSeason = new Date().getFullYear();
        this.currentWeek = this.getCurrentWeek();
    }

    // Get current NFL week (approximate)
    getCurrentWeek() {
        const now = new Date();
        const seasonStart = new Date(now.getFullYear(), 8, 1); // September 1st
        const weeksSinceStart = Math.floor((now - seasonStart) / (7 * 24 * 60 * 60 * 1000));
        return Math.max(1, Math.min(18, weeksSinceStart + 1));
    }

    // Cache management
    getCacheKey(endpoint, params = {}) {
        const paramString = Object.keys(params).length ? 
            '?' + new URLSearchParams(params).toString() : '';
        return `${endpoint}${paramString}`;
    }

    isValidCache(cacheEntry) {
        return cacheEntry && (Date.now() - cacheEntry.timestamp) < this.cacheExpiry;
    }

    // Generic API request with caching
    async apiRequest(endpoint, params = {}) {
        const cacheKey = this.getCacheKey(endpoint, params);
        const cached = this.cache.get(cacheKey);
        
        if (this.isValidCache(cached)) {
            return cached.data;
        }

        try {
            const paramString = Object.keys(params).length ? 
                '?' + new URLSearchParams(params).toString() : '';
            const url = `${this.baseUrl}${endpoint}${paramString}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the response
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.warn(`Sleeper API request failed for ${endpoint}:`, error);
            
            // Return cached data if available, even if expired
            if (cached) {
                console.log(`Using expired cache for ${endpoint}`);
                return cached.data;
            }
            
            // Return empty result or fallback data
            return this.getFallbackData(endpoint);
        }
    }

    // Fallback data when API is unavailable
    getFallbackData(endpoint) {
        if (endpoint.includes('/stats/')) {
            // Return mock statistics for demonstration
            return {
                "14881": { // Russell Wilson
                    "pass_yd": 285,
                    "pass_td": 2,
                    "pass_int": 0,
                    "rush_yd": 15,
                    "rush_td": 0
                },
                "3051926": { // T.J. Watt
                    "def_sack": 2.5,
                    "def_tkl": 6,
                    "def_int": 0,
                    "def_td": 0
                },
                "3917315": { // Minkah Fitzpatrick
                    "def_int": 1,
                    "def_tkl": 8,
                    "def_td": 0
                },
                "4361259": { // Najee Harris
                    "rush_yd": 89,
                    "rush_td": 1,
                    "rec": 4,
                    "rec_yd": 32,
                    "rec_td": 0
                },
                "4567048": { // George Pickens
                    "rec": 6,
                    "rec_yd": 102,
                    "rec_td": 1,
                    "rush_yd": 0,
                    "rush_td": 0
                }
            };
        }
        if (endpoint.includes('/players/')) {
            // Return mock player data for key Steelers
            return {
                "14881": {
                    "player_id": "14881",
                    "full_name": "Russell Wilson",
                    "position": "QB",
                    "number": 3,
                    "team": "PIT"
                },
                "3051926": {
                    "player_id": "3051926",
                    "full_name": "T.J. Watt",
                    "position": "LB",
                    "number": 90,
                    "team": "PIT"
                },
                "3917315": {
                    "player_id": "3917315",
                    "full_name": "Minkah Fitzpatrick",
                    "position": "S",
                    "number": 39,
                    "team": "PIT"
                },
                "4361259": {
                    "player_id": "4361259",
                    "full_name": "Najee Harris",
                    "position": "RB",
                    "number": 22,
                    "team": "PIT"
                },
                "4567048": {
                    "player_id": "4567048",
                    "full_name": "George Pickens",
                    "position": "WR",
                    "number": 14,
                    "team": "PIT"
                }
            };
        }
        return null;
    }

    // Get all NFL players data
    async getAllPlayers() {
        return await this.apiRequest('/players/nfl');
    }

    // Get player statistics for current week
    async getPlayerStats(week = null, season = null) {
        const targetWeek = week || this.currentWeek;
        const targetSeason = season || this.currentSeason;
        
        return await this.apiRequest(`/stats/nfl/${targetSeason}/${targetWeek}`);
    }

    // Get season-long player statistics
    async getSeasonStats(season = null) {
        const targetSeason = season || this.currentSeason;
        return await this.apiRequest(`/stats/nfl/${targetSeason}`);
    }

    // Enhanced player data with fantasy stats
    async enhancePlayerWithFantasyData(player) {
        try {
            // Get all players to find Sleeper player ID
            const allPlayers = await this.getAllPlayers();
            const sleeperPlayer = this.findSleeperPlayer(player, allPlayers);
            
            if (!sleeperPlayer) {
                return { ...player, fantasy: null };
            }

            // Get current week stats
            const weekStats = await this.getPlayerStats();
            const playerStats = weekStats[sleeperPlayer.player_id] || {};

            // Get season stats
            const seasonStats = await this.getSeasonStats();
            const playerSeasonStats = seasonStats[sleeperPlayer.player_id] || {};

            return {
                ...player,
                fantasy: {
                    playerId: sleeperPlayer.player_id,
                    sleeperData: sleeperPlayer,
                    weekStats: playerStats,
                    seasonStats: playerSeasonStats,
                    fantasyPoints: this.calculateFantasyPoints(playerStats),
                    seasonFantasyPoints: this.calculateFantasyPoints(playerSeasonStats)
                }
            };
        } catch (error) {
            console.warn(`Failed to enhance player ${player.name} with fantasy data:`, error);
            return { ...player, fantasy: null };
        }
    }

    // Find matching Sleeper player
    findSleeperPlayer(gamePlayer, sleeperPlayers) {
        if (!sleeperPlayers || typeof sleeperPlayers !== 'object') {
            return null;
        }

        // Convert object to array if needed
        const playersArray = Object.values(sleeperPlayers);
        
        // Try multiple matching strategies
        const normalizedGameName = this.normalizeName(gamePlayer.name);
        
        // First try to match by ESPN ID if we have it
        const espnId = this.getPlayerESPNId(gamePlayer.name);
        if (espnId && sleeperPlayers[espnId]) {
            return sleeperPlayers[espnId];
        }
        
        return playersArray.find(sp => {
            if (!sp.full_name) return false;
            
            const normalizedSleeperName = this.normalizeName(sp.full_name);
            
            // Exact match
            if (normalizedSleeperName === normalizedGameName) return true;
            
            // Jersey number match for added confidence
            if (sp.number && sp.number.toString() === gamePlayer.number.toString()) {
                // Check if names are reasonably similar
                const nameSimilarity = this.calculateNameSimilarity(normalizedGameName, normalizedSleeperName);
                if (nameSimilarity > 0.7) return true;
            }
            
            return false;
        });
    }

    // Basic ESPN ID mapping for current and legacy players
    getPlayerESPNId(playerName) {
        const knownPlayers = {
            // Current roster players
            'Russell Wilson': '14881',
            'T.J. Watt': '3051926',
            'Minkah Fitzpatrick': '3917315',
            'Cam Heyward': '13994',
            'Kenny Pickett': '4426385',
            'Najee Harris': '4361259',
            'George Pickens': '4567048',
            'Pat Freiermuth': '4240069',
            'Diontae Johnson': '3929630',
            'Alex Highsmith': '4240454',
            'Jaylen Warren': '4568318',
            'Calvin Austin III': '4430076',
            'Broderick Jones': '4685132',
            'Joey Porter Jr.': '4431455',
            
            // Legacy players
            'Ben Roethlisberger': '8439',
            'Troy Polamalu': '3045',
            'Hines Ward': '2593',
            'Jerome Bettis': '165',
            'Terry Bradshaw': '1',
            'Franco Harris': '2',
            'Lynn Swann': '3',
            'John Stallworth': '4',
            'Joe Greene': '5',
            'Jack Lambert': '6',
            'Jack Ham': '7',
            'Mel Blount': '8',
            
            // New players 2025
            'Justin Fields': '4241479',
            'Roman Wilson': '4685746',
            'Troy Fautanu': '4685513',
            'Zach Frazier': '4426761',
            'Payton Wilson': '4432692',
            'Logan Lee': '4426138',
            'Donte Jackson': '3915511',
            'Cameron Johnston': '2976499',
            'Ben Skowronek': '4240853',
            'Ryan McCollum': '4431991',
            
            // Additional current roster players
            'Isaac Seumalo': '2578570',
            'Chris Boswell': '17210',
        };
        return knownPlayers[playerName] || null;
    }

    // Normalize name for comparison
    normalizeName(name) {
        return name.toLowerCase()
            .replace(/[^a-z\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Calculate name similarity (simple version)
    calculateNameSimilarity(name1, name2) {
        const words1 = name1.split(' ');
        const words2 = name2.split(' ');
        
        let matches = 0;
        const totalWords = Math.max(words1.length, words2.length);
        
        words1.forEach(word1 => {
            if (words2.some(word2 => word1.includes(word2) || word2.includes(word1))) {
                matches++;
            }
        });
        
        return matches / totalWords;
    }

    // Calculate fantasy points (standard scoring)
    calculateFantasyPoints(stats) {
        if (!stats || typeof stats !== 'object') return 0;
        
        let points = 0;
        
        // Passing stats
        points += (stats.pass_yd || 0) * 0.04; // 1 point per 25 yards
        points += (stats.pass_td || 0) * 4;    // 4 points per TD
        points -= (stats.pass_int || 0) * 2;   // -2 points per INT
        
        // Rushing stats
        points += (stats.rush_yd || 0) * 0.1;  // 1 point per 10 yards
        points += (stats.rush_td || 0) * 6;    // 6 points per TD
        
        // Receiving stats
        points += (stats.rec_yd || 0) * 0.1;   // 1 point per 10 yards
        points += (stats.rec || 0) * 1;        // 1 point per reception (PPR)
        points += (stats.rec_td || 0) * 6;     // 6 points per TD
        
        // Defensive stats (for defensive players)
        points += (stats.def_int || 0) * 2;    // 2 points per INT
        points += (stats.def_fumrec || 0) * 2; // 2 points per fumble recovery
        points += (stats.def_td || 0) * 6;     // 6 points per defensive TD
        points += (stats.def_sack || 0) * 1;   // 1 point per sack
        
        // Kicking stats
        points += (stats.fg || 0) * 3;         // 3 points per field goal
        points += (stats.xp || 0) * 1;         // 1 point per extra point
        
        return Math.round(points * 10) / 10; // Round to 1 decimal place
    }

    // Generate fantasy-based trivia questions
    generateFantasyQuestion(playersWithFantasy) {
        const playersWithStats = playersWithFantasy.filter(p => 
            p.fantasy && p.fantasy.fantasyPoints > 0
        );
        
        if (playersWithStats.length === 0) {
            return null;
        }
        
        const questionTypes = [
            'highest_fantasy_points',
            'fantasy_points_range',
            'weekly_performance',
            'season_stats'
        ];
        
        const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        switch (questionType) {
            case 'highest_fantasy_points':
                return this.generateHighestPointsQuestion(playersWithStats);
            case 'fantasy_points_range':
                return this.generatePointsRangeQuestion(playersWithStats);
            case 'weekly_performance':
                return this.generateWeeklyPerformanceQuestion(playersWithStats);
            case 'season_stats':
                return this.generateSeasonStatsQuestion(playersWithStats);
            default:
                return null;
        }
    }

    generateHighestPointsQuestion(players) {
        const sortedPlayers = players.sort((a, b) => 
            (b.fantasy.fantasyPoints || 0) - (a.fantasy.fantasyPoints || 0)
        );
        
        const topPlayer = sortedPlayers[0];
        const otherPlayers = sortedPlayers.slice(1, 4);
        
        return {
            question: `Which Steelers player has the most fantasy points this week?`,
            answer: topPlayer.name,
            options: [topPlayer, ...otherPlayers].map(p => p.name),
            explanation: `${topPlayer.name} has ${topPlayer.fantasy.fantasyPoints} fantasy points this week.`,
            type: 'fantasy_trivia',
            player: topPlayer
        };
    }

    generatePointsRangeQuestion(players) {
        const player = players[Math.floor(Math.random() * players.length)];
        const points = player.fantasy.fantasyPoints;
        
        return {
            question: `How many fantasy points did ${player.name} score this week?`,
            answer: points.toString(),
            correctRange: [points - 2, points + 2], // Allow some tolerance
            explanation: `${player.name} scored ${points} fantasy points this week.`,
            type: 'fantasy_points',
            player: player
        };
    }

    generateWeeklyPerformanceQuestion(players) {
        const player = players[Math.floor(Math.random() * players.length)];
        const stats = player.fantasy.weekStats;
        
        if (!stats || Object.keys(stats).length === 0) {
            return null;
        }
        
        // Pick an interesting stat to ask about
        const statQuestions = [];
        
        if (stats.pass_yd) {
            statQuestions.push({
                question: `How many passing yards did ${player.name} have this week?`,
                answer: stats.pass_yd.toString(),
                stat: 'passing yards'
            });
        }
        
        if (stats.rush_yd) {
            statQuestions.push({
                question: `How many rushing yards did ${player.name} have this week?`,
                answer: stats.rush_yd.toString(),
                stat: 'rushing yards'
            });
        }
        
        if (stats.rec) {
            statQuestions.push({
                question: `How many receptions did ${player.name} have this week?`,
                answer: stats.rec.toString(),
                stat: 'receptions'
            });
        }
        
        if (statQuestions.length === 0) {
            return null;
        }
        
        const selectedQuestion = statQuestions[Math.floor(Math.random() * statQuestions.length)];
        
        return {
            ...selectedQuestion,
            explanation: `${player.name} had ${selectedQuestion.answer} ${selectedQuestion.stat} this week.`,
            type: 'weekly_stats',
            player: player
        };
    }

    generateSeasonStatsQuestion(players) {
        const player = players[Math.floor(Math.random() * players.length)];
        const seasonPoints = player.fantasy.seasonFantasyPoints;
        
        if (!seasonPoints || seasonPoints === 0) {
            return null;
        }
        
        return {
            question: `What are ${player.name}'s total fantasy points for the season?`,
            answer: seasonPoints.toString(),
            correctRange: [seasonPoints - 5, seasonPoints + 5], // Allow some tolerance
            explanation: `${player.name} has ${seasonPoints} total fantasy points this season.`,
            type: 'season_fantasy',
            player: player
        };
    }

    // Get trending players (players with high recent performance)
    getTrendingPlayers(playersWithFantasy, limit = 5) {
        return playersWithFantasy
            .filter(p => p.fantasy && p.fantasy.fantasyPoints > 0)
            .sort((a, b) => (b.fantasy.fantasyPoints || 0) - (a.fantasy.fantasyPoints || 0))
            .slice(0, limit);
    }

    // Get fantasy-relevant player information for trivia
    getFantasyTrivia(player) {
        if (!player.fantasy) {
            return null;
        }
        
        const fantasy = player.fantasy;
        const triviaParts = [];
        
        if (fantasy.fantasyPoints > 0) {
            triviaParts.push(`Scored ${fantasy.fantasyPoints} fantasy points this week`);
        }
        
        if (fantasy.seasonFantasyPoints > 0) {
            triviaParts.push(`${fantasy.seasonFantasyPoints} total fantasy points this season`);
        }
        
        if (fantasy.weekStats) {
            const stats = fantasy.weekStats;
            if (stats.pass_td) triviaParts.push(`${stats.pass_td} passing TDs this week`);
            if (stats.rush_td) triviaParts.push(`${stats.rush_td} rushing TDs this week`);
            if (stats.rec_td) triviaParts.push(`${stats.rec_td} receiving TDs this week`);
            if (stats.def_sack) triviaParts.push(`${stats.def_sack} sacks this week`);
        }
        
        return triviaParts.length > 0 ? triviaParts.join(', ') + '.' : null;
    }
}

// Export for use in main application
window.SleeperApiIntegration = SleeperApiIntegration;