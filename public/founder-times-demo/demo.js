// The Founder Times demo: an illustrative walkthrough on an iMessage-style
// phone. The flow follows the agent: pt-setup asks one question at a time
// (hour, printer, advisor desk, mail, sections, signals) and reads the time
// zone from the Mac; pt-intake takes a one-day assignment; the paper researches
// overnight through Latch, prints and lands as a PDF at the hour you set; a
// one-off arrives as its own delivery. Names, stories and numbers are made up.
// The phone, timing and controls live in ../demo-kit/phone.js.

const STEPS = [
  { title: "Setup in a short chat", text: "The first message is the paper: what time it lands. Then printer, advisor desk, mail, sections." },
  { title: "One day's assignment", text: "“Put the iPhone price in tomorrow's paper.” It runs once, then drops off." },
  { title: "Research, overnight", text: "On your Mac's browser through Latch. Critics challenge the advisor's picks." },
  { title: "07:00: tray and chat", text: "The edition prints on your Mac and lands as a PDF in the thread." },
  { title: "Talk back", text: "Ask why something ranked first. Corrections go into your wiki." },
  { title: "A one-off, now", text: "Ask once and it comes as its own short edition, not an essay in chat." },
];

// The printed page. Only what the paper prints: the advisor's desk,
// weather, one calendar rail and up to three stories. Mail stays in chat.
const EDITION = `
<article class="ft">
  <header class="ft-mast"><h2>THE FOUNDER TIMES</h2><span class="ft-wx">☀ 24°<small>/16°</small></span></header>
  <p class="ft-line"><span>Vol. 1 — No. 1</span><span>São Paulo, Sep 29, 2026</span><span>Single copy</span></p>
  <section class="ft-desk">
    <p class="ft-band">What to prioritize today</p>
    <div class="ft-rec">
      <p class="ft-n">1</p>
      <h3>Send Priya the pilot recap before Thursday's call</h3>
      <p>Northwind asked for it by mail on Friday and the call is Thursday at 10:30. A clear recap is the shortest path to your second design partner; walking in without it spends the call on catch-up.</p>
      <p class="ft-ev">1. Priya asked for the recap — mail, Fri 25/9 · 2. Call booked Thu 8/10 10:30 — calendar</p>
      <p class="ft-first">FIRST STEP Draft the recap from last week's notes and send it by 12:00.</p>
    </div>
    <div class="ft-recs">
      <div class="ft-rec">
        <p class="ft-n">2</p>
        <h3>Answer the two investors who wrote back</h3>
        <p>Both replied to last week's update; a same-week answer keeps the round warm.</p>
        <p class="ft-first">FIRST STEP Two short replies before lunch.</p>
      </div>
      <div class="ft-rec">
        <p class="ft-n">3</p>
        <h3>Turn the pilot into a case study</h3>
        <p>Design partners buy on proof. One page on the pilot does double duty.</p>
        <p class="ft-first">FIRST STEP Ask the team for three numbers.</p>
      </div>
    </div>
  </section>
  <div class="ft-body">
    <div>
      <section class="ft-lead">
        <p class="ft-kicker">AI startups</p>
        <h4>Agent startups draw a busy week of seed rounds</h4>
        <p class="ft-dek">Most of the money went to tools that act, not chat</p>
        <p>Four agent companies announced seed rounds this week, three of them selling to small businesses. Investors quoted in the coverage point to usage, not demos, as the reason.</p>
        <p class="ft-miss">One page wouldn't load (a paywalled report). This story runs on the other three sources.</p>
        <p class="ft-src">Sources: 3 pages</p>
      </section>
      <div class="ft-pair">
        <div>
          <p class="ft-kicker">The dollar</p>
          <h4>Dollar eases to R$ 5,31</h4>
          <p>The real firmed for a third day as exporters sold dollars ahead of month-end.</p>
          <p class="ft-src">Sources: 2 pages</p>
        </div>
        <div>
          <p class="ft-kicker">Assignment</p>
          <h4>iPhone 18 lands at R$ 9.999</h4>
          <p>Pre-orders open Friday; the Pro starts higher. You asked for this one in yesterday's chat.</p>
          <p class="ft-src">Sources: 2 pages</p>
        </div>
      </div>
    </div>
    <aside class="ft-rail">
      <p class="ft-band">Calendar</p>
      <ol>
        <li><b>09:30</b><span>Team stand-up</span></li>
        <li><b>11:00</b><span>Investor update call</span></li>
        <li><b>14:00</b><span>Hiring: backend</span></li>
        <li><b>17:30</b><span>Gym</span></li>
      </ol>
    </aside>
  </div>
  <footer class="ft-foot"><span>Vol. 1 — No. 1</span><span>Sep 29, 2026</span><span>The Founder Times</span></footer>
</article>`;

