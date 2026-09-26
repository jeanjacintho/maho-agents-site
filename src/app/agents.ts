// Facts here come from each agent's README. Anything the README does not
// support is marked TODO(owner) instead of written.

export type Agent = {
  id: "thefoundertimes" | "meetly" | "aha";
  name: string;
  anchor: string;
  image: string;
  repo: string;
  index: string;
  tagline: string;
  license: string | null;
};

export const agents: Agent[] = [
  {
    id: "thefoundertimes",
    name: "The Founder Times",
    anchor: "founder-times",
    image: "/agents/founder-times.png",
    repo: "https://github.com/jeanjacintho/the-founder-times-openclaw-agent",
    index: "https://aiworthusing.com/agent-index/thefoundertimes",
    tagline: "Your morning paper, printed on your Mac — or a PDF in chat.",
    license: "MIT © The Plow Collective, Inc",
  },
  {
    id: "meetly",
    name: "Meetly",
    anchor: "meetly",
    image: "/agents/meetly.png",
    repo: "https://github.com/jeanjacintho/meetly-openclaw-agent",
    index: "https://aiworthusing.com/agent-index/meetly",
    tagline: "Books the meeting on your text thread, then tells you it did.",
    // No license file in the repo yet.
    license: null,
  },
  {
    id: "aha",
    name: "aha",
    anchor: "aha",
    image: "/agents/aha.jpg",
    repo: "https://github.com/jeanjacintho/aha-openclaw-agent",
    index: "https://aiworthusing.com/agent-index/aha",
    tagline: "What the public says about your company, in one daily text.",
    license: "MIT © Jean Jacintho",
  },
];

export const links = {
  github: "https://github.com/jeanjacintho",
  agentIndex: "https://aiworthusing.com/agent-index",
  plowChat: "https://howto.plow.co/",
  latch: "https://howto.plow.co/latch",
  openclaw: "https://github.com/openclaw/openclaw",
};

export function agent(id: Agent["id"]): Agent {
  return agents.find((a) => a.id === id)!;
}
