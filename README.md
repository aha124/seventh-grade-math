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
index.html               hub; lists the tools and links to them
lessons/mmmr-cards.html  guided card sorting for mean, median, mode, range
practice/mmmr.html       generated practice problems with hints and checking
shared/style.css         design tokens and the components both pages share
vercel.json              cleanUrls, so /practice/mmmr resolves
```

`shared/style.css` holds the palette and type tokens, the base reset, the
navy masthead, the sorting rail and card with all of its drag states, the
`.btn` family, and the focus ring. Anything only one page uses stays in a
`<style>` block in that page.

Card geometry is exposed as custom properties (`--card-w`, `--card-h`,
`--rail-min-height`, and friends) and each page sets its own values. The
drag code measures one slot width from the gap between the first two
cards, so a row of cards must never wrap to a second line. If a page shows
more cards, tighten those clamps rather than letting the rail wrap.

## Adding a practice page

1. Copy `practice/mmmr.html` to `practice/<topic>.html`. It is the closest
   thing to a template: problem generator, answer sheet, hints, and saved
   progress are all in one file.
2. Keep the `<link rel="stylesheet" href="../shared/style.css">` and the
   `:root` block of card geometry. Adjust the clamps if the new page shows
   a different number of cards, and check at a 375px-wide viewport that a
   full row still fits on one line.
3. If the page saves progress, give it its own key under the same
   namespace (`seventh-grade-math:<topic>`), and keep every localStorage
   call inside a `try`/`catch` so the page still works with storage off.
4. Add a tile to the list in `index.html`. Name it for what she does on
   the page, not for a lesson number. The grid fills as many columns as
   fit, so a new tile needs no layout change.
5. Reopen both `index.html` and the new page from the filesystem before
   committing, to confirm nothing depended on being served.
