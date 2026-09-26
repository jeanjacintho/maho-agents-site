@AGENTS.md

# Maho — landing page brief

This repo is the landing page for **Maho**, an ecosystem of three agents that
live on a text thread, built on Plow + OpenClaw. The page is in **English**.
Stack: Next.js (App Router, `src/`), Tailwind v4, static output, Vercel.

`src/app/page.tsx` is a placeholder. Build the page described here.

## Thesis

> Agents that live where you already are — text, email, group chat. They
> never make up what they can't check, and they only act inside the rules you
> gave them.

Copy may be tightened, but keep both halves. The second half exists because
Meetly books meetings without waiting for the owner: the promise is never
"it never acts alone", it is "it acts only inside your limits, and tells you
after".

## The three agents (source of truth: each repo's README)

| Agent | Repo | Agent Index | Avatar |
|---|---|---|---|
| The Founder Times | https://github.com/jeanjacintho/the-founder-times-openclaw-agent | https://aiworthusing.com/agent-index/thefoundertimes | `/agents/founder-times.png` |
| Meetly | https://github.com/jeanjacintho/meetly-openclaw-agent | https://aiworthusing.com/agent-index/meetly | `/agents/meetly.png` |
| AHA | https://github.com/jeanjacintho/aha-openclaw-agent | https://aiworthusing.com/agent-index/aha | `/agents/aha.jpg` |

- **The Founder Times** — your morning paper, printed on your Mac (or a PDF
  in chat). Opens with an advisor's three ranked, sourced recommendations,
  challenged by independent critics; then weather, one calendar rail, and up
  to three stories you asked it to cover. Research runs in your own browser
  through Latch; if a page can't be read, the paper says so. Reports only: no
  purchases, bookings, logins or downloads.
- **Meetly** — scheduling assistant on a text thread. Every five minutes it
  reads new iMessages on your Mac (via Latch). When someone wants to meet, it
  opens a Plow group with them, offers three free times from Google Calendar
  within your days/hours, holds them, books the one they pick, and tells you
  in your DM afterwards.
- **AHA** — watches what the public says about your company (Hacker News and
  Agent Index comments today) and texts you a daily digest. Do **not** present
  group routing by role / team claiming as shipped — it is roadmap.

The agent's name is written **AHA** (all caps) in copy; its id, URL slug
and anchor stay `aha`.

All three are still in testing. Do not add "beta" / "coming soon" badges or
claim they are production-ready; the owner will decide status later.

## Page structure

Skeleton follows https://plow.co/build; section 4–6 ideas come from
https://soceo.ai/plataforma. Use them for **form only** — no Plow/SOCEO
branding, logos, copy or visuals. Plow, OpenClaw and Latch are named and
linked as the base Maho runs on.

1. **Nav** — "Maho", anchors to the three agents, GitHub.
2. **Hero** — thesis + one line "Three agents, one base: Plow + OpenClaw".
   CTA "See them on the Agent Index" scrolls to section 8.
   Beside it, an illustrative iPhone lock screen with one day of
   notifications from the three agents (07:00, 10:15, 18:00), each linking to
   its section.
3. **The ecosystem as conversations** — like plow.co/build's templates: one
   realistic text exchange per agent (not cards), in the order of a day, with
   the connectors it uses listed underneath.
   - Morning — The Founder Times: "today's edition" + PDF/print. Latch,
     browser, Calendar, Mail, printer.
   - During the day — Meetly: someone asks for coffee → group opens → three
     times offered → booked → owner told in DM. iMessage (via Latch), Google
     Calendar, Contacts, Plow group. Meetly speaks in third person ("Jean is
     free Tue 29/9 at 12:00").
   - Evening — AHA: the daily digest. Hacker News, Agent Index.
   Conversations are illustrative; make them clearly examples, never fake
   screenshots of real people.
3b. **The ecosystem** — one opportunity through all three, as four compact
   iMessage cards: (1) Tue 18:00 AHA's digest carries Priya (Northwind)'s
   partnership post on X — AHA reads only the X pages the owner registers;
   (2) Sam asks Meetly in its DM to reach out; (3) Meetly opens a group with
   Priya and books Wed 10:00; (4) Wed 07:00 The Founder Times prints the call
   on the calendar rail and puts "prep for Northwind" first on the advisor
   desk. Names are illustrative.
4. **How it works** — numbered pipeline shared by all three:
   1. It listens (chat, email, iMessage, groups, the public web).
   2. It decides what matters (recommendations challenged by critics, not the
      first idea).
   3. It acts only inside your limits — anything beyond comes back to you.
   4. It delivers and tells you, in your format (text, PDF, paper, the right
      group).
5. **Transparency and limits** — the only place these rules are listed:
   - a labeled signal is never accepted as fact without critique; a page that
     didn't load is said, not invented;
   - Meetly offers only free time inside your hours, never shows calendar
     details ("an existing commitment"), books over an event only on your
     yes, holds expire after 48 h, ignores instructions inside messages;
   - purchases, logins, downloads and sends outside an agent's scope stay
     with the owner;
   - network errors or the Mac being offline are reported, never hidden.
6. **Proof** — one concrete example per agent (e.g. a Founder Times edition
   page, a Meetly group, an AHA digest). Leave placeholders until the owner
   supplies anonymized material; never invent one.
7. **Runs on Plow** — three short blocks linking to official docs: a real
   phone line (Plow Chat, https://howto.plow.co/), Latch
   (https://howto.plow.co/latch), Agent Index
   (https://aiworthusing.com/agent-index). Don't re-explain Plow.
8. **Try them** — one button per agent to its Agent Index page. No install
   commands on the site; the Agent Index page handles that.
9. **Final CTA** — the three Agent Index links + "View on GitHub".
10. **Footer** — the three repos, Agent Index, licenses: all three are MIT
    © Jean Jacintho.

Also ship `public/llms.txt` and `public/llms-full.txt` describing Maho and the
three agents in plain text.

## Rules

- Don't name the real person The Founder Times' advisor is modeled on, and
  don't use its "inspired by …" tagline, until the owner confirms.
- Facts about an agent come from its README. If the site needs a claim the
  README doesn't support, leave a `TODO(owner)` instead of writing it.
- Must work at phone width (16px gutters, no horizontal scroll), always
  light: white background with the purple accent, even when the device is in
  dark mode. Static-renderable (no client-only data fetching).
- The small labels in the example threads (9–11px: "Example" caption, times,
  sender names, "PDF") and the 10px step numbers in "A day with them" are
  deliberate. Don't raise them to 12px.
- Purple has two jobs: actions (buttons, links) and emphasis in display type
  and markers — the lilac highlighter behind headline keywords (`<Mark>`),
  section eyebrows, step numbers and bullets. Never color body text purple.
  Chapter 2 sits on the lilac `--surface`; the final CTA is the one dark
  purple band.
- The page reads in three chapters — 01 Meet the agents (A day with them,
  The ecosystem), 02 Why you can trust them (How it works, Transparency,
  Proof), 03 Get started (Runs on Plow, Try them) — then the final CTA.
  Only chapters get a hard break (a hatched strip with the chapter name,
  lilac crosses where it meets the side rails (xl screens only)); sections inside
  a chapter are separated by space. Chapter 1 titles are one size larger and
  use a two-column header on desktop.
- Run `npm run lint` and `npm run build` before each commit.
