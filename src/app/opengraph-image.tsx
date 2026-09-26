import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { agents } from "./agents";

// The share card for links to the site (Open Graph and X).
export const alt = "Maho — three AI agents that live on your text thread: The Founder Times, Meetly and AHA.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatars = await Promise.all(
    agents.map(async (a) => {
      const file = await readFile(join(process.cwd(), "public", a.image));
      const type = a.image.endsWith(".jpg") ? "image/jpeg" : "image/png";
      return `data:${type};base64,${file.toString("base64")}`;
    }),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(90% 70% at 85% 0%, #e3dbff 0%, #ffffff 60%)",
          color: "#121216",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -2 }}>Maho</div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              color: "#2e1f86",
              background: "#ece6ff",
              border: "1px solid #b7a8f5",
              borderRadius: 8,
              padding: "8px 16px",
            }}
          >
            YOUR AGENT ECOSYSTEM
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 84, fontWeight: 600, letterSpacing: -3.5, lineHeight: 1.05 }}>
            <span>Agents that live where you&nbsp;</span>
            <span style={{ background: "linear-gradient(transparent 55%, #d9cdff 55%)" }}>already are.</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#5e5e6a" }}>
            Your paper, your calendar, your reputation — on a text thread.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {agents.map((a, i) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={avatars[i]} width={64} height={64} alt="" style={{ borderRadius: 999 }} />
              <span style={{ fontSize: 26, fontWeight: 500 }}>{a.name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
