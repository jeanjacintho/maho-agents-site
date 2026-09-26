import Image from "next/image";
import { agent, agents, links, type Agent } from "./agents";
import { Thread, type Message } from "./thread";

const foundertimes = agent("thefoundertimes");
const meetly = agent("meetly");
const aha = agent("aha");

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Day />
        <HowItWorks />
        <Limits />
        <Proof />
        <RunsOnPlow />
        <TryThem />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{children}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
      {children}
    </h2>
  );
}

function IndexButton({ a, label }: { a: Agent; label?: string }) {
  return (
    <a
      href={a.index}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
    >
      {label ?? `${a.name} on the Agent Index`}
      <span aria-hidden>→</span>
    </a>
  );
}

/* 1. Nav */

function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/85 backdrop-blur">
      <Container className="flex h-14 items-center gap-6">
        <a href="#top" className="font-serif text-2xl leading-none tracking-tight">
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
          <a href={links.github} className="text-muted hover:text-foreground">
            GitHub
          </a>
          <a
            href="#try"
            className="rounded-full border border-foreground px-3.5 py-1.5 font-medium hover:bg-foreground hover:text-background"
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
    <section id="top" className="border-b border-line">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <Eyebrow>Three agents, one base: Plow + OpenClaw</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-7xl">
            Agents that live where you already are.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Text, email, group chat. They never make up what they can&apos;t check, and they only act
            inside the rules you gave them.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#try"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              See them on the Agent Index <span aria-hidden>↓</span>
            </a>
            <a href="#day" className="text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-foreground">
              Or read a day with them
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-3 gap-3 sm:gap-5" aria-label="The agents">
          {agents.map((a, i) => (
            <li key={a.id} className={i === 1 ? "translate-y-6" : ""}>
              <a href={`#${a.anchor}`} className="group block text-center">
                <Image
                  src={a.image}
                  alt={`${a.name} avatar`}
                  width={220}
                  height={220}
                  preload
                  className="aspect-square w-full rounded-full border border-line object-cover transition-transform group-hover:-rotate-3"
                />
                <span className="mt-3 block text-sm font-medium">{a.name}</span>
              </a>
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
  { kind: "in", text: "Good morning. Today's edition is in the printer tray, and here in chat." },
  { kind: "file", name: "The Founder Times — Tue 29 Sep.pdf", detail: "Letter · advisor's desk, weather, calendar, 3 stories" },
  {
    kind: "in",
    text: "Front page: three ranked recommendations, each sourced and challenged by the critics. One page wouldn't load — the paper says so instead of filling the gap.",
  },
  { kind: "out", text: "put the iPhone price in tomorrow's paper" },
  { kind: "in", text: "Noted — it runs in tomorrow's edition only." },
];

const meetlyThread: Message[] = [
  { kind: "note", text: "iMessage to Sam · 10:12" },
  { kind: "in", from: "Ana", text: "coffee next week?" },
  { kind: "note", text: "10:15 · Meetly opened a group: Sam, Ana, Meetly" },
  {
    kind: "in",
    from: "Meetly",
    text: "Hi Ana — I'm Meetly, Sam's scheduling assistant. Sam is free Tue 29/9 at 12:00, Wed 30/9 at 15:00 or Thu 1/10 at 10:00. Which works?",
  },
  { kind: "in", from: "Ana", text: "wed at 3 works" },
  {
    kind: "in",
    from: "Meetly",
    text: "Booked: Wed 30/9 at 15:00. Invite sent. The other two times are released.",
  },
  { kind: "note", text: "Later, in Sam's DM" },
  {
    kind: "in",
    from: "Meetly",
    text: "Booked coffee with Ana, Wed 30/9 at 15:00. She asked by iMessage; I offered three times inside your hours and she picked one.",
  },
];

const ahaThread: Message[] = [
  { kind: "time", text: "Tue 18:00 · the hour you set" },
  {
    kind: "in",
    text: "Daily digest for Acme — 3 new mentions.\n\nHacker News (2)\n• A Show HN thread about Acme, most comments on pricing\n• A comment comparing Acme to a competitor\n\nAgent Index (1)\n• A new comment on Acme's listing asking about setup",
  },
  { kind: "out", text: "thanks" },
];

type Moment = {
  a: Agent;
  when: string;
  lead: string;
  body: React.ReactNode;
  uses: string[];
  thread: { subtitle: string; messages: Message[] };
};

const day: Moment[] = [
  {
    a: foundertimes,
    when: "Morning",
    lead: "The paper is waiting when you wake up.",
    body: (
      <>
        It opens with an advisor&apos;s three ranked, sourced recommendations, challenged by independent
        critics; then weather, one calendar rail, and up to three stories you asked it to cover. Research
        runs in your own browser. It reports only: no purchases, bookings, logins or downloads.
      </>
    ),
    uses: ["Latch", "Your browser", "Calendar", "Mail", "Your printer"],
    thread: { subtitle: "Your DM", messages: foundertimesThread },
  },
  {
    a: meetly,
    when: "During the day",
    lead: "Someone asks for coffee. It's booked before you look.",
    body: (
      <>
        Every five minutes Meetly reads your new iMessages. When someone wants to meet, it opens a group with
        them, offers three free times inside your days and hours, holds them, books the one they pick, and
        tells you afterwards. It speaks for you in the third person, never from your own Messages account.
      </>
    ),
    uses: ["iMessage (via Latch)", "Google Calendar", "Contacts", "Plow group"],
    thread: { subtitle: "A group with Ana, then your DM", messages: meetlyThread },
  },
  {
    a: aha,
    when: "Evening",
    lead: "What people said about you today, in one text.",
    body: (
      <>
        aha watches what the public says about your company — Hacker News and Agent Index comments today —
        and texts you a daily digest. Public posts are read as data, never as instructions.
      </>
    ),
    uses: ["Hacker News", "Agent Index"],
    thread: { subtitle: "Your DM", messages: ahaThread },
  },
];

function Day() {
  return (
    <section id="day" className="border-b border-line py-20 sm:py-28">
      <Container>
        <Eyebrow>A day with them</Eyebrow>
        <SectionTitle>Not a dashboard. A text thread you already check.</SectionTitle>
        <p className="mt-4 max-w-2xl text-muted">
          The conversations below are illustrative examples — made-up names, not screenshots of real people.
        </p>
        <ol className="mt-16 flex flex-col gap-24">
          {day.map((m, i) => (
            <li
              key={m.a.id}
              id={m.a.anchor}
              className="grid scroll-mt-20 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <div className={i % 2 ? "lg:order-2" : ""}>
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  <span className="grid size-6 place-items-center rounded-full border border-line text-[10px]">
                    {i + 1}
                  </span>
                  {m.when}
                </p>
                <h3 className="mt-4 flex items-center gap-3 text-2xl font-semibold tracking-tight">
                  <Image src={m.a.image} alt="" width={40} height={40} className="size-10 rounded-full" />
                  {m.a.name}
                </h3>
                <p className="mt-4 font-serif text-3xl leading-tight text-balance">{m.lead}</p>
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
                <a
                  href={m.a.index}
                  className="mt-6 inline-block text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-foreground"
                >
                  {m.a.name} on the Agent Index →
                </a>
              </div>
              <div className={`mx-auto w-full max-w-md ${i % 2 ? "lg:order-1" : ""}`}>
                <Thread title={m.a.name} subtitle={m.thread.subtitle} image={m.a.image} messages={m.thread.messages} />
              </div>
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
    body: "Where the signal already is: your chat, email, iMessage, groups and the public web.",
  },
  {
    title: "It decides what matters",
    body: "Recommendations are challenged by critics before they reach you — not the first idea that came up.",
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
    <section id="how" className="border-b border-line bg-surface py-20 sm:py-28">
      <Container>
        <Eyebrow>How it works</Eyebrow>
        <SectionTitle>One pipeline under all three.</SectionTitle>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col bg-surface p-6 sm:p-8">
              <span className="font-serif text-6xl leading-none text-accent">{i + 1}</span>
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
      "A labeled signal is never accepted as fact without critique.",
      "A page that didn't load is said, not invented.",
      "Network errors, or your Mac being offline, are reported — never hidden.",
    ],
  },
  {
    title: "What Meetly will do with your calendar",
    items: [
      "Offers only free time inside the days and hours you set.",
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
      "Purchases, logins, downloads and sends outside an agent's scope.",
      "Anything past the limits you set comes back to you before it happens.",
    ],
  },
];

function Limits() {
  return (
    <section id="limits" className="border-b border-line py-20 sm:py-28">
      <Container>
        <Eyebrow>Transparency and limits</Eyebrow>
        <SectionTitle>The rules, in one place.</SectionTitle>
        <p className="mt-4 max-w-2xl text-muted">
          Meetly books meetings without waiting for you. That&apos;s the point — so the promise isn&apos;t
          &ldquo;it never acts alone&rdquo;. It acts only inside your limits, and tells you after.
        </p>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {limits.map((group) => (
            <div key={group.title} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
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

/* 6. Proof */

// TODO(owner): replace each placeholder with real, anonymized material.
// Never invent an example here.
const proof = [
  { a: foundertimes, what: "A printed edition page" },
  { a: meetly, what: "A group Meetly opened and booked" },
  { a: aha, what: "A daily digest" },
];

function Proof() {
  return (
    <section id="proof" className="border-b border-line bg-surface py-20 sm:py-28">
      <Container>
        <Eyebrow>Proof</Eyebrow>
        <SectionTitle>Real output, one per agent.</SectionTitle>
        <p className="mt-4 max-w-2xl text-muted">
          Anonymized examples from real use will go here. Until then, this space stays empty on purpose.
        </p>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {proof.map(({ a, what }) => (
            <li
              key={a.id}
              className="flex min-h-56 flex-col md:aspect-[4/5] justify-between rounded-3xl border border-dashed border-line p-6"
            >
              <div className="flex items-center gap-3">
                <Image src={a.image} alt="" width={32} height={32} className="size-8 rounded-full" />
                <span className="font-medium">{a.name}</span>
              </div>
              <div>
                <p className="font-serif text-2xl leading-tight">{what}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">Example coming</p>
              </div>
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
    body: "Runs on your Mac, signed in to your Plow account. It's how the agents reach your browser, Messages, Calendar and printer.",
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
    <section id="base" className="border-b border-line py-20 sm:py-28">
      <Container>
        <Eyebrow>Runs on Plow</Eyebrow>
        <SectionTitle>Built on a base you can read about.</SectionTitle>
        <p className="mt-4 max-w-2xl text-muted">
          All three are{" "}
          <a href={links.openclaw} className="underline underline-offset-4">
            OpenClaw
          </a>{" "}
          agents running on Plow.
        </p>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {base.map((b) => (
            <li key={b.title}>
              <a
                href={b.href}
                className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-foreground sm:p-8"
              >
                <h3 className="text-lg font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{b.body}</p>
                <span className="mt-6 text-sm font-medium">
                  {b.cta} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
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
    <section id="try" className="border-b border-line bg-surface py-20 sm:py-28">
      <Container>
        <Eyebrow>Try them</Eyebrow>
        <SectionTitle>Each one has a page on the Agent Index.</SectionTitle>
        <p className="mt-4 max-w-2xl text-muted">Setup lives there — pick the one you&apos;d text first.</p>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {agents.map((a) => (
            <li key={a.id} className="flex flex-col items-start rounded-3xl border border-line bg-background p-6 sm:p-8">
              <Image src={a.image} alt="" width={72} height={72} className="size-18 rounded-full border border-line" />
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{a.name}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{a.tagline}</p>
              <div className="mt-6">
                <IndexButton a={a} label="Open on the Agent Index" />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 9. Final CTA */

function FinalCta() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-3xl font-serif text-5xl leading-[1] tracking-tight text-balance sm:text-6xl">
          Your paper, your calendar, your reputation — <em>on a text thread.</em>
        </h2>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {agents.map((a) => (
            <li key={a.id}>
              <IndexButton a={a} label={a.name} />
            </li>
          ))}
        </ul>
        <a
          href={links.github}
          className="mt-6 text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-foreground"
        >
          View on GitHub
        </a>
      </Container>
    </section>
  );
}

/* 10. Footer */

function Footer() {
  return (
    <footer className="border-t border-line text-sm">
      <Container className="grid gap-10 py-12 sm:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-serif text-3xl leading-none">Maho</p>
          <p className="mt-3 max-w-xs text-muted">Three agents on one base: Plow + OpenClaw.</p>
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
                    Source on GitHub
                  </a>
                </li>
                <li>
                  <a href={a.index} className="hover:text-foreground">
                    Agent Index page
                  </a>
                </li>
                {a.license && <li>{a.license}</li>}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
