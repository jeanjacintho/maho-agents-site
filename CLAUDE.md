@AGENTS.md

# Maho — landing page brief

This repo is the landing page for **Maho**, a small team of three agents for
founders that live on a text thread and pass context to each other, built on
Plow + OpenClaw. The reader is a founder: lead with who it's for and what they
get; the base (Plow, OpenClaw, Latch) belongs in chapter 03. The page is in **English**.
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
| AHA | https://github.com/jeanjacintho/aha-openclaw-agent | https://aiworthusing.com/agent-index/aha | `/agents/aha.png` |

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
- **AHA** — watches what the public says about your company (Hacker News,
  Agent Index comments, and the exact pages the owner registers, such as a
  competitor's blog, a changelog or an X profile) and texts you a daily
  digest. Reddit monitoring and approved replies are in the README but not on
  the site until the owner confirms. Do **not** present
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
2. **Hero** — eyebrow "For founders"; "Start the day knowing what matters.
   Let the rest get handled over text." + a line saying Maho is a small team
   of agents for founders, what each does, that they pass context
   to each other, and both halves of the thesis. CTA "Pick your first agent"
   scrolls to section 8; secondary link to the ecosystem.
   Beside it, an illustrative iPhone lock screen with one day of
   notifications from the three agents (07:00, 10:15, 18:00), each linking to
   its section.
2b. **Sound familiar?** — the problem before any agent: three small founder
   pains in the reader's words, one per agent. No invented statistics.
3. **One agent per job** (after 3b on the page) — like plow.co/build's templates: one
   realistic text exchange per agent (not cards), in the order of a day, with
   the connectors it uses listed underneath.
   - Morning — The Founder Times: "today's edition" + PDF/print. Latch,
     browser, Calendar, Mail, printer.
   - During the day — Meetly: someone asks for coffee → group opens → three
     times offered → booked → owner told in DM. iMessage (via Latch), Google
     Calendar, Google Meet, Contacts, Plow group. Meetly speaks in third
     person ("Jean is free Tue 29/9 at 12:00") and, when "coffee" names no
     place, asks Meet or in person in the same message as the times.
   - Evening — AHA: the daily digest. Hacker News, Agent Index, pages you
     choose.
   Each block is one benefit line plus one or two sentences; the thread is
   the proof, and rules live in section 5. Chips use plain words ("A group
   text", "Your iMessages"), not Plow/Latch names.
   The Founder Times and Meetly link to their animated demos in
   `public/*-demo/` ("Watch the demo"). The illustrative owner is Jean, as in
   the demos.
   Conversations are illustrative; the section intro says so (no visible
   "Example" labels — they carry an sr-only caption), and they are never fake
   screenshots of real people.
3b. **How they work together** (first section of chapter 01) — one opportunity through all three, as four compact
   iMessage cards: (1) Tue 18:00 AHA's digest carries Priya (Northwind)'s
   partnership post on X — AHA reads only the X pages the owner registers;
   (2) Jean asks Meetly in its DM to reach out; (3) Meetly opens a group with
   Priya and books Wed 10:00; (4) Wed 07:00 The Founder Times prints the call
   on the calendar rail and puts "prep for Northwind" first on the advisor
   desk. Names are illustrative.
3c. **How it works** (end of chapter 01) — the reader's three steps: pick an
   agent, text its number, get the result; then what each agent asks.
4. **Under the hood** — numbered pipeline shared by all three:
   1. It listens (texts, email, iMessage, calendar, the public pages you choose).
   2. It keeps only what matters (the paper's picks survive critics, AHA
      reports only what's new and about you, Meetly skips codes and marketing).
   3. It acts only inside your limits — anything beyond comes back to you.
   4. It delivers and tells you, in your format (text, PDF, paper, the right
      group).
5. **Transparency and limits** — the only place these rules are listed:
   - what an agent picks up from mail and messages is never accepted as fact without critique; a page that
     didn't load is said, not invented;
   - Meetly offers only free time inside your hours, never shows calendar
     details ("an existing commitment"), books over an event only on your
     yes, holds expire after 48 h, ignores instructions inside messages;
   - purchases, logins, downloads and sends outside an agent's scope stay
     with the owner;
   - network errors or the Mac being offline are reported, never hidden.
7. **Runs on Plow** — three short blocks linking to official docs: a real
   phone line (Plow Chat, https://howto.plow.co/), Latch
   (https://howto.plow.co/latch), Agent Index
   (https://aiworthusing.com/agent-index). Don't re-explain Plow.
8. **Try them** — one button per agent to its Agent Index page, labeled by
   what you get ("Get your morning paper"), with "On the Agent Index" below. No install
   commands on the site; the Agent Index page handles that.
9. **Final CTA** — the three Agent Index links + "View on GitHub".
10. **Footer** — the three repos, Agent Index, licenses: all three are MIT
    © Jean Jacintho.

8b. **FAQ** — questions answered from the READMEs, as native `<details>`.
    The same list feeds the FAQPage structured data and llms-full.txt, so
    edit it once in `src/app/site.ts`.

## SEO and GEO

- `src/app/site.ts` holds the site URL, title, description, keywords and
  FAQ. `siteUrl` comes from `NEXT_PUBLIC_SITE_URL`, else Vercel's production
  URL; set the env var once a custom domain exists.
- `/llms.txt`, `/llms-full.txt` and `/company.txt` are static route handlers
  (`src/app/*.txt/route.ts`, content in `src/app/text-files.ts`) built from
  the same data as the page. Don't add copies under `public/`.
- `robots.ts` allows everyone and names the AI crawlers; `sitemap.ts`,
  `opengraph-image.tsx` (share card) and JSON-LD in the page (Organization,
  WebSite, the three agents, FAQPage) complete it. Structured data must
  match what the page shows.

## Rules

- No proof / "real output" section: the owner won't publish examples of
  real use.
- Don't name the real person The Founder Times' advisor is modeled on, and
  don't use its "inspired by …" tagline, until the owner confirms.
- Facts about an agent come from its README. If the site needs a claim the
  README doesn't support, leave a `TODO(owner)` instead of writing it.
- Must work at phone width (16px gutters, no horizontal scroll), always
  light: white background with the purple accent, even when the device is in
  dark mode. Static-renderable (no client-only data fetching).
- The small labels in the example threads (9–11px: times,
  sender names, "PDF") and the 10px step numbers in "One agent per job" are
  deliberate. Don't raise them to 12px.
- Plain words over internal terms: not "calendar rail", "advisor desk" or
  "labeled signal" in page copy.
- Purple has two jobs: actions (buttons, links) and emphasis in display type
  and markers — the lilac highlighter behind headline keywords (`<Mark>`),
  section eyebrows, step numbers and bullets. Never color body text purple.
  Chapter 2 sits on the lilac `--surface`; the final CTA is a light lilac
  card with a soft glow — rounded on small screens, a square grid cell
  between the rails on xl. The rails run through the footer. No dark purple bands — they clash with the
  light page.
- The page reads: hero, Sound familiar?, then three chapters — 01 Meet the
  team (How they work together, One agent per job, How it works), 02 Why you
  can trust them (Under the hood, Transparency), 03 Get started (Runs on
  Plow, Try them, FAQ) — then the final CTA.
- CTAs say what you get (verb + outcome), not where the link goes.
  Only chapters get a hard break (a hatched strip with the chapter name,
  lilac crosses where it meets the side rails (xl screens only)); sections inside
  a chapter are separated by space. Chapter 1 titles are one size larger and
  use a two-column header on desktop.
- Run `npm run lint` and `npm run build` before each commit.
