/* Seventh Grade Math — fractions.
   Two things, loaded with a plain <script src> like tokens.js, because ES
   modules are blocked from a file:// page.

   window.Rational      exact fractions. Integers only, all the way down:
                        top and bottom are whole numbers, every operation
                        is integer arithmetic, and the only divisions are
                        by a number already known to go in evenly. Nothing
                        here ever holds a decimal. selfCheck() runs the
                        cases at the bottom and each page calls it at load.
   window.FractionInput a fraction entry control: a top box over a bottom
                        box with a real bar between them, and an optional
                        whole-number box to the left for mixed numbers.
                        Numeric keypad, 44px boxes, arrows and tab move
                        between boxes. It reports what was typed as
                        integers, unreduced, so a page can tell 2/4 from
                        1/2 and say something about it.

   Styles live in shared/style.css under "fraction input". */

(function(){
  'use strict';

  /* ---------------- exact rationals ----------------
     A rational is {n, d}: n any integer, d a positive integer. make() is
     the only constructor and it always reduces and puts the sign on top,
     so two rationals that are equal have the same n and d. */
  const isInt = v => Number.isInteger(v);

  function gcd(a, b){
    a = Math.abs(a); b = Math.abs(b);
    while (b){ const t = a % b; a = b; b = t; }
    return a;
  }
  function lcm(a, b){
    if (!a || !b) return 0;
    return Math.abs((a / gcd(a, b)) * b);   /* gcd divides a exactly */
  }
  function make(n, d){
    if (!isInt(n) || !isInt(d) || d === 0) return null;
    if (d < 0){ n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    return { n: n / g, d: d / g };          /* g divides both exactly */
  }
  function add(a, b){
    const L = lcm(a.d, b.d);
    return make(a.n * (L / a.d) + b.n * (L / b.d), L);
  }
  function sub(a, b){ return add(a, { n: -b.n, d: b.d }); }
  function cmp(a, b){
    const x = a.n * b.d, y = b.n * a.d;
    return x < y ? -1 : (x > y ? 1 : 0);
  }
  function eq(a, b){ return !!a && !!b && cmp(a, b) === 0; }
  function isReduced(n, d){ return isInt(n) && isInt(d) && d > 0 && gcd(n, d) === 1; }

  /* whole part and proper remainder, for n >= 0 */
  function toMixed(r){
    const rem = r.n % r.d;
    return { w: (r.n - rem) / r.d, n: rem, d: r.d };
  }
  /* the value of "w n/d", left unreduced on purpose */
  function fromParts(w, n, d){
    if (!isInt(w) || !isInt(n) || !isInt(d) || d <= 0) return null;
    return { n: w * d + n, d: d };
  }
  function text(r){
    if (!r) return '';
    if (r.d === 1) return String(r.n);
    const m = toMixed(r);
    if (m.w === 0) return r.n + '/' + r.d;
    return m.w + ' ' + m.n + '/' + m.d;
  }
  /* "fourths", "twelfths": the size of the pieces in words */
  const PIECE = {1:'wholes', 2:'halves', 3:'thirds', 4:'fourths', 5:'fifths', 6:'sixths', 7:'sevenths',
    8:'eighths', 9:'ninths', 10:'tenths', 11:'elevenths', 12:'twelfths', 15:'fifteenths', 16:'sixteenths',
    18:'eighteenths', 20:'twentieths', 24:'twenty-fourths', 30:'thirtieths', 36:'thirty-sixths',
    40:'fortieths', 48:'forty-eighths', 60:'sixtieths'};
  function pieceName(d){ return PIECE[d] || (d + 'ths'); }

  /* The unit checks. Each is [what, got, want]; a page shows a warning
     and refuses to drill if any come back unequal. */
  function selfCheck(){
    const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const cases = [
      ['gcd 12 18', gcd(12, 18), 6],
      ['gcd 7 0', gcd(7, 0), 7],
      ['gcd 9 -6', gcd(9, -6), 3],
      ['lcm 4 6', lcm(4, 6), 12],
      ['lcm 8 12', lcm(8, 12), 24],
      ['lcm 3 5', lcm(3, 5), 15],
      ['make 6/8', make(6, 8), {n:3, d:4}],
      ['make -2/4', make(-2, 4), {n:-1, d:2}],
      ['make 3/-6', make(3, -6), {n:-1, d:2}],
      ['make 0/5', make(0, 5), {n:0, d:1}],
      ['make x/0', make(1, 0), null],
      ['add 1/2 1/4', add(make(1,2), make(1,4)), {n:3, d:4}],
      ['add 1/3 1/2', add(make(1,3), make(1,2)), {n:5, d:6}],
      ['add 3/4 1/6', add(make(3,4), make(1,6)), {n:11, d:12}],
      ['add 7/3 3/2', add(make(7,3), make(3,2)), {n:23, d:6}],
      ['add 1/2 1/2', add(make(1,2), make(1,2)), {n:1, d:1}],
      ['sub 5/6 1/3', sub(make(5,6), make(1,3)), {n:1, d:2}],
      ['sub 1/4 1/2', sub(make(1,4), make(1,2)), {n:-1, d:4}],
      ['cmp 2/3 3/4', cmp(make(2,3), make(3,4)), -1],
      ['eq 2/4 1/2', eq(make(2,4), make(1,2)), true],
      ['eq 2/4 1/3', eq(make(2,4), make(1,3)), false],
      ['reduced 2/4', isReduced(2, 4), false],
      ['reduced 3/4', isReduced(3, 4), true],
      ['mixed 23/6', toMixed(make(23,6)), {w:3, n:5, d:6}],
      ['mixed 4/1', toMixed(make(4,1)), {w:4, n:0, d:1}],
      ['parts 2 1/3', fromParts(2, 1, 3), {n:7, d:3}],
      ['parts 0 6/8', fromParts(0, 6, 8), {n:6, d:8}],
      ['text 23/6', text(make(23,6)), '3 5/6'],
      ['text 4/2', text(make(4,2)), '2']
    ];
    return cases.filter(c => !same(c[1], c[2])).map(c => c[0] + ': got ' + JSON.stringify(c[1]) + ', wanted ' + JSON.stringify(c[2]));
  }

  window.Rational = { gcd, lcm, make, add, sub, cmp, eq, isReduced, toMixed, fromParts, text, pieceName, selfCheck };

  /* ---------------- the input ----------------
     FractionInput.create({ mixed, label, onEnter, onChange }) returns
       el         the element to put on the page
       value()    { w, n, d } as typed; null for an empty box
       rational() the value of what was typed, unreduced, or null if the
                  fraction is incomplete or the bottom is 0. A whole
                  number on its own comes back over 1.
       clear(), focus(), setMixed(bool), setDisabled(bool)
       mark(kind) 'ok' | 'slip' | 'miss' | '' to colour the boxes */
  function create(opts){
    opts = opts || {};
    let mixed = !!opts.mixed;

    const root = document.createElement('div');
    root.className = 'frac-input';
    root.setAttribute('role', 'group');
    root.setAttribute('aria-label', opts.label || 'Fraction');

    function box(cls, label){
      const i = document.createElement('input');
      i.type = 'text';
      i.className = cls;
      i.setAttribute('inputmode', 'numeric');
      i.setAttribute('pattern', '[0-9]*');
      i.setAttribute('autocomplete', 'off');
      i.setAttribute('autocorrect', 'off');
      i.setAttribute('spellcheck', 'false');
      i.setAttribute('maxlength', '3');
      i.setAttribute('aria-label', label);
      return i;
    }
    const whole = box('fi-whole', 'Whole number');
    const num = box('fi-num', 'Top number');
    const den = box('fi-den', 'Bottom number');
    const stack = document.createElement('div');
    stack.className = 'fi-stack';
    const bar = document.createElement('div');
    bar.className = 'fi-bar';
    bar.setAttribute('aria-hidden', 'true');
    stack.append(num, bar, den);
    root.append(whole, stack);
    whole.hidden = !mixed;

    const boxes = () => mixed ? [whole, num, den] : [num, den];
    function go(from, step){
      const list = boxes();
      const i = list.indexOf(from);
      const to = list[i + step];
      if (!to) return false;
      to.focus();
      try { to.setSelectionRange(0, to.value.length); } catch (e) {}
      return true;
    }
    const atEnd = i => i.selectionStart === null || i.selectionStart >= i.value.length;
    const atStart = i => i.selectionStart === null || i.selectionStart === 0 && i.selectionEnd === 0;

    function onKey(e){
      const i = e.target;
      if (e.key === 'Enter'){
        e.preventDefault();
        if (typeof opts.onEnter === 'function') opts.onEnter(api);
        return;
      }
      if (e.key === 'ArrowRight' && atEnd(i)){ if (go(i, 1)) e.preventDefault(); return; }
      if (e.key === 'ArrowLeft' && atStart(i)){ if (go(i, -1)) e.preventDefault(); return; }
      if (e.key === 'ArrowDown' && i === num){ e.preventDefault(); go(i, 1); return; }
      if (e.key === 'ArrowUp' && i === den){ e.preventDefault(); go(i, -1); return; }
      if (e.key === 'ArrowDown' && i === whole){ e.preventDefault(); go(i, 1); return; }
      if (e.key === '/' && i === num){ e.preventDefault(); go(i, 1); return; }
      if (e.key === ' ' && i === whole){ e.preventDefault(); go(i, 1); return; }
      if (e.key === 'Backspace' && i.value === '' ){ if (go(i, -1)) e.preventDefault(); return; }
    }
    function onInput(e){
      const i = e.target;
      const clean = i.value.replace(/[^0-9]/g, '').slice(0, 3);
      if (clean !== i.value) i.value = clean;
      root.classList.remove('ok', 'slip', 'miss');
      if (typeof opts.onChange === 'function') opts.onChange(api);
    }
    [whole, num, den].forEach(i => {
      i.addEventListener('keydown', onKey);
      i.addEventListener('input', onInput);
      i.addEventListener('focus', () => { try { i.setSelectionRange(0, i.value.length); } catch (e) {} });
    });

    const read = i => (i.hidden || i.value === '') ? null : parseInt(i.value, 10);

    const api = {
      el: root,
      value: () => ({ w: read(whole), n: read(num), d: read(den) }),
      rational: () => {
        const v = api.value();
        if (v.n === null && v.d === null) return v.w === null ? null : { n: v.w, d: 1 };
        if (v.n === null || v.d === null || v.d === 0) return null;
        return { n: (v.w || 0) * v.d + v.n, d: v.d };
      },
      clear: () => { whole.value = ''; num.value = ''; den.value = ''; root.classList.remove('ok', 'slip', 'miss'); },
      focus: () => { (mixed ? whole : num).focus(); },
      setMixed: m => { mixed = !!m; whole.hidden = !mixed; if (!mixed) whole.value = ''; },
      setDisabled: on => { [whole, num, den].forEach(i => { i.disabled = !!on; }); root.classList.toggle('off', !!on); },
      mark: kind => { root.classList.remove('ok', 'slip', 'miss'); if (kind) root.classList.add(kind); },
      boxes: { whole, num, den }
    };
    return api;
  }

  window.FractionInput = { create };
})();
