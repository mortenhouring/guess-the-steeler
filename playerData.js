// Player data for different game modes

const PlayerData = {
    // Current roster - classic mode
    classic: [
        {
            name: "Russell Wilson",
            number: 3,
            position: "QB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3ER. Wilson%0A%233%3C/text%3E%3C/svg%3E",
            trivia: "Super Bowl champion quarterback bringing veteran leadership to Pittsburgh."
        },
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
            name: "Arthur Smith",
            number: 35,
            position: "FB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EA. Smith%0A%2335%3C/text%3E%3C/svg%3E",
            trivia: "Fullback who excels in short-yardage situations and goal-line packages."
        }
    ],

    // Legendary Steelers - legacy mode
    legacy: [
        {
            name: "Terry Bradshaw",
            number: 12,
            position: "QB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3ET. Bradshaw%0A%2312%3C/text%3E%3C/svg%3E",
            trivia: "Four-time Super Bowl champion quarterback, Hall of Famer who led the Steel Curtain dynasty of the 1970s."
        },
        {
            name: "Franco Harris",
            number: 32,
            position: "RB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EF. Harris%0A%2332%3C/text%3E%3C/svg%3E",
            trivia: "Made the legendary 'Immaculate Reception' in 1972, first Steelers player to rush for 1,000 yards."
        },
        {
            name: "Lynn Swann",
            number: 88,
            position: "WR",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23000'%3EL. Swann%0A%2388%3C/text%3E%3C/svg%3E",
            trivia: "Hall of Fame receiver known for acrobatic catches, Super Bowl X MVP with four championship rings."
        },
        {
            name: "John Stallworth",
            number: 82,
            position: "WR",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23000'%3EJ. Stallworth%0A%2382%3C/text%3E%3C/svg%3E",
            trivia: "Hall of Fame receiver and four-time Super Bowl champion, known for clutch playoff performances."
        },
        {
            name: "Joe Greene",
            number: 75,
            position: "DT",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EJ. Greene%0A%2375%3C/text%3E%3C/svg%3E",
            trivia: "'Mean Joe Greene' - the anchor of the Steel Curtain defense, 4-time Super Bowl champion and Hall of Famer."
        },
        {
            name: "Jack Lambert",
            number: 58,
            position: "LB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EJ. Lambert%0A%2358%3C/text%3E%3C/svg%3E",
            trivia: "Fierce middle linebacker of the Steel Curtain, Hall of Famer known for his intimidating presence."
        },
        {
            name: "Jack Ham",
            number: 59,
            position: "LB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23000'%3EJ. Ham%0A%2359%3C/text%3E%3C/svg%3E",
            trivia: "Hall of Fame outside linebacker, considered one of the greatest defenders in NFL history."
        },
        {
            name: "Mel Blount",
            number: 47,
            position: "CB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EM. Blount%0A%2347%3C/text%3E%3C/svg%3E",
            trivia: "Hall of Fame cornerback so dominant that the 'Mel Blount Rule' was created to limit contact downfield."
        },
        {
            name: "Ben Roethlisberger",
            number: 7,
            position: "QB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23000'%3EB. Roethlisberger%0A%237%3C/text%3E%3C/svg%3E",
            trivia: "'Big Ben' - two-time Super Bowl champion quarterback, known for his size and clutch performances."
        },
        {
            name: "Troy Polamalu",
            number: 43,
            position: "S",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3ET. Polamalu%0A%2343%3C/text%3E%3C/svg%3E",
            trivia: "Hall of Fame safety with flowing hair and incredible instincts, Defensive Player of the Year in 2010."
        },
        {
            name: "Hines Ward",
            number: 86,
            position: "WR",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EH. Ward%0A%2386%3C/text%3E%3C/svg%3E",
            trivia: "Super Bowl XL MVP receiver known for his smile and crushing blocks, beloved team leader."
        },
        {
            name: "Jerome Bettis",
            number: 36,
            position: "RB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EJ. Bettis%0A%2336%3C/text%3E%3C/svg%3E",
            trivia: "'The Bus' - Hall of Fame running back who helped deliver Super Bowl XL to his hometown Pittsburgh."
        }
    ],

    // New players for 2024 season
    newPlayers: [
        {
            name: "Russell Wilson",
            number: 3,
            position: "QB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3ER. Wilson%0A%233%3C/text%3E%3C/svg%3E",
            trivia: "Former Denver Broncos and Seattle Seahawks QB. Super Bowl champion with 9 Pro Bowl selections. Graduated from Wisconsin."
        },
        {
            name: "Justin Fields",
            number: 2,
            position: "QB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EJ. Fields%0A%232%3C/text%3E%3C/svg%3E",
            trivia: "Former Chicago Bears quarterback. Ohio State product known for his mobility and big arm. 3 years NFL experience."
        },
        {
            name: "Calvin Austin III",
            number: 19,
            position: "WR",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23000'%3EC. Austin III%0A%2319%3C/text%3E%3C/svg%3E",
            trivia: "Memphis speedster returning from injury. 4th round pick in 2022, missed most of his first two seasons."
        },
        {
            name: "Roman Wilson",
            number: 84,
            position: "WR",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3ER. Wilson%0A%2384%3C/text%3E%3C/svg%3E",
            trivia: "Third-round rookie from Michigan. Won national championship with the Wolverines in 2023."
        },
        {
            name: "Troy Fautanu",
            number: 73,
            position: "OT",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3ET. Fautanu%0A%2373%3C/text%3E%3C/svg%3E",
            trivia: "First-round pick from Washington. Versatile lineman who can play both tackle positions."
        },
        {
            name: "Zach Frazier",
            number: 54,
            position: "C",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EZ. Frazier%0A%2354%3C/text%3E%3C/svg%3E",
            trivia: "Second-round center from West Virginia. In-state product expected to anchor the offensive line."
        },
        {
            name: "Payton Wilson",
            number: 51,
            position: "LB",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='11' fill='%23000'%3EP. Wilson%0A%2351%3C/text%3E%3C/svg%3E",
            trivia: "Third-round linebacker from NC State. ACC Defensive Player of the Year in 2023."
        },
        {
            name: "Logan Lee",
            number: 92,
            position: "DT",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23FFB612'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23000'%3EL. Lee%0A%2392%3C/text%3E%3C/svg%3E",
            trivia: "Sixth-round defensive tackle from Iowa. Part of a dominant Hawkeyes defensive line."
        }
    ]
};