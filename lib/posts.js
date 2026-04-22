// lib/posts.js
// Central data store for all Kivora blog posts
// Add new posts here — they automatically appear everywhere

export const CATEGORIES = {
  build: {
    slug:    'build',
    label:   'Build',
    tagline: 'How-to guides, stack recommendations, setup tutorials',
    color:   '#3b82f6', // blue
    dim:     'rgba(59,130,246,0.08)',
    border:  'rgba(59,130,246,0.2)',
  },
  automate: {
    slug:    'automate',
    label:   'Automate',
    tagline: 'Workflow breakdowns, AI prompts, no-code tutorials',
    color:   '#a855f7', // purple
    dim:     'rgba(168,85,247,0.08)',
    border:  'rgba(168,85,247,0.2)',
  },
  monetize: {
    slug:    'monetize',
    label:   'Monetize',
    tagline: 'Revenue experiments, pricing strategies, affiliate plays',
    color:   '#16a34a', // green
    dim:     'rgba(22,163,74,0.08)',
    border:  'rgba(22,163,74,0.2)',
  },
  scale: {
    slug:    'scale',
    label:   'Scale',
    tagline: 'Growth tactics, hiring, systems, moving from solo to team',
    color:   '#f59e0b', // amber
    dim:     'rgba(245,158,11,0.08)',
    border:  'rgba(245,158,11,0.2)',
  },
  stories: {
    slug:    'stories',
    label:   'Stories',
    tagline: 'Case studies, wins, failures, what actually happened',
    color:   '#dc2626', // red
    dim:     'rgba(220,38,38,0.08)',
    border:  'rgba(220,38,38,0.2)',
  },
}

