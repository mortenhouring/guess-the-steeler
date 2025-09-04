// Sleeper API Integration Module
// This module handles fetching current Pittsburgh Steelers roster data from the Sleeper API

class SleeperAPIIntegration {
    constructor() {
        this.baseUrl = 'https://api.sleeper.app/v1';
        this.playersEndpoint = `${this.baseUrl}/players/nfl`;
        this.steelersTeamId = 'PIT';
        
        // Memory cache
        this.cache = null;
        this.cacheTimestamp = null;
        this.cacheTimeout = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // Persistent cache configuration
        this.localStorageKey = 'steelers_roster_cache';
        this.cacheVersionKey = 'steelers_cache_version';
        this.currentCacheVersion = '1.1'; // Increment when data structure changes
        this.localCacheTimeout = 12 * 60 * 60 * 1000; // 12 hours for localStorage cache
        
        // Error handling and retry configuration
        this.maxRetries = 2;
        this.retryDelay = 1000; // 1 second
        this.requestTimeout = 10000; // 10 seconds
        
        // Image endpoints for Sleeper
        this.imageBaseUrl = 'https://sleepercdn.com/content/nfl/players/thumb';
        this.fallbackImageUrl = 'https://sleepercdn.com/images/v2/icons/player_default.webp';
        
        // Debug mode
        this.debugMode = false; // Set to true for detailed logging
    }

