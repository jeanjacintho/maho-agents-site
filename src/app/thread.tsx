import Image from "next/image";
import { reveal } from "./motion";

export type Message =
  | { kind: "in"; text: string; from?: string }
  | { kind: "out"; text: string }
  | { kind: "file"; name: string; detail: string }
  | { kind: "note"; text: string }
  | { kind: "time"; text: string };

// An illustrative text thread drawn like iMessage, where the agents live.
// Never a screenshot of a real conversation.
export function Thread({
  title,
  subtitle,
  image,
  messages,
}: {
  title: string;
  subtitle: string;
  image: string;
  messages: Message[];
}) {
  const schedule = arrivals(messages);
  const lastOut = messages.findLastIndex((m) => m.kind === "out");
  return (
    <figure
      {...reveal()}
      data-thread
      className="imsg overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)]"
    >
      <figcaption className="grid grid-cols-[1fr_auto_1fr] items-start border-b border-black/10 bg-[#f6f6f6] px-3 pt-3 pb-2">
        <svg aria-hidden viewBox="0 0 12 20" className="mt-3 h-4 w-auto text-imsg-blue">
          <path d="M10 2 2 10l8 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col items-center">
          <Image src={image} alt="" width={44} height={44} className="size-11 rounded-full outline-1 -outline-offset-1 outline-black/10" />
          <p className="mt-1 flex items-center gap-0.5 text-[11px] font-medium">
            {title}
            <svg aria-hidden viewBox="0 0 8 12" className="h-2 w-auto text-muted">
              <path d="m2 1 4 5-4 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
          <p className="text-[10px] text-muted">{subtitle}</p>
        </div>
        <span className="justify-self-end rounded-full border border-line bg-white px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
          Example
        </span>
      </figcaption>
      <ol className="flex flex-col px-4 pt-3 pb-4">
        {messages.map((m, i) => {
          const starts = side(m) !== side(messages[i - 1]);
          const tail = side(m) !== side(messages[i + 1]);
          const named = m.kind === "in" && !!m.from && starts;
          return (
            <li
              key={i}
              className={`relative flex flex-col ${i === 0 ? "" : starts ? "mt-2.5" : "mt-0.5"}`}
              style={{ "--at": `${schedule[i]}ms` } as React.CSSProperties}
            >
              {typed(m) && <Typing below={named} />}
              <div className="msg flex flex-col">
                {named && <p className="mb-0.5 pl-3 text-[11px] text-muted">{m.from}</p>}
                <Bubble message={m} tail={tail} />
                {i === lastOut && <p className="mt-0.5 pr-1 text-right text-[11px] font-medium text-muted">Delivered</p>}
              </div>
            </li>
          );
        })}
      </ol>
      <div aria-hidden className="flex items-center gap-2 px-3 pb-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e9e9eb] text-lg leading-none text-muted">
          +
        </span>
        <span className="flex-1 rounded-full border border-black/15 px-3.5 py-1.5 text-[15px] text-muted/70">iMessage</span>
      </div>
    </figure>
  );
}

// Which side of the thread a message sits on, and who sent it. Consecutive
// messages with the same side share one tail and one name label.
function side(m: Message | undefined) {
  if (!m) return null;
  if (m.kind === "out") return "out";
  if (m.kind === "in") return `in:${m.from ?? ""}`;
  if (m.kind === "file") return "in:";
  return m.kind;
}

// Someone else's message gets a typing bubble before it arrives.
function typed(m: Message) {
  return m.kind === "in" || m.kind === "file";
}

// When each message lands, in ms after the thread scrolls into view.
function arrivals(messages: Message[]) {
  let t = 250;
  return messages.map((m) => {
    if (typed(m)) t += 400;
    const at = t;
    t += m.kind === "out" ? 350 : 250;
    return at;
  });
}

function Typing({ below }: { below: boolean }) {
  return (
    <span
      aria-hidden
      className={`typing imsg-in imsg-tail absolute left-0 inline-flex gap-1 px-3.5 py-3 ${below ? "top-[18px]" : "top-0"}`}
    >
      <span className="size-2 rounded-full bg-[#8e8e93]" />
      <span className="size-2 rounded-full bg-[#8e8e93]" />
      <span className="size-2 rounded-full bg-[#8e8e93]" />
    </span>
  );
}

function Bubble({ message: m, tail }: { message: Message; tail: boolean }) {
  const t = tail ? " imsg-tail" : "";
  switch (m.kind) {
    case "time":
      return <p className="py-1.5 text-center text-[11px] text-muted">{m.text}</p>;
    case "note":
      return <p className="mx-auto max-w-[85%] py-1 text-center text-[11px] text-muted">{m.text}</p>;
    case "out":
      return <p className={`imsg-out${t} ml-auto max-w-[75%] whitespace-pre-line`}>{m.text}</p>;
    case "file":
      return (
        <p className={`imsg-in${t} mr-auto flex max-w-[75%] items-center gap-3`}>
          <span
            aria-hidden
            className="grid h-10 w-8 shrink-0 place-items-center rounded-md bg-white font-mono text-[9px] font-bold text-[#e5484d]"
          >
            PDF
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium break-words">{m.name}</span>
            <span className="block text-xs text-muted">{m.detail}</span>
          </span>
        </p>
      );
    case "in":
      return <p className={`imsg-in${t} mr-auto max-w-[75%] whitespace-pre-line`}>{m.text}</p>;
  }
}
