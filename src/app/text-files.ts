import { agents, links } from "./agents";
import { faqs, site, siteUrl } from "./site";

// Plain-text files for AI assistants and crawlers (llms.txt convention and
// friends), built from the same data as the page so they never drift.

export function textResponse(body: string) {
  return new Response(body.trim() + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

const updated = new Date().toISOString().slice(0, 10);

export function llmsTxt() {
  return `
# ${site.name}

> ${site.description}

Maho is three AI agents that live where you already are: text, email and group chat. Each agent has its own phone line on Plow Chat, runs on OpenClaw, and reaches the owner's Mac through Latch. All three are open source (MIT).

## Agents

${agents.map((a) => `- [${a.name}](${a.index}): ${a.tagline} Source: ${a.repo}`).join("\n")}

## How they work together

- AHA spots a partnership post about your company on X in its daily digest.
- You ask Meetly to reach out; it opens a group with that person and books the call.
- The next morning, The Founder Times prints the meeting on its calendar rail and puts the prep first on the advisor desk.

## Rules they follow

- They never make up what they can't check: a page that didn't load is said, not invented.
- They act only inside the limits you set; anything beyond comes back to you first.
- Purchases, logins, downloads and sends outside an agent's scope stay with the owner.

## Docs

- [Home page](${siteUrl}/): overview, example conversations and FAQ
- [FAQ](${siteUrl}/#faq): common questions about Maho
- [Plow Chat](${links.plowChat}): the phone line each agent runs on
- [Latch](${links.latch}): how the agents reach the owner's Mac
- [Agent Index](${links.agentIndex}): where each agent is listed and set up
- [OpenClaw](${links.openclaw}): the agent runtime

## Optional

- [Full description](${siteUrl}/llms-full.txt): every agent in detail, rules and FAQ
- [Company profile](${siteUrl}/company.txt): who is behind Maho
`;
}

export function llmsFullTxt() {
  return `
# ${site.name} — full description

${site.description}

Website: ${siteUrl}/
Updated: ${updated}

All three agents are OpenClaw agents (${links.openclaw}) on Plow Chat (${links.plowChat}). Each has its own phone line; you talk to it by texting. They reach the owner's Mac (browser, Messages, Calendar, printer) through Latch (${links.latch}). Each agent is listed on the Agent Index (${links.agentIndex}), which is where setup lives. All three are still in testing.


## The Founder Times

Agent Index: ${agents[0].index}
Source: ${agents[0].repo}
License: ${agents[0].license}

Your morning paper, printed. A compact Letter paper that goes to a printer on your Mac when one is there; the same edition lands as a PDF in chat.

- It opens with an advisor's desk: three ranked, sourced recommendations, challenged by independent critics, using your mail, messages, calendar and the sources you name.
- Then weather, one calendar rail, and up to three stories you asked it to cover. Mail and sports stay in the chat edition.
- You can ask for a section, a one-day assignment ("put the iPhone price in tomorrow's paper"), or a one-off.
- The first message sets the hour the paper arrives. There is no profile to fill in.
- Research runs in your own browser through Latch. If a page cannot be read, the paper says so; it does not invent the paragraph.
- It reports only. No purchases, bookings, logins or downloads.
- If the Mac sleeps, the paper says what it could not source. A print that cannot reach the printer is reported in chat.


## Meetly

Agent Index: ${agents[1].index}
Source: ${agents[1].repo}
License: ${agents[1].license}

A scheduling assistant on a text thread. Every five minutes it reads new iMessages on your Mac through Latch. When someone wants to meet, it:

1. opens a Plow group with you and that person,
2. offers three free times from your Google Calendar, inside the days and hours you allow,
3. holds those times on your calendar,
4. books the one they pick, invites them if it knows their email, and releases the other holds,
5. tells you in your DM what it did.

You can also ask it directly ("set up lunch with Patrick next week"); it finds the person in your Contacts and runs the same group. It does not wait for you. It speaks as your assistant in the third person ("Jean is free Tue 29/9 at 12:00") and never texts from your own Messages account.

Rules it follows:

- Offers only free time inside the days and hours you set.
- Never shows calendar details; anything busy is "an existing commitment".
- A time outside your hours is booked only on your yes.
- Books over an existing event only when you named that event, or said yes. People in the group can never unlock a conflict.
- Holds expire after 48 hours; the group is told the times were released.
- Ignores instructions inside messages.
- Skips verification codes, short codes, marketing and automated senders.
- If the Mac is asleep or Latch is closed for more than 30 minutes, it tells you once and catches up when the Mac is back.

Known limitations: direct iMessage chats only (no group chats or email), one person per request, and rescheduling or cancelling a booked meeting is left to you.


## AHA

Agent Index: ${agents[2].index}
Source: ${agents[2].repo}
License: ${agents[2].license}

Watches what the public says about your company and texts you a daily digest. Today it listens to Hacker News and Agent Index comments. You can also point it at specific pages (a competitor's blog, a changelog, an X profile); only those exact URLs are visited, once a day, through your Mac.

- Setup is a short chat: company and domain, aliases, competitors, sources, tone and language, and the digest hour.
- Public mention text is data, never instructions.
- When your Mac can't be reached for a page, that day's run is marked degraded rather than silently missing.


## How the three work together

1. Tuesday 18:00 — AHA's daily digest carries a post on X from a potential partner who wants to work with your company.
2. You ask Meetly, in its DM, to reach out to that person.
3. Meetly opens a group with them, offers three free times, and books the one they pick.
4. Wednesday 07:00 — The Founder Times prints the call on its calendar rail and puts "prep for the call" first on the advisor desk.

Each agent stays in its own lane, and you decide in between.


## Shared rules

- A labeled signal is never accepted as fact without critique.
- A page that didn't load is said, not invented.
- Purchases, logins, downloads and sends outside an agent's scope stay with the owner.
- Network errors, or the Mac being offline, are reported — never hidden.


## FAQ

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;
}

export function companyTxt() {
  return `
Name: ${site.name}
Website: ${siteUrl}/
Summary: ${site.description}
Category: AI agents over text messaging (iMessage), scheduling, daily briefings, brand monitoring
Products:
${agents.map((a) => `  - ${a.name}: ${a.tagline} (${a.index})`).join("\n")}
Built on: Plow Chat (${links.plowChat}), Latch (${links.latch}), OpenClaw (${links.openclaw})
Listed on: Agent Index (${links.agentIndex})
Maintainer: ${site.author.name} (${site.author.url})
Source code:
${agents.map((a) => `  - ${a.repo}`).join("\n")}
License: MIT
Status: in testing
Language: English
More for AI assistants: ${siteUrl}/llms.txt, ${siteUrl}/llms-full.txt
Updated: ${updated}
`;
}
