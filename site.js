/* The site index.
   Adding a page is one entry here plus the file itself. Nothing else in
   the repo needs to change: index.html builds its whole list from this
   array at load. Loaded with a plain <script src>, not a module, because
   ES modules are blocked when a page is opened straight from disk.

   n      lesson number; index.html sorts on it and shows newest first,
          so entries can be appended here in whatever order is convenient
   title  what the lesson is about, in plain words
   pages  one per file, in the order she should meet them
   href   relative to the repo root
   cta    optional; the link text. Defaults to "Open" */

const LESSONS = [
  {
    n: 1,
    title: "Mean, median, mode, range, and exponents",
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
      },
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
      },
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
  }
];
