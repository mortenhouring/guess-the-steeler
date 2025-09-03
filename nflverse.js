// NFLverse Integration Module
// This module handles player data and headshot integration

class NFLVerseIntegration {
    constructor() {
        this.baseHeadshotUrl = 'https://a.espncdn.com/i/headshots/nfl/players/full/';
        this.fallbackImageGenerator = this.createFallbackImage.bind(this);
    }

    // Generate ESPN-style headshot URL (most common format)
    getPlayerHeadshot(playerId, playerName) {
        if (playerId) {
            return `${this.baseHeadshotUrl}${playerId}.png`;
        }
        // Fallback to generated image
        return this.createFallbackImage(playerName);
    }

    // Create a better fallback image with player info
    createFallbackImage(playerName, number, position) {
        const initials = this.getPlayerInitials(playerName);
        const shortName = this.getShortName(playerName);
        
        // Use different colors for legacy vs current players
        const isLegacyPlayer = this.isLegacyPlayer(playerName);
        const bgColor1 = isLegacyPlayer ? '#C0C0C0' : '#FFB612'; // Silver for legacy, gold for current
        const bgColor2 = isLegacyPlayer ? '#E5E5E5' : '#FFC72C'; // Light silver for legacy, light gold for current
        const textColor = isLegacyPlayer ? '#000000' : '#000000'; // Black text for both
        const borderColor = isLegacyPlayer ? '#8B8B8B' : '#000000'; // Gray border for legacy, black for current
        
        // Create a more professional-looking placeholder
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
                <defs>
                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${bgColor1};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:${bgColor2};stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="120" height="120" fill="url(#bg)" rx="60"/>
                <circle cx="60" cy="60" r="58" fill="none" stroke="${borderColor}" stroke-width="2"/>
                <text x="60" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="${textColor}">${initials}</text>
                <text x="60" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="${textColor}">#${number || '?'}</text>
                <text x="60" y="82" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="${textColor}">${position || ''}</text>
                ${isLegacyPlayer ? '<text x="60" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" fill="#666">LEGEND</text>' : ''}
            </svg>
        `;
        
        return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }

    // Check if a player is a legacy player
    isLegacyPlayer(playerName) {
        const legacyPlayers = [
            'Terry Bradshaw', 'Franco Harris', 'Lynn Swann', 'John Stallworth',
            'Joe Greene', 'Jack Lambert', 'Jack Ham', 'Mel Blount',
            'Ben Roethlisberger', 'Troy Polamalu', 'Hines Ward', 'Jerome Bettis'
        ];
        return legacyPlayers.includes(playerName);
    }

    // Enhanced player data with potential ESPN IDs and custom image URLs
    enhancePlayerData(playerData) {
        return playerData.map(player => ({
            ...player,
            // Add potential ESPN player IDs for common players
            espnId: this.getESPNId(player.name),
            customImageUrl: this.getCustomImageUrl(player.name),
            image: this.getPlayerImage(player)
        }));
    }

    getPlayerImage(player) {
        // First try custom image URL for legacy players
        const customUrl = this.getCustomImageUrl(player.name);
        if (customUrl) {
            return customUrl;
        }
        
        // Try ESPN headshot
        const espnId = this.getESPNId(player.name);
        if (espnId) {
            return this.getPlayerHeadshot(espnId, player.name);
        }
        
        // Fall back to generated image
        return this.createFallbackImage(player.name, player.number, player.position);
    }

    // Custom image URLs for legacy players
    getCustomImageUrl(playerName) {
        const customImages = {
            'Terry Bradshaw': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/1.png',
            'Franco Harris': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2.png',
            'Lynn Swann': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3.png',
            'John Stallworth': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4.png',
            'Joe Greene': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/5.png',
            'Jack Lambert': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/6.png',
            'Jack Ham': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/7.png',
            'Mel Blount': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/8.png',
            'Ben Roethlisberger': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/8439.png',
            'Troy Polamalu': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3045.png',
            'Hines Ward': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2593.png',
            'Jerome Bettis': 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/165.png'
        };
        return customImages[playerName] || null;
    }

    // Basic ESPN ID mapping for current and legacy players
    getESPNId(playerName) {
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
            
            // New players 2024
            'Justin Fields': '4241479',
            'Roman Wilson': '4685746',
            'Troy Fautanu': '4685513',
            'Zach Frazier': '4426761',
            'Payton Wilson': '4432692',
            'Logan Lee': '4426138'
        };
        return knownPlayers[playerName] || null;
    }

    getPlayerInitials(name) {
        return name.split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    getShortName(name) {
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0];
        return `${parts[0].charAt(0)}. ${parts[parts.length - 1]}`;
    }

    // Method to test if an image URL is accessible
    async testImageUrl(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // Enhanced image loading with fallback
    async loadPlayerImage(player) {
        // First try custom image URL for legacy players
        const customUrl = this.getCustomImageUrl(player.name);
        if (customUrl) {
            const isAccessible = await this.testImageUrl(customUrl);
            if (isAccessible) {
                return customUrl;
            }
        }
        
        // Try ESPN headshot
        const espnId = this.getESPNId(player.name);
        if (espnId) {
            const espnUrl = this.getPlayerHeadshot(espnId, player.name);
            const isAccessible = await this.testImageUrl(espnUrl);
            if (isAccessible) {
                return espnUrl;
            }
        }
        
        // Fall back to generated image
        return this.createFallbackImage(player.name, player.number, player.position);
    }
}

// Export for use in main application
window.NFLVerseIntegration = NFLVerseIntegration;