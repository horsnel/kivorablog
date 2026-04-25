import Link from 'next/link'
import PostCard from '@/components/PostCard'
import CategoryNav from '@/components/CategoryNav'
import { getAllPosts, getFeaturedPosts, getPostsByCategory, CATEGORIES } from '@/lib/posts'

export const metadata = {
  title: 'Kivora Blog — Guides for Builders',
  description: 'Build, Automate, Monetize, Scale, Stories. Honest guides for builders everywhere.',
}

export default function BlogHome() {
  const featured   = getFeaturedPosts()
  const allRecent  = getAllPosts().slice(0, 20)
  const categories = Object.values(CATEGORIES)

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative border-b border-[#141414] overflow-hidden">
        {/* Background geometry */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/3 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/3 rounded-full blur-[80px] -translate-x-1/3" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-full px-3.5 py-1.5 mb-6 au">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-xs text-[#737373] font-medium">{getAllPosts().length} articles · Free forever</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-5 au au1">
              Guides for<br />
              <span className="text-red-500">builders.</span>
            </h1>

            <p className="text-[#737373] text-lg md:text-xl max-w-xl leading-relaxed au au2">
              How to build, automate, monetize, scale — and what actually happened.
              No fluff. No paywalls. No hype.
            </p>
          </div>
        </div>

        {/* Category bar pinned to bottom of hero */}
        <div className="relative border-t border-[#141414] bg-[#0a0a0a]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <CategoryNav />
          </div>
        </div>
      </section>

      {/* ── Featured Posts ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-7">
          <h2 className="font-bold text-lg tracking-tight">Featured</h2>
          <span className="text-xs text-[#404040] font-mono">{featured.length} articles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((post, i) => (
            <div key={post.slug} className={`au au${i + 1}`}>
              <PostCard post={post} variant="featured" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Sections ─────────────────────────────── */}
      {categories.map((cat, ci) => {
        const posts = getPostsByCategory(cat.slug)
        if (posts.length === 0) return null
        const [hero, ...rest] = posts

        return (
          <section key={cat.slug} className="border-t border-[#141414] py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Section header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-7 rounded-full" style={{ background: cat.color }} />
                    <h2 className="font-black text-2xl tracking-tight">{cat.label}</h2>
                  </div>
                  <p className="text-[#737373] text-sm hidden md:block">{cat.tagline}</p>
                </div>
                <Link href={`/${cat.slug}`}
                  className="text-xs font-medium flex items-center gap-1.5 border border-[#262626] hover:border-[#3a3a3a] px-3 py-1.5 rounded-lg transition-colors text-[#737373] hover:text-white">
                  All {cat.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>

              {/* Posts layout: hero left + stacked right */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Hero post */}
                <div className="lg:col-span-2">
                  <Link href={`/post/${hero.slug}`} className="group block h-full">
                    <article className="bg-[#141414] border border-[#262626] hover:border-[#3a3a3a] rounded-2xl overflow-hidden transition-all h-full flex flex-col">
                      {/* Accent bar */}
                      <div className="h-1" style={{ background: cat.color }} />

                      {/* Big typography card */}
                      <div className="p-7 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-5">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                              style={{ color: cat.color, background: cat.dim, borderColor: cat.border }}>
                              {cat.label}
                            </span>
                            <span className="text-xs text-[#404040] font-mono">{hero.readTime} min read</span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-4 group-hover:text-red-400 transition-colors">
                            {hero.title}
                          </h3>

                          <p className="text-[#737373] text-[15px] leading-relaxed line-clamp-3">
                            {hero.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-7 pt-5 border-t border-[#1a1a1a]">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#262626] rounded-full flex items-center justify-center">
                              <span className="text-[10px] font-bold text-[#737373]">{hero.author[0]}</span>
                            </div>
                            <span className="text-xs text-[#737373]">{hero.author}</span>
                          </div>
                          <span className="text-xs text-[#2e2e2e] font-mono">
                            {new Date(hero.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>

                {/* Stacked smaller posts */}
                <div className="flex flex-col gap-3">
                  {rest.slice(0, 3).map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}

                  {/* See all link card */}
                  <Link href={`/${cat.slug}`}
                    className="group bg-[#141414] border border-[#262626] hover:border-[#3a3a3a] rounded-2xl p-5 flex items-center justify-between transition-all">
                    <span className="text-sm font-semibold text-[#737373] group-hover:text-white transition-colors">
                      More in {cat.label}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#404040] group-hover:text-white transition-all group-hover:translate-x-0.5">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── All Recent ────────────────────────────────────── */}
      <section className="border-t border-[#141414] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-bold text-lg tracking-tight">Latest</h2>
            <span className="text-xs text-[#404040] font-mono">{getAllPosts().length} total</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allRecent.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter strip ─────────────────────────────── */}
      <section className="border-t border-[#141414] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="font-black text-3xl tracking-tight mb-3">
            Never miss a guide.
          </h3>
          <p className="text-[#737373] mb-8">
            One email per week. The most useful thing we published. No noise.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white placeholder-[#404040] outline-none focus:border-red-600 transition-colors"
            />
            <button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors press whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-[#2e2e2e] mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  )
}
