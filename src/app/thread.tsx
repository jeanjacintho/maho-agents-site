import Image from "next/image";

export type Message =
  | { kind: "in"; text: string; from?: string }
  | { kind: "out"; text: string }
  | { kind: "file"; name: string; detail: string }
  | { kind: "note"; text: string }
  | { kind: "time"; text: string };

// An illustrative text thread. Never a screenshot of a real conversation.
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
  return (
    <figure className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_1px_0_var(--line),0_24px_48px_-32px_rgb(0_0_0/0.35)]">
      <figcaption className="flex items-center gap-3 border-b border-line px-4 py-3">
        <Image src={image} alt="" width={36} height={36} className="size-9 rounded-full outline-1 -outline-offset-1 outline-black/10" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
          Example
        </span>
      </figcaption>
      <ol className="flex flex-col gap-2 px-4 py-5">
        {messages.map((m, i) => (
          <li key={i} className="flex flex-col">
            <Bubble message={m} />
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Bubble({ message: m }: { message: Message }) {
  switch (m.kind) {
    case "time":
      return <p className="py-1 text-center font-mono text-[11px] text-muted">{m.text}</p>;
    case "note":
      return (
        <p className="mx-auto max-w-[90%] rounded-full bg-sunk px-3 py-1 text-center text-xs text-muted">
          {m.text}
        </p>
      );
    case "out":
      return (
        <p className="ml-auto max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-[15px] leading-snug text-accent-ink">
          {m.text}
        </p>
      );
    case "file":
      return (
        <p className="flex max-w-[85%] items-center gap-3 rounded-2xl rounded-bl-md border border-line bg-sunk px-3.5 py-2.5">
          <span
            aria-hidden
            className="grid h-10 w-8 shrink-0 place-items-center rounded-sm border border-line bg-surface font-mono text-[9px] font-bold"
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
      return (
        <div className="max-w-[85%]">
          {m.from && <p className="mb-0.5 pl-1 text-[11px] text-muted">{m.from}</p>}
          <p className="whitespace-pre-line rounded-2xl rounded-bl-md bg-sunk px-3.5 py-2 text-[15px] leading-snug">
            {m.text}
          </p>
        </div>
      );
  }
}
