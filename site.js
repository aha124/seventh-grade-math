/* The site index.
   Adding a page is one entry here plus the file itself. Nothing else in
   the repo needs to change: index.html builds its whole list from this
   array at load. Loaded with a plain <script src>, not a module, because
   ES modules are blocked when a page is opened straight from disk.

   Every lesson runs the same five-day arc: three teaching days, a review
   day, then the test. A lesson is therefore a list of days, and each day
   carries the pages that belong to it. The hub draws all five rows even
   when a day has no pages, so the shape of the week is always visible.

   n      lesson number; index.html sorts on it and shows newest first,
          so entries can be appended here in whatever order is convenient
   title  what the lesson is about, in plain words
   days   five entries, one per school day, in order
     d      day number, 1 to 5
     name   what that day is about; the row label on the hub
     pages  the pages for that day, in the order she should meet them.
            May be empty
     note   optional; shown in the row where the tiles would go, or above
            the tiles when the day has pages too. Use it so a row can
            say what happens that day, or in what order
   Each page:
     href   relative to the repo root
     name   the tile title
     blurb  one or two sentences under it
     cta    optional; the link text. Defaults to "Open" */

/* The daily warm-ups: a short strip pinned above the lessons on the
   hub. Each is one line. An entry with an href is a link, and the href
   may carry #tab=<mode> so the practice page opens on that tab. An
   entry without an href is an off-screen job and shows its text.
   DICE_VERSION is the version of the dice game in play right now; bump
   it when the game changes and add the new version's line to
   DICE_GAMES. */
const DICE_VERSION = 2;
const DICE_GAMES = {
  1: "roll two fractions and add them",
  2: "roll two fractions and multiply them in your head, lowest terms"
};
const WARMUPS = [
  { name: "Exponents speed round", href: "lesson-01/exponents-practice.html#tab=speed",
    text: "45 seconds on the nine powers worth knowing cold." },
  { name: "LCD Match it", href: "lesson-02/fractions-practice.html#tab=match",
    text: "60 seconds of just the bottoms." },
  { name: "Change round", href: "lesson-05/line-up.html#tab=change",
    text: "60 seconds of making change, counting up from the price." },
  { name: "Percent round", href: "lesson-07/percents.html#tab=round",
    text: "60 seconds of decimals to percents and back." },
  { name: "Tip round", href: "lesson-08/part-whole.html#tab=tips",
    text: "60 seconds of tips in your head: 10%, then double, halve, or add half." },
  { name: "Dice game", version: DICE_VERSION,
    text: "grab the dice: " + (DICE_GAMES[DICE_VERSION] || "") + "." }
];

