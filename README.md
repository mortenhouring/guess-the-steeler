# Guess the Steeler

A comprehensive web-based trivia game designed for mobile devices that tests your knowledge of Pittsburgh Steelers players across different eras and contexts.

## Game Features

### Multiple Game Modes
- **Current Roster Mode**: Current roster players with real-time trivia
- **Legacy Mode**: Legendary Steelers throughout franchise history
- **New Player Mode**: Focus on players who joined this season
- **Leaderboard**: Track top scores across all game modes

### Enhanced Player Experience
- **Smart Image System**: NFLverse integration with fallback to professional-quality generated player images
- **Score Tracking**: Persistent leaderboard with top 3 scores stored locally
- **Mobile Optimized**: Designed specifically for iPhone and mobile screens
- **Steelers Theme**: Authentic black and gold color scheme
- **Header Navigation**: Convenient menu button positioned next to the title for easy access

### Game Mechanics
- **Two Question Types**: "What number does [player] wear?" and "Who wears jersey number [number]?"
- **Intelligent Fallbacks**: Seamless experience even with network limitations
- **Header Navigation**: Easy mode switching with header-integrated menu button
- **Progress Tracking**: Live score counter and accuracy percentage

## How to Play

1. **Choose Your Mode**: Select from Classic, Legacy, New Player, or view the Leaderboard
2. **Answer Questions**: Type player names or jersey numbers
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

## Technical Features

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
- **Modular Design**: Separate files for player data, NFLverse integration, and game logic
- **Offline Capable**: Works without internet after initial load
- **Cross-Platform**: Compatible with all modern browsers and mobile devices

## Player Data Sources

The game combines multiple data sources for comprehensive coverage:
- Current roster information with 2024 season updates
- Historical player data with franchise legends
- New player focus highlighting recent acquisitions and draft picks
- Enhanced with NFLverse capabilities for real player images when available

*Note: Player images attempt to load from official sources with intelligent fallbacks to ensure consistent functionality across all network conditions.*
