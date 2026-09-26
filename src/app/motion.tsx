// Shared by server components; the observer that sets data-shown lives in
// reveal.tsx.

// Runs during HTML parsing, before first paint, so content is hidden only when
// JavaScript is there to reveal it again. Without JS everything stays visible.
export function RevealScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: `document.documentElement.setAttribute("data-reveal","")` }}
    />
  );
}

// Props for an element that fades up when scrolled into view; `order`
// staggers siblings.
export function reveal(order = 0) {
  return { "data-reveal": "", style: { "--i": order } as React.CSSProperties };
}
