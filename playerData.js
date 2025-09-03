// Player data for different game modes

const PlayerData = {
    // Current roster - Current Roster Mode (2025 season)
    classic: [
        {
            name: "Russell Wilson",
            number: 3,
            position: "QB",
            trivia: "Super Bowl champion quarterback bringing veteran leadership to Pittsburgh after successful stint with Denver."
        },
        {
            name: "Justin Fields",
            number: 2,
            position: "QB",
            trivia: "Former Chicago Bears quarterback with exceptional mobility, providing dynamic depth behind Wilson."
        },
        {
            name: "Najee Harris",
            number: 22,
            position: "RB",
            trivia: "Alabama product and first-round pick, the workhorse back known for his powerful running style and receiving ability."
        },
        {
            name: "Jaylen Warren",
            number: 30,
            position: "RB",
            trivia: "Undrafted free agent from Oklahoma State who earned a roster spot with his versatility and pass-catching skills."
        },
        {
            name: "T.J. Watt",
            number: 90,
            position: "LB",
            trivia: "Defensive Player of the Year winner and brother of NFL star J.J. Watt, elite pass rusher."
        },
        {
            name: "Alex Highsmith",
            number: 56,
            position: "LB",
            trivia: "Charlotte product who developed into a premier pass rusher opposite T.J. Watt in the Steel Curtain defense."
        },
        {
            name: "Payton Wilson",
            number: 51,
            position: "LB",
            trivia: "Third-round rookie linebacker from NC State, ACC Defensive Player of the Year in 2023."
        },
        {
            name: "Minkah Fitzpatrick",
            number: 39,
            position: "S",
            trivia: "All-Pro safety acquired from Miami, known for his game-changing interceptions and versatility."
        },
        {
            name: "Cam Heyward",
            number: 97,
            position: "DT",
            trivia: "Team captain and defensive anchor, son of former NFL player Craig 'Ironhead' Heyward."
        },
        {
            name: "George Pickens",
            number: 14,
            position: "WR",
            trivia: "Georgia standout known for spectacular catches and explosive speed downfield, emerging as WR1."
        },
        {
            name: "Calvin Austin III",
            number: 19,
            position: "WR",
            trivia: "Memphis speedster finally healthy after missing most of his first two seasons with injuries."
        },
        {
            name: "Roman Wilson",
            number: 84,
            position: "WR",
            trivia: "Third-round rookie from Michigan who won the national championship with the Wolverines in 2023."
        },
        {
            name: "Pat Freiermuth",
            number: 88,
            position: "TE",
            trivia: "Penn State tight end known as 'The Muth', excellent red zone target and reliable receiver."
        },
        {
            name: "Broderick Jones",
            number: 76,
            position: "OT",
            trivia: "Georgia offensive tackle and first-round pick protecting the quarterback's blind side."
        },
        {
            name: "Troy Fautanu",
            number: 73,
            position: "OT",
            trivia: "First-round pick from Washington, versatile lineman who can play both tackle positions."
        },
        {
            name: "Zach Frazier",
            number: 54,
            position: "C",
            trivia: "Second-round center from West Virginia, in-state product expected to anchor the offensive line."
        },
        {
            name: "Joey Porter Jr.",
            number: 24,
            position: "CB",
            trivia: "Son of former Steelers linebacker Joey Porter, following in his father's footsteps with lockdown coverage."
        },
        {
            name: "Donte Jackson",
            number: 26,
            position: "CB",
            trivia: "Veteran cornerback acquired from Carolina, bringing speed and experience to the secondary."
        },
        {
            name: "Isaac Seumalo",
            number: 56,
            position: "G",
            trivia: "Veteran guard signed from Philadelphia Eagles, providing experience and stability to the offensive line."
        },
        {
            name: "Cameron Johnston",
            number: 6,
            position: "P",
            trivia: "Australian punter with exceptional leg strength, key special teams contributor."
        },
        {
            name: "Chris Boswell",
            number: 9,
            position: "K",
            trivia: "Veteran kicker known for his accuracy and clutch performances in playoff games."
        }
    ],

    // Legendary Steelers - legacy mode
    legacy: [
        {
            name: "Terry Bradshaw",
            number: 12,
            position: "QB",
            trivia: "Four-time Super Bowl champion quarterback, Hall of Famer who led the Steel Curtain dynasty of the 1970s."
        },
        {
            name: "Franco Harris",
            number: 32,
            position: "RB",
            trivia: "Made the legendary 'Immaculate Reception' in 1972, first Steelers player to rush for 1,000 yards."
        },
        {
            name: "Lynn Swann",
            number: 88,
            position: "WR",
            trivia: "Hall of Fame receiver known for acrobatic catches, Super Bowl X MVP with four championship rings."
        },
        {
            name: "John Stallworth",
            number: 82,
            position: "WR",
            trivia: "Hall of Fame receiver and four-time Super Bowl champion, known for clutch playoff performances."
        },
        {
            name: "Joe Greene",
            number: 75,
            position: "DT",
            trivia: "'Mean Joe Greene' - the anchor of the Steel Curtain defense, 4-time Super Bowl champion and Hall of Famer."
        },
        {
            name: "Jack Lambert",
            number: 58,
            position: "LB",
            trivia: "Fierce middle linebacker of the Steel Curtain, Hall of Famer known for his intimidating presence."
        },
        {
            name: "Jack Ham",
            number: 59,
            position: "LB",
            trivia: "Hall of Fame outside linebacker, considered one of the greatest defenders in NFL history."
        },
        {
            name: "Mel Blount",
            number: 47,
            position: "CB",
            trivia: "Hall of Fame cornerback so dominant that the 'Mel Blount Rule' was created to limit contact downfield."
        },
        {
            name: "Ben Roethlisberger",
            number: 7,
            position: "QB",
            trivia: "'Big Ben' - two-time Super Bowl champion quarterback, known for his size and clutch performances."
        },
        {
            name: "Troy Polamalu",
            number: 43,
            position: "S",
            trivia: "Hall of Fame safety with flowing hair and incredible instincts, Defensive Player of the Year in 2010."
        },
        {
            name: "Hines Ward",
            number: 86,
            position: "WR",
            trivia: "Super Bowl XL MVP receiver known for his smile and crushing blocks, beloved team leader."
        },
        {
            name: "Jerome Bettis",
            number: 36,
            position: "RB",
            trivia: "'The Bus' - Hall of Fame running back who helped deliver Super Bowl XL to his hometown Pittsburgh."
        }
    ],

    // New players for 2025 season
    newPlayers: [
        {
            name: "Russell Wilson",
            number: 3,
            position: "QB",
            trivia: "Former Denver Broncos and Seattle Seahawks QB. Super Bowl XLVIII champion with 9 Pro Bowl selections. Brought veteran leadership to Pittsburgh."
        },
        {
            name: "Justin Fields",
            number: 2,
            position: "QB",
            trivia: "Former Chicago Bears quarterback acquired via trade. Ohio State product known for his mobility and big arm. 3 years NFL experience."
        },
        {
            name: "Calvin Austin III",
            number: 19,
            position: "WR",
            trivia: "Memphis speedster finally healthy after missing most of 2022-2023 seasons with injuries. Expected to contribute as slot receiver and returner."
        },
        {
            name: "Roman Wilson",
            number: 84,
            position: "WR",
            trivia: "Third-round rookie from Michigan. Won College Football Playoff National Championship with the Wolverines in 2023."
        },
        {
            name: "Troy Fautanu",
            number: 73,
            position: "OT",
            trivia: "First-round pick (20th overall) from Washington. Versatile offensive lineman who can play both tackle positions with excellent technique."
        },
        {
            name: "Zach Frazier",
            number: 54,
            position: "C",
            trivia: "Second-round center from West Virginia. In-state product expected to anchor the offensive line for years to come."
        },
        {
            name: "Payton Wilson",
            number: 51,
            position: "LB",
            trivia: "Third-round linebacker from NC State. 2023 ACC Defensive Player of the Year with exceptional instincts and coverage skills."
        },
        {
            name: "Logan Lee",
            number: 92,
            position: "DT",
            trivia: "Sixth-round defensive tackle from Iowa. Part of a dominant Hawkeyes defensive line that led the nation in several categories."
        },
        {
            name: "Ryan McCollum",
            number: 71,
            position: "C/G",
            trivia: "Seventh-round offensive lineman from Texas. Versatile interior player who can contribute at both center and guard positions."
        },
        {
            name: "Donte Jackson",
            number: 26,
            position: "CB",
            trivia: "Veteran cornerback acquired from Carolina Panthers. Brings speed (4.32 40-yard dash) and experience to strengthen the secondary."
        },
        {
            name: "Cameron Johnston",
            number: 6,
            position: "P",
            trivia: "Australian punter signed from Houston Texans. Known for his powerful leg and ability to flip field position effectively."
        },
        {
            name: "Ben Skowronek",
            number: 82,
            position: "WR",
            trivia: "Notre Dame product claimed off waivers from Los Angeles Rams. Special teams contributor with receiving upside."
        }
    ]
};