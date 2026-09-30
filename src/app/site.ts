// Shared facts for metadata, structured data and the plain-text files AI
// assistants read (llms.txt, llms-full.txt, company.txt). Keep them in line
// with the page and with each agent's README.

// Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on Vercel the
// production URL is used automatically.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const site = {
  name: "Maho",
  title: "Maho — a small team of AI agents for founders, over text",
  tagline: "Start the day knowing what matters. Let the rest get handled over text.",
  description:
    "Maho is a small team of AI agents for founders that you text and that pass context to each other: The Founder Times prints a morning paper that opens with what to do first, Meetly books your meetings from your text thread, and AHA texts you what the public says about your company. They never make up what they can't check, and they only act inside the limits you set.",
  author: { name: "Jean Jacintho", url: "https://github.com/jeanjacintho" },
  keywords: [
    "AI agents for founders",
    "AI agents",
    "AI assistant over text",
    "iMessage AI assistant",
    "AI scheduling assistant",
    "AI meeting scheduler",
    "personalized morning newspaper",
    "AI daily briefing",
    "brand mention monitoring",
    "Hacker News monitoring",
    "OpenClaw",
    "Plow",
    "Agent Index",
  ],
};

// Visible on the page (FAQ section) and mirrored in FAQPage structured data.
// Every answer is backed by an agent's README.
export const faqs: { q: string; a: string }[] = [
  {
    q: "What is Maho?",
    a: "Maho is a small team of AI agents for founders that you talk to by text: The Founder Times, Meetly and AHA. Each has its own phone line on Plow Chat and runs on OpenClaw. They never make up what they can't check, and they only act inside the limits you set.",
  },
  {
    q: "Do I need to install a new app?",
    a: "No. You text each agent like a person, on its own phone line. Replies, PDFs and group chats arrive in the messaging app you already use.",
  },
  {
    q: "What does each agent do?",
    a: "The Founder Times prints a morning paper on your Mac, or sends it as a PDF, opening with three ranked, sourced recommendations toward the goals you told it. Meetly books meetings from your text thread inside the hours you allow, and posts the Google Meet link before the call. AHA watches what the public says about your company and texts you a daily digest.",
  },
  {
    q: "Do the agents work together?",
    a: "Yes, with you in between. For example: AHA's digest carries a post from someone who wants to partner with you; you ask Meetly to reach out and it books the call; the next morning The Founder Times puts the call on your calendar and the prep first on its list. Each agent stays in its own lane.",
  },
  {
    q: "Can Meetly book a meeting without asking me?",
    a: "Yes, but only inside your limits: free time within the days and hours you set, and it tells you afterwards. A time outside your hours, or over an existing event, is booked only on your yes. Holds on your calendar expire after 48 hours. If the request doesn't say how you'll meet, it asks Google Meet or in person along with the times.",
  },
  {
    q: "Will it text people as me?",
    a: "No. Each agent has its own phone number. Meetly talks to other people in a group text, as your assistant, in the third person (\"Jean is free Tue at 12:00\"), and never sends from your own Messages account.",
  },
  {
    q: "What if an agent gets something wrong?",
    a: "Tell it by text. The Founder Times keeps your corrections in a wiki on your Mac and reads them every morning. Meetly tells you after every booking; moving or cancelling a booked meeting is left to you. A page an agent couldn't read is reported, never filled in.",
  },
  // TODO(owner): add "What does it cost?" once pricing is decided.
  {
    q: "Why do the agents use my Mac?",
    a: "Through Latch, they use your Mac for the parts that need it: The Founder Times researches in your own browser and prints, Meetly reads your iMessages and Google Calendar, and AHA visits the exact pages you register. Chat works without it, and if the Mac is offline they tell you.",
  },
  {
    q: "What does AHA watch?",
    a: "Hacker News and Agent Index comments today, plus the exact pages you point it at, such as a competitor's blog, a changelog or an X profile. It never searches the open web on its own, and it reads public posts as data, never as instructions.",
  },
  {
    q: "How do I set them up?",
    a: "Each agent has a page on the Agent Index with its setup. Once it's running, you text its line and it asks what it needs, one question at a time. The source code of all three is on GitHub under the MIT license.",
  },
];
