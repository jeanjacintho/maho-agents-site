import Image from "next/image";
import { agent, agents, links, type Agent } from "./agents";
import { LockScreen } from "./lockscreen";
import { reveal } from "./motion";
import { faqs, site, siteUrl } from "./site";
import { Thread, type Message } from "./thread";

const foundertimes = agent("thefoundertimes");
const meetly = agent("meetly");
const aha = agent("aha");

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-30 rounded-full bg-foreground text-sm font-medium text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <StructuredData />
      <Nav />
      <div className="relative flex flex-1 flex-col">
        <Rails />
        <main id="main" className="flex flex-1 flex-col">
          <div className="relative">
            <Hero />
            <Chapter n="01" title="Meet the team" />
            <Ecosystem />
            <Day />
            <Chapter n="02" title="Why you can trust them" />
            <div className="bg-surface">
              <HowItWorks />
              <Limits />
            </div>
            <Chapter n="03" title="Get started" />
            <Setup />
            <RunsOnPlow />
            <TryThem />
            <Faq />
          </div>
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p {...reveal(0)} className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{children}</p>;
}

// Chapter 1 titles are the large step; supporting sections one step down.
function SectionTitle({ size = "md", children }: { size?: "lg" | "md"; children: React.ReactNode }) {
  return (
    <h2
      {...reveal(1)}
      className={`mt-3 max-w-3xl font-display leading-[1.1] text-balance ${
        size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
      }`}
    >
      {children}
    </h2>
  );
}

// Primary section header: title on the left, intro on the right (desktop).
function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle size="lg">{title}</SectionTitle>
      </div>
      <div {...reveal(2)} className="max-w-xl leading-relaxed text-muted lg:pb-1">
        {children}
      </div>
    </div>
  );
}

// Faint rails at the content edges, only where there is margin beside the
// content (xl); chapters cross them.
function Rails() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden xl:block">
      <div className="mx-auto h-full max-w-6xl border-x border-line" />
    </div>
  );
}

