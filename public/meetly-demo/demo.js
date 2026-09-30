// Meetly demo: an illustrative walkthrough on an iMessage-style phone.
// The flow follows the agent: setup asks one question at a time
// (setup-status.ts / record-setup.ts), the owner asks for a meeting, Meetly
// opens a Plow group, offers three held times, books the pick, reports in
// the DM, posts the Meet link 10 minutes before, and handles an inbound
// iMessage from the five-minute poll. Names and times are made up.
// The phone, timing and controls live in ../demo-kit/phone.js.

const OWNER = "Jean";

const STEPS = [
  { title: "Setup in a short chat", text: "Text the line. Meetly asks what it can't read from your Plow profile or Mac, one question at a time." },
  { title: "Ask in plain words", text: "Meetly finds the person in your Contacts and holds three free times." },
  { title: "A group, signed as Meetly", text: "It offers the times in the third person and books the one they pick." },
  { title: "You hear about it after", text: "A line in your DM once it's on your calendar." },
  { title: "The Meet link, on time", text: "Posted in the group 10 minutes before, read fresh from the event." },
  { title: "Someone texts you first", text: "The five-minute check spots “coffee next week?” and runs the same group." },
];

const MEET_ICON = `<svg viewBox="0 0 87 72"><path fill="#00832d" d="m49.5 36 8.5 9.7 11.5 7.3 2-17-2-16.6-11.7 6.4z"/><path fill="#0066da" d="M0 51.5V66c0 3.3 2.7 6 6 6h14.5l3-11-3-9.5-9.9-3z"/><path fill="#e94235" d="M20.5 0 0 20.5l10.6 3 9.9-3 2.9-9.4z"/><path fill="#2684fc" d="M20.5 20.5H0v31h20.5z"/><path fill="#00ac47" d="M82.6 8.7 69.5 19.4V53l13.2 10.8c2 1.5 4.8.1 4.8-2.4V11c0-2.5-2.9-3.9-4.9-2.3M49.5 36v15.5h-29V72h43c3.3 0 6-2.7 6-6V53z"/><path fill="#ffba00" d="M63.5 0h-43v20.5h29V36l20-16.6V6c0-3.3-2.7-6-6-6"/></svg>`;

// ---------- The story ----------

