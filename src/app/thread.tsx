import Image from "next/image";
import { reveal } from "./motion";

export type Message =
  | { kind: "in"; text: string; from?: string }
  | { kind: "out"; text: string }
  | { kind: "file"; name: string; detail: string; from?: string }
  | { kind: "note"; text: string }
  | { kind: "time"; text: string };

// An illustrative text thread drawn like iMessage (Liquid Glass), where the
// agents live. Never a screenshot of a real conversation.
export function Thread({
  title,
  image,
  images,
  people,
  messages,
}: {
  title: string;
  image: string;
  /** A group's members, drawn as overlapping avatars in place of `image`. */
  images?: string[];
  /** Set for a group: how many other people are in it ("2 People"). */
  people?: number;
  messages: Message[];
}) {
  const schedule = arrivals(messages);
  const lastOut = messages.findLastIndex((m) => m.kind === "out");
  return (
    <figure {...reveal()} data-thread className="imsg">
      <figcaption className="mb-2 pl-4 font-mono text-[10px] uppercase tracking-wider text-muted">
        Example<span className="sr-only">: an illustrative thread with {title}</span>
      </figcaption>
      <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)]">
        <header className="grid grid-cols-[1fr_auto_1fr] items-start bg-linear-to-b from-[#f2f2f4] to-white px-3 pt-3 pb-1">
          <span aria-hidden className="glass grid size-10 place-items-center rounded-full">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
              <path d="m17.5 3.5 3 3L13 14l-3.5.5.5-3.5z" />
            </svg>
          </span>
          <div className="flex flex-col items-center">
            <span className="relative">
              {images ? (
                <span className="flex">
                  {images.map((src, k) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={52}
                      height={52}
                      className={`size-13 rounded-full ring-2 ring-white ${k ? "-ml-4 mt-3" : ""}`}
                    />
                  ))}
                </span>
              ) : (
                <Image src={image} alt="" width={64} height={64} className="size-16 rounded-full outline-1 -outline-offset-1 outline-black/10" />
              )}
              {people && !images && (
                <span aria-hidden className="absolute -right-1 -bottom-1 grid size-6 place-items-center rounded-full bg-linear-to-b from-[#96a1c0] to-[#6e7a9c] ring-2 ring-white">
                  <svg viewBox="0 0 16 16" className="size-3.5 fill-white">
                    <circle cx="8" cy="5.5" r="3" />
                    <path d="M2.5 14c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5z" />
                  </svg>
                </span>
              )}
            </span>
            <p className="glass -mt-1.5 flex items-center gap-1 rounded-full px-3 py-1 text-[15px] font-bold tracking-tight">
              {people && !images ? `${people} People` : title}
              <svg aria-hidden viewBox="0 0 8 12" className="h-2.5 w-auto text-muted">
                <path d="m2 1 4 5-4 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
            <p className="mt-1.5 text-[11px] leading-tight text-muted">iMessage</p>
            <p className="flex items-center gap-0.5 text-[11px] leading-tight text-muted">
              <svg aria-hidden viewBox="0 0 12 14" className="h-2.5 w-auto fill-current">
                <path d="M3 6V4.5a3 3 0 0 1 6 0V6h.5A1.5 1.5 0 0 1 11 7.5v5A1.5 1.5 0 0 1 9.5 14h-7A1.5 1.5 0 0 1 1 12.5v-5A1.5 1.5 0 0 1 2.5 6zm1.5 0h3V4.5a1.5 1.5 0 0 0-3 0z" />
              </svg>
              Encrypted
            </p>
          </div>
          <span aria-hidden className="glass grid size-10 place-items-center justify-self-end rounded-full">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <rect x="3" y="6" width="13" height="12" rx="3" />
              <path d="m16 10.5 5-3v9l-5-3z" />
            </svg>
          </span>
        </header>
        <ol className="flex flex-col px-4 pt-3 pb-4">
          {messages.map((m, i) => {
            const starts = side(m) !== side(messages[i - 1]);
            const tail = side(m) !== side(messages[i + 1]);
            const named = (m.kind === "in" || m.kind === "file") && !!m.from && starts;
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
          <span className="glass grid size-9 shrink-0 place-items-center rounded-full text-xl leading-none text-muted">
            +
          </span>
          <span className="glass flex-1 rounded-full px-4 py-2 text-[15px] text-muted/70">iMessage</span>
        </div>
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
  if (m.kind === "file") return `in:${m.from ?? ""}`;
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
      return <p className="py-1.5 text-center text-[11px] font-semibold text-muted">{m.text}</p>;
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
