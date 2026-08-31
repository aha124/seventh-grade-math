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
    title: "Mean, median, mode, and range",
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
  }
];
