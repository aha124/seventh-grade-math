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

const LESSONS = [
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
