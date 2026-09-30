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
            <Problem />
            <Chapter n="01" title="Meet the team" />
            <Ecosystem />
            <Day />
            <Start />
            <Chapter n="02" title="Why you can trust them" />
            <div className="bg-surface">
              <HowItWorks />
              <Limits />
            </div>
            <Chapter n="03" title="Get started" />
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
            Get started
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
          <Eyebrow>Meet Maho</Eyebrow>
          <h1 {...reveal(1)} className="mt-5 font-display text-5xl leading-[1.1] text-balance sm:text-6xl">
            AI agents for founders, <Mark>over text</Mark>.
          </h1>
          <p {...reveal(2)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Your morning brief, your meetings and your mentions — handled. They never guess, and never act
            past your limits.
          </p>
          <div {...reveal(3)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#try"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-[opacity,scale] duration-150 ease-out hover:opacity-90 active:scale-[0.96]"
            >
              Pick your first agent <Arrow down />
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

/* 2b. The problem, in the reader's words, before any agent appears */

const pains = [
  "“coffee next week?” turns into six texts about times.",
  "You find the Hacker News thread about you three days late.",
  "You open your laptop and the inbox decides your day.",
];

function Problem() {
  return (
    <section id="problem" className="pb-20 sm:pb-28">
      <Container>
        <Eyebrow>Sound familiar?</Eyebrow>
        <SectionTitle>
          The small jobs <Mark>no one else does</Mark>.
        </SectionTitle>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {pains.map((p, i) => (
            <li
              key={p}
              {...reveal(i)}
              className="rounded-3xl border border-line bg-surface p-6 font-display text-2xl leading-snug text-balance sm:p-8"
            >
              {p}
            </li>
          ))}
        </ul>
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
    text: "Front page: three ranked, sourced picks. One page wouldn’t load — the paper says so.",
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
    text: "Hi Ana — I’m Meetly, Jean’s scheduling assistant. Jean is free Tue 12:00, Wed 15:00 or Thu 10:00. Which works — Google Meet or in person?",
  },
  { kind: "in", from: "Ana", text: "wed at 3, in person! Café Floresta?" },
  {
    kind: "in",
    from: "Meetly",
    text: "Booked: Wed 30/9 at 15:00 at Café Floresta. The other times are released.",
  },
  { kind: "note", text: "Later, in Jean’s DM" },
  {
    kind: "in",
    from: "Meetly",
    text: "Booked coffee with Ana, Wed 30/9 at 15:00. She picked one of three times inside your hours.",
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
        Three sourced recommendations toward your goal, printed every morning.
      </>
    ),
    uses: ["Your browser", "Calendar", "Mail", "Your printer", "A wiki on your Mac"],
    demo: "/founder-times-demo/index.html",
    thread: { messages: foundertimesThread },
  },
  {
    a: meetly,
    when: "During the day",
    lead: "No more calendar ping-pong. It’s booked before you look.",
    body: (
      <>
        Someone texts “coffee next week?” Meetly offers your free times and books one.
      </>
    ),
    uses: ["Your iMessages", "Google Calendar", "Google Meet", "Contacts", "A group text"],
    demo: "/meetly-demo/index.html",
    thread: { people: 2, messages: meetlyThread },
  },
  {
    a: aha,
    when: "Evening",
    lead: "What people said about you today, in one text.",
    body: (
      <>
        From Hacker News, Agent Index and the pages you choose.
      </>
    ),
    uses: ["Hacker News", "Agent Index", "Pages you choose"],
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
            Illustrative conversations, made-up names.
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
              <div className={`mx-auto w-full max-w-[25rem] ${i % 2 ? "lg:order-1" : ""}`}>
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
            AHA spots it, Meetly books it, The Founder Times preps you. You decide in between.
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
    body: "Your texts, mail, calendar and the pages you choose.",
  },
  {
    title: "It keeps only what matters",
    body: "Critics challenge the picks. Noise is dropped.",
  },
  {
    title: "It acts only inside your limits",
    body: "Anything beyond them comes back to you first.",
  },
  {
    title: "It delivers and tells you",
    body: "A text, a PDF or a printed page — and it says what it did.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="pt-16 pb-12 sm:pt-20 sm:pb-14">
      <Container>
        <Eyebrow>Under the hood</Eyebrow>
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
      "Tips from your mail and messages are checked, not taken as fact.",
      "A page that didn’t load is said, not invented.",
      "Errors, or your Mac being offline, are reported.",
    ],
  },
  {
    title: "What Meetly does with your calendar",
    items: [
      "Offers only free time inside your hours.",
      <>Never shows details — busy is just &ldquo;an existing commitment&rdquo;.</>,
      "Books over an event only on your yes.",
      "Holds expire after 48 hours.",
      "Ignores instructions inside messages.",
    ],
  },
  {
    title: "What stays with you",
    items: ["Purchases, logins and downloads.", "Anything past your limits."],
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
          It acts only inside your limits, and tells you after.
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

/* 3c. How to start, from the reader's side: pick, text, get */

const start = [
  { title: "Pick an agent", body: "Each has a page on the Agent Index." },
  {
    title: "Text its number",
    body: "It asks a few questions. No form.",
  },
  {
    title: "Get the result",
    body: "Your paper, your meetings, your digest.",
  },
];

function Start() {
  return (
    <section id="start" className="pt-4 pb-20 sm:pb-28">
      <Container>
        <Eyebrow>How it works</Eyebrow>
        <SectionTitle>
          Three steps, <Mark>all by text</Mark>.
        </SectionTitle>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {start.map((s, i) => (
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

/* 7. Runs on Plow */

const base = [
  {
    title: "A real phone line",
    body: "Each agent has its own number. Text it like a person.",
    href: links.plowChat,
    cta: "Plow Chat docs",
  },
  {
    title: "Latch, on your Mac",
    body: "How the agents reach your browser, Messages, Calendar and printer.",
    href: links.latch,
    cta: "Latch docs",
  },
  {
    title: "The Agent Index",
    body: "Where each agent is listed and set up.",
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

const tryCta: Record<Agent["id"], string> = {
  thefoundertimes: "Get your morning paper",
  meetly: "Let Meetly book your meetings",
  aha: "Get your daily digest",
};

function TryThem() {
  return (
    <section id="try" className="pt-12 pb-20 sm:pt-14 sm:pb-28">
      <Container>
        <Eyebrow>Try them</Eyebrow>
        <SectionTitle>
          Pick the one <Mark>you’d text first</Mark>.
        </SectionTitle>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {agents.map((a, i) => (
            <li key={a.id} {...reveal(i)} className="flex flex-col items-start rounded-3xl border border-line bg-background p-6 sm:p-8">
              <Image src={a.image} alt="" width={72} height={72} className="size-18 rounded-full outline-1 -outline-offset-1 outline-black/10" />
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{a.name}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{a.tagline}</p>
              <div className="mt-6">
                <IndexButton a={a}>{tryCta[a.id]}</IndexButton>
                <p className="mt-2 pl-1 text-xs text-muted">On the Agent Index</p>
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