    // Persistent cache management
    saveToLocalStorage(data, type = 'roster') {
        try {
            const cacheData = {
                data: data,
                timestamp: Date.now(),
                version: this.currentCacheVersion,
                type: type
            };
            
            const key = type === 'roster' ? this.localStorageKey : `${this.localStorageKey}_${type}`;
            localStorage.setItem(key, JSON.stringify(cacheData));
            
            if (this.debugMode) {
                console.log(`Saved ${data.length} ${type} players to localStorage`);
            }
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    }

    loadFromLocalStorage(type = 'roster') {
        try {
            const key = type === 'roster' ? this.localStorageKey : `${this.localStorageKey}_${type}`;
            const cachedDataString = localStorage.getItem(key);
            
            if (!cachedDataString) {
                return null;
            }

            const cachedData = JSON.parse(cachedDataString);
            
            // Check cache version
            if (cachedData.version !== this.currentCacheVersion) {
                if (this.debugMode) {
                    console.log('Cache version mismatch, clearing localStorage cache');
                }
                localStorage.removeItem(key);
                return null;
            }

            // Check if cache is still valid
            const cacheAge = Date.now() - cachedData.timestamp;
            if (cacheAge > this.localCacheTimeout) {
                if (this.debugMode) {
                    console.log('localStorage cache expired, removing');
                }
                localStorage.removeItem(key);
                return null;
            }

            if (this.debugMode) {
                console.log(`Loaded ${cachedData.data.length} ${type} players from localStorage cache (age: ${Math.round(cacheAge / 1000 / 60)} minutes)`);
            }
            
            return cachedData.data;
        } catch (error) {
            console.warn('Failed to load from localStorage:', error);
            return null;
        }
    }

    clearLocalStorage() {
        try {
            localStorage.removeItem(this.localStorageKey);
            localStorage.removeItem(`${this.localStorageKey}_newPlayers`);
            localStorage.removeItem(this.cacheVersionKey);
            console.log('Cleared Steelers roster cache from localStorage');
        } catch (error) {
            console.warn('Failed to clear localStorage cache:', error);
        }
    }

    // Enhanced fetch with retry logic and timeout
    async fetchWithRetry(url, retries = this.maxRetries) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                if (this.debugMode) {
                    console.log(`Fetch attempt ${attempt + 1}/${retries + 1} for ${url}`);
                }

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

                const response = await fetch(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response;
            } catch (error) {
                console.warn(`Fetch attempt ${attempt + 1} failed:`, error.message);
                
                if (attempt === retries) {
                    throw error;
                }
                
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, this.retryDelay * (attempt + 1)));
            }
        }
    }

    async fetchPlayers() {
        try {
            console.log('Fetching players from Sleeper API...');
            const response = await this.fetchWithRetry(this.playersEndpoint);
            
            const players = await response.json();
            console.log('Successfully fetched players from Sleeper API');
            return players;
        } catch (error) {
            console.error('Error fetching from Sleeper API:', error);
            throw error;
        }
    }

    // Get new Pittsburgh Steelers players (rookies and players not in 2024 roster)
    async getNewSteelersPlayers() {
        try {
            // Check localStorage cache first
            const cachedData = this.loadFromLocalStorage('newPlayers');
            if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
                console.log('Using localStorage cached new Steelers players data');
                return cachedData;
            }

            console.log('Fetching fresh new Steelers players from API...');
            const allPlayers = await this.fetchPlayers();
            const newSteelersPlayers = [];

            // Get 2024 roster for comparison
            const static2024Roster = window.PlayerData?.static2024Roster || [];

            // Filter for active Steelers players who are new
            for (const [playerId, player] of Object.entries(allPlayers)) {
                if (player.team === this.steelersTeamId && player.active === true) {
                    const fullName = `${player.first_name} ${player.last_name}`;
                    
                    // Check if player is a rookie (years_exp = 0) OR not in 2024 roster
                    const isRookie = player.years_exp === 0 || player.years_exp === null;
                    const notIn2024Roster = !static2024Roster.includes(fullName);
                    
                    if (isRookie || notIn2024Roster) {
                        // Convert to our game format
                        const gamePlayer = this.convertToGameFormat(player, playerId);
                        if (gamePlayer) {
                            // Add special marking for new players
                            gamePlayer.isNewPlayer = true;
                            gamePlayer.newPlayerType = isRookie ? 'rookie' : 'new-signing';
                            newSteelersPlayers.push(gamePlayer);
                        }
                    }
                }
            }

            // Sort by jersey number for consistency
            newSteelersPlayers.sort((a, b) => a.number - b.number);

            // Cache the results
            this.saveToLocalStorage(newSteelersPlayers, 'newPlayers');

            console.log(`Found ${newSteelersPlayers.length} new Steelers players`);
            return newSteelersPlayers;

        } catch (error) {
            console.error('Error getting new Steelers players:', error);
            throw error;
        }
    }
    async getCurrentSteelersRoster() {
        try {
            // Check memory cache first (fastest)
            if (this.cache && this.cacheTimestamp && 
                (Date.now() - this.cacheTimestamp < this.cacheTimeout)) {
                console.log('Using memory cached Steelers roster data');
                return this.cache;
            }

            // Check localStorage cache second (fast, persistent)
            const cachedData = this.loadFromLocalStorage('roster');
            if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
                console.log('Using localStorage cached Steelers roster data');
                // Update memory cache
                this.cache = cachedData;
                this.cacheTimestamp = Date.now();
                return cachedData;
            }

            // Fetch fresh data from API (slowest)
            console.log('Fetching fresh Steelers roster from API...');
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

            // Cache the results in both memory and localStorage
            this.cache = steelersPlayers;
            this.cacheTimestamp = Date.now();
            this.saveToLocalStorage(steelersPlayers, 'roster');

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

    // Enhanced cache management
    clearCache() {
        this.cache = null;
        this.cacheTimestamp = null;
        console.log('Memory cache cleared');
    }

    clearAllCaches() {
        this.clearCache();
        this.clearLocalStorage();
        console.log('All caches cleared');
    }

    // Get cache status for debugging
    getCacheStatus() {
        const memoryCache = this.cache ? {
            size: this.cache.length,
            age: this.cacheTimestamp ? Math.round((Date.now() - this.cacheTimestamp) / 1000 / 60) : null
        } : null;

        const localCache = {
            roster: this.loadFromLocalStorage('roster') ? 'available' : 'empty',
            newPlayers: this.loadFromLocalStorage('newPlayers') ? 'available' : 'empty'
        };

        return {
            memory: memoryCache,
            localStorage: localCache,
            debugMode: this.debugMode
        };
    }

    // Enable/disable debug mode
    setDebugMode(enabled) {
        this.debugMode = enabled;
        console.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }

    // Refresh cache (force new API call)
    async refreshCache(type = 'roster') {
        console.log(`Refreshing ${type} cache...`);
        
        // Clear relevant caches
        if (type === 'roster') {
            this.clearCache();
            localStorage.removeItem(this.localStorageKey);
            return await this.getCurrentSteelersRoster();
        } else if (type === 'newPlayers') {
            localStorage.removeItem(`${this.localStorageKey}_newPlayers`);
            return await this.getNewSteelersPlayers();
        }
    }
}

// Export for use in main application
window.SleeperAPIIntegration = SleeperAPIIntegration;