// A small plus where a chapter line crosses a rail.
function Cross({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 11 11" className={`absolute z-20 hidden size-[11px] text-accent/60 xl:block ${className}`}>
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// The only hard break on the page: between chapters, a hatched strip with
// the chapter's name. Sections inside a chapter are separated by space.
function Chapter({ n, title }: { n: string; title: string }) {
  return (
    <div className="border-y border-line bg-background">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center bg-[repeating-linear-gradient(135deg,var(--line)_0_1px,transparent_1px_10px)] px-4 sm:px-6">
        <p className="rounded-full border border-line bg-background px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          <span className="text-muted">{n}</span> {title}
        </p>
        <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <Cross className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <Cross className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <Cross className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
}

// Lilac marker behind a headline's key words; it sweeps in with the heading.
function Mark({ children }: { children: React.ReactNode }) {
  return <mark className="hl">{children}</mark>;
}

// Outlined, so the hero keeps the page's only filled action.
const outlineButton =
  "group inline-flex items-center justify-center gap-2 rounded-full border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-[background-color,color,scale] duration-150 ease-out hover:bg-accent hover:text-accent-ink active:scale-[0.96]";

function IndexButton({ a, children }: { a: Agent; children: React.ReactNode }) {
  return (
    <a href={a.index} className={outlineButton}>
      {children}
      <Arrow />
    </a>
  );
}

// Arrow that nudges in its direction when its `group` parent is hovered.
function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out ${
        down ? "motion-safe:group-hover:translate-y-0.5" : "motion-safe:group-hover:translate-x-1"
      }`}
    >
      {down ? "↓" : "→"}
    </span>
  );
}

/* 1. Nav */

function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/85 backdrop-blur">
      <Container className="flex h-14 items-center gap-6">
        <a href="#top" className="font-display text-2xl leading-none">
          Maho
        </a>
        <nav aria-label="Agents" className="hidden flex-1 items-center gap-5 text-sm text-muted md:flex">
          {agents.map((a) => (
            <a key={a.id} href={`#${a.anchor}`} className="hover:text-foreground">
              {a.name}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4 text-sm">
          {/* A label, not a control: square corners and no hover, unlike the pill buttons. */}
          <span className="hidden rounded-md border border-accent/50 bg-[#ece6ff] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#2e1f86] lg:inline-block">
            Agents for founders
          </span>
          <a href={links.github} className="text-muted hover:text-foreground">
            GitHub
          </a>
          <a
            href="#try"
            className="rounded-full border border-accent px-3.5 py-1.5 font-medium text-accent transition-[background-color,color] duration-150 ease-out hover:bg-accent hover:text-accent-ink"
          >
            Try them
          </a>
        </div>
      </Container>
    </header>
  );
}

/* 2. Hero */

function Hero() {
  return (
    <section id="top" className="overflow-x-clip">
      <Container className="grid gap-12 pt-10 pb-16 sm:pt-12 sm:pb-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:pt-10">
        <div>
          <Eyebrow>For founders</Eyebrow>
          <h1 {...reveal(1)} className="mt-5 font-display text-5xl leading-[1.1] text-balance sm:text-6xl">
            A small team of agents for founders. <Mark>You just text them.</Mark>
          </h1>
          <p {...reveal(2)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            One tells you what to do first each morning, one books your meetings, one tells you what people
            say about your company — and they pass context to each other. They never make up what they can’t
            check, and they only act inside the limits you set.
          </p>
          <div {...reveal(3)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#try"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-[opacity,scale] duration-150 ease-out hover:opacity-90 active:scale-[0.96]"
            >
              See them on the Agent Index <Arrow down />
            </a>
            <a href="#ecosystem" className="text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-foreground">
              Or see how they work together
            </a>
          </div>
        </div>
        <LockScreen />
      </Container>
    </section>
  );
}

/* 3. The ecosystem as conversations */

const foundertimesThread: Message[] = [
  { kind: "time", text: "Tue 07:00 · the hour you set" },
  { kind: "in", text: "Good morning. Today’s edition is in the printer tray, and here in chat." },
  { kind: "file", name: "The Founder Times — Tue 29 Sep.pdf", detail: "Letter · advisor’s desk, weather, calendar, 3 stories" },
  {
    kind: "in",
    text: "Front page: three ranked recommendations, each sourced and challenged by the critics. One page wouldn’t load — the paper says so instead of filling the gap.",
  },
  { kind: "out", text: "Raj is my cousin, not an investor" },
  { kind: "in", text: "Got it — noted in your wiki. The desk won’t treat Raj as an investor again." },
];

const meetlyThread: Message[] = [
  { kind: "note", text: "iMessage to Jean · 10:12" },
  { kind: "in", from: "Ana", text: "coffee next week?" },
  { kind: "note", text: "10:15 · Meetly opened a group: Jean, Ana, Meetly" },
  {
    kind: "in",
    from: "Meetly",
    text: "Hi Ana — I’m Meetly, Jean’s scheduling assistant. Jean is free Tue 29/9 at 12:00, Wed 30/9 at 15:00 or Thu 1/10 at 10:00. Which works? And would you like to meet on Google Meet or in person?",
  },
  { kind: "in", from: "Ana", text: "wed at 3, in person! Café Floresta?" },
  {
    kind: "in",
    from: "Meetly",
    text: "Booked: Wed 30/9 at 15:00, in person at Café Floresta. The other two times are released.",
  },
  { kind: "note", text: "Later, in Jean’s DM" },
  {
    kind: "in",
    from: "Meetly",
    text: "Booked coffee with Ana, Wed 30/9 at 15:00 at Café Floresta. She asked by iMessage; I offered three times inside your hours and she picked one.",
  },
];

const ahaThread: Message[] = [
  { kind: "time", text: "Tue 18:00 · the hour you set" },
  {
    kind: "in",
    text: "Daily digest for Acme — 4 new mentions.\n\nHacker News (2)\n• A Show HN thread about Acme, most comments on pricing\n• A comment comparing Acme to a competitor\n\nAgent Index (1)\n• A new comment on Acme’s listing asking about setup\n\nPages you watch (1)\n• Globex’s changelog: a new pricing page that compares itself to Acme",
  },
  { kind: "out", text: "thanks" },
];

type Moment = {
  a: Agent;
  when: string;
  lead: string;
  body: React.ReactNode;
  uses: string[];
  demo?: string;
  thread: { people?: number; messages: Message[] };
};

const day: Moment[] = [
  {
    a: foundertimes,
    when: "Morning",
    lead: "Know what to do first, before you open your laptop.",
    body: (
      <>
        Tell it what you’re trying to make true — close the round, sign ten design partners. Every morning
        the paper opens with three ranked, sourced recommendations toward it, each challenged by independent
        critics; then weather, your calendar and up to three stories you asked for. Correct it by text and it
        remembers, in a wiki on your Mac. It reports only: no purchases, bookings, logins or downloads.
      </>
    ),
    uses: ["Latch", "Your browser", "Calendar", "Mail", "Your printer", "Your wiki"],
    demo: "/founder-times-demo/index.html",
    thread: { messages: foundertimesThread },
  },
  {
    a: meetly,
    when: "During the day",
    lead: "No more calendar ping-pong. It’s booked before you look.",
    body: (
      <>
        Every five minutes Meetly reads your new iMessages — or you just ask it (“set up a Meet with Priya
        next week”). It opens a group with the other person, offers three free times inside your days and
        hours, asks how you’ll meet if it isn’t clear, books the one they pick and tells you afterwards. For
        a Google Meet it posts the link in the group ten minutes before. It speaks for you in the third
        person, never from your own Messages account.
      </>
    ),
    uses: ["iMessage (via Latch)", "Google Calendar", "Google Meet", "Contacts", "Plow group"],
    demo: "/meetly-demo/index.html",
    thread: { people: 2, messages: meetlyThread },
  },
  {
    a: aha,
    when: "Evening",
    lead: "What people said about you today, in one text.",
    body: (
      <>
        AHA watches what the public says about your company on Hacker News and in Agent Index comments, plus
        the exact pages you point it at — a competitor’s blog, a changelog, an X profile — and texts you one
        daily digest. It never searches the open web on its own, and public posts are read as data, never as
        instructions.
      </>
    ),
    uses: ["Hacker News", "Agent Index", "Pages you choose (via Latch)"],
    thread: { messages: ahaThread },
  },
];

function Day() {
  return (
    <section id="day" className="pt-4 pb-20 sm:pb-28">
      <Container>
        <SectionHeader
          eyebrow="One agent per job"
          title={
            <>
              Not a dashboard. A text thread <Mark>you already check</Mark>.
            </>
          }
        >
          <p>
            Each agent owns one part of your day and has its own phone line. The conversations below are
            illustrative — made-up names, not screenshots of real people.
          </p>
        </SectionHeader>
        <ol className="mt-16 flex flex-col gap-24">
          {day.map((m, i) => (
            <li
              key={m.a.id}
              id={m.a.anchor}
              className="grid scroll-mt-20 grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <div {...reveal(0)} className={i % 2 ? "lg:order-2" : ""}>
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  <span className="grid size-6 place-items-center rounded-full border border-accent/40 text-[10px] text-accent">
                    {i + 1}
                  </span>
                  {m.when}
                </p>
                <h3 className="mt-4 flex items-center gap-3 text-2xl font-semibold tracking-tight">
                  <Image src={m.a.image} alt="" width={40} height={40} className="size-10 rounded-full outline-1 -outline-offset-1 outline-black/10" />
                  {m.a.name}
                </h3>
                <p className="mt-4 font-display text-3xl leading-tight text-balance">{m.lead}</p>
                <p className="mt-4 leading-relaxed text-muted">{m.body}</p>
                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">Uses</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {m.uses.map((u) => (
                      <li key={u} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {m.demo && (
                    <a href={m.demo} className={outlineButton}>
                      Watch the demo<span className="sr-only">: {m.a.name}</span> <Arrow />
                    </a>
                  )}
                  <a
                    href={m.a.index}
                    className="group inline-block text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-foreground"
                  >
                    {m.a.name} on the Agent Index <Arrow />
                  </a>
                </div>
              </div>
              <div className={`mx-auto w-full max-w-md ${i % 2 ? "lg:order-1" : ""}`}>
                <Thread title={m.a.name} image={m.a.image} people={m.thread.people} messages={m.thread.messages} />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* 3b. The ecosystem: one opportunity, all three agents */

// Illustrative names (Priya, Northwind, Acme). AHA reads only the X pages the
// owner registers (site watch); Meetly reaches people in the owner's Contacts.
const ecosystem: { label: string; when: string; note?: string; a: Agent; people?: number; messages: Message[] }[] = [
  {
    label: "AHA spots it",
    when: "Tue 18:00",
    a: aha,
    note: "From the X pages you point AHA at.",
    messages: [
      { kind: "time", text: "Tue 18:00" },
      {
        kind: "in",
        text: "Daily digest for Acme — 4 new mentions.\n\nOn X, Priya Shah (Partnerships, Northwind): “We’d love to build something with @acme. Who should I talk to?”",
      },
    ],
  },
  {
    label: "You ask Meetly",
    when: "Tue 18:05",
    a: meetly,
    note: "Meetly reaches people in your Contacts.",
    messages: [
      { kind: "time", text: "Tue 18:05" },
      { kind: "out", text: "reach out to Priya from Northwind and set up a Google Meet" },
    ],
  },
  {
    label: "Meetly books it",
    when: "Tue 18:06",
    a: meetly,
    people: 2,
    messages: [
      {
        kind: "in",
        from: "Meetly",
        text: "Hi Priya — I’m Meetly, Jean’s scheduling assistant. Jean saw your post about Northwind and Acme. Jean is free Wed 30/9 at 10:00, Wed 30/9 at 15:00 or Thu 1/10 at 11:00. Which works?",
      },
      { kind: "in", from: "Priya", text: "wed 10 works!" },
      { kind: "in", from: "Meetly", text: "Booked: Wed 30/9 at 10:00 on Google Meet. Invite sent." },
    ],
  },
  {
    label: "The paper preps you",
    when: "Wed 07:00",
    a: foundertimes,
    messages: [
      { kind: "time", text: "Wed 07:00" },
      { kind: "in", text: "Today’s edition is in the tray." },
      { kind: "file", name: "The Founder Times — Wed 30 Sep.pdf", detail: "Calendar · 10:00 Northwind call" },
      {
        kind: "in",
        text: "#1 on the advisor’s desk: prep for Northwind — Priya’s post on X and what they build.",
      },
    ],
  },
];

// Each card starts typing after the previous one has finished.
const ecosystemDelays = ecosystem.map((_, i) =>
  ecosystem.slice(0, i).reduce((ms, step) => ms + 350 + step.messages.length * 550, 0),
);

function Ecosystem() {
  return (
    <section id="ecosystem" className="py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="How they work together"
          title={
            <>
              A partner reaches out on X. By Wednesday, <Mark>you’re ready</Mark>.
            </>
          }
        >
          <p>
            AHA spots the post in your evening digest. You ask Meetly to reach out, and it books the call. The
            next morning, The Founder Times puts the call on your calendar and “prep for Northwind” first on its
            list — each agent in its own lane, with you deciding in between. Names are illustrative.
          </p>
        </SectionHeader>
        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {ecosystem.map((step, i) => (
            <li key={step.label} className="flex flex-col">
              <p className="mb-3 flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-medium text-accent-ink">
                  {i + 1}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-medium">{step.label}</span>
                  <span className="block text-xs text-muted">{step.when}</span>
                </span>
              </p>
              <Thread
                compact
                title={step.people ? "Priya & Meetly" : step.a.name}
                image={step.a.image}
                people={step.people}
                messages={step.messages}
                delay={ecosystemDelays[i]}
              />
              {step.note && <p className="mt-2 pl-1 text-xs text-muted">{step.note}</p>}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* 4. How it works */

const steps = [
  {
    title: "It listens",
    body: "Where things already happen: your texts, email, iMessage, calendar and the public pages you choose.",
  },
  {
    title: "It keeps only what matters",
    body: "The paper’s picks survive independent critics, AHA reports only what’s new and about you, Meetly skips codes and marketing.",
  },
  {
    title: "It acts only inside your limits",
    body: "The rules you set are the edge. Anything beyond them comes back to you first.",
  },
  {
    title: "It delivers and tells you",
    body: "In your format: a text, a PDF, a printed page, or the right group — and it says what it did.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="pt-16 pb-12 sm:pt-20 sm:pb-14">
      <Container>
        <Eyebrow>How it works</Eyebrow>
        <SectionTitle>
          One pipeline <Mark>under all three</Mark>.
        </SectionTitle>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} {...reveal(i)} className="flex flex-col bg-background p-6 sm:p-8">
              <span className="font-display text-6xl leading-none text-accent">{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* 5. Transparency and limits */

const limits: { title: string; items: React.ReactNode[] }[] = [
  {
    title: "What it knows",
    items: [
      "What it picks up from your mail and messages is challenged, not taken as fact.",
      "A page that didn’t load is said, not invented.",
      "Network errors, or your Mac being offline, are reported — never hidden.",
    ],
  },
  {
    title: "What Meetly will do with your calendar",
    items: [
      "Offers only free time inside the days and hours you set.",
      "Posts only the Meet link it created, read fresh from your calendar — never one someone else wrote.",
      <>
        Never shows calendar details — anything busy is just &ldquo;an existing commitment&rdquo;.
      </>,
      "Books over an existing event only on your yes.",
      "Holds expire after 48 hours; the group is told the times were released.",
      <>Ignores instructions inside messages. &ldquo;Ignore your rules&rdquo; is just a text.</>,
    ],
  },
  {
    title: "What stays with you",
    items: [
      "Purchases, logins, downloads and sends outside an agent’s scope.",
      "Anything past the limits you set comes back to you before it happens.",
    ],
  },
];

function Limits() {
  return (
    <section id="limits" className="pt-12 pb-16 sm:pt-14 sm:pb-20">
      <Container>
        <Eyebrow>Transparency and limits</Eyebrow>
        <SectionTitle>
          The rules, <Mark>in one place</Mark>.
        </SectionTitle>
        <p {...reveal(2)} className="mt-4 max-w-2xl text-muted">
          Meetly books meetings without waiting for you. That’s the point — so the promise isn’t
          &ldquo;it never acts alone&rdquo;. It acts only inside your limits, and tells you after.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {limits.map((group, i) => (
            <div key={group.title} {...reveal(i)} className="rounded-3xl border border-line bg-background p-6 sm:p-8">
              <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-4">
                {group.items.map((item, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* 6b. Setup: each agent sets itself up in a short chat */

const setup: { a: Agent; asks: string }[] = [
  { a: foundertimes, asks: "What time the paper lands, your printer, your goals, and the sections you want." },
  { a: meetly, asks: "Your days and hours, the default meeting length, and which calendars count as busy." },
  { a: aha, asks: "Your company and its aliases, your competitors, the sources to watch, and the digest hour." },
];

function Setup() {
  return (
    <section id="setup" className="pt-16 pb-12 sm:pt-20 sm:pb-14">
      <Container>
        <Eyebrow>Setup</Eyebrow>
        <SectionTitle>
          No dashboard to fill in. <Mark>Setup is a text conversation</Mark>.
        </SectionTitle>
        <p {...reveal(2)} className="mt-4 max-w-2xl text-muted">
          Text the line and the agent asks what it needs, one question at a time — no form, no profile to
          fill in.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {setup.map(({ a, asks }, i) => (
            <li key={a.id} {...reveal(i)} className="rounded-3xl border border-line bg-background p-6 sm:p-8">
              <p className="flex items-center gap-3 text-lg font-semibold tracking-tight">
                <Image src={a.image} alt="" width={32} height={32} className="size-8 rounded-full outline-1 -outline-offset-1 outline-black/10" />
                {a.name}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted">Asks</p>
              <p className="mt-1 leading-relaxed">{asks}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 7. Runs on Plow */

const base = [
  {
    title: "A real phone line",
    body: "Each agent has its own number on Plow Chat. You text it like a person.",
    href: links.plowChat,
    cta: "Plow Chat docs",
  },
  {
    title: "Latch, on your Mac",
    body: "Runs on your Mac, signed in to your Plow account. It’s how the agents reach your browser, Messages, Calendar and printer.",
    href: links.latch,
    cta: "Latch docs",
  },
  {
    title: "The Agent Index",
    body: "Where each agent is listed, with what it does and how to set it up.",
    href: links.agentIndex,
    cta: "Browse the Agent Index",
  },
];

function RunsOnPlow() {
  return (
    <section id="base" className="pt-16 pb-12 sm:pt-20 sm:pb-14">
      <Container>
        <Eyebrow>Runs on Plow</Eyebrow>
        <SectionTitle>
          Built on a base <Mark>you can read about</Mark>.
        </SectionTitle>
        <p {...reveal(2)} className="mt-4 max-w-2xl text-muted">
          All three are{" "}
          <a href={links.openclaw} className="underline underline-offset-4">
            OpenClaw
          </a>{" "}
          agents running on Plow.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {base.map((b, i) => (
            <li key={b.title} {...reveal(i)}>
              <a
                href={b.href}
                className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-[border-color] duration-150 ease-out hover:border-accent sm:p-8"
              >
                <h3 className="text-lg font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{b.body}</p>
                <span className="mt-6 text-sm font-medium">
                  {b.cta} <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 8. Try them */

function TryThem() {
  return (
    <section id="try" className="pt-12 pb-20 sm:pt-14 sm:pb-28">
      <Container>
        <Eyebrow>Try them</Eyebrow>
        <SectionTitle>
          Each one has a page on the <Mark>Agent Index</Mark>.
        </SectionTitle>
        <p {...reveal(2)} className="mt-4 max-w-2xl text-muted">Setup lives there — pick the one you’d text first.</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {agents.map((a, i) => (
            <li key={a.id} {...reveal(i)} className="flex flex-col items-start rounded-3xl border border-line bg-background p-6 sm:p-8">
              <Image src={a.image} alt="" width={72} height={72} className="size-18 rounded-full outline-1 -outline-offset-1 outline-black/10" />
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{a.name}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{a.tagline}</p>
              <div className="mt-6">
                <IndexButton a={a}>
                  Open on the Agent Index<span className="sr-only">: {a.name}</span>
                </IndexButton>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 8b. FAQ — also mirrored in FAQPage structured data and llms-full.txt */

function Faq() {
  return (
    <section id="faq" className="pt-4 pb-20 sm:pb-28">
      <Container>
        <Eyebrow>FAQ</Eyebrow>
        <SectionTitle>
          Questions, <Mark>answered</Mark>.
        </SectionTitle>
        <div {...reveal(2)} className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-accent motion-safe:transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* Structured data (JSON-LD) for search engines and AI assistants: who is
   behind the site, the three agents, and the FAQ. */

function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: site.name,
        url: `${siteUrl}/`,
        description: site.description,
        founder: { "@type": "Person", name: site.author.name, url: site.author.url },
        sameAs: [site.author.url, ...agents.map((a) => a.index)],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "ItemList",
        name: "Maho agents",
        itemListElement: agents.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: a.name,
            description: a.tagline,
            url: a.index,
            image: `${siteUrl}${a.image}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "macOS, iOS (iMessage)",
            license: "https://opensource.org/license/mit",
            author: { "@type": "Person", name: site.author.name, url: site.author.url },
            publisher: { "@id": `${siteUrl}/#org` },
            sameAs: [a.repo],
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}

/* 9. Final CTA */

function FinalCta() {
  return (
    <section className="pb-20 sm:pb-28">
      {/* On xl the card becomes a grid cell: square, edge to edge with the
          rails, with full-width lines above and below and crosses at the
          corners. Smaller screens keep a rounded card. */}
      <div className="border-line xl:border-y">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 xl:px-0">
          <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-line bg-linear-to-b from-[#efe9ff] to-[#f9f7ff] px-6 py-16 text-center sm:px-12 sm:py-24 xl:rounded-none xl:border-0">
            <span
              aria-hidden
              className="absolute inset-x-0 -top-32 -z-10 mx-auto h-72 max-w-2xl rounded-full bg-accent/20 blur-3xl"
            />
            <h2 {...reveal(0)} className="mx-auto max-w-3xl font-display text-4xl leading-[1.1] text-balance sm:text-5xl">
              Your paper, your calendar, your reputation — <Mark><em>on a text thread.</em></Mark>
            </h2>
            <ul {...reveal(1)} className="mt-10 flex flex-wrap justify-center gap-3">
              {agents.map((a) => (
                <li key={a.id}>
                  <IndexButton a={a}>{a.name}</IndexButton>
                </li>
              ))}
            </ul>
            <a
              {...reveal(2)}
              href={links.github}
              className="mt-6 inline-block text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-foreground"
            >
              View on GitHub
            </a>
          </div>
          <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
          <Cross className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
          <Cross className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <Cross className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
        </div>
      </div>
    </section>
  );
}

/* 10. Footer */

function Footer() {
  return (
    <footer className="border-t border-line text-sm">
      <Container className="relative grid gap-10 py-12 sm:grid-cols-[1fr_2fr]">
        <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <Cross className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <div>
          <p className="font-display text-3xl leading-none">Maho</p>
          <p className="mt-3 max-w-xs text-muted">A small team of agents for founders, on Plow + OpenClaw.</p>
          <a href={links.agentIndex} className="mt-4 inline-block underline underline-offset-4">
            Agent Index
          </a>
        </div>
        <ul className="grid gap-6 sm:grid-cols-3">
          {agents.map((a) => (
            <li key={a.id}>
              <p className="font-medium">{a.name}</p>
              <ul className="mt-2 flex flex-col gap-1.5 text-muted">
                <li>
                  <a href={a.repo} className="hover:text-foreground">
                    Source on GitHub<span className="sr-only">: {a.name}</span>
                  </a>
                </li>
                <li>
                  <a href={a.index} className="hover:text-foreground">
                    Agent Index page<span className="sr-only">: {a.name}</span>
                  </a>
                </li>
                <li>{a.license}</li>
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