const printer = document.getElementById("printer");

function resetPrinter() {
  printer.className = "printer";
  document.getElementById("printer-sheet").innerHTML = "";
}

async function printEdition() {
  document.getElementById("printer-sheet").innerHTML = EDITION;
  printer.classList.add("on");
  await sleep(500);
  printer.classList.add("busy", "printed");
  await sleep(2700);
  printer.classList.remove("busy");
}

async function story(run) {
  const dm = createView("dm", { title: "The Founder Times" });
  show("dm");
  clock("21:10");

  // 1. Setup
  mark(0);
  append(dm, { kind: "stamp", text: "Mon 28 Sep|21:10" });
  await sleep(900);
  await types(dm, "hi");
  log("setup_needed.py → SETUP_NEEDED · DRAFT:none");
  await says(dm, null, "📰 Hi — I'm The Founder Times, your newspaper. What time should it land each morning? If you don't say, I'll send it at 7:00.", { think: 1400 });

  await types(dm, "7 is good");
  log("record_setup.py local_hour=07:00 owner.language=English");
  log("NEXT_QUESTION=printer");
  await says(dm, null, "🖨️ Is there a printer on your Mac? (yes / no)");

  await types(dm, "yes");
  log("chat_status.py --busy");
  await says(dm, null, "⏳ on it", { think: 500 });
  log('Latch · lpstat -p (network: true) → printer HP_LaserJet_M110');
  log("record_setup.py printer.configured=true printer.name=HP_LaserJet_M110");
  await says(dm, null, "⭐ Every morning the paper can open with what your advisor would tell you after watching your last day. What are you trying to make true over the next few quarters? (or “no” to skip the advisor desk)", { think: 1500 });

  await types(dm, "close our seed and sign 10 paying design partners");
  log("wiki_setup.py --desk → WIKI:~/Plow/wiki");
  log("write ~/Plow/wiki/entities/owner/goals.md (+1 goal)");
  log("record_setup.py priority.configured=true");
  await says(dm, null, "Got it. The desk reads your Mac every morning; correct it anytime by texting (“Raj is my cousin”). Your goals are in your wiki at ~/Plow/wiki — it opens in Obsidian.", { think: 1600 });
  await says(dm, null, "✉️ Want today's mail in the paper? Just who sent it and the subject, not the full text. (yes / no)", { think: 500 });

  await types(dm, "yes");
  log("Latch · plow-gog gmail search newer_than:1d → 5 messages");
  log("record_setup.py mail.configured=true");
  await says(dm, null, "🗞️ What do you want to see every morning? Sports, tech, the dollar… or “nothing” if weather and your day already cover it.", { think: 1300 });

  await types(dm, "AI startups and the dollar");
  log('topics.py add --kind section --text "AI startups"');
  log('topics.py add --kind section --text "the dollar"');
  log("record_setup.py news_asked=true");
  await says(dm, null, "👂 Want me to listen for priorities? I can follow the group chats I'm in (without ever talking there), your incoming mail and your incoming iMessages — spam and newsletters filtered out. Say which: groups / mail / iMessage / none.", { think: 1300 });

  await types(dm, "mail and iMessage");
  keyboard(false);
  log("Latch · plow-messages search --limit 200 → ok");
  log("record_setup.py signals.email=true signals.imessage=true");
  log("Latch browser · ipapi.co → America/Sao_Paulo");
  log("finalize_setup.py --owner-tz America/Sao_Paulo → CONFIG:written");
  log("register_crons.py → pt-daily-edition 07:00");
  await says(dm, null, "📰 All set — your paper lands every morning at 7:00. Want me to look something up right now?", { think: 2000 });
  alive(run);

  // 2. An assignment for tomorrow only
  mark(1);
  clock("21:16");
  append(dm, { kind: "stamp", text: "Mon 28 Sep|21:16" });
  await sleep(400);
  await types(dm, "put the iPhone 18 price in tomorrow's paper");
  keyboard(false);
  log('topics.py add --kind assignment --run-on 2026-09-29 --text "iPhone 18 price"');
  await says(dm, null, "Noted — it runs in tomorrow's edition only, at 7:00.", { think: 1200 });
  await sleep(500);
  alive(run);

  // 3. Overnight: the phone sleeps, the Mac works
  mark(2);
  await lockScreen({ date: "Tuesday 29 September", time: "05:40" });
  log("cron pt-daily-edition · prepare_daily_run.py");
  await sleep(900);
  log("advisor desk · signals: mail, iMessage, calendar (read-only)");
  await sleep(900);
  lockTime("05:58");
  log("critics · 7 candidates challenged → 3 survive, ranked");
  await sleep(900);
  log("Latch browser · AI startups: 4 pages, 1 paywalled → said, not invented");
  await sleep(900);
  lockTime("06:21");
  log("Latch browser · the dollar, iPhone 18 price");
  await sleep(900);
  log("render_edition.py → WeasyPrint → edition.pdf (Letter)");
  await sleep(900);
  lockTime("06:59");
  log("wiki · projects/thefoundertimes/2026-09-29.md");
  await sleep(1100);
  alive(run);

  // 4. 07:00: in the tray and in chat
  mark(3);
  lockTime("07:00");
  log("post_to_chat.py → PDF posted");
  log("print_edition.py → lp -d HP_LaserJet_M110");
  append(dm, { kind: "stamp", text: "Tue 29 Sep|07:00" });
  append(dm, { kind: "in", text: "📰 Good morning — today's edition is in the printer tray, and here in chat." });
  const pdf = append(dm, { kind: "file", name: "The Founder Times — Tue 29 Sep.pdf", detail: "Letter · advisor's desk, weather, calendar, 3 stories" });
  const printing = printEdition();
  const n = await lockNotify({ title: "The Founder Times", text: "📰 Good morning — today's edition is in the printer tray, and here in chat.", hold: 2400 });
  await printing;
  await unlock(n);
  await sleep(1400);
  await says(dm, null, "Front page: #1 on the advisor's desk is the Northwind recap, before Thursday's call. One page for the AI story wouldn't load — the paper says so instead of filling the gap.", { think: 1300 });
  await openPdf(pdf, { html: EDITION, title: "The Founder Times — Tue 29 Sep.pdf", scroll: 300, read: 4200 });
  await closePdf();
  alive(run);

  // 5. Talk back
  mark(4);
  clock("07:12");
  await types(dm, "why is the Northwind recap #1?");
  await says(dm, null, "Priya asked for it by mail on Friday, and the call is Thursday. It's the one step that moves your design-partner goal this week; three critics tried to knock it down and it held.", { think: 1700 });
  await types(dm, "Raj is my cousin, not an investor");
  keyboard(false);
  log("wiki · entities/owner/corrections.md (+ Raj: cousin)");
  await says(dm, null, "Got it — noted in your wiki. The desk won't treat Raj as an investor again.", { think: 1200 });
  alive(run);

  // 6. A one-off, delivered as its own edition
  mark(5);
  clock("07:20");
  await types(dm, "research the AI seed rounds in Brazil this week, send it now");
  keyboard(false);
  log('topics.py add --kind one_off --depth quick --scheduled-for now+3m');
  log("cron pt-oneoff-t_b207 · 07:23");
  await says(dm, null, "On it — it comes as its own edition in about 3 minutes.", { think: 1100 });
  await sleep(900);
  clock("07:23");
  append(dm, { kind: "stamp", text: "Today|07:23" });
  await says(dm, null, "📰 Your one-off is in.", { think: 1300 });
  await card(dm, null, { kind: "file", name: "The Founder Times — Special · AI seed rounds.pdf", detail: "1 page · 4 sources" }, 1600);
  await types(dm, "perfect, thanks");
  keyboard(false);
  await sleep(1400);
  finish();
}

window.DEMO = { avatar: "../agents/founder-times.png", steps: STEPS, story, reset: resetPrinter };