const LESSONS = [
  {
    n: 8,
    title: "Converting between fractions, decimals, and percentages; square roots",
    days: [
      {
        d: 1,
        name: "Fractions, decimals, and percents",
        note: "Whiteboard first. Afterward, any tab of Three Ways.",
        pages: [
          {
            href: "lesson-08/three-ways.html",
            name: "Three Ways",
            blurb: "Fraction to decimal by dividing, fraction to percent, and decimals or percents back to fractions in lowest terms. Some decimals repeat. Or run the 60 second Benchmark round.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 2,
        name: "Percent word problems",
        note: "Whiteboard first. Afterward, Part of the Whole, and a Tip round.",
        pages: [
          {
            href: "lesson-08/part-whole.html",
            name: "Part of the Whole",
            blurb: "Find the percent (part over whole) or find the part (percent times the number). Mixed makes you decide which. Or the 60 second Tip round.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 3,
        name: "Square roots",
        note: "Whiteboard first. Afterward, Square Roots: perfect squares, then guess and check.",
        pages: [
          {
            href: "lesson-08/roots.html",
            name: "Square Roots",
            blurb: "Perfect squares on sight, then guess and check for the big ones: guess, square it, go higher or lower. Or the 60 second Squares round.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 4,
        name: "Review day",
        pages: [],
        note: "Workbook day: the Skills Check. Mixed on Part of the Whole and To a fraction on Three Ways make good warm-ups."
      },
      {
        d: 5,
        name: "Test day",
        pages: [],
        note: "The test is on paper. Part over whole, then divide. Every fraction in lowest terms."
      }
    ]
  },
  {
    n: 7,
    title: "Percentages; simple and compound interest",
    days: [
      {
        d: 1,
        name: "Percents: move the point, convert, percent of",
        note: "Whiteboard first. Afterward, any tab of Percent Of for extra practice.",
        pages: [
          {
            href: "lesson-07/percents.html",
            name: "Percent Of",
            blurb: "Move the point for 10, 100, and 1,000. Turn percents into decimals and back. Find a percent of a number, then word problems: sales, tax, tips. Or run the 60 second Percent round.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 2,
        name: "Simple and compound interest",
        note: "Whiteboard first. Afterward, Simple and Compound on the interest page. Word problems on Percent Of make good review too.",
        pages: [
          {
            href: "lesson-07/interest.html",
            name: "Simple & Compound",
            blurb: "Simple interest: one year, times the years. Compound: fill in the table a year at a time, and see how much more it earns. Or the 60 second round of one-year interest in your head.",
            cta: "Start practicing"
          },
          {
            href: "lesson-07/percents.html#tab=words",
            name: "Percent word problems",
            blurb: "Sales, tax, tips, and a share of a group. Read what the question asks for.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 3,
        name: "Test day",
        pages: [],
        note: "The test is on paper. Percent to decimal first. Simple interest stays on the original principal; compound adds each year's interest before the next."
      }
    ]
  },
  {
    n: 5,
    title: "Adding, subtracting, and multiplying decimals",
    days: [
      {
        d: 1,
        name: "Place value, words, fractions, and comparing",
        note: "Coin warm-up first. Then the workbook, New Skills Practice 1 to 16. Then Place Value, any tab.",
        pages: [
          {
            href: "lesson-05/place-value.html",
            name: "Place value",
            blurb: "Read a decimal in words, write words or a fraction over 10, 100, or 1,000 as a decimal, and turn a decimal into a fraction in lowest terms. Or run the 60 second round: two decimals, tap <, =, or >.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 2,
        name: "Adding and subtracting decimals",
        note: "Coin warm-up: how much to the next dollar. Workbook 17 to 24. Then Line them up on Add and subtract, and one Change round to finish.",
        pages: [
          {
            href: "lesson-05/line-up.html",
            name: "Line them up",
            blurb: "Generated add and subtract problems, graded and never answered for you. Stack it shows the problem with the points in one column and the added zeros in gold. If your digits were lined up on the right instead of at the point, it says so. Or run the 60 second change round.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 3,
        name: "Multiplying decimals",
        note: "You did this in lesson 2. Warm up with one Place the point round, then the workbook, 25 to 28. Then Line them up on Mixed, where you have to decide: line up the points, or count the places?",
        pages: [
          {
            href: "lesson-02/decimal-practice.html#tab=place",
            name: "Point placement (from lesson 2)",
            blurb: "The 60 second round: the digits are multiplied already, you tap where the point goes.",
            cta: "Start the round"
          },
          {
            href: "lesson-05/line-up.html#tab=mixed",
            name: "Line them up: Mixed",
            blurb: "Adding, subtracting, and multiplying, shuffled. Multiplying has its own named mistake: dropping the end zero before placing the point.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 4,
        name: "Review day",
        pages: [],
        note: "Workbook day: the Skills Check, then the review sheet. The Compare round and the Mixed tab make good warm-ups."
      },
      {
        d: 5,
        name: "Test day",
        pages: [],
        note: "The test is on paper. Line up the points to add and subtract. Count the places to multiply. Every fraction in lowest terms."
      }
    ]
  },
  {
    n: 3,
    title: "Multiplying and dividing fractions and mixed numbers",
    days: [
      {
        d: 1,
        name: "Multiplying and dividing fractions",
        note: "Dice warm-up, Version 2: roll for two fractions, multiply them in your head, and say the answer in lowest terms. Then Of means multiply, all five in order, then Straight across.",
        pages: [
          {
            href: "lesson-03/area.html",
            name: "Of means multiply",
            blurb: "A unit square. Shade three quarters in stripes one way, two thirds of that the other way, and the double-shaded cells are the answer. Five walkthroughs: the grid, canceling, whole numbers, why division flips, and mixed numbers.",
            cta: "Start shading"
          },
          {
            href: "lesson-03/multiply-practice.html",
            name: "Straight across",
            blurb: "Generated multiply and divide problems, graded in lowest terms and never answered for you. The four classic mistakes get named. Or run the 60 second round where all you do is spot what cancels.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 2,
        name: "Why the flip works; fraction bars",
        pages: [
          {
            href: "lesson-03/flip.html",
            name: "The flip, proven",
            blurb: "Three short acts: a number times its reciprocal is 1; a division written as a fraction over a fraction, with the bottom erased by its reciprocal; then your turn to pick the right one. Not graded.",
            cta: "Start the proof"
          },
          {
            href: "lesson-03/bar-practice.html",
            name: "The invisible parentheses",
            blurb: "Order of operations with a fraction bar in the expression. Tap what goes next; the top and bottom of the bar come before anything outside, and the bar turns into a fraction. Or run the 45 second reciprocal round.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 3,
        name: "Coming up",
        pages: [],
        note: "Nothing on the site yet. Register the pages here when they exist."
      },
      {
        d: 4,
        name: "Review day",
        pages: [],
        note: "Workbook day. Any practice page from this week for a refresher."
      },
      {
        d: 5,
        name: "Test day",
        pages: [],
        note: "The test is on paper. Improper before multiplying, flip the second before dividing, lowest terms at the end."
      }
    ]
  },
  {
    n: 1,
    title: "Mean, median, mode, and range; exponents; order of operations",
    days: [
      {
        d: 1,
        name: "Mean, median, mode, and range",
        pages: [
          {
            href: "lesson-01/cards.html",
            name: "Sort the cards",
            blurb: "Drag a set of numbers into order, then tap a button to see where the mean, median, mode, and range actually come from.",
            cta: "Start sorting"
          },
          {
            href: "lesson-01/practice.html",
            name: "Practice on your own",
            blurb: "A new problem whenever you want one. Type your four answers and it tells you which ones are right. Hints are there if you get stuck.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 2,
        name: "Exponents",
        pages: [
          {
            href: "lesson-01/exponents.html",
            name: "Build a power",
            blurb: "Tap the exponent up and a tile appears for every copy of the base. Squares and cubes get drawn as real dots, so the names make sense.",
            cta: "Start building"
          },
          {
            href: "lesson-01/exponents-practice.html",
            name: "Powers practice",
            blurb: "Work out powers, write them from a list of factors, or run the 45 second speed round on the nine worth knowing cold.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 3,
        name: "Order of operations",
        pages: [
          {
            href: "lesson-01/order-lesson.html",
            name: "One step at a time",
            blurb: "Three worked examples, one tap at a time. Choose the operation that goes next and watch that piece collapse into its value. A wrong tap says which rule you reached past.",
            cta: "Start stepping"
          },
          {
            href: "lesson-01/order-practice.html",
            name: "Your move",
            blurb: "Generated expressions, graded and never answered for you. Step one all the way through, or run the 60 second round where all you do is pick what goes next.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 4,
        name: "Review day",
        pages: [],
        note: "Workbook day. Use any practice page you want a refresher on."
      },
      {
        d: 5,
        name: "Test day",
        pages: [],
        note: "The test is on paper. Good luck."
      }
    ]
  },
  {
    n: 2,
    title: "Lowest common denominator; adding and subtracting fractions and mixed numbers",
    days: [
      {
        d: 1,
        name: "Adding and subtracting fractions and mixed numbers",
        pages: [
          {
            href: "lesson-02/bars.html",
            name: "Make them match",
            blurb: "Two fraction bars, one above the other. Split them until the cut lines line up, then watch the adding happen by counting. Five worked pairs, mixed numbers last.",
            cta: "Start matching"
          },
          {
            href: "lesson-02/fractions-practice.html",
            name: "Same language",
            blurb: "Generated add and subtract problems with scratch bars underneath, graded in lowest terms. Or run the 60 second round: two denominators, type the lowest common one.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 2,
        name: "On your own: multiplying decimals",
        note: "Today you work alone, so here is the order. Warm up with a round or two on day 1 if you want one. Then Move the point, all four problems. Then Point placement: ten problems in Multiply mode and one speed round. Then the workbook worksheets. The fraction pages from day 1 stay right above if you want a warm-up.",
        pages: [
          {
            href: "lesson-02/decimal-lesson.html",
            name: "Move the point",
            blurb: "A two-lane machine. Slide each point right until the numbers are whole, multiply, then slide it back left through the answer, one tap at a time. Four problems in order. Not graded.",
            cta: "Start sliding"
          },
          {
            href: "lesson-02/decimal-practice.html",
            name: "Point placement",
            blurb: "Generated decimal problems, graded and never answered for you. If your digits are right and only the point is off, it says so. Or run the 60 second round: the digits are done, you tap where the point goes.",
            cta: "Start practicing"
          }
        ]
      },
      {
        d: 3,
        name: "Coming up",
        pages: [],
        note: "Nothing on the site yet. Register the pages here when they exist."
      },
      {
        d: 4,
        name: "Review day",
        pages: [],
        note: "Workbook day. The Match it round on Same language makes a good two-minute warm-up."
      },
      {
        d: 5,
        name: "Test day",
        pages: [],
        note: "The test is on paper. Lowest terms and mixed numbers, every answer."
      }
    ]
  }
];

/* Anatomy: one body system a week, October to December. Same row shape
   as a math day (d, name, pages, note); the hub labels them "Week". */
const ANATOMY = [
  { d: 1, name: "The body's map", pages: [
      { href: "anatomy/week-01.html", name: "The Body's Map", blurb: "Which system does each organ belong to? Which level is it: cell, tissue, organ, system, or organism?", cta: "Start practicing" }
    ], note: "The lesson is on the board. The worksheets are on paper." },
  { d: 2, name: "Heart and blood", pages: [], note: "Coming up." },
  { d: 3, name: "Lungs and breathing", pages: [], note: "Coming up." },
  { d: 4, name: "Digestion", pages: [], note: "Coming up." },
  { d: 5, name: "Brain and nerves", pages: [], note: "Coming up." },
  { d: 6, name: "Hormones", pages: [], note: "Coming up." },
  { d: 7, name: "Bones and muscles", pages: [], note: "Coming up." },
  { d: 8, name: "Kidneys", pages: [], note: "Coming up." },
  { d: 9, name: "Immune system and skin", pages: [], note: "Coming up." },
  { d: 10, name: "Wrap-up", pages: [], note: "Put the whole body back together." }
];

/* Ghost Lab: the ghost detector build, one session every week or two.
   The hub labels these "Session". */
const GHOSTLAB = [
  { d: 1, name: "Volts, amps, and watts", pages: [], note: "Batteries, an LED, and why it needs a resistor." },
  { d: 2, name: "Breadboard circuits", pages: [], note: "Series, parallel, a button, a buzzer." },
  { d: 3, name: "Electricity makes magnetism", pages: [], note: "A nail electromagnet, and the hum in the walls." },
  { d: 4, name: "Soldering the EMF wand", pages: [], note: "Your first soldered circuit. It lights up near outlets." },
  { d: 5, name: "Raspberry Pi and Python", pages: [], note: "Blink an LED from code." },
  { d: 6, name: "Sensors and data", pages: [], note: "Temperature, humidity, motion, saved and graphed." },
  { d: 7, name: "The EMF meter", pages: [], note: "A coil, an amplifier, and a green-to-red LED bar." },
  { d: 8, name: "Seeing sound", pages: [], note: "A live spectrogram, and your own hearing range." },
  { d: 9, name: "The case", pages: [], note: "Design it, print it, put it all inside." },
  { d: 10, name: "Plan the hunt", pages: [], note: "Haunted spots, boring spots, and what counts as proof." },
  { d: 11, name: "The ghost hunt", pages: [], note: "Film it, then graph what the meter saw." }
];
