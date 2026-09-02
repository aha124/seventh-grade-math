/* Seventh Grade Math — tokens.
   Loaded with a plain <script src> by every page, just before the page's
   own script. Earning is a function call from the practice pages at the
   moment they write a log record; the balance chip in the masthead and
   the +N toast are drawn from here, so a new page gets both by loading
   this file and nothing else.

   Everything lives in localStorage on the one device. There is no
   backend, no account, and no hiding of the numbers: the prize counter is
   guarded by a person, not by code. Every storage call is wrapped so a
   page still works with storage off; tokens just stop surviving reload.

   Exposed as window.Tokens. See the API block near the bottom. */

(function(){
  'use strict';

  /* ---------------- every tunable number ---------------- */
  const CONFIG = {
    cleanSolve: 2,     /* tokens for a solve that was right first try with no hints */
    solve: 1,          /* tokens for a solve that needed a hint or a retry */
    dailyCap: 20,      /* most tokens solves can earn in one calendar day */
    bestBonus: 5,      /* bonus for a new personal best in a speed or timed round; exempt from the cap, once per mode per day */
    toastMs: 2600,     /* how long the +N toast stays on screen */
    dayHistory: 120,   /* per-day tallies kept; older days are dropped */
    ledgerCap: 500     /* redemptions and adjustments kept; oldest fall off the front */
  };

  /* ---------------- storage ----------------
     Two keys, both new, both under the site namespace.
     TOKENS_KEY  { balance, earned, days: { "YYYY-MM-DD": { earned, bonus, best: { mode: true } } } }
                 balance  what she can spend now
                 earned   lifetime tokens from practice, bonuses included
                 days     per-day tallies; earned is what counts toward the cap
     LEDGER_KEY  [ record, ... ] in the order they happened
                 { id, t, kind: "redeem", item, name, cost, status: "pending" | "fulfilled", done }
                 { id, t, kind: "adjust", delta, reason } */
  const TOKENS_KEY = 'seventh-grade-math:tokens';
  const LEDGER_KEY = 'seventh-grade-math:redemptions';

  const int = (v, min) => Number.isFinite(v) ? Math.max(min, Math.floor(v)) : min;

  function today(){
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  function freshState(){ return { balance: 0, earned: 0, days: {} }; }

  function readState(){
    let s = freshState();
    try {
      const raw = localStorage.getItem(TOKENS_KEY);
      if (raw){
        const p = JSON.parse(raw);
        if (p && typeof p === 'object'){
          s.balance = int(p.balance, 0);
          s.earned = int(p.earned, 0);
          if (p.days && typeof p.days === 'object'){
            Object.keys(p.days).sort().slice(-CONFIG.dayHistory).forEach(k => {
              const d = p.days[k] || {};
              s.days[k] = {
                earned: int(d.earned, 0),
                bonus: int(d.bonus, 0),
                best: (d.best && typeof d.best === 'object') ? d.best : {}
              };
            });
          }
        }
      }
    } catch (e) { s = freshState(); }
    return s;
  }

  function writeState(s){
    try { localStorage.setItem(TOKENS_KEY, JSON.stringify(s)); } catch (e) {}
    draw(s);
    fire();
  }

  function dayOf(s, key){
    if (!s.days[key]) s.days[key] = { earned: 0, bonus: 0, best: {} };
    return s.days[key];
  }

  function readLedger(){
    try {
      const raw = localStorage.getItem(LEDGER_KEY);
      if (!raw) return [];
      const p = JSON.parse(raw);
      if (!Array.isArray(p)) return [];
      return p.filter(r => r && typeof r === 'object' && typeof r.id === 'string'
        && typeof r.t === 'number' && (r.kind === 'redeem' || r.kind === 'adjust'))
        .slice(-CONFIG.ledgerCap);
    } catch (e) { return []; }
  }

  function writeLedger(list){
    if (list.length > CONFIG.ledgerCap) list.splice(0, list.length - CONFIG.ledgerCap);
    try { localStorage.setItem(LEDGER_KEY, JSON.stringify(list)); } catch (e) {}
    fire();
  }

  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  /* ---------------- earning ---------------- */

  /* One solved problem. clean is the page's own first-try, no-hints
     determination; the same one its log record carries. Returns the
     number of tokens that actually landed, which is zero once the day's
     cap is full. */
  function earnSolve(opts){
    const clean = !!(opts && opts.clean);
    const base = clean ? CONFIG.cleanSolve : CONFIG.solve;
    const s = readState();
    const day = dayOf(s, today());
    const room = Math.max(0, CONFIG.dailyCap - day.earned);
    const award = Math.min(base, room);
    if (award > 0){
      day.earned += award;
      s.balance += award;
      s.earned += award;
      writeState(s);
      toast(award, s.balance, clean ? 'Clean solve' : 'Solved');
    } else {
      draw(s);
      quietToast('Today’s ' + CONFIG.dailyCap + ' are all earned. Tomorrow is a new day.');
    }
    return award;
  }

  /* A new personal best in a timed round. mode is a short label like
     "exponents:speed"; the bonus lands at most once per mode per day and
     does not count toward the daily cap. Returns tokens landed. */
  function earnBest(mode){
    const key = String(mode || 'round');
    const s = readState();
    const day = dayOf(s, today());
    if (day.best[key]) { draw(s); return 0; }
    day.best[key] = true;
    day.bonus += CONFIG.bestBonus;
    s.balance += CONFIG.bestBonus;
    s.earned += CONFIG.bestBonus;
    writeState(s);
    toast(CONFIG.bestBonus, s.balance, 'New best!');
    return CONFIG.bestBonus;
  }

  /* ---------------- spending ---------------- */

  /* Takes an item from shared/items.js. On success the balance drops and
     a pending record is appended for the grown-ups page. On a short
     balance nothing changes and the shortfall comes back instead. */
  function redeem(item){
    const cost = int(item && item.cost, 0);
    if (!item || !item.id || cost <= 0) return { ok: false, short: 0 };
    const s = readState();
    if (s.balance < cost) return { ok: false, short: cost - s.balance };
    s.balance -= cost;
    const rec = { id: newId(), t: Date.now(), kind: 'redeem', item: String(item.id),
                  name: String(item.name || item.id), cost: cost, status: 'pending' };
    const list = readLedger();
    list.push(rec);
    writeLedger(list);
    writeState(s);
    return { ok: true, record: rec, balance: s.balance };
  }

  function fulfill(id){
    const list = readLedger();
    const rec = list.find(r => r.id === id && r.kind === 'redeem');
    if (!rec || rec.status === 'fulfilled') return false;
    rec.status = 'fulfilled';
    rec.done = Date.now();
    writeLedger(list);
    return true;
  }

  /* Parent correction. delta is a whole number, reason a required line.
     The balance never goes below zero; the delta recorded is what was
     actually applied. */
  function adjust(delta, reason){
    const d = Number.isFinite(delta) ? Math.trunc(delta) : 0;
    const why = String(reason || '').trim();
    if (!d || !why) return null;
    const s = readState();
    const applied = Math.max(-s.balance, d);
    s.balance += applied;
    const rec = { id: newId(), t: Date.now(), kind: 'adjust', delta: applied, reason: why };
    const list = readLedger();
    list.push(rec);
    writeLedger(list);
    writeState(s);
    return rec;
  }

  /* ---------------- change listeners ---------------- */
  const listeners = [];
  function fire(){ listeners.forEach(fn => { try { fn(); } catch (e) {} }); }
  window.addEventListener('storage', e => {
    if (e.key === TOKENS_KEY || e.key === LEDGER_KEY || e.key === null){ draw(readState()); fire(); }
  });

  /* ---------------- masthead chip ----------------
     Sits at the right end of the back-link line. On a page without a back
     link (the hub, the shop) a line is made for it. The href points at the
     shop, worked out from where this script was loaded from, so it is
     right from the root and from one folder down. */
  const src = (document.currentScript && document.currentScript.getAttribute('src')) || 'shared/tokens.js';
  const ROOT = src.replace(/shared\/tokens\.js.*$/, '');
  let chipN = null;

  function coin(){
    const c = document.createElement('span');
    c.className = 'coin';
    c.setAttribute('aria-hidden', 'true');
    return c;
  }

  function mountChip(){
    const wrap = document.querySelector('.board .wrap');
    if (!wrap || wrap.querySelector('.coin-chip')) return;
    let nav = wrap.querySelector('.board-nav');
    if (!nav){
      nav = document.createElement('div');
      nav.className = 'board-nav chip-only';
      wrap.insertBefore(nav, wrap.firstChild);
    }
    const chip = document.createElement('a');
    chip.className = 'coin-chip';
    chip.href = ROOT + 'shop.html';
    chip.setAttribute('aria-label', 'Tokens');
    chipN = document.createElement('b');
    chipN.className = 'coin-n';
    const word = document.createElement('span');
    word.className = 'coin-word';
    word.textContent = 'tokens';
    chip.append(coin(), chipN, word);
    nav.append(chip);
    draw(readState());
  }

  function draw(s){
    if (!chipN) return;
    chipN.textContent = String((s || readState()).balance);
  }

  /* ---------------- toast ---------------- */
  let toastEl = null, toastTimer = 0;
  function ensureToast(){
    if (toastEl) return toastEl;
    toastEl = document.createElement('div');
    toastEl.className = 'coin-toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    document.body.append(toastEl);
    return toastEl;
  }
  function show(el, quiet){
    el.classList.toggle('quiet', !!quiet);
    el.classList.remove('show');
    void el.offsetWidth;                 /* restart the animation */
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), CONFIG.toastMs);
  }
  function toast(n, balance, label){
    const el = ensureToast();
    el.textContent = '';
    const plus = document.createElement('b');
    plus.className = 'plus';
    plus.textContent = '+' + n;
    const why = document.createElement('span');
    why.className = 'why';
    why.textContent = label || '';
    const bal = document.createElement('span');
    bal.className = 'bal';
    bal.textContent = 'Balance ' + balance;
    el.append(coin(), plus, why, bal);
    show(el, false);
    if (chipN){
      chipN.parentElement.classList.remove('bump');
      void chipN.offsetWidth;
      chipN.parentElement.classList.add('bump');
    }
  }
  let quietShown = false;
  function quietToast(text){
    if (quietShown) return;              /* once per visit is enough */
    quietShown = true;
    const el = ensureToast();
    el.textContent = text;
    show(el, true);
  }

  if (document.body) mountChip();
  else document.addEventListener('DOMContentLoaded', mountChip);

  /* ---------------- API ---------------- */
  window.Tokens = {
    CONFIG: CONFIG,
    KEYS: { tokens: TOKENS_KEY, ledger: LEDGER_KEY },
    ROOT: ROOT,
    today: today,
    state: readState,
    balance: () => readState().balance,
    earnedToday: () => { const s = readState(); const d = s.days[today()]; return d ? d.earned : 0; },
    ledger: readLedger,
    earnSolve: earnSolve,
    earnBest: earnBest,
    redeem: redeem,
    fulfill: fulfill,
    adjust: adjust,
    onChange: fn => { if (typeof fn === 'function') listeners.push(fn); },
    refresh: () => draw(readState()),
    toast: toast
  };
})();
