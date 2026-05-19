import PostCard from '@/components/PostCard'
import CategoryNav from '@/components/CategoryNav'
import { getPostsByCategory, CATEGORIES } from '@/lib/posts'

export default function CategoryPageTemplate({ slug }) {
  const cat   = CATEGORIES[slug]
  const posts = getPostsByCategory(slug)

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="border-b border-[#141414] overflow-hidden relative">
        <div className="h-1 w-full" style={{ background: cat.color }} />

        {/* Colour bloom */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-[500px] h-[400px] rounded-full blur-[120px] opacity-[0.06]"
            style={{ background: cat.color, transform: 'translate(-20%, -30%)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          {/* Category nav */}
          <div className="mb-10">
            <CategoryNav active={slug} />
          </div>

          <div className="max-w-2xl">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full border mb-5 inline-block tracking-wide"
              style={{ color: cat.color, background: cat.dim, borderColor: cat.border }}
            >
              {cat.label}
            </span>

            <h1 className="text-5xl md:text-[72px] font-black tracking-tight leading-[0.9] mb-5">
              {cat.label}.
            </h1>

            <p className="text-[#737373] text-lg leading-relaxed max-w-md">
              {cat.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ── Posts grid ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div
              className="w-12 h-12 rounded-xl border flex items-center justify-center mx-auto mb-4"
              style={{ borderColor: cat.border, background: cat.dim }}
            >
              <span className="text-lg font-black" style={{ color: cat.color }}>
                {cat.label[0]}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2">No articles yet</h3>
            <p className="text-[#737373] text-sm">
              We're working on it. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {/* First post — wide hero */}
            <div className="mb-6">
              <PostCard post={posts[0]} variant="featured" />
            </div>

            {/* Rest — grid */}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.slice(1).map(post => (
                  <PostCard key={post.slug} post={post} variant="featured" />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Category description strip ────────────────────── */}
      <section className="border-t border-[#141414] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-bold text-xl mb-3">
            About <span style={{ color: cat.color }}>{cat.label}</span>
          </h2>
          <p className="text-[#737373] leading-relaxed">
            {CAT_DESCRIPTIONS[slug]}
          </p>
        </div>
      </section>
    </main>
  )
}

const CAT_DESCRIPTIONS = {
  build:    'Step-by-step guides on building real products with modern tools. We cover stacks, setups, architectures, and every decision point from blank repo to deployed product. Nothing here requires a computer science degree — just a willingness to follow the steps and adapt them to your context.',
  automate: 'Workflow breakdowns, prompt engineering, and no-code automation tutorials for people who want to do more with less time. We show you the exact setup, the exact prompt, and the exact result — not the theory.',
  monetize: 'How to price, sell, and grow revenue from digital products, services, and platforms. Revenue experiments, pricing psychology, affiliate strategies, and the honest math behind what works and what doesn\'t.',
  scale:    'Growth tactics, hiring decisions, systems design, and the mindset shifts required to move from solo builder to a real operation. We cover the awkward middle stage that most business content ignores.',
  stories:  'First-person accounts of what actually happened. Case studies with real numbers. Wins and failures documented honestly. No retrospective wisdom that makes everything sound inevitable — just what happened and why.',
}
