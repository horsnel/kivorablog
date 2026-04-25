# Kivora Blog

> Guides for builders. No fluff. No paywalls.

## Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Hosting:** Cloudflare Pages
- **Fonts:** Inter + JetBrains Mono
- **Styling:** Tailwind CSS

## Colours

```
Background:  #0a0a0a    Surface: #141414    Border:  #262626
Text:        #fafafa    Body:    #d4d4d4    Muted:   #737373

Category colours:
  Build     → #3b82f6 (blue)
  Automate  → #a855f7 (purple)
  Monetize  → #16a34a (green)
  Scale     → #f59e0b (amber)
  Stories   → #dc2626 (red)
```

## Deploy to Cloudflare Pages

| Setting | Value |
|---|---|
| Build command | `npx next build` |
| Output directory | `.next` |
| Node version | `20` |

## Adding a New Post

All posts live in `lib/posts.js`. Add a new object to the `POSTS` array:

```js
{
  slug:     'your-post-slug',          // URL: /post/your-post-slug
  category: 'build',                   // build | automate | monetize | scale | stories
  title:    'Your Post Title',
  excerpt:  'One or two sentence summary shown in cards.',
  author:   'Your Name',
  date:     '2026-05-01',              // YYYY-MM-DD
  readTime: 7,                         // estimated minutes
  featured: false,                     // true = appears in featured section
  tags:     ['tag1', 'tag2'],
  content: `
## Your First Heading

Your content in markdown. Supports:
- ## and ### headings
- **bold** and *italic*
- \`inline code\` and code blocks
- Unordered and ordered lists
- Tables
- Blockquotes
- Horizontal rules (---)

\`\`\`javascript
// Code blocks with language hint
const hello = 'world'
\`\`\`
  `,
}
```

That's it. Save the file, push to GitHub, Cloudflare rebuilds automatically.

## URL Structure

```
/                       → Blog homepage
/build                  → Build category
/automate               → Automate category
/monetize               → Monetize category
/scale                  → Scale category
/stories                → Stories category
/post/[slug]            → Individual post
/sitemap.xml            → Auto-generated sitemap
```

## Linking Between Kivora App and Blog

The blog links back to `https://kivora.pages.dev` in the navbar and sidebar CTA.
Update these URLs after you set your final domain.
