import Image from "next/image";
import { agent, type Agent } from "./agents";
import { reveal } from "./motion";

// Illustrative lock screen: one day of notifications from the three agents.
// Oldest on top: each new one arrives at the bottom and lifts the ones above,
// as on the iOS lock screen.
const notifications: { a: Agent; time: string; text: string }[] = [
  { a: agent("thefoundertimes"), time: "07:00", text: "Today’s edition is in the printer tray, and here in chat." },
  { a: agent("meetly"), time: "10:15", text: "Booked coffee with Ana, Wed 30/9 at 15:00. Invite sent." },
  { a: agent("aha"), time: "18:00", text: "Daily digest for Acme: 3 new mentions, most on pricing." },
];

export function LockScreen() {
  return (
    <figure className="imsg relative isolate mx-auto w-full max-w-[300px]">
      <span
        aria-hidden
        className="absolute -inset-x-16 top-10 bottom-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(106_76_240/0.28),transparent)] blur-2xl"
      />
      <figcaption className="mb-2 pl-4 font-mono text-[10px] uppercase tracking-wider text-muted">
        Example<span className="sr-only">: a lock screen with a day of notifications from the three agents</span>
      </figcaption>
      <div
        {...reveal(1)}
        className="lock relative aspect-[9/19] overflow-hidden rounded-[3rem] border-[6px] border-[#1c1c1f] bg-[radial-gradient(120%_80%_at_20%_0%,#b8a6ff_0%,transparent_60%),radial-gradient(100%_70%_at_100%_100%,#2d1f7a_0%,transparent_70%),linear-gradient(160deg,#7b5cff,#4b33c9)] shadow-[0_40px_80px_-40px_rgb(40_20_120/0.6)]"
      >
        <span aria-hidden className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex h-full flex-col px-3 pt-14 pb-5 text-white">
          <p className="text-center text-sm font-semibold opacity-90">Tuesday 29 September</p>
          <p aria-hidden className="text-center text-7xl leading-none font-semibold tracking-tight">
            18:02
          </p>
          <ol className="-mx-1.5 -mb-1.5 mt-auto flex flex-col">
            {notifications.map((n, i) => (
              <li
                key={n.a.id}
                className="notif"
                style={{ "--d": `${600 + i * 1000}ms` } as React.CSSProperties}
              >
                <div>
                  <div className="px-1.5 pt-2 pb-1.5">
                  <a
                    href={`#${n.a.anchor}`}
                    className="glass flex items-start gap-2.5 rounded-[1.4rem] p-2.5 text-black transition-[scale] duration-150 ease-out active:scale-[0.96]"
                  >
                    <Image src={n.a.image} alt="" width={36} height={36} className="size-9 shrink-0 rounded-[0.6rem] object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-semibold">{n.a.name}</span>
                        <span className="text-[11px] text-black/55">{n.time}</span>
                      </span>
                      <span className="block text-[13px] leading-snug">{n.text}</span>
                    </span>
                  </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <span aria-hidden className="mx-auto mt-4 h-1 w-28 rounded-full bg-white/80" />
        </div>
      </div>
      {/* Hand-drawn note pointing at the notifications, which are links.
          Only where there is room beside the phone. */}
      <span aria-hidden className="hint absolute right-full bottom-[22%] mr-3 hidden w-36 flex-col items-center xl:flex">
        <span className="font-hand -rotate-6 text-3xl leading-none text-foreground">Click here</span>
        <svg viewBox="0 0 100 110" className="mt-1 ml-10 h-24 w-auto text-accent" fill="none">
          <path
            className="hint-stroke"
            pathLength="1"
            d="M22 4c8 18 22 24 18 40-3 13-20 12-17 0 3-11 22-6 32 8 12 17 18 36 36 46"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="hint-head"
            d="M91 98l-13 1m13-1-6-11"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </figure>
  );
}