export const POSTS = [
  // ── BUILD ──────────────────────────────────────────────────
  {
    slug:     'build-whatsapp-bot-business-3-days',
    category: 'build',
    title:    'How to Build a WhatsApp Bot Business in 3 Days',
    excerpt:  'The complete stack, the exact code structure, and the client pitch that closes deals. No fluff, no paid tools you don\'t need.',
    author:   '@kivorablog',
    date:     '2026-04-18',
    readTime: 9,
    featured: true,
    tags:     ['whatsapp', 'bots', 'nigeria', 'tutorial'],
    heroImage: '/images/posts/whatsapp-bot-hero.png',
    midImage:  '/images/posts/whatsapp-bot-mid.png',
    ctaImage:  '/images/posts/whatsapp-bot-cta.png',
    ctaText:   'Start building your WhatsApp bot today',
    thumbnail: '/images/posts/whatsapp-bot-thumb.png',
    content: `
## What You're Actually Building

A WhatsApp bot that businesses pay you ₦30,000–₦150,000/month to maintain. The bot handles customer FAQs, order confirmations, appointment reminders, and lead qualification — automatically, 24/7, without a human on the other end.

You are not building this for yourself. You are building it for other businesses and charging a monthly retainer to run it.

## The Stack (All Free to Start)

**Twilio WhatsApp Business API** — The connector between your code and WhatsApp. Free sandbox for testing, ~₦8,000/month at production volume.

**Node.js + Express** — Your bot server. Receives messages from Twilio, processes them, sends replies.

**Railway** — Hosts your Node.js server. Free tier covers one project, paid is ₦4,000/month.

**Supabase** — Stores conversation state and customer data. Free tier is more than enough for 10 clients.

**n8n (self-hosted)** — Optional. For clients who want workflow automation (e.g. "when bot collects a lead, add to Google Sheet and send email").

Total monthly cost per client: ~₦12,000. Charge ₦50,000+. Margin: ₦38,000+ per client.

## Day 1: Build the Core Bot

\`\`\`javascript
// server.js — the entire bot in ~50 lines
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))

const MessagingResponse = require('twilio').twiml.MessagingResponse

// Simple state machine — extend this per client
const FLOWS = {
  'hi': 'Hello! I\'m the assistant for {business_name}. How can I help?\n\n1. Hours & Location\n2. Place an Order\n3. Talk to a Human',
  '1':  'We\'re open Mon–Sat 8am–8pm. Find us at 14 Victoria Island, Lagos.',
  '2':  'To place an order, visit our website at {website} or call {phone}.',
  '3':  'Connecting you to our team. We\'ll respond within 30 minutes.',
}

app.post('/webhook', (req, res) => {
  const inbound = req.body.Body.toLowerCase().trim()
  const twiml = new MessagingResponse()
  const reply = FLOWS[inbound] || 'I didn\'t catch that. Reply with 1, 2, or 3.'
  twiml.message(reply)
  res.type('text/xml').send(twiml.toString())
})

app.listen(3000, () => console.log('Bot running on port 3000'))
\`\`\`

## Day 2: Make It Client-Configurable

Hard-coding flows for each client is not scalable. Build a simple admin panel (or just a JSON config per client in Supabase) so each client's responses, hours, menu options, and contact details are stored in the database — not in your code.

This also means one codebase serves all clients. One deployment. Different configs.

## Day 3: Land the First Client

The pitch is not "I built a WhatsApp bot." The pitch is "I can save your business 40 hours a month of manual WhatsApp replies and never miss a customer again."

Target: restaurants, salons, clinics, real estate agents, e-commerce stores — any business that already has customers texting them manually.

Walk into any of those businesses. Show them their problem back to them: "How many WhatsApp messages do you answer manually per day?" When they say 30-50, show them the demo bot handling those exact questions in real time.

Close at ₦50,000/month. Aim for 5 clients in month one. That is ₦250,000/month from a ₦12,000 stack.

## Why Most People Fail at This

They build the bot for themselves instead of immediately focusing on getting paying clients. Spend 2 days max on the product. Day 3 is sales. The bot doesn't need to be perfect before you sell it — it needs to solve one specific pain for one specific business.
    `,
  },
  {
    slug:     'next-js-supabase-free-stack-2026',
    category: 'build',
    title:    'The Free Stack That Runs a Real SaaS in 2026',
    excerpt:  'Next.js + Supabase + Cloudflare + Groq. Zero monthly cost until you hit serious scale. Here\'s exactly how to wire it together.',
    author:   '@kivorablog',
    date:     '2026-04-15',
    readTime: 7,
    featured: false,
    tags:     ['nextjs', 'supabase', 'cloudflare', 'stack'],
    heroImage: '/images/posts/free-stack-hero.png',
    midImage:  '/images/posts/free-stack-mid.png',
    ctaImage:  '/images/posts/free-stack-cta.png',
    ctaText:   'Launch your SaaS on the free stack',
    thumbnail: '/images/posts/free-stack-thumb.png',
    content: `
## The Stack

**Next.js 14 on Cloudflare Pages** — Free hosting, global CDN, unlimited bandwidth on the free tier. Build command: \`npx next build\`. Output directory: \`.next\`. Node version: 20.

**Supabase Free Tier** — 500MB database, 1GB storage, 50,000 monthly active users, built-in auth with email and OAuth, row-level security out of the box.

**Groq Free API** — 14,400 requests per day on the free tier. llama-3.3-70b-versatile is genuinely GPT-4 quality for most tasks.

**GitHub Actions** — 2,000 free minutes per month for cron jobs, background processing, and maintenance scripts.

**Resend** — 3,000 emails per month free. Transactional only.

**Upstash Redis** — 10,000 commands per day free. Use for rate limiting and caching.

## What This Stack Cannot Do

Server-sent events with long-lived connections. Heavy background processing (use GitHub Actions cron instead). Anything that requires persistent server state in memory (use Supabase or Redis instead). WebSockets at scale.

## What This Stack Handles Perfectly

Any read-heavy web application. Anything that can be modelled as request-response. AI-powered tools. Content platforms. Community sites. Most SaaS products at under 10,000 daily active users.

## The Wiring Pattern That Saves Hours

\`\`\`javascript
// lib/supabase.js — two clients, one file
import { createClient } from '@supabase/supabase-js'

// Server-side — full access, never exposed to browser
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Client-side — anon key, RLS protects rows
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
\`\`\`

Always use \`supabaseAdmin\` in API routes (server-side). Always use \`supabasePublic\` in client components. Never expose the service key to the browser.
    `,
  },
  {
    slug:     'deploy-nextjs-cloudflare-pages-guide',
    category: 'build',
    title:    'Deploy Next.js to Cloudflare Pages Without the Headaches',
    excerpt:  'The exact settings, the common errors, and the environment variable setup that trips everyone up the first time.',
    author:   '@kivorablog',
    date:     '2026-04-10',
    readTime: 5,
    featured: false,
    tags:     ['cloudflare', 'deployment', 'nextjs'],
    heroImage: '/images/posts/cloudflare-deploy-hero.png',
    midImage:  '/images/posts/cloudflare-deploy-mid.png',
    ctaImage:  '/images/posts/cloudflare-deploy-cta.png',
    ctaText:   'Deploy your Next.js app now',
    thumbnail: '/images/posts/cloudflare-deploy-thumb.png',
    content: `## The Exact Settings

Build command: \`npx next build\`
Output directory: \`.next\`
Node.js version: \`20\` (set in Environment Variables as \`NODE_VERSION = 20\`)

## Environment Variables

Set them in Cloudflare Pages dashboard under **Settings → Environment Variables → Production**. Add all NEXT_PUBLIC_ variables there too — they are not public just because they say public in the name, they still need to be set server-side in the build process.

## Common Error 1: Functions directory conflict

If you have a \`/functions\` folder from a previous Hugo or static site, delete it. Cloudflare Pages interprets that as Cloudflare Workers functions and it conflicts with Next.js API routes.

## Common Error 2: Missing NODE_VERSION

Without setting Node version explicitly, Cloudflare defaults to Node 16. Next.js 14 requires Node 18+. Add \`NODE_VERSION = 20\` to your environment variables.

## Common Error 3: Edge Runtime compatibility

Some npm packages don't work in the Cloudflare Edge runtime. If you get build errors about Node.js built-ins, add this to \`next.config.js\`:

\`\`\`javascript
module.exports = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['groq-sdk', '@supabase/supabase-js']
  }
}
\`\`\`
    `,
  },

  // ── AUTOMATE ───────────────────────────────────────────────
  {
    slug:     'n8n-workflow-content-agency',
    category: 'automate',
    title:    'The n8n Workflow That Runs a Content Agency Without You',
    excerpt:  'One workflow. Client submits brief → AI writes draft → editor reviews → client receives. Entirely automated except the 10-minute edit.',
    author:   '@kivorablog',
    date:     '2026-04-17',
    readTime: 8,
    featured: true,
    tags:     ['n8n', 'content', 'agency', 'automation'],
    heroImage: '/images/posts/n8n-workflow-hero.png',
    midImage:  '/images/posts/n8n-workflow-mid.png',
    ctaImage:  '/images/posts/n8n-workflow-cta.png',
    ctaText:   'Automate your content pipeline',
    thumbnail: '/images/posts/n8n-workflow-thumb.png',
    content: `
## The Business Model

You run a content agency. Clients pay ₦80,000–₦200,000/month for 8–20 blog posts. You use AI to write first drafts and spend 10 minutes per post editing. Your real role is quality control and client management, not writing.

The workflow below handles the production pipeline end-to-end.

## The Workflow (n8n)

**Trigger:** Client submits a Google Form with: post topic, target keyword, tone (professional/casual/technical), target audience, word count (500/800/1200).

**Step 1 — Groq writes the draft:**
\`\`\`
POST https://api.groq.com/openai/v1/chat/completions

System: You are a professional content writer. Write for the web.
        Use clear headings. Be specific. Never pad. Max one idea per paragraph.

User: Write a {word_count} word blog post about "{topic}".
      Target keyword: {keyword}. Tone: {tone}. Audience: {audience}.
      Return only the post content in markdown.
\`\`\`

**Step 2 — Save to Google Docs** using the Google Docs node. Title: "[DRAFT] {topic} — {client_name}".

**Step 3 — Notify editor** via Slack or email with a link to the Google Doc.

**Step 4 — Editor edits** directly in Google Doc, changes title to "[READY] {topic}".

**Step 5 — Trigger on title change** (Google Docs trigger), extract final content, send to client via email with a delivery report.

## Why This Works

You are not removing humans. You are removing the low-value work (blank page → rough draft) and keeping the high-value work (judgment, voice refinement, quality check). The AI does the 80%. You do the 20% that actually matters.

## The Math

20 posts/month per client. AI writes each in 90 seconds. You spend 10 minutes editing each = 3.3 hours of real work per client per month. At ₦150,000/month per client, that is ₦45,000 per hour of actual work.

## Getting the First Client

Don't pitch "AI content." Pitch "consistent, on-brand content delivered every week without briefing a new freelancer every time." That's the actual pain. The AI is invisible.
    `,
  },
  {
    slug:     'groq-prompts-that-actually-work',
    category: 'automate',
    title:    '12 Groq Prompts That Do Real Business Work',
    excerpt:  'Not generic prompts. Tested, production-ready system prompts for content generation, client communication, data extraction, and research.',
    author:   '@kivorablog',
    date:     '2026-04-14',
    readTime: 6,
    featured: false,
    tags:     ['groq', 'prompts', 'ai', 'automation'],
    heroImage: '/images/posts/groq-prompts-hero.png',
    midImage:  '/images/posts/groq-prompts-mid.png',
    ctaImage:  '/images/posts/groq-prompts-cta.png',
    ctaText:   'Unlock AI prompts that actually work',
    thumbnail: '/images/posts/groq-prompts-thumb.png',
    content: `
## Why Prompt Quality Matters More Than Model Choice

A weak prompt on llama-3.3-70b gives worse results than a strong prompt on llama-3.1-8b. Most people spend time choosing the right model when they should be spending time writing a better system prompt.

The prompts below are production-tested. Each one has a specific job and returns a predictable output format.

## Prompt 1: Business Opportunity Analyzer

\`\`\`
System: You are a ruthlessly honest business analyst.
        When asked about a business opportunity, you always:
        1. State the real income ceiling (not the optimistic one)
        2. List the top 3 reasons people fail at this specifically
        3. Give the minimum viable version that generates first revenue
        4. List only tools that work in Africa without a VPN
        Respond ONLY in valid JSON.

User: Analyze: {opportunity}
\`\`\`

## Prompt 2: Cold Email Writer

\`\`\`
System: You write cold emails that get replies.
        Rules:
        - First line references something specific about their business
        - No more than 4 sentences total
        - One clear ask at the end (not "let me know your thoughts")
        - Never use: "I hope this finds you well", "touch base",
          "synergy", "circle back", "value proposition"
        - Subject line under 6 words

User: Write a cold email to {business_type} offering {service}.
      Their business name: {name}. One specific detail: {detail}.
\`\`\`

## Prompt 3: Meeting Notes Extractor

\`\`\`
System: Extract structured information from meeting transcripts.
        Return ONLY valid JSON with: summary (2 sentences),
        decisions (array), action_items (array with owner and deadline),
        blockers (array), next_meeting (date if mentioned).

User: {transcript}
\`\`\`

## Prompt 4: Product Description Generator

\`\`\`
System: You write product descriptions that convert browsers to buyers.
        Always include: the primary benefit in the first sentence,
        three specific features (not vague claims), who it is for,
        and one concrete use case. Max 80 words.
        Never say: "high quality", "amazing", "perfect", "best".

User: Product: {product_name}. Category: {category}.
      Key features: {features}. Target customer: {customer}.
\`\`\`
    `,
  },
  {
    slug:     'zapier-vs-make-vs-n8n-2026',
    category: 'automate',
    title:    'Zapier vs Make vs n8n in 2026: An Honest Comparison for African Builders',
    excerpt:  'Which one actually works with Paystack, which one runs free forever, and which one breaks the moment you need anything complex.',
    author:   '@kivorablog',
    date:     '2026-04-08',
    readTime: 6,
    featured: false,
    tags:     ['zapier', 'make', 'n8n', 'comparison', 'no-code'],
    heroImage: '/images/posts/zapier-vs-hero.png',
    midImage:  '/images/posts/zapier-vs-mid.png',
    ctaImage:  '/images/posts/zapier-vs-cta.png',
    ctaText:   'Choose the right automation tool',
    thumbnail: '/images/posts/zapier-vs-thumb.png',
    content: `
## The Honest Summary First

**n8n self-hosted** — best for builders who can deploy to Railway or Render. Free forever. Most powerful. Steeper learning curve.

**Make (formerly Integromat)** — best for non-technical users who need complex logic. Free tier is generous (1,000 operations/month). Accepts local payment for paid plans.

**Zapier** — most integrations, most expensive, free tier is too limited for real work. Requires a USD card for paid plans. Hard to justify unless the specific integration you need only exists on Zapier.

## Paystack Integration

| Platform | Native Paystack | Webhook support | Notes |
|---|---|---|---|
| n8n | No native | Yes, via webhook | Build your own trigger |
| Make | No native | Yes | Webhook trigger works perfectly |
| Zapier | No native | Yes, via webhook | Works but expensive |

All three work with Paystack via webhooks. None have a native Paystack integration. The webhook approach works fine for most use cases.

## The Free Tier Reality

**n8n self-hosted:** Unlimited everything. Host on Railway ($5/month) or Render (free tier). One-time setup. Runs forever for free.

**Make free:** 1,000 operations/month, 2 active scenarios. Good for testing, hits limits fast in production.

**Zapier free:** 100 tasks/month, 5 Zaps. Barely useful. Runs into limits on day 2.

## Our Recommendation

Start with Make for learning. Move to self-hosted n8n as soon as you need more than 2 automations running. Never pay for Zapier unless a specific integration genuinely only exists there.
    `,
  },

  // ── MONETIZE ───────────────────────────────────────────────
  {
    slug:     'how-we-priced-our-saas-wrong',
    category: 'monetize',
    title:    'We Priced Our SaaS Wrong for 6 Months. Here\'s What Fixed It.',
    excerpt:  'Charging $9/month felt safe. It attracted the wrong users and killed our growth. Tripling the price was the best decision we made.',
    author:   '@kivorablog',
    date:     '2026-04-16',
    readTime: 7,
    featured: true,
    tags:     ['pricing', 'saas', 'revenue', 'case-study'],
    heroImage: '/images/posts/saas-pricing-hero.png',
    midImage:  '/images/posts/saas-pricing-mid.png',
    ctaImage:  '/images/posts/saas-pricing-cta.png',
    ctaText:   'Price your SaaS right from day one',
    thumbnail: '/images/posts/saas-pricing-thumb.png',
    content: `
## The Mistake

We launched at $9/month because it felt accessible. We thought low price = more customers = more growth. The opposite happened.

At $9/month we attracted customers who:
- Needed a lot of support for every tiny feature
- Churned the moment they hit a limitation
- Asked us to add features we didn't want to build
- Complained constantly about value

Six months in, we had 200 customers paying $9. That's $1,800 MRR with a churn rate of 18% monthly. We were running backwards.

## The Experiment

We raised the price to $29/month for all new customers. Kept existing customers at $9.

First month at $29: Signups dropped 40%. We panicked.

Revenue went up 60%. The customers who signed up at $29:
- Asked better questions
- Needed less support
- Stayed longer
- Gave better feedback

## What Actually Happened to Churn

At $9: 18% monthly churn (customers don't think twice about cancelling — it costs less than a meal)
At $29: 6% monthly churn (people actually try to get value before leaving)

## The Pricing Principle We Learned

Price communicates positioning. $9 says "cheap tool." $29 says "I should use this properly." Your price shapes how customers treat your product.

The right question is not "what can I charge without losing customers?" It is "what price attracts customers who will actually succeed with my product?"

## What We'd Do Differently

Start at $49. Not $9. Not $29. $49. Then offer a 14-day free trial instead of a free tier. Free tiers attract non-buyers. Trials convert real buyers who need a deadline.
    `,
  },
  {
    slug:     'affiliate-marketing-ai-tools-niche',
    category: 'monetize',
    title:    'The AI Tools Affiliate Niche Is Still Wide Open in Africa',
    excerpt:  'Most affiliate content for AI tools is written by Americans for Americans. Here\'s how to capture the African and diaspora audience that nobody is serving.',
    author:   '@kivorablog',
    date:     '2026-04-13',
    readTime: 8,
    featured: false,
    tags:     ['affiliate', 'ai-tools', 'africa', 'seo'],
    heroImage: '/images/posts/affiliate-ai-hero.png',
    midImage:  '/images/posts/affiliate-ai-mid.png',
    ctaImage:  '/images/posts/affiliate-ai-cta.png',
    ctaText:   'Start earning with AI affiliate marketing',
    thumbnail: '/images/posts/affiliate-ai-thumb.png',
    content: `
## The Gap

Search "best AI writing tools" and you get 500 articles comparing the same 5 tools with pricing in USD and recommendations to "just use your credit card." That content is useless for someone in Lagos who needs to know: does it accept Paystack? Does it work without a VPN? What is ₦15,000 in this context?

Nobody is writing that version of the content. That is your opportunity.

## The Search Volume

Queries like "AI tools that work in Nigeria," "Groq API how to use in Africa," "ChatGPT alternatives Nigeria" collectively get tens of thousands of searches per month and have almost no serious competition. The CPC on these keywords is low but the intent is extremely high — someone searching that specifically is ready to sign up.

## The Affiliate Programs That Pay Well

| Tool | Commission | Cookie | Notes |
|---|---|---|---|
| Writesonic | 30% recurring | 90 days | Has African users |
| Jasper | 25% recurring | 45 days | High ticket |
| Copy.ai | 45% first month | 60 days | Best conversion |
| Notion | $5 per signup | 90 days | Low value but high volume |
| Zapier | 20% recurring | 30 days | Strong brand |

## The Content Strategy

Write comparison articles specifically framed for the African context. Every article answers: works without VPN (yes/no), accepts local payment (yes/no), free tier quality, real monthly cost in NGN/KES/GHS.

Build a simple comparison table at the top. Put affiliate links on every "Sign up" button. You don't need 100 articles. You need 10 articles that each rank for their specific query.

## Realistic Income Timeline

Month 1–3: Write 10 articles, zero traffic
Month 4–6: First organic traffic, $100–$300/month
Month 6–12: Compounding, $500–$2,000/month
Year 2: $2,000–$8,000/month if you kept publishing

This is slow money. It is also passive money. The same article makes money for years.
    `,
  },
  {
    slug:     'paystack-integration-nextjs-full-guide',
    category: 'monetize',
    title:    'Paystack Integration in Next.js: The Complete Guide',
    excerpt:  'Initialize payments, verify webhooks, update your database on success. Production-ready code, no fluff.',
    author:   '@kivorablog',
    date:     '2026-04-09',
    readTime: 6,
    featured: false,
    tags:     ['paystack', 'nextjs', 'payments', 'nigeria'],
    heroImage: '/images/posts/paystack-integration-hero.png',
    midImage:  '/images/posts/paystack-integration-mid.png',
    ctaImage:  '/images/posts/paystack-integration-cta.png',
    ctaText:   'Accept payments with Paystack today',
    thumbnail: '/images/posts/paystack-integration-thumb.png',
    content: `
## The Two Routes You Need

**Route 1: Initialize** — creates the payment session and returns a redirect URL
**Route 2: Verify** — called after payment, confirms success and updates your DB

That's it. Everything else is UI.

## Initialize Route

\`\`\`javascript
// app/api/payments/initialize/route.js
export async function POST(req) {
  const { email, plan, userId } = await req.json()

  const PLANS = {
    starter:  { amount: 500000, label: 'Starter' },   // ₦5,000 in kobo
    pro:      { amount: 2000000, label: 'Pro' },        // ₦20,000 in kobo
  }

  const reference = \`kv_\${userId}_\${Date.now()}\`

  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${process.env.PAYSTACK_SECRET_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: PLANS[plan].amount,
      reference,
      metadata: { userId, plan },
      callback_url: \`\${process.env.NEXT_PUBLIC_SITE_URL}/payments/verify\`,
    }),
  })

  const data = await res.json()
  return Response.json({ url: data.data.authorization_url, reference })
}
\`\`\`

## Verify Route

\`\`\`javascript
// app/api/payments/verify/route.js
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req) {
  const { reference } = await req.json()

  const res = await fetch(
    \`https://api.paystack.co/transaction/verify/\${reference}\`,
    { headers: { Authorization: \`Bearer \${process.env.PAYSTACK_SECRET_KEY}\` } }
  )
  const data = await res.json()

  if (data.data.status !== 'success') {
    return Response.json({ error: 'Payment not successful' }, { status: 400 })
  }

  const { userId, plan } = data.data.metadata

  // Update user plan in your database
  await supabaseAdmin
    .from('profiles')
    .update({ plan, updated_at: new Date().toISOString() })
    .eq('id', userId)

  return Response.json({ success: true, plan })
}
\`\`\`

## The Webhook (For Reliability)

Don't rely only on the callback URL. Payment callbacks can fail if the user closes the browser. Use Paystack webhooks to guarantee your database always gets updated.

Set webhook URL in Paystack dashboard: \`https://yourapp.com/api/payments/webhook\`
    `,
  },

  // ── SCALE ──────────────────────────────────────────────────
  {
    slug:     'from-solo-to-first-hire',
    category: 'scale',
    title:    'From Solo to First Hire: What Nobody Tells You About Growing Past Yourself',
    excerpt:  'Your first hire is not about delegation. It\'s about deciding what version of the business you\'re actually building.',
    author:   '@kivorablog',
    date:     '2026-04-15',
    readTime: 8,
    featured: true,
    tags:     ['hiring', 'growth', 'solo', 'team'],
    heroImage: '/images/posts/first-hire-hero.png',
    midImage:  '/images/posts/first-hire-mid.png',
    ctaImage:  '/images/posts/first-hire-cta.png',
    ctaText:   'Make your first hire the right one',
    thumbnail: '/images/posts/first-hire-thumb.png',
    content: `
## The Lie About Delegation

Everyone says "hire for your weaknesses." It sounds right. It's mostly wrong.

Hiring for your weaknesses means hiring someone to do things you hate — which usually means things you've never done well enough to know what "good" looks like. You can't manage quality you can't evaluate.

Hire for your bottleneck first. What is the thing that, if you had 40 more hours per week, would make the most difference to revenue? That is what you hire for first.

## Before You Hire: The SOP Test

If you can't write a standard operating procedure for the role, you are not ready to hire for it. Not a job description. An SOP — step by step, this is what this person does every Monday morning. What decisions do they make. What does a good outcome look like.

If you can't write that, you don't understand the role well enough to manage it. Do the job yourself for another month and document everything you do.

## The First Role That Moves the Needle

For most solo builders, the answer is either:

**Customer support / account management** — if your bottleneck is time spent answering the same questions and managing existing clients, every hour you hire back is directly available for growth.

**Content / distribution** — if your bottleneck is getting attention, a part-time content person who understands your audience is a force multiplier.

Not a developer (unless you're non-technical). Not a "general assistant." Not a project manager. Either of those two roles based on where your specific growth is stalling.

## The Hiring Mistake Everyone Makes

Hiring a full-time employee first. Start with a contractor on a defined project. Pay them well for the project. See how they work. See if the output moves the needle. If it does, offer a retainer. If the retainer works, offer part-time. If part-time works, offer full-time.

Each step is a checkpoint. You are not guessing about culture fit with a six-month commitment. You are evaluating performance with a two-week commitment.

## The Math of Your First Hire

Before hiring, answer this: if this hire works perfectly, how much additional revenue does it unlock per month? If the answer is more than 3x their monthly cost, hire. If it's less than 3x, either you're solving the wrong bottleneck or the business is not ready for a hire.
    `,
  },
  {
    slug:     'systems-thinking-one-person-business',
    category: 'scale',
    title:    'The 3 Systems Every One-Person Business Needs Before It Breaks',
    excerpt:  'Most solo businesses collapse not from lack of customers but from lack of systems. Build these three before you need them.',
    author:   '@kivorablog',
    date:     '2026-04-11',
    readTime: 7,
    featured: false,
    tags:     ['systems', 'solo', 'operations', 'growth'],
    heroImage: '/images/posts/systems-thinking-hero.png',
    midImage:  '/images/posts/systems-thinking-mid.png',
    ctaImage:  '/images/posts/systems-thinking-cta.png',
    ctaText:   'Build systems before you break',
    thumbnail: '/images/posts/systems-thinking-thumb.png',
    content: `
## System 1: Lead Tracking

You need to know, at any moment: how many potential clients are in conversation, what stage they're at, and when you last contacted them. This is not a CRM. This is a single Google Sheet with five columns: Name, Company, Stage (contacted/demo/proposal/closed/lost), Last Contact Date, Notes.

Spend 10 minutes every Friday updating it. Never let more than 7 days pass without a touchpoint on any active prospect.

The reason this matters: without it, you forget people. You follow up on some and not others. Your close rate looks random when it's actually just inconsistent follow-up.

## System 2: Delivery Checklist

For every service or product you deliver, there is a checklist. Every item that needs to happen before a client receives work. Not in your head. Written down. Followed every time.

This sounds obvious. Almost nobody does it. The result is inconsistent quality — sometimes you forget to do the onboarding call, sometimes you forget to add them to the Slack channel, sometimes you forget to send the invoice.

One missed step compounds. Clients who have a rough first 30 days churn. A checklist costs 20 minutes to write and saves you months of bad retention.

## System 3: Revenue Forecasting

A simple spreadsheet: this month's MRR, projected next month's MRR assuming current churn and close rate, and a 3-month rolling view. Nothing fancy.

The reason this matters: decisions made without a 3-month revenue view are made blind. When should you hire? When should you invest in a new channel? When can you take a week off? All of these are downstream of knowing what your revenue will look like.

Most solo builders run their business looking at last month's numbers. You need to run it looking at next month's projections.
    `,
  },
  {
    slug:     'growth-tactics-that-work-without-ads',
    category: 'scale',
    title:    '7 Growth Tactics That Don\'t Require an Ad Budget',
    excerpt:  'Paid ads are a tax on businesses that haven\'t figured out organic distribution yet. Here\'s what works before you pay.',
    author:   '@kivorablog',
    date:     '2026-04-06',
    readTime: 6,
    featured: false,
    tags:     ['growth', 'organic', 'distribution', 'marketing'],
    heroImage: '/images/posts/growth-tactics-hero.png',
    midImage:  '/images/posts/growth-tactics-mid.png',
    ctaImage:  '/images/posts/growth-tactics-cta.png',
    ctaText:   'Grow without spending on ads',
    thumbnail: '/images/posts/growth-tactics-thumb.png',
    content: `
## 1. Build in Public on X/Twitter

Document what you're building, what you're learning, what's working. One honest post per day about the real experience of building. Not motivational. Not vague. Specific: "Spent 3 hours on a Supabase RLS bug. Here's the fix." That tweet finds the next person with the same problem.

## 2. Answer Questions in Communities

Pick 3 communities where your target customer hangs out. Answer 5 questions per week. Never pitch. Just help. Your profile links to your product. The people you help remember you.

## 3. Write One Deeply Useful Article Per Week

Not 10 thin articles. One article that is genuinely the best thing on the internet about that specific narrow topic. Takes 4 hours. Ranks for 3 years.

## 4. Cold Outreach With Genuine Observation

Not "I think my product could help you." Instead: "I noticed your onboarding flow asks for a credit card before showing the product — I've found that removes 40% of sign-ups before they see value. Happy to share what I tested if useful."

That message gets replies. It demonstrates real knowledge of their specific situation. You earn the conversation by showing your work.

## 5. Partnerships Over Ads

Find 3 businesses who serve the same customer but are not competitors. Propose a simple swap: you promote them to your audience, they promote you to theirs. No money changes hands. Both sides get distribution.

## 6. Productized Free Tool

Build one free tool that solves a tiny problem your ideal customer has. Not a product. A single-purpose tool. Put it on your website. It ranks for the problem query. People who use it know you exist and see what you do.

## 7. Show the Results, Not the Product

Case study content — real client results with real numbers — converts better than any feature page. One case study with specific numbers (client went from ₦200k/month to ₦800k/month in 90 days) beats 10 testimonials that say "great service, highly recommend."
    `,
  },

  // ── STORIES ────────────────────────────────────────────────
  {
    slug:     'how-i-built-content-agency-0-to-500k',
    category: 'stories',
    title:    'From Freelancer to ₦500k/Month: The Exact Path I Took',
    excerpt:  'I did not get there by working harder. I got there by changing what I was selling and who I was selling it to. Here\'s the full story.',
    author:   '@kivorablog',
    date:     '2026-04-16',
    readTime: 10,
    featured: true,
    tags:     ['case-study', 'content-agency', 'nigeria', 'freelancing'],
    heroImage: '/images/posts/content-agency-hero.png',
    midImage:  '/images/posts/content-agency-mid.png',
    ctaImage:  '/images/posts/content-agency-cta.png',
    ctaText:   'Build your content system today',
    thumbnail: '/images/posts/content-agency-thumb.png',
    content: `
## Where I Started

January 2025. I was charging ₦5,000 per blog post on Fiverr. Writing for UK and US clients who paid in dollars but the exchange was always in my favour until it wasn't. Five posts a week was ₦100,000/month before platforms took their cut. That's ₦60–₦70k in real take-home.

I was working 50+ hours a week for money I could have made working at a bank.

## The Thing That Changed Everything

A client asked me to write 20 posts a month for their e-commerce business. I almost said no — too much work. Instead I said yes and immediately figured out how to use AI to produce the drafts.

That month I wrote 20 posts in 25 hours instead of 80. The quality was the same. The client was happy. I just discovered I had a 3x efficiency multiplier and wasn't using it.

That was the moment I stopped thinking about being a better writer and started thinking about building a better system.

## The Pivot

I stopped taking individual posts. I started selling monthly retainers only. Minimum 8 posts per month, ₦80,000 flat. No negotiation. No per-post pricing.

First month of the new model: 3 clients. ₦240,000.

I was working less and earning more because retainers meant I could plan my week instead of scrambling for one-off work.

## The System That Made ₦500k Possible

By month 6 I had 7 retainer clients at ₦80,000 each = ₦560,000/month. I was working about 25 hours per week total. The system:

1. Client submits content brief via Typeform
2. Groq writes the first draft overnight (scheduled via n8n)
3. I spend 10–15 minutes editing each post
4. Approved posts go to a Google Sheets tracker
5. Client receives posts on the 15th and 30th of every month, every month, without me sending a reminder

The ₦80,000 monthly fee seems high until you realise the client is getting predictability. They always know content is coming. They never have to manage a writer. They never chase a deadline.

## What I Would Tell Someone Starting Today

Don't compete on price. Position yourself as the person who removes the headache of content entirely. Charge for the system, not the words.

The AI part is not the product. The reliability is the product.
    `,
  },
  {
    slug:     'my-saas-failed-heres-what-happened',
    category: 'stories',
    title:    'I Built a SaaS for 8 Months and 4 People Used It. Here\'s What Went Wrong.',
    excerpt:  'Not a humble-brag failure story. An honest forensic breakdown of every decision that was wrong from month one.',
    author:   '@kivorablog',
    date:     '2026-04-12',
    readTime: 9,
    featured: false,
    tags:     ['failure', 'saas', 'lessons', 'case-study'],
    heroImage: '/images/posts/saas-failed-hero.png',
    midImage:  '/images/posts/saas-failed-mid.png',
    ctaImage:  '/images/posts/saas-failed-cta.png',
    ctaText:   'Learn from failure, build to succeed',
    thumbnail: '/images/posts/saas-failed-thumb.png',
    content: `
## The Product

A tool that helped content creators schedule and repurpose posts across platforms. We built it because we needed it ourselves. We assumed other people needed it too.

We were wrong. Not about the problem — other people did need it. We were wrong about how much they needed it and whether they would pay specifically us for it.

## Mistake 1: We Validated With Enthusiasm, Not Behaviour

We showed the idea to 50 people. 47 of them said "that sounds great, I'd definitely use that." We took that as validation.

Asking someone if they'd use a product costs them nothing. They say yes to be polite. The real validation is: did they give us their email? Did they put in a credit card for early access? Did they ask "when can I start?"

Of our 47 "definitely interested" people, 3 signed up when we launched. 1 stayed past 30 days.

## Mistake 2: We Built Everything Before Talking to Customers

8 months of building. Scheduling, analytics, repurposing, templates, team collaboration, API access. We shipped everything.

Nobody asked for any of it.

One person who used the tool asked us if it could post to LinkedIn. That was a 2-day feature. We had built 40 features nobody asked for and hadn't built the one feature someone actually needed.

## Mistake 3: We Thought Distribution Would Figure Itself Out

We posted on Product Hunt. Got 200 upvotes. Got a spike of 80 signups. Felt amazing.

Within 2 weeks: 12 active users. Within 1 month: 4 paying customers at $9/month. $36 MRR. On 8 months of work.

Product Hunt is not distribution. It is a moment of attention. Without a distribution channel that you own and feed consistently, a Product Hunt launch is a sugar spike with a crash.

## What We Should Have Done

Talked to 20 potential customers before writing a single line of code. Built the one feature 3 of them said they couldn't live without. Charged $49/month from day one. Built distribution (a newsletter, a community, a YouTube channel) 6 months before launching.

## The Actual Lesson

The product wasn't the problem. The process of building the product was the problem. We optimised for shipping features instead of solving a specific pain for a specific person.
    `,
  },
  {
    slug:     'winning-first-enterprise-client-lagos',
    category: 'stories',
    title:    'How I Closed a ₦2.4M/Year Enterprise Contract From a Cold DM',
    excerpt:  'The DM, the follow-up, the proposal, the negotiation, and the close. Every step documented.',
    author:   '@kivorablog',
    date:     '2026-04-07',
    readTime: 8,
    featured: false,
    tags:     ['enterprise', 'sales', 'cold-outreach', 'nigeria'],
    heroImage: '/images/posts/enterprise-client-hero.png',
    midImage:  '/images/posts/enterprise-client-mid.png',
    ctaImage:  '/images/posts/enterprise-client-cta.png',
    ctaText:   'Close your first enterprise deal',
    thumbnail: '/images/posts/enterprise-client-thumb.png',
    content: `
## The Starting Point

I ran a small automation consultancy — 3 people, mostly SME clients paying ₦200k–₦500k for workflow automation projects. I wanted one large client that would give us stability and a flagship reference.

I targeted a logistics company I knew was struggling with manual tracking — I'd heard this from a mutual contact, not from their website.

## The DM (Verbatim)

"Hi [Name], I noticed your team is running WhatsApp tracking updates manually — I spotted 3 driver complaints about delayed confirmation messages on your Google reviews. We built a similar system for [competitor they'd recognise] that cut that problem by 80% in 6 weeks. Would it be worth 20 minutes to show you what we did?"

Three things that made it work: specific observation (the Google reviews), social proof (a competitor they knew), and a small ask (20 minutes, not a sales call).

## What Happened After

He replied in 4 hours. Called within 2 days. The 20-minute call became 75 minutes. He introduced me to his operations director on the same call.

The proposal took 2 weeks to write properly. Not because it was complex — because I spent 12 days learning everything about their operation before I wrote a single recommendation.

## The Close

Total project: ₦2.4M over 12 months. Split into ₦600k upfront, ₦150k/month retainer for implementation and maintenance.

The thing that closed it: we positioned ourselves not as a tech vendor but as a department extension. "You don't have an automation team. We are your automation team for 12 months." That framing removed the "why you" question. We weren't competing with other vendors. We were filling a gap their org chart had.

## What I'd Do Differently

Ask for the operations director in the first DM. The founder was the door opener but had zero budget authority. Every additional stakeholder I wasn't in the room with was a delay I couldn't control.
    `,
  },

  // ── NEW POSTS ──────────────────────────────────────────────
  {
    slug:     'open-source-ai-stack-abandons-subscriptions-47k-month',
    category: 'build',
    title:    'I Abandoned Every AI Subscription and Built My Own Stack for $0/Month — Now I Make $47K/Month Selling It as a Service',
    excerpt:  'No more ChatGPT Pro. No more Midjourney. No more Jasper. Here\'s the exact open-source stack I assembled and how I convinced 23 businesses to pay me to run it for them.',
    author:   '@kivorablog',
    date:     '2026-04-21',
    readTime: 10,
    featured: true,
    tags:     ['open-source', 'ai', 'llm', 'business', 'sovereignty'],
    heroImage: '/images/posts/open-source-ai-stack-hero.png',
    midImage:  '/images/posts/open-source-ai-stack-mid.png',
    ctaImage:  '/images/posts/open-source-ai-stack-cta.png',
    ctaText:   'Build your own AI stack today',
    thumbnail: '/images/posts/open-source-ai-stack-thumb.png',
    content: `
## Why I Cancelled Everything

In January 2026 I sat down and added up what I was spending on AI tools every month. ChatGPT Pro: $20. Midjourney: $30. Jasper: $49. Copy.ai: $49. Grammarly: $15. Notion AI: $10. Claude Pro: $20. That's $193/month for tools I didn't fully control, couldn't customize, and couldn't resell access to.

More importantly, every one of those tools could change their pricing, limit their API, or shut down entirely without warning. My entire workflow depended on companies I had zero influence over.

So I built my own stack. Every piece open-source. Every piece running on infrastructure I control. Zero monthly subscription cost. And then I realised: businesses will pay me to run this exact stack for them.

## The Stack (All Open-Source, All Free)

**Ollama + Llama 3.1 70B** — Local LLM that matches GPT-4 quality for most business tasks. Runs on a rented GPU server for ~₦45,000/month. Serves all 23 clients from one instance.

**Stable Diffusion XL + ComfyUI** — Image generation that replaces Midjourney. Runs on the same GPU server. Custom fine-tuned on brand assets per client.

**Whisper (local)** — Transcription that replaces Otter.ai and every other speech-to-text tool. Zero cost per minute. Unlimited usage.

**n8n (self-hosted)** — Workflow automation that replaces Zapier. Already running. Already paid for. Unlimited operations.

**Supabase** — Database, auth, and storage. Free tier handles everything. Client data never leaves infrastructure I control.

Total infrastructure cost: ~₦55,000/month. Revenue from 23 clients: ₦11.5 million/month. That's a 99.5% margin.

## How I Get Clients to Pay ₦500K/Month for This

The pitch is never "I have open-source AI tools." The pitch is "You're spending ₦200K/month on AI subscriptions across your team and getting inconsistent results because everyone uses different tools differently. I'll give your entire company a unified AI system — chat, content, images, transcription, workflow automation — for one flat fee, and it runs on infrastructure nobody can take away from you."

That last part — "nobody can take away from you" — is what closes deals. African businesses have been burned by tools that suddenly require a USD card, or APIs that get rate-limited, or services that shut down with 30 days notice. Sovereignty sells.

## The Client Onboarding Process

Week 1: Deploy their instance on a fresh VPS with their domain, their branding, their login system.
Week 2: Fine-tune image generation on their brand assets (logos, product photos, style guides).
Week 3: Build 5 custom n8n workflows specific to their business (content calendar, customer support bot, lead qualification, report generation, email drafting).
Week 4: Train their team. Hand over documentation. Set up monitoring.

After week 4, my ongoing work per client is roughly 2 hours/month for maintenance and updates. At ₦500K/month per client, that's ₦250K per hour.

## Why This Works When Selling AI Access Doesn't

Anyone can sell ChatGPT access. It's a commodity. What businesses actually want is: someone who will set it up properly, customize it for their specific needs, keep it running, and be accountable when it breaks. They're not paying for the AI. They're paying for the reliability and the customisation and the peace of mind.

The open-source part is your margin. The service part is your product.

## The Realistic Path to $47K

Month 1–2: Build your stack, get it stable, document everything.
Month 3–4: Land your first 3 clients at ₦200K/month. Prove the model.
Month 5–8: Raise to ₦500K/month for new clients. Get to 10 clients.
Month 9–12: Add premium features (custom model fine-tuning, dedicated GPU instances). Get to 23 clients.

This is not a weekend project. It's a real business with real infrastructure. But the margin is absurd because your cost doesn't scale with clients — one GPU server serves them all.
    `,
  },
  {
    slug:     'seo-content-farm-47-minutes-900k-organic',
    category: 'automate',
    title:    'How I Built a 47-Minute SEO Content Farm That Generates $14,700/Month in Pure Organic Traffic',
    excerpt:  'One n8n workflow. One Groq prompt. One Supabase database. Zero human editing. Here\'s the exact system that pumps out 120 SEO-optimized articles per month on autopilot.',
    author:   '@kivorablog',
    date:     '2026-04-20',
    readTime: 9,
    featured: true,
    tags:     ['seo', 'content', 'automation', 'organic-traffic', 'ai'],
    heroImage: '/images/posts/seo-content-farm-hero.png',
    midImage:  '/images/posts/seo-content-farm-mid.png',
    ctaImage:  '/images/posts/seo-content-farm-cta.png',
    ctaText:   'Build your SEO content machine',
    thumbnail: '/images/posts/seo-content-farm-thumb.png',
    content: `
## The System in 47 Minutes

That's how long it takes per day to maintain a content operation that publishes 4 SEO-optimized articles every single day. I don't write any of them. I don't edit any of them. I check the dashboard for 47 minutes each morning, approve what looks good, and move on with my day.

The rest is automated. And the articles rank. Not because they're masterpieces — because they're precisely targeted at low-competition keywords that nobody else is writing about for the African market.

## The Keyword Strategy That Makes This Work

Most content farms target broad keywords like "best project management tools" and get crushed by Forbes and HubSpot. I target queries like "project management tools that accept Paystack" or "free CRM for small business Nigeria" — keywords with 500–2,000 monthly searches and almost zero competition.

These keywords have three properties that make them perfect for automated content:
- **High intent**: Someone searching this specifically is ready to buy.
- **Low competition**: No major publication is writing about Paystack integrations.
- **Predictable structure**: Every article follows the same format (comparison table, feature breakdown, pricing in NGN, verdict).

I find these keywords using a free Groq prompt that analyses Google Suggest and People Also Ask results. The prompt returns 50 keyword clusters per niche. Each cluster becomes an article.

## The n8n Workflow

**Step 1 — Keyword ingestion:** Every Sunday I paste 30 keywords into a Google Sheet. The sheet is connected to n8n via webhook.

**Step 2 — Research:** n8n sends each keyword to Groq with a research prompt that returns: top 3 ranking articles' key points, common questions from People Also Ask, and specific data points to include.

**Step 3 — Drafting:** A second Groq call writes the article using this system prompt:

\`\`\`
You write SEO-optimized comparison articles for the African market.
Rules:
- First 100 words must include the exact target keyword
- Include a comparison table with at least 5 rows
- Every tool must be evaluated on: works without VPN (yes/no),
  accepts local payment (yes/no), free tier quality, monthly cost in NGN
- Minimum 800 words
- Use H2 headings every 200 words
- End with a clear verdict that recommends one specific tool
- Never use: "in conclusion", "it's worth noting", "ultimately"
\`\`\`

**Step 4 — Publishing:** The draft goes to Supabase as a draft. My CMS auto-publishes at 6am WAT the next morning.

**Step 5 — Monitoring:** A daily n8n workflow checks Google Search Console via API and logs impressions, clicks, and average position for each article.

## The Revenue Math

120 articles/month. Average time to rank: 6–8 weeks. Once ranked, average article generates $3–$8/month in ad revenue and $12–$40/month in affiliate commissions.

After 6 months of publishing (720 articles):
- Ad revenue: ~$4,200/month
- Affiliate commissions: ~$10,500/month
- Total: $14,700/month

Cost: ₦0 in writing. ₦0 in editing. ₦15,000/month in hosting and API calls. The margin is effectively 99%.

## Why I Don't Edit the Articles

I tested this. For 2 months I edited every article before publishing. For 2 months I published raw AI output. The difference in traffic after 8 weeks: 7%. The difference in time spent: 3 hours/day vs 47 minutes/day.

The 7% traffic lift is not worth 4x the time investment. SEO at this scale is a numbers game. Volume beats perfection when you're targeting keywords that have no serious competition.

## The Caveat

This works for informational and comparison content. It does not work for opinion pieces, thought leadership, or anything that requires genuine expertise. Know what your system is good at and stay in that lane.
    `,
  },
  {
    slug:     'faceless-youtube-empire-340k-month-zero-camera',
    category: 'monetize',
    title:    'The Faceless YouTube Empire Blueprint: How I Built 14 Channels Generating $8,340/Month With Zero Camera Time',
    excerpt:  'No face. No voice. No editing skills. Just AI-generated scripts, stock footage, and a publishing schedule that compounds. Here\'s the exact channel-by-channel breakdown.',
    author:   '@kivorablog',
    date:     '2026-04-19',
    readTime: 11,
    featured: true,
    tags:     ['youtube', 'faceless', 'automation', 'video', 'passive-income'],
    heroImage: '/images/posts/faceless-youtube-hero.png',
    midImage:  '/images/posts/faceless-youtube-mid.png',
    ctaImage:  '/images/posts/faceless-youtube-cta.png',
    ctaText:   'Start your faceless YouTube empire',
    thumbnail: '/images/posts/faceless-youtube-thumb.png',
    content: `
## The Model

Faceless YouTube channels that make money from AdSense, affiliate links, and digital product sales. I run 14 of them. I appear in none of them. I edit none of them. My total daily involvement is about 90 minutes of quality control and scheduling.

The channels span finance, tech reviews, health, motivation, and how-to content — all niches where faceless content performs well and CPMs are high.

## The Channel-by-Channel Breakdown

| Channel Niche | Videos/Month | Avg Views/Video | Monthly Revenue |
|---|---|---|---|
| Personal Finance Africa | 12 | 8,200 | $1,840 |
| Tech Tool Comparisons | 8 | 5,600 | $1,120 |
| AI Tool Tutorials | 10 | 6,100 | $1,340 |
| Stock Market Basics | 8 | 4,300 | $1,290 |
| Side Hustle Ideas | 12 | 7,800 | $890 |
| Health Tips | 15 | 3,200 | $480 |
| Motivational Shorts | 20 | 12,000 | $520 |
| Real Estate Investing | 6 | 3,800 | $380 |
| Crypto Explainers | 8 | 4,100 | $370 |
| Career Advice | 10 | 2,900 | $290 |
| Productivity Hacks | 8 | 2,400 | $220 |
| Relationship Advice | 12 | 3,600 | $210 |
| Cooking Recipes | 15 | 1,800 | $160 |
| Travel Tips Africa | 6 | 1,200 | $130 |

**Total: $8,340/month from AdSense alone.** Affiliate commissions add another $1,200–$1,800/month.

## The Production Pipeline

**Script:** Groq writes a 1,200-word script per video using a niche-specific system prompt. Each script follows the same structure: hook (first 10 seconds), problem, solution, proof, CTA.

**Voiceover:** ElevenLabs generates the voice. I use 4 different voices across the channels so they don't all sound the same. Cost: $22/month for the Creator plan.

**Footage:** Pexels and Pixabay free stock footage, assembled in CapCut using AI-powered auto-edit. Each video takes about 15 minutes to assemble manually, or I use n8n to auto-generate simple ones.

**Thumbnails:** Canva templates with AI-generated backgrounds. Each thumbnail takes 5 minutes.

**Upload:** Scheduled via YouTube API, triggered by n8n. Title, description, tags, and end screen all generated by Groq and injected automatically.

## The SEO Strategy That Gets Views

YouTube SEO is simpler than people think. Three things matter: title keyword match, thumbnail click-through rate, and average view duration. I optimise ruthlessly for all three.

**Titles:** Always include the exact search phrase. "How to Save ₦50,000/Month on a ₦200,000 Salary" not "Tips for Saving Money."

**Thumbnails:** High contrast, one bold number, one emotion. Tested with A/B uploads in the first 24 hours — I upload two thumbnails and keep the one with higher CTR.

**Retention:** The script is structured to deliver a new piece of value every 30–45 seconds. No filler. No long intros. The hook delivers the core promise in the first 10 seconds.

## Why Most Faceless Channels Fail

They focus on quantity over quality within each video. Publishing 30 mediocre videos will get you less traction than publishing 8 videos where each one keeps 60%+ of viewers past the 3-minute mark. YouTube's algorithm cares about retention, not upload frequency.

The fix: make each script tight. Cut everything that doesn't deliver value. If a section doesn't teach something, prove something, or surprise the viewer, remove it.

## The Revenue Timeline

Month 1–3: Build 3 channels, 8 videos each. Zero revenue.
Month 4–6: First 1,000 subs on 2 channels. Apply for monetization. $200–$500/month.
Month 7–12: Add 4 more channels. Existing channels compound. $2,000–$4,000/month.
Year 2: 14 channels running. Systems fully automated. $8,000–$12,000/month.

The first 6 months feel like nothing is happening. That's normal. YouTube rewards consistency and age. The channels that are 18 months old make 4x what the 6-month-old channels make with the same content quality.
    `,
  },
  {
    slug:     'ai-agent-force-multiplying-5x-revenue-37-days',
    category: 'scale',
    title:    'I Replaced 3 Employees With AI Agents and 5x\'d Revenue in 37 Days — The Complete Playbook',
    excerpt:  'Not a layoff story. A systems story. I built AI agents that handle lead qualification, client onboarding, and report generation — then freed my team to do only high-value work.',
    author:   '@kivorablog',
    date:     '2026-04-20',
    readTime: 9,
    featured: false,
    tags:     ['ai-agents', 'automation', 'scaling', 'revenue', 'operations'],
    heroImage: '/images/posts/ai-agent-force-hero.png',
    midImage:  '/images/posts/ai-agent-force-mid.png',
    ctaImage:  '/images/posts/ai-agent-force-cta.png',
    ctaText:   'Multiply your team with AI agents',
    thumbnail: '/images/posts/ai-agent-force-thumb.png',
    content: `
## What I Actually Did

I didn't fire anyone. I had a 5-person team doing work that kept us stuck at ₦3.2M/month revenue. Three of them were spending 70% of their time on tasks that didn't require human judgment — responding to initial inquiries, collecting client information, formatting reports, scheduling calls, and sending follow-up emails.

I built AI agents to handle those tasks. The three team members didn't lose their jobs — they shifted to exclusively high-value work: closing deals, managing complex client relationships, and building strategy. The result: revenue went from ₦3.2M to ₦16M/month in 37 days because the team could suddenly handle 5x the clients.

## Agent 1: Lead Qualification Agent

**Before:** A team member spent 3 hours/day responding to website inquiries, asking qualifying questions, and deciding which leads to pursue. They handled about 15 leads/day.

**After:** An n8n workflow + Groq agent that:
1. Receives the inquiry via webhook
2. Sends a personalised email within 2 minutes asking 4 qualifying questions
3. Analyses the response using a scoring rubric
4. Scores the lead (Hot/Warm/Cold) and adds to the CRM
5. For Hot leads: automatically schedules a call and notifies the sales team
6. For Warm leads: adds to a nurture sequence
7. For Cold leads: sends a polite "not right now" email

**Result:** 80+ leads processed per day with zero human time. Hot lead response time dropped from 4 hours to 2 minutes. Close rate on Hot leads increased 22% because speed of response matters.

## Agent 2: Client Onboarding Agent

**Before:** A team member spent 5 hours/onboarding collecting business info, setting up accounts, configuring dashboards, and sending welcome materials. Average onboarding: 4 days.

**After:** An n8n workflow that:
1. Sends a Typeform link when a deal is closed
2. Collects all business information in one form
3. Creates their Supabase account and configures permissions
4. Generates their dashboard from a template
5. Sends the welcome packet via email
6. Schedules the kick-off call
7. Sends a Slack notification to the delivery team

**Result:** Onboarding time dropped from 4 days to 45 minutes of actual human review. Client satisfaction on the onboarding experience went from 3.2/5 to 4.7/5 because nothing gets missed.

## Agent 3: Report Generation Agent

**Before:** A team member spent 6 hours/week pulling data from 4 different sources, formatting it into a report, and emailing it to clients. Each report was slightly different in quality.

**After:** A scheduled n8n workflow that:
1. Pulls data from Supabase, Google Analytics, and social media APIs every Friday at 5pm
2. Sends raw data to Groq with a report template
3. Groq writes the narrative analysis
4. n8n formats it into a branded PDF
5. Emails it to the client automatically

**Result:** Reports are consistent, never late, and actually better because the AI catches patterns humans miss when they're rushing. Zero human hours per week.

## The 37-Day Revenue Jump

Days 1–7: Built and tested the three agents. Ran them in parallel with the human processes to verify accuracy.
Days 8–14: Switched fully to agent-driven processes. Freed 70% of three team members' time.
Days 15–30: Redirected that capacity to sales and client growth. The team went from handling 12 active clients to handling 45.
Days 31–37: Revenue caught up to the new capacity. ₦3.2M → ₦16M.

The agents didn't create the revenue. The humans created the revenue. The agents just removed the ceiling on how much human capacity was available for revenue-generating work.

## What I'd Tell Someone Building This

Start with the most painful, repetitive task your team does. Not the most complex one — the one that causes the most groaning when it comes up. Build one agent for that. Get it running perfectly. Then move to the next one. Don't try to automate everything at once. Each agent takes about a week to get right if you're focused.
    `,
  },
  {
    slug:     'ai-templates-47k-month-no-following-zero-ads',
    category: 'stories',
    title:    'How I Made $47,000 in 90 Days Selling AI Prompt Templates With Zero Following and Zero Ad Spend',
    excerpt:  'No audience. No ads. No influencer partnerships. Just a product that solves a specific problem and a distribution strategy that costs nothing. Here\'s every step.',
    author:   '@kivorablog',
    date:     '2026-04-21',
    readTime: 10,
    featured: false,
    tags:     ['digital-products', 'ai-prompts', 'templates', 'case-study', 'revenue'],
    heroImage: '/images/posts/ai-templates-47k-hero.png',
    midImage:  '/images/posts/ai-templates-47k-mid.png',
    ctaImage:  '/images/posts/ai-templates-47k-cta.png',
    ctaText:   'Start selling AI prompt templates',
    thumbnail: '/images/posts/ai-templates-47k-thumb.png',
    content: `
## The Product

A collection of 47 production-ready AI prompt templates for African businesses. Not generic "write me a blog post" prompts. Specific, tested prompts for: Paystack payment follow-ups, cold outreach to Nigerian SMEs, product descriptions for Jumia sellers, social media captions for Lagos restaurants, WhatsApp broadcast messages, and 42 others.

Each prompt comes with: the exact system prompt, example input, example output, and customisation instructions. Sold as a PDF + Notion template for $27.

## Why This Works When Generic Prompt Packs Don't

Search "ChatGPT prompts" on Gumroad and you'll find 500 products that are all the same: "50 marketing prompts" written by someone who tested them once. Mine are different because every single prompt was tested in a real African business context. They account for things like Paystack instead of Stripe, WhatsApp instead of email, NGN instead of USD, and VPN restrictions.

That specificity is the entire value proposition. Nobody else is making this for this market.

## The 90-Day Breakdown

**Days 1–14: Product Creation**

I took the 12 Groq prompts from my own business (the ones I'd been using for months) and expanded them. I tested each one with 5 different inputs, refined the prompts based on output quality, and wrote the documentation. Total time: about 40 hours spread over 2 weeks.

**Days 15–30: Free Distribution Strategy**

I posted 3 of the 47 prompts as free samples in:
- 5 Nigerian business WhatsApp groups
- 3 African startup Slack communities
- Twitter (a thread with the full prompt text, not a teaser)

Each free prompt included a note: "This is prompt #12 from my collection of 47. Get the full set at [link]."

The free samples generated 1,200 visits to the Gumroad page. 89 people bought. Revenue: $2,403.

**Days 31–60: SEO Play**

I wrote 8 blog posts, each one showcasing one prompt in full with example output. Each post targeted a specific search query: "ChatGPT prompt for Paystack emails", "AI prompt for Jumia product descriptions", "WhatsApp broadcast prompt for business."

The blog posts started ranking after 3–4 weeks. By day 60, organic search was sending 200–300 visits/day to the product page. Sales: 4–8/day. Revenue for days 31–60: $9,720.

**Days 61–90: Affiliate Strategy**

I offered 50% commission to anyone who promoted the product. Found 12 affiliates by reaching out to people who had already bought and left positive feedback. They promoted to their audiences — small business owners, content creators, agency owners.

Affiliate sales accounted for 35% of revenue in this period. Total revenue for days 61–90: $34,877.

**90-day total: $47,000.** With no audience of my own and zero paid ads.

## The Pricing Decision

$27. Not $9. Not $47. Not $97.

At $9, it feels cheap and people don't implement. At $47, it's a decision that requires deliberation. At $27, it's an impulse buy for any business owner who has experienced the pain of writing prompts from scratch. The price matches the psychological threshold: "I'll make this back on the first prompt I use."

I tested $19 vs $27. Revenue was higher at $27 because the conversion rate barely changed but the per-unit revenue was 42% higher. The product feels more valuable at $27 than at $19.

## What I'd Do Differently

Launch with an affiliate program from day one. I waited 60 days to set it up and left probably $8,000–$12,000 on the table. The affiliates who already bought your product are your best salespeople — they have authentic testimonials and they understand the product because they use it.

Also: I should have built an email list from day one. Every buyer should have been added to a nurture sequence that upsells them on a $97 premium version. That's the next phase.
    `,
  },
]

// ── Helpers ────────────────────────────────────────────────

export function getAllPosts() {
  return [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getFeaturedPosts() {
  return POSTS.filter(p => p.featured).sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostsByCategory(category) {
  return POSTS
    .filter(p => p.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return POSTS.find(p => p.slug === slug) || null
}

export function getRelatedPosts(post, limit = 3) {
  return POSTS
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })
}
