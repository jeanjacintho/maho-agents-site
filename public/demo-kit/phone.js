// Phone demo kit: an iMessage-style phone that plays a scripted story.
// A demo page defines `window.DEMO = { avatar, steps, story }` before
// loading this file; `story(run)` drives the phone with the helpers below
// (types, says, notify, lockScreen, openPdf…). Pause, speed, restart and
// jumping to a step are handled here.

const $ = (s, r = document) => r.querySelector(s);
const root = document.documentElement;
const { avatar: AVATAR, steps: DEMO_STEPS } = window.DEMO;

// ---------- The phone ----------

const ICON_BACK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>`;
const ICON_VIDEO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="m16 10.5 5-3v9l-5-3z"/></svg>`;
const ICON_PEOPLE = `<svg viewBox="0 0 16 16"><circle cx="8" cy="5.5" r="3"/><path d="M2.5 14c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5z"/></svg>`;
const CHEVRON = `<svg viewBox="0 0 8 12"><path d="m2 1 4 5-4 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const MESSAGES_ICON = `<svg viewBox="0 0 38 38"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#67f06c"/><stop offset="1" stop-color="#1dc933"/></linearGradient></defs><rect width="38" height="38" fill="url(#mg)"/><path fill="#fff" d="M19 9c-6.6 0-12 4.3-12 9.6 0 3 1.7 5.6 4.4 7.4-.2 1.6-1 3-2.2 4 2.3 0 4.3-.9 5.7-2.2 1.3.3 2.6.5 4.1.5 6.6 0 12-4.3 12-9.7S25.6 9 19 9"/></svg>`;

$("#fit").insertAdjacentHTML(
  "afterbegin",
  `<figure class="phone imsg" id="phone">
    <figcaption class="sr-only">An illustrative phone showing an iMessage thread with the agent</figcaption>
    <div class="screen" id="screen">
      <div class="status">
        <span class="clock" id="clock">09:41</span>
        <span class="island" aria-hidden="true"></span>
        <span class="sys" aria-hidden="true">
          <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
          <svg viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.5 7a6.3 6.3 0 0 1 9 0l1.4-1.4a8.3 8.3 0 0 0-11.8 0zM.7 4.2a10.3 10.3 0 0 1 14.6 0L16.7 2.8a12.3 12.3 0 0 0-17.4 0z"/></svg>
          <svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="17" height="8" rx="2"/><path d="M25 4v4a2 2 0 0 0 0-4z" opacity=".4"/></svg>
        </span>
      </div>
      <div class="banner" id="banner" aria-hidden="true">
        <span class="banner-icon" id="banner-icon"></span>
        <span class="banner-body">
          <span class="banner-head"><b id="banner-title"></b><span>now</span></span>
          <span class="banner-text" id="banner-text"></span>
        </span>
      </div>
      <div class="lockscreen" id="lock" aria-hidden="true">
        <p class="ls-date" id="ls-date"></p>
        <p class="ls-time" id="ls-time"></p>
        <ol class="ls-notifs" id="ls-notifs"></ol>
        <span class="ls-hint">Tap a notification to open</span>
      </div>
      <div class="views" id="views"></div>
      <div class="composer">
        <span class="glass plus" aria-hidden="true">+</span>
        <span class="glass field">
          <span class="field-text" id="field"></span><span class="caret"></span>
          <span class="placeholder">iMessage</span>
          <span class="send" id="send" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M8 13V3.5M3.8 7.5 8 3.3l4.2 4.2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </span>
      </div>
      <div class="kb" id="kb" aria-hidden="true"></div>
      <div class="pdf" id="pdf" aria-hidden="true">
        <div class="pdf-head"><span class="done" id="pdf-done">Done</span><span class="pdf-title" id="pdf-title"></span><span></span></div>
        <div class="pdf-body" id="pdf-body"><div class="pdf-page" id="pdf-page"></div></div>
      </div>
      <span class="home-ind" aria-hidden="true"></span>
      <span class="touch" id="touch" aria-hidden="true"></span>
      <div class="end" id="end"><button type="button" id="replay" class="btn primary">Replay</button></div>
    </div>
  </figure>`,
);

