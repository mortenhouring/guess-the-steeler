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
        
        // Create a more professional-looking placeholder
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
                <defs>
                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#FFB612;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFC72C;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="120" height="120" fill="url(#bg)" rx="60"/>
                <circle cx="60" cy="60" r="58" fill="none" stroke="#000" stroke-width="2"/>
                <text x="60" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#000">${initials}</text>
                <text x="60" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#000">#${number || '?'}</text>
                <text x="60" y="85" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#000">${position || ''}</text>
            </svg>
        `;
        
        return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }

    // Enhanced player data with potential ESPN IDs
    enhancePlayerData(playerData) {
        return playerData.map(player => ({
            ...player,
            // Add potential ESPN player IDs for common players
            espnId: this.getESPNId(player.name),
            image: this.getPlayerImage(player)
        }));
    }

    getPlayerImage(player) {
        // Try ESPN headshot first, fall back to generated image
        const espnId = this.getESPNId(player.name);
        if (espnId) {
            return this.getPlayerHeadshot(espnId, player.name);
        }
        return this.createFallbackImage(player.name, player.number, player.position);
    }

    // Basic ESPN ID mapping for common players (this would be expanded with real data)
    getESPNId(playerName) {
        const knownPlayers = {
            'Russell Wilson': '14881',
            'T.J. Watt': '3051926',
            'Minkah Fitzpatrick': '3917315',
            'Cam Heyward': '13994',
            'Kenny Pickett': '4426385',
            'Najee Harris': '4361259',
            'George Pickens': '4567048',
            'Pat Freiermuth': '4240069',
            'Diontae Johnson': '3929630'
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
        const espnId = this.getESPNId(player.name);
        if (espnId) {
            const espnUrl = this.getPlayerHeadshot(espnId, player.name);
            const isAccessible = await this.testImageUrl(espnUrl);
            if (isAccessible) {
                return espnUrl;
            }
        }
        return this.createFallbackImage(player.name, player.number, player.position);
    }
}

// Export for use in main application
window.NFLVerseIntegration = NFLVerseIntegration;