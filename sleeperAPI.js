// Sleeper API Integration Module
// This module handles fetching current Pittsburgh Steelers roster data from the Sleeper API

class SleeperAPIIntegration {
    constructor() {
        this.baseUrl = 'https://api.sleeper.app/v1';
        this.playersEndpoint = `${this.baseUrl}/players/nfl`;
        this.steelersTeamId = 'PIT';
        this.cache = null;
        this.cacheTimestamp = null;
        this.cacheTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // Image endpoints for Sleeper
        this.imageBaseUrl = 'https://sleepercdn.com/content/nfl/players/thumb';
        this.fallbackImageUrl = 'https://sleepercdn.com/images/v2/icons/player_default.webp';
    }

    // Fetch all NFL players from Sleeper API
    async fetchPlayers() {
        try {
            console.log('Fetching players from Sleeper API...');
            const response = await fetch(this.playersEndpoint);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const players = await response.json();
            console.log('Successfully fetched players from Sleeper API');
            return players;
        } catch (error) {
            console.error('Error fetching from Sleeper API:', error);
            throw error;
        }
    }

    // Get new Pittsburgh Steelers players (rookies and second-year players)
    async getNewSteelersPlayers() {
        try {
            const allPlayers = await this.fetchPlayers();
            const newSteelersPlayers = [];

            // Filter for active Steelers players who are new (0-1 years experience)
            for (const [playerId, player] of Object.entries(allPlayers)) {
                if (player.team === this.steelersTeamId && 
                    player.active === true && 
                    (player.years_exp === 0 || player.years_exp === 1 || player.years_exp === null)) {
                    
                    // Convert to our game format
                    const gamePlayer = this.convertToGameFormat(player, playerId);
                    if (gamePlayer) {
                        // Add special marking for new players
                        gamePlayer.isNewPlayer = true;
                        gamePlayer.newPlayerType = player.years_exp === 0 || player.years_exp === null ? 'rookie' : 'second-year';
                        newSteelersPlayers.push(gamePlayer);
                    }
                }
            }

            // Sort by jersey number for consistency
            newSteelersPlayers.sort((a, b) => a.number - b.number);

            console.log(`Found ${newSteelersPlayers.length} new Steelers players`);
            return newSteelersPlayers;

        } catch (error) {
            console.error('Error getting new Steelers players:', error);
            throw error;
        }
    }
    async getCurrentSteelersRoster() {
        try {
            // Check cache first
            if (this.cache && this.cacheTimestamp && 
                (Date.now() - this.cacheTimestamp < this.cacheTimeout)) {
                console.log('Using cached Steelers roster data');
                return this.cache;
            }

            const allPlayers = await this.fetchPlayers();
            const steelersPlayers = [];

            // Filter for active Steelers players
            for (const [playerId, player] of Object.entries(allPlayers)) {
                if (player.team === this.steelersTeamId && player.active === true) {
                    // Convert to our game format
                    const gamePlayer = this.convertToGameFormat(player, playerId);
                    if (gamePlayer) {
                        steelersPlayers.push(gamePlayer);
                    }
                }
            }

            // Sort by jersey number for consistency
            steelersPlayers.sort((a, b) => a.number - b.number);

            // Cache the results
            this.cache = steelersPlayers;
            this.cacheTimestamp = Date.now();

            console.log(`Found ${steelersPlayers.length} active Steelers players`);
            return steelersPlayers;

        } catch (error) {
            console.error('Error getting current Steelers roster:', error);
            throw error;
        }
    }

    // Convert Sleeper player format to our game format
    convertToGameFormat(sleeperPlayer, playerId) {
        if (!sleeperPlayer.first_name || !sleeperPlayer.last_name) {
            return null; // Skip players without complete names
        }

        const fullName = `${sleeperPlayer.first_name} ${sleeperPlayer.last_name}`;
        
        // Skip players without jersey numbers
        if (!sleeperPlayer.number || sleeperPlayer.number === null) {
            return null;
        }

        return {
            name: fullName,
            number: parseInt(sleeperPlayer.number),
            position: sleeperPlayer.position || 'N/A',
            trivia: this.generateTrivia(fullName, sleeperPlayer),
            sleeperId: playerId,
            // Add additional data for image lookup
            firstName: sleeperPlayer.first_name,
            lastName: sleeperPlayer.last_name,
            // Preserve other useful fields
            age: sleeperPlayer.age,
            height: sleeperPlayer.height,
            weight: sleeperPlayer.weight,
            college: sleeperPlayer.college,
            yearsExp: sleeperPlayer.years_exp
        };
    }

    // Generate trivia text for players
    generateTrivia(fullName, sleeperPlayer) {
        const parts = [];
        
        if (sleeperPlayer.college) {
            parts.push(`${sleeperPlayer.college} product`);
        }
        
        if (sleeperPlayer.years_exp !== undefined && sleeperPlayer.years_exp !== null) {
            const years = parseInt(sleeperPlayer.years_exp);
            if (years === 0) {
                parts.push('rookie season - new to the Steel City');
            } else if (years === 1) {
                parts.push('second-year player building on rookie experience');
            } else {
                parts.push(`${years + 1} years of NFL experience`);
            }
        } else {
            // Handle null years_exp (likely rookie)
            parts.push('rookie season - new to the NFL');
        }

        if (sleeperPlayer.height && sleeperPlayer.weight) {
            parts.push(`${sleeperPlayer.height}" ${sleeperPlayer.weight} lbs`);
        }

        // Add position-specific generic trivia
        const positionTrivia = this.getPositionTrivia(sleeperPlayer.position);
        if (positionTrivia) {
            parts.push(positionTrivia);
        }

        return parts.length > 0 ? 
            `${parts.join(', ')}.` : 
            `Current Pittsburgh Steelers ${sleeperPlayer.position || 'player'}.`;
    }

    // Get position-specific trivia
    getPositionTrivia(position) {
        const triviaMap = {
            'QB': 'leading the Steelers offense',
            'RB': 'contributing to the ground game',
            'WR': 'part of the receiving corps',
            'TE': 'versatile weapon in the passing game',
            'OL': 'protecting the quarterback',
            'DL': 'part of the defensive front',
            'LB': 'key defender in the Steel Curtain',
            'CB': 'defending the secondary',
            'S': 'last line of defense',
            'K': 'handling scoring duties',
            'P': 'special teams specialist'
        };
        
        return triviaMap[position] || null;
    }

    // Test API connectivity
    async testConnection() {
        try {
            const response = await fetch(this.playersEndpoint, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Get player image URL from Sleeper
    getSleeperPlayerImage(playerId, playerName) {
        if (!playerId) {
            return this.fallbackImageUrl;
        }
        
        // Sleeper player image URL pattern
        return `${this.imageBaseUrl}/${playerId}.jpg`;
    }

    // Test if Sleeper image exists, fallback to default if not
    async getPlayerImageWithFallback(playerId, playerName) {
        if (!playerId) {
            return this.fallbackImageUrl;
        }

        const imageUrl = this.getSleeperPlayerImage(playerId, playerName);
        
        try {
            // Test if the image exists
            const response = await fetch(imageUrl, { method: 'HEAD' });
            if (response.ok) {
                return imageUrl;
            }
        } catch (error) {
            console.log(`Image not found for ${playerName}, using fallback`);
        }
        
        return this.fallbackImageUrl;
    }
    clearCache() {
        this.cache = null;
        this.cacheTimestamp = null;
    }
}

// Export for use in main application
window.SleeperAPIIntegration = SleeperAPIIntegration;