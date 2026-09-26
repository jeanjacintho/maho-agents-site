import Image from "next/image";

const agents = [
  { name: "The Founder Times", slug: "thefoundertimes", image: "/agents/founder-times.png" },
  { name: "Meetly", slug: "meetly", image: "/agents/meetly.png" },
  { name: "aha", slug: "aha", image: "/agents/aha.jpg" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Maho</h1>
      <p className="text-lg">Placeholder — the landing page is built from CLAUDE.md.</p>
      <ul className="flex flex-col gap-4">
        {agents.map((agent) => (
          <li key={agent.slug} className="flex items-center gap-4">
            <Image src={agent.image} alt="" width={48} height={48} className="rounded-full" />
            <a className="underline" href={`https://aiworthusing.com/agent-index/${agent.slug}`}>
              {agent.name} on the Agent Index
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
