# Guess the Steeler

A comprehensive web-based trivia game designed for mobile devices that tests your knowledge of Pittsburgh Steelers players across different eras and contexts.

## Game Features

### Multiple Game Modes
- **Current Roster Mode**: Current roster players with real-time trivia
- **Legacy Mode**: Legendary Steelers throughout franchise history
- **New Player Mode**: Focus on players who joined this season
- **Fantasy Mode**: Fantasy football stats and performance trivia
- **Leaderboard**: Track top scores across all game modes

### Enhanced Player Experience
- **Smart Image System**: NFLverse integration with fallback to professional-quality generated player images
- **Sleeper API Integration**: Real-time fantasy football statistics and performance data
- **Score Tracking**: Persistent leaderboard with top 3 scores stored locally
- **Mobile Optimized**: Designed specifically for iPhone and mobile screens
- **Steelers Theme**: Authentic black and gold color scheme
- **Header Navigation**: Convenient menu button positioned next to the title for easy access

### Game Mechanics
- **Multiple Question Types**: Traditional jersey number questions plus fantasy football performance trivia
- **Real-time Data**: Sleeper API integration provides current season statistics and fantasy points
- **Intelligent Fallbacks**: Seamless experience even with network limitations
- **Header Navigation**: Easy mode switching with header-integrated menu button
- **Progress Tracking**: Live score counter and accuracy percentage

## How to Play

1. **Choose Your Mode**: Select from Current Roster, Legacy, New Player, Fantasy, or view the Leaderboard
2. **Answer Questions**: Type player names, jersey numbers, or fantasy statistics
3. **Learn & Discover**: View player photos, stats, and fun trivia after each answer
4. **Track Progress**: Monitor your score and compete for the leaderboard
5. **Switch Modes**: Use the Menu button to try different challenges

## Game Modes Explained

### Current Roster Mode
Current Pittsburgh Steelers roster including stars like:
- Russell Wilson (#3) - Super Bowl champion quarterback
- T.J. Watt (#90) - Defensive Player of the Year
- Minkah Fitzpatrick (#39) - All-Pro safety
- Justin Fields (#2) - Dynamic dual-threat quarterback

### Legacy Mode
Legendary Steelers from throughout franchise history:
- Terry Bradshaw (#12) - Four-time Super Bowl champion
- Franco Harris (#32) - "Immaculate Reception" legend
- "Mean Joe" Greene (#75) - Steel Curtain anchor
- Troy Polamalu (#43) - Hall of Fame safety

### New Player Mode
Players who joined the Steelers this season, featuring:
- Russell Wilson - Former Seahawks/Broncos QB
- Justin Fields - Former Bears quarterback
- Troy Fautanu - First-round rookie from Washington
- Roman Wilson - Third-round rookie from Michigan
- Donte Jackson - Veteran CB from Carolina Panthers

### Fantasy Mode
Fantasy football performance and statistics trivia:
- Current week fantasy points and statistics
- Season-long performance metrics
- Player performance comparisons
- Real-time data from Sleeper API
- Standard fantasy scoring system

## Technical Features

### Sleeper API Integration
- **Real-time Statistics**: Current week and season player performance data
- **Fantasy Scoring**: Standard fantasy football point calculations
- **Smart Caching**: 15-minute cache expiry for optimal performance
- **Graceful Fallbacks**: Seamless experience when API is unavailable
- **Player Matching**: Intelligent cross-reference between local and API data

### NFLverse Integration
- **Smart Image Loading**: Attempts to load real player headshots from ESPN
- **Professional Fallbacks**: Custom-generated circular player images with initials, numbers, and positions
- **Enhanced Player Data**: Rich trivia highlighting player backgrounds and achievements

### Modern Design
- **Steelers Colors**: Authentic black, gold, white, and grey theme
- **Clean Typography**: Sans-serif fonts for excellent readability
- **Responsive Layout**: Fixed score display, centered questions, focused input
- **Smooth Navigation**: Bottom-fixed menu button for seamless mode switching

### Local Storage Features
- **Persistent Leaderboard**: Top scores saved locally across sessions
- **Mode Tracking**: Leaderboard shows which game mode generated each score
- **Accuracy Metrics**: Detailed performance tracking with percentages

## Deployment

This game is ready for GitHub Pages deployment:

1. Enable GitHub Pages in repository settings
2. Set source to main branch
3. Access at `https://[username].github.io/[repository-name]`

## Technical Architecture

- **Pure Client-Side**: HTML, CSS, and JavaScript with no server dependencies
- **Modular Design**: Separate files for player data, NFLverse integration, Sleeper API, and game logic
- **API Integration**: Real-time data from Sleeper fantasy football platform
- **Offline Capable**: Works without internet after initial load (fallback mode)
- **Cross-Platform**: Compatible with all modern browsers and mobile devices

## Player Data Sources

The game combines multiple data sources for comprehensive coverage:
- Current roster information with 2025 season updates
- Historical player data with franchise legends
- New player focus highlighting recent acquisitions and draft picks
- Real-time fantasy statistics from Sleeper API
- Enhanced with NFLverse capabilities for real player images when available

*Note: Player images attempt to load from official sources with intelligent fallbacks to ensure consistent functionality across all network conditions. Fantasy data is sourced from Sleeper API with graceful degradation when unavailable.*