async function story(run) {
  const dm = createView("dm", { title: "Meetly" });
  show("dm");
  clock("09:41");

  // 1. Setup
  mark(0);
  append(dm, { kind: "stamp", text: "Today|09:41" });
  await sleep(900);
  await types(dm, "hi!");
  log("setup-status.ts → SETUP_NEEDED");
  log(`ownerName = "${OWNER}" (Plow profile)`);
  log("timezone = America/Sao_Paulo (Mac, via Latch)");
  await says(dm, null, `Hi ${OWNER}! I'm Meetly, your AI scheduling assistant. A few questions set me up. With other people I'll call you ${OWNER} — you can change that anytime.`, { think: 1500 });
  await says(dm, null, "Which days do you take meetings?", { think: 500 });

  await types(dm, "weekdays");
  log("record-setup.ts --field days --value mon,tue,wed,thu,fri");
  await says(dm, null, "Between which hours?");

  await types(dm, "10 to 6");
  log("record-setup.ts --field window --value 10:00-18:00");
  await says(dm, null, "How long is a meeting, by default?");

  await types(dm, "30 min");
  log("record-setup.ts --field durationMin --value 30");
  await says(dm, null, "How many days ahead can I offer times?");

  await types(dm, "two weeks");
  log("record-setup.ts --field horizonDays --value 14");
  log("plow-gog accounts · plow-gog calendar calendars");
  await says(dm, null, "Which calendars count as busy? On your Mac I see:\n• jean@acme.co (primary)\n• Team\n• Family\nI'd use the first two.", { think: 1700 });

  await types(dm, "yes, those two");
  log('record-setup.ts --field calendars --value {"calendars":[…2]}');
  log("record-setup.ts --done → cron meetly-poll every 5 min");
  keyboard(false);
  await says(dm, null, "Meetly is on ✓\nMon–Fri, 10:00–18:00 · 30 min · up to 14 days ahead.\nI'll check your new iMessages every 5 minutes. Say “pause Meetly” anytime.", { think: 1300 });
  await sleep(600);
  alive(run);

  // 2. Ask
  mark(1);
  clock("09:47");
  append(dm, { kind: "stamp", text: "Today|09:47" });
  await sleep(500);
  await types(dm, "set up a Google Meet with Priya from Northwind next week, about the pilot");
  keyboard(false);
  log("contacts → Priya Shah · +1 415 555 0142 · priya@northwind.com");
  log("reachable-handle.ts → via iMessage");
  log("plow-gog calendar events … → busy.ts → slots.ts --count 3");
  log("3 holds created · ledger.ts save");
  await says(dm, null, "On it. Found Priya Shah in your contacts. I'm holding 3 free times next week and opening a group with her.", { think: 1900 });
  alive(run);

  // 3. The group
  mark(2);
  log('start-thread.ts --member +14155550142 --key owner:…');
  const g1 = createView("priya", { title: "Priya & Meetly", group: true });
  append(g1, { kind: "note", text: `Meetly opened a group with you and Priya Shah` });
  append(g1, {
    kind: "in",
    from: "Meetly",
    text: `Hi Priya — I'm Meetly, ${OWNER}'s scheduling assistant. ${OWNER} would like a Google Meet about the pilot. ${OWNER} is free Tue 6/10 at 11:00, Wed 7/10 at 15:00 or Thu 8/10 at 10:30. Which works?`,
  });
  await notify({ title: "Priya & Meetly", text: `Meetly: Hi Priya — I'm Meetly, ${OWNER}'s scheduling assistant…`, hold: 1600 });
  await openFromBanner("priya");
  await sleep(readFor(g1.list.lastChild.textContent) - 400);

  clock("10:02");
  append(g1, { kind: "stamp", text: "Today|10:02" });
  await says(g1, "Priya", "Thu 10:30 works for me!", { think: 1400 });
  log("plow-gog calendar create … --with-meet → event.ts");
  log("record-booking.ts · 2 holds released");
  await says(g1, "Meetly", `Booked: Thu 8/10 at 10:30, 30 min on Google Meet. Invite sent to priya@northwind.com. The other two times are released.`, { think: 1900 });
  await card(g1, "Meetly", { kind: "event", mon: "OCT", day: "8", title: `Pilot · ${OWNER} & Priya`, when: "Thu 8 Oct · 10:30–11:00", meta: "Google Meet · invite sent" });
  await says(g1, "Priya", "perfect, thank you 🙏", { think: 900 });
  alive(run);

  // 4. The owner hears about it
  mark(3);
  const report = "Booked a Google Meet with Priya Shah, Thu 8/10 at 10:30. She picked it from 3 times inside your hours. I'll post the Meet link in the group 10 minutes before.";
  append(dm, { kind: "stamp", text: "Today|10:03" });
  append(dm, { kind: "in", text: report });
  await notify({ title: "Meetly", text: report, hold: 1800 });
  await openFromBanner("dm");
  await sleep(readFor(report) - 300);
  await types(dm, "amazing, thanks");
  keyboard(false);
  await sleep(900);
  alive(run);

  // 5. The Meet link, 10 minutes before
  mark(4);
  clock("10:20");
  log("ledger.ts reminders --lead-min 10");
  log("plow-gog calendar event … → reminder-check.ts → send");
  append(g1, { kind: "stamp", text: "Thu 8 Oct|10:20" });
  append(g1, { kind: "in", from: "Meetly", text: `${OWNER} and Priya meet in 10 minutes, at 10:30. Join here:` });
  append(g1, { kind: "link", from: "Meetly", icon: MEET_ICON, title: `Pilot · ${OWNER} & Priya`, url: "meet.google.com/xqk-drwp-fmz" });
  await notify({ title: "Priya & Meetly", text: `Meetly: ${OWNER} and Priya meet in 10 minutes, at 10:30. Join here…`, hold: 1600 });
  await openFromBanner("priya");
  await sleep(2400);
  await says(g1, "Priya", "joining 👍", { think: 900 });
  log("reminder-check.ts --sent");
  await sleep(600);
  alive(run);

  // 6. Someone texts first
  mark(5);
  await goBack("dm");
  clock("14:03");
  await notify({ app: "messages", title: "Ana Lima", text: "hey! coffee next week? ☕", hold: 2200 });
  await dismiss();
  clock("14:05");
  log("cron meetly-poll · cursor.ts get → 1 new message");
  log("Ana Lima: “coffee next week?” → a request, format unknown");
  log("slots.ts → 3 times · holds · ledger.ts save");
  log("start-thread.ts --member +55 11 9…  --key rowid:48213");
  const g2 = createView("ana", { title: "Ana & Meetly", group: true });
  append(g2, { kind: "note", text: "Meetly opened a group with you and Ana Lima" });
  append(g2, {
    kind: "in",
    from: "Meetly",
    text: `Hi Ana — I'm Meetly, ${OWNER}'s scheduling assistant. ${OWNER} is free Tue 13/10 at 11:00, Wed 14/10 at 15:00 or Thu 15/10 at 10:00. Which works? And would you like to meet on Google Meet or in person?`,
  });
  await notify({ title: "Ana & Meetly", text: `Meetly: Hi Ana — I'm Meetly, ${OWNER}'s scheduling assistant…`, hold: 1600 });
  await openFromBanner("ana");
  await sleep(readFor(g2.list.lastChild.textContent) - 600);

  await says(g2, "Ana", "wed at 3, in person! Café Floresta?", { think: 1500 });
  log("ledger.ts update --json {format:in_person, location:Café Floresta}");
  log("plow-gog calendar create … → record-booking.ts");
  await says(g2, "Meetly", "Booked: Wed 14/10 at 15:00, in person at Café Floresta. The other two times are released.", { think: 1800 });
  await card(g2, "Meetly", { kind: "event", mon: "OCT", day: "14", title: `Coffee · ${OWNER} & Ana`, when: "Wed 14 Oct · 15:00–15:30", meta: "Café Floresta" });

  await goBack("dm");
  append(dm, { kind: "stamp", text: "Today|14:07" });
  await says(dm, null, "Booked coffee with Ana Lima, Wed 14/10 at 15:00 at Café Floresta. She asked by iMessage; I offered three times inside your hours and she picked one.", { think: 1300 });
  await types(dm, "you're the best");
  keyboard(false);
  await sleep(1400);
  finish();
}

window.DEMO = { avatar: "../agents/meetly.png", steps: STEPS, story };
