/* The prize counter's stock. Loaded by shop.html with a plain <script src>.

   id       short, stable, used in the redemption record the grown-ups page shows
   name     what the card says
   cost     tokens
   icon     an emoji shown in the card's picture slot until there is a photo
   photo    optional; a path relative to the repo root, like "shop/squish.jpg".
            When present it fills the picture slot in place of the icon and
            nothing about the card layout changes
   visible  false keeps the item off the shop page. Flip to true to stock it

   The one visible item is a 1 token test item so the page can be seen
   working end to end. Set it to visible: false once the real items are on. */

const SHOP_ITEMS = [
  { id: 'test-item',   name: 'Test item (for checking the shop)', cost: 1,   icon: '\u{1F9EA}', visible: true },
  { id: 'sticker',     name: 'A sticker',                          cost: 15,  icon: '⭐',     visible: false },
  { id: 'gum',         name: 'A pack of gum',                      cost: 25,  icon: '\u{1F36C}', visible: false },
  { id: 'pick-dinner', name: 'Pick what’s for dinner',        cost: 40,  icon: '\u{1F35D}', visible: false },
  { id: 'movie-night', name: 'Movie night, your pick',             cost: 60,  icon: '\u{1F3AC}', visible: false },
  { id: 'stay-up',     name: 'Stay up an extra hour',              cost: 90,  icon: '\u{1F319}', visible: false },
  { id: 'big-squish',  name: 'The big squish',                     cost: 150, icon: '\u{1F9F8}', visible: false }
];
