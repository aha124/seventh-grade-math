/* The prize counter's stock. Loaded by shop.html with a plain <script src>.

   id       short, stable, used in the redemption record the grown-ups page shows
   name     what the card says
   cost     tokens
   icon     an emoji shown in the card's picture slot until there is a photo,
            and in the confirm sheet either way
   photo    optional; a path relative to the repo root, like "shop-img/x.jpg".
            When present it fills the picture slot in place of the icon and
            nothing about the card layout changes. Photos live in shop-img/,
            cropped square around the item at 800px with all metadata stripped
   visible  false keeps the item off the shop page. Flip to true to stock it

   To check the page end to end with a cheap item, add a temporary
   1 token entry here and take it out again before committing. */

const SHOP_ITEMS = [
  { id: 'nice-cube',        name: 'Nice Cube squish toy',                 cost: 25,  icon: '\u{1F9CA}', photo: 'shop-img/nice-cube-squish.jpg',              visible: true },
  { id: 'soot-ball',        name: 'Soot-ball squishy',                    cost: 35,  icon: '\u{26AB}',  photo: 'shop-img/soot-ball-squishy.jpg',             visible: true },
  { id: 'card-ice-rink',    name: 'Skater trading card, ice rink',        cost: 60,  icon: '\u{26F8}',  photo: 'shop-img/skater-card-ice-rink.jpg',          visible: true },
  { id: 'card-colosseum',   name: 'Skater trading card, colosseum',       cost: 75,  icon: '\u{26F8}',  photo: 'shop-img/skater-card-colosseum.jpg',         visible: true },
  { id: 'card-pride',       name: 'Skater insert card, For Pride & Country', cost: 90, icon: '\u{1F3C5}', photo: 'shop-img/skater-insert-pride-country.jpg', visible: true },
  { id: 'card-blizzard',    name: 'Skater insert card, Winter Blizzard',  cost: 90,  icon: '\u{2744}',  photo: 'shop-img/skater-insert-winter-blizzard.jpg', visible: true },
  { id: 'card-gold-medal',  name: 'Skater gold-medal moment card',        cost: 150, icon: '\u{1F947}', photo: 'shop-img/skater-card-gold-medal.jpg',        visible: true },
  { id: 'collage-tee',      name: 'Purple skater-collage t-shirt',         cost: 120, icon: '\u{1F455}', photo: 'shop-img/skater-collage-tee-purple.jpg',    visible: true }
];
