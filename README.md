# Seventh Grade Math

A small set of self-contained math practice pages for a seventh grader.
Plain HTML, CSS, and vanilla JavaScript. No framework, no build step, no
npm, no bundler. Deployed as a static site on Vercel.

## Ground rule: nothing identifying

This repository is public. No file, filename, page, commit message, or
comment may contain a student name, a school, a town, a team or club, or
anything else that identifies a real person. Word problems use generic
framing: "a baseball team", "the last 7 quizzes". Keep it that way when
you edit or add anything.

## Running it locally

Open the file. Double-click `index.html`, or drag it into a browser.
There is no server, no install step, and no command to run. Every page
works the same way from the filesystem as it does when deployed, which
is why stylesheet links are written relative to the page's own folder
(`shared/style.css` from the root, `../shared/style.css` one level down)
rather than as `/shared/style.css`.

The only thing that needs a network is the Google Fonts link in each
page's `<head>`. Offline, the pages fall back to condensed and sans-serif
system faces and everything still works.

## Layout

```
index.html               hub; builds its list from site.js at load
site.js                  the registry: every lesson, its five days, and their pages
lesson-01/cards.html     guided card sorting for mean, median, mode, range
lesson-01/practice.html  generated practice problems with hints and checking
lesson-01/exponents.html an exponent to build a tile at a time, not graded
lesson-01/exponents-practice.html   graded powers drill, three modes
lesson-01/order-lesson.html         order of operations, three worked examples
lesson-01/order-practice.html       graded order of operations, two modes
shared/style.css         design tokens and the components every page shares
vercel.json              cleanUrls, so /lesson-01/practice resolves
```

`shared/style.css` holds the palette and type tokens, the base reset, the
navy masthead and its back link, the sorting rail and card with all of its
drag states, the `.btn` family, and the focus ring. Anything only one page
uses stays in a `<style>` block in that page.

Card geometry is exposed as custom properties (`--card-w`, `--card-h`,
`--rail-min-height`, and friends) and each page sets its own values. The
drag code measures one slot width from the gap between the first two
cards, so a row of cards must never wrap to a second line. If a page shows
more cards, tighten those clamps rather than letting the rail wrap.

## Adding a page

One folder per lesson, and one entry in `site.js`. There is no markup to
edit: `index.html` renders whatever is in that array.

1. Make the folder if it is new: `lesson-02/`, `lesson-03/`, and so on.
   Everything for one lesson lives together.
2. Copy `lesson-01/practice.html` (or `cards.html`) into it as a starting
   point. Each is self-contained: problem generator, answer sheet, hints,
   and saved progress are all in the one file.
3. Keep `<link rel="stylesheet" href="../shared/style.css">` and the
   `.board-nav` back link at the top of the masthead. Both assume the page
   is one folder deep; a page nested deeper needs another `../` on each.
4. Keep the `:root` block of card geometry if the page sorts cards.
   Adjust the clamps if it shows a different number of them, and check at
   a 375px-wide viewport that a full row still fits on one line.
5. If the page saves progress, give it its own key under the same
   namespace (`seventh-grade-math:<name>`), and keep every localStorage
   call inside a `try`/`catch` so the page still works with storage off.
6. Register it in `site.js`. Every lesson is five days (three teaching
   days, a review day, a test day) and each day has its own `pages`
   array, so add the page to the day it belongs to. A new lesson is a
   new `{ n, title, days }` object with all five days written out; a day
   with no pages carries a `note` instead, and the hub shows that note
   in the row. Lesson order does not matter; the hub sorts on `n` and
   shows the newest lesson first.
7. Open `index.html` from the filesystem, click into the new page, and
   click the back link to make sure the relative paths are right.
