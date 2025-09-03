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

    // Get current Pittsburgh Steelers roster
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
                parts.push('rookie season');
            } else if (years === 1) {
                parts.push('second-year player');
            } else {
                parts.push(`${years + 1} years of NFL experience`);
            }
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

    // Clear cache (useful for testing)
    clearCache() {
        this.cache = null;
        this.cacheTimestamp = null;
    }
}

// Export for use in main application
window.SleeperAPIIntegration = SleeperAPIIntegration;