const screen = $("#screen");
const viewsEl = $("#views");
const field = $("#field");
const composer = $(".composer");
const banner = $("#banner");

// ---------- Timing: pause, speed, restart, jump ----------

const state = { speed: 1, paused: false, run: 0, skipTo: -1, step: -1 };
class Abort extends Error {}

function alive(run) {
  if (run !== state.run) throw new Abort();
}

function sleep(ms) {
  const run = state.run;
  if (state.skipTo >= 0) return Promise.resolve().then(() => alive(run));
  return new Promise((resolve, reject) => {
    let left = ms;
    let last = performance.now();
    const tick = (now) => {
      if (run !== state.run) return reject(new Abort());
      if (state.skipTo >= 0) return resolve();
      if (!state.paused) left -= (now - last) * state.speed;
      last = now;
      if (left <= 0) return resolve();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

// Reading time for a bubble, so longer replies stay on screen longer.
const readFor = (text) => 700 + Math.min(text.length, 220) * 16;

// ---------- Steps panel and log ----------

const stepsEl = $("#steps");
DEMO_STEPS.forEach((s, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<button type="button"><span class="n">${i + 1}</span><b></b><small></small></button>`;
  li.querySelector("b").textContent = s.title;
  li.querySelector("small").textContent = s.text;
  li.querySelector("button").addEventListener("click", () => start(i));
  stepsEl.append(li);
});

function mark(i) {
  state.step = i;
  [...stepsEl.children].forEach((li, j) => {
    li.dataset.state = j < i ? "done" : j === i ? "now" : "";
  });
  if (state.skipTo >= 0 && i >= state.skipTo) {
    state.skipTo = -1;
    // Let the DOM settle without transitions before motion comes back.
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("instant")));
  }
}

function finish() {
  mark(DEMO_STEPS.length);
  $("#end").classList.add("show");
}

const logEl = $("#log");
function log(line) {
  const li = document.createElement("li");
  li.textContent = line;
  logEl.append(li);
  while (logEl.children.length > 7) logEl.firstChild.remove();
}

function clock(t) {
  $("#clock").textContent = t;
}

// ---------- Views (one per conversation) ----------

const views = {};
let current = null;

function createView(id, { title, group = false, avatar = AVATAR }) {
  const el = document.createElement("section");
  el.className = "view";
  el.dataset.pos = "right";
  el.innerHTML = `
    <header class="hdr">
      <span class="glass round back" aria-hidden="true">${ICON_BACK}</span>
      <div class="who">
        <span class="av-wrap"><img class="av" src="${avatar}" alt="">${group ? `<span class="badge">${ICON_PEOPLE}</span>` : ""}</span>
        <p class="glass name"><span></span>${CHEVRON}</p>
      </div>
      <span class="glass round video" aria-hidden="true">${ICON_VIDEO}</span>
    </header>
    <div class="scroller"><ol class="msgs"></ol></div>`;
  el.querySelector(".name span").textContent = title;
  viewsEl.append(el);
  const v = { id, el, group, list: el.querySelector(".msgs"), scroller: el.querySelector(".scroller"), last: null };
  // Stick to the bottom as the keyboard opens and bubbles land.
  new ResizeObserver(() => (v.scroller.scrollTop = v.scroller.scrollHeight)).observe(v.scroller);
  views[id] = v;
  return v;
}

function show(id, dir = "forward") {
  const next = views[id];
  if (current === next) return;
  if (current) current.el.dataset.pos = dir === "forward" ? "left" : "right";
  if (dir === "back") {
    // Coming back: the target waits on the left so it slides in from there.
    next.el.style.transition = "none";
    next.el.dataset.pos = "left";
    next.el.offsetWidth;
    next.el.style.transition = "";
  }
  next.el.dataset.pos = "active";
  current = next;
  scrollDown(next);
}

function scrollDown(v) {
  const instant = root.classList.contains("instant");
  v.scroller.scrollTo({ top: v.scroller.scrollHeight, behavior: instant ? "auto" : "smooth" });
}

// ---------- Messages ----------

function sideOf(m) {
  if (m.kind === "out") return "out";
  if (m.kind === "stamp" || m.kind === "note") return m.kind;
  return `in:${m.from || ""}`;
}

function append(v, m) {
  const side = sideOf(m);
  const starts = !v.last || v.last.side !== side;
  if (!starts && v.last.bubble) v.last.bubble.classList.remove("imsg-tail");

  const li = document.createElement("li");
  if (starts) li.classList.add("starts");
  let bubble = null;

  if (m.kind === "stamp") {
    li.innerHTML = `<p class="stamp"></p>`;
    const [day, time] = m.text.split("|");
    li.firstChild.innerHTML = time ? `<b></b> ${time}` : "<b></b>";
    li.querySelector("b").textContent = day;
  } else if (m.kind === "note") {
    li.innerHTML = `<p class="note"></p>`;
    li.firstChild.textContent = m.text;
  } else {
    if (v.group && m.from && starts) {
      const from = document.createElement("p");
      from.className = "from";
      from.textContent = m.from;
      li.append(from);
    }
    bubble = document.createElement("div");
    bubble.className = `${m.kind === "out" ? "imsg-out" : "imsg-in"} imsg-tail`;
    if (m.kind === "event") {
      bubble.classList.add("event");
      bubble.innerHTML = `<span class="cal"><span class="mon"></span><span class="day"></span></span>
        <span class="info"><b></b><span class="when"></span><span class="meta"></span></span>`;
      bubble.querySelector(".mon").textContent = m.mon;
      bubble.querySelector(".day").textContent = m.day;
      bubble.querySelector("b").textContent = m.title;
      bubble.querySelector(".when").textContent = m.when;
      bubble.querySelector(".meta").textContent = m.meta;
    } else if (m.kind === "link") {
      bubble.classList.add("linkcard");
      bubble.innerHTML = `<div class="lc-top">${m.icon || ""}</div><div class="lc-body"><b></b><span></span></div>`;
      bubble.querySelector("b").textContent = m.title;
      bubble.querySelector(".lc-body span").textContent = m.url;
    } else if (m.kind === "file") {
      bubble.classList.add("file");
      bubble.innerHTML = `<span class="doc">PDF</span><span><span class="fname"></span><span class="fdetail"></span></span>`;
      bubble.querySelector(".fname").textContent = m.name;
      bubble.querySelector(".fdetail").textContent = m.detail;
    } else {
      bubble.textContent = m.text;
    }
    li.append(bubble);
  }

  if (m.kind === "out") {
    v.list.querySelectorAll(".delivered").forEach((d) => d.remove());
    const d = document.createElement("p");
    d.className = "delivered";
    d.textContent = "Delivered";
    li.append(d);
  }

  v.list.append(li);
  v.last = { side, bubble };
  scrollDown(v);
  return li;
}

function typingIndicator(v, from) {
  const li = document.createElement("li");
  const side = `in:${from || ""}`;
  li.classList.toggle("starts", !v.last || v.last.side !== side);
  if (v.group && from && (!v.last || v.last.side !== side)) {
    const p = document.createElement("p");
    p.className = "from";
    p.textContent = from;
    li.append(p);
  }
  const t = document.createElement("span");
  t.className = "imsg-in imsg-tail typing";
  t.innerHTML = "<span></span><span></span><span></span>";
  li.append(t);
  v.list.append(li);
  scrollDown(v);
  return li;
}

// Someone else writes: typing bubble, then the message, then time to read.
async function says(v, from, text, { think = 1100 } = {}) {
  const t = typingIndicator(v, from);
  await sleep(think);
  t.remove();
  append(v, { kind: "in", from, text });
  await sleep(readFor(text));
}

// A rich bubble (event, link, file) after a short typing bubble.
async function card(v, from, m, pause = 1800) {
  const t = typingIndicator(v, from);
  await sleep(700);
  t.remove();
  const li = append(v, { ...m, from });
  await sleep(pause);
  return li;
}

// ---------- The owner types on the keyboard ----------

const KEYS = ["qwertyuiop", "asdfghjkl", "⇧zxcvbnm⌫"];
const kb = $("#kb");
kb.innerHTML =
  `<div class="rows">` +
  KEYS.map(
    (row) =>
      `<div class="row">${[...row]
        .map((c) => `<span class="k${c === "⇧" || c === "⌫" ? " fn" : ""}" data-k="${c}">${c}</span>`)
        .join("")}</div>`,
  ).join("") +
  `<div class="row"><span class="k fn">123</span><span class="k fn">☺</span><span class="k space" data-k=" ">space</span><span class="k fn ret">return</span></div></div>`;

function keyboard(open) {
  screen.classList.toggle("kb-open", open);
  composer.classList.toggle("is-typing", open);
}

function press(ch) {
  const k = kb.querySelector(`[data-k="${CSS.escape(ch.toLowerCase())}"]`);
  const shift = /[A-Z]/.test(ch) && kb.querySelector('[data-k="⇧"]');
  for (const el of [k, shift]) {
    if (!el) continue;
    el.classList.add("down");
    setTimeout(() => el.classList.remove("down"), 110);
  }
}

function setField(text) {
  field.textContent = text;
  composer.classList.toggle("has-text", text.length > 0);
}

async function types(v, text) {
  if (!screen.classList.contains("kb-open")) {
    keyboard(true);
    await sleep(450);
  }
  let typed = "";
  for (const ch of Array.from(text)) {
    typed += ch;
    setField(typed);
    press(ch);
    await sleep(ch === " " ? 70 : 38 + Math.random() * 55);
  }
  await sleep(350);
  const send = $("#send");
  send.classList.add("down");
  await sleep(120);
  send.classList.remove("down");
  setField("");
  append(v, { kind: "out", text });
  await sleep(500);
}

// ---------- Banner, lock screen, taps, PDF ----------

function appIcon(app) {
  return app === "messages" ? MESSAGES_ICON : `<img src="${app === "agent" || !app ? AVATAR : app}" alt="">`;
}

async function notify({ app = "agent", title, text, hold = 2200 }) {
  $("#banner-icon").innerHTML = appIcon(app);
  $("#banner-title").textContent = title;
  $("#banner-text").textContent = text;
  banner.classList.add("show");
  await sleep(hold);
}

async function dismiss() {
  banner.classList.remove("show");
  await sleep(350);
}

function fitScale() {
  return $("#phone").getBoundingClientRect().width / $("#phone").offsetWidth || 1;
}

async function tap(el) {
  const s = fitScale();
  const r = el.getBoundingClientRect();
  const sr = screen.getBoundingClientRect();
  const touch = $("#touch");
  touch.style.left = `${(r.left - sr.left + r.width / 2) / s}px`;
  touch.style.top = `${(r.top - sr.top + r.height / 2) / s}px`;
  touch.classList.remove("tap");
  touch.offsetWidth;
  touch.classList.add("tap");
  el.classList.add("down");
  await sleep(160);
  el.classList.remove("down");
  await sleep(200);
}

async function openFromBanner(id) {
  await tap(banner);
  banner.classList.remove("show");
  show(id, "forward");
  await sleep(700);
}

async function goBack(id) {
  await tap(current.el.querySelector(".back"));
  show(id, "back");
  await sleep(700);
}

// The phone locks: big clock, date, notifications stacking at the bottom.
async function lockScreen({ date, time }) {
  keyboard(false);
  $("#ls-date").textContent = date;
  $("#ls-time").textContent = time;
  $("#ls-notifs").innerHTML = "";
  clock(time);
  screen.classList.add("locked");
  await sleep(900);
}

function lockTime(time) {
  $("#ls-time").textContent = time;
  clock(time);
}

async function lockNotify({ app = "agent", title, text, time = "now", hold = 1800 }) {
  const li = document.createElement("li");
  li.innerHTML = `<div class="glass ls-card">${appIcon(app)}<span class="banner-body"><span class="banner-head"><b></b><span></span></span><span class="banner-text"></span></span></div>`;
  li.querySelector("b").textContent = title;
  li.querySelector(".banner-head span").textContent = time;
  li.querySelector(".banner-text").textContent = text;
  $("#ls-notifs").append(li);
  await sleep(hold);
  return li.firstChild;
}

// Tap a lock-screen notification: the phone unlocks into that thread.
async function unlock(cardEl, id) {
  await tap(cardEl);
  screen.classList.remove("locked");
  if (id) show(id, "forward");
  await sleep(700);
}

async function openPdf(fileLi, { html, title, scroll = 420, read = 3200 }) {
  await tap(fileLi.querySelector(".file"));
  $("#pdf-page").innerHTML = html;
  $("#pdf-title").textContent = title;
  const body = $("#pdf-body");
  body.scrollTop = 0;
  $("#pdf").classList.add("show");
  await sleep(900);
  // Read down the page, slowly.
  const steps = 40;
  for (let i = 1; i <= steps; i++) {
    body.scrollTop = (scroll * i) / steps;
    await sleep(read / steps);
  }
  await sleep(700);
}

async function closePdf() {
  await tap($("#pdf-done"));
  $("#pdf").classList.remove("show");
  await sleep(600);
}

// ---------- Controls ----------

function reset() {
  viewsEl.innerHTML = "";
  logEl.innerHTML = "";
  for (const k of Object.keys(views)) delete views[k];
  current = null;
  setField("");
  keyboard(false);
  banner.classList.remove("show");
  screen.classList.remove("locked");
  $("#pdf").classList.remove("show");
  $("#end").classList.remove("show");
  window.DEMO.reset?.();
}

function start(skipTo = -1) {
  state.run += 1;
  state.skipTo = skipTo > 0 ? skipTo : -1;
  root.classList.toggle("instant", state.skipTo >= 0);
  setPaused(false);
  reset();
  window.DEMO.story(state.run).catch((e) => {
    if (!(e instanceof Abort)) console.error(e);
  });
}

function setPaused(p) {
  state.paused = p;
  root.classList.toggle("is-paused", p);
  const btn = $("#play");
  btn.querySelector("span").textContent = p ? "Play" : "Pause";
  btn.setAttribute("aria-label", p ? "Play" : "Pause");
}

$("#play").addEventListener("click", () => {
  if (state.step >= DEMO_STEPS.length) return start();
  setPaused(!state.paused);
});
$("#restart").addEventListener("click", () => start());
$("#replay").addEventListener("click", () => start());
document.querySelectorAll(".speed button").forEach((b) =>
  b.addEventListener("click", () => {
    state.speed = Number(b.dataset.speed);
    document.querySelectorAll(".speed button").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
  }),
);

// Scale the phone down to fit narrow or short windows.
function fit() {
  const phone = $("#phone");
  const wrap = $("#fit");
  const w = phone.offsetWidth;
  const h = phone.offsetHeight;
  const s = Math.min(1, (window.innerWidth - 32) / w, (window.innerHeight - 48) / h);
  const scale = Math.max(s, 0.55);
  phone.style.transform = `scale(${scale})`;
  wrap.style.width = `${w * scale}px`;
  wrap.style.height = `${h * scale}px`;
}
window.addEventListener("resize", fit);
fit();

if (matchMedia("(prefers-reduced-motion: reduce)").matches) state.speed = 2;
start();
