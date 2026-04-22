import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { getPostBySlug, getRelatedPosts, getAllPosts, CATEGORIES, formatDate } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

// Minimal markdown renderer — handles the patterns we use in post content
function renderMarkdown(content, midImage) {
  const lines = content.trim().split('\n')
  const html = []
  let inCode = false
  let codeLines = []
  let inTable = false
  let tableRows = []
  let inUL = false
  let inOL = false
  let h2Count = 0

  function flushList() {
    if (inUL) { html.push(`<ul>${html.splice(-inUL).join('')}</ul>`); inUL = false }
    if (inOL) { html.push(`<ol>${html.splice(-inOL).join('')}</ol>`); inOL = false }
  }

  function flushTable() {
    if (!inTable || tableRows.length === 0) return
    const [header, _sep, ...body] = tableRows
    const th = header.split('|').filter(Boolean).map(c => `<th>${c.trim()}</th>`).join('')
    const trs = body.map(row => `<tr>${row.split('|').filter(Boolean).map(c => `<td>${c.trim()}</td>`).join('')}</tr>`).join('')
    html.push(`<table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>`)
    tableRows = []
    inTable = false
  }

  for (const rawLine of lines) {
    const line = rawLine

    // Code block toggle
    if (line.startsWith('```')) {
      if (!inCode) { inCode = true; codeLines = []; continue }
      else {
        html.push(`<pre><code>${codeLines.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`)
        inCode = false; codeLines = []; continue
      }
    }
    if (inCode) { codeLines.push(line); continue }

    // Table
    if (line.startsWith('|')) {
      inTable = true; tableRows.push(line); continue
    } else if (inTable) { flushTable() }

    // Blank line
    if (!line.trim()) {
      if (inUL > 0 || inOL > 0) { /* keep accumulating */ } else html.push('<br/>')
      continue
    }

    // Headings
    if (line.startsWith('## ')) {
      h2Count++
      // Insert mid-image after the 2nd h2 heading
      if (h2Count === 2 && midImage) {
        html.push(`<div class="my-10"><img src="${midImage}" alt="" class="w-full rounded-2xl border border-[#262626]" /><p class="text-xs text-[#404040] font-mono mt-2 text-center"></p></div>`)
      }
      html.push(`<h2>${inline(line.slice(3))}</h2>`); continue
    }
    if (line.startsWith('### ')) { html.push(`<h3>${inline(line.slice(4))}</h3>`); continue }

    // Unordered list
    if (line.match(/^[-*] /)) {
      html.push(`<li>${inline(line.slice(2))}</li>`)
      inUL = (inUL || 0) + 1; continue
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      html.push(`<li>${inline(line.replace(/^\d+\. /, ''))}</li>`)
      inOL = (inOL || 0) + 1; continue
    }

    // Blockquote
    if (line.startsWith('> ')) { html.push(`<blockquote>${inline(line.slice(2))}</blockquote>`); continue }

    // HR
    if (line.match(/^---+$/)) { html.push('<hr/>'); continue }

    // Paragraph
    html.push(`<p>${inline(line)}</p>`)
  }

  flushTable()

  // Wrap consecutive li into ul/ol
  const joined = html.join('\n')
    .replace(/(<li>.*?<\/li>\n?)+/gs, m => `<ul>${m}</ul>`)

  return joined
}

function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const cat     = CATEGORIES[post.category]
  const related = getRelatedPosts(post, 3)
  const html    = renderMarkdown(post.content, post.midImage)

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────── */}
      <div className="border-b border-[#141414]">
        {/* Category colour accent */}
        <div className="h-1 w-full" style={{ background: cat.color }} />

        {/* Hero Image */}
        {post.heroImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
            <Image
              src={post.heroImage}
              alt={post.title}
              width={1344}
              height={768}
              className="w-full rounded-2xl border border-[#262626]"
              priority
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#404040] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <Link href={`/${cat.slug}`} className="hover:text-white transition-colors" style={{ color: cat.color }}>
              {cat.label}
            </Link>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{ color: cat.color, background: cat.dim, borderColor: cat.border }}>
              {cat.label}
            </span>
            <span className="text-xs text-[#404040] font-mono">{post.readTime} min read</span>
            <span className="text-xs text-[#2e2e2e]">·</span>
            <span className="text-xs text-[#404040] font-mono">{formatDate(post.date)}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5 au">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[#737373] text-lg leading-relaxed mb-7 max-w-2xl au au1">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 au au2">
            <div className="w-9 h-9 bg-[#141414] border border-[#262626] rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-[#737373]">@</span>
            </div>
            <div>
              <div className="text-sm font-medium">{post.author}</div>
              <div className="text-xs text-[#404040]">{formatDate(post.date)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content + Sidebar ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Article body */}
          <article
            className="prose-kivora min-w-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="bg-[#141414] border border-[#262626] rounded-2xl p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-[#737373] bg-[#1a1a1a] border border-[#262626] px-2.5 py-1 rounded-full font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related posts */}
            {related.length > 0 && (
              <div className="bg-[#141414] border border-[#262626] rounded-2xl p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">More in {cat.label}</h3>
                <div className="divide-y divide-[#1a1a1a]">
                  {related.map(rp => (
                    <Link key={rp.slug} href={`/post/${rp.slug}`}
                      className="group flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: cat.color }} />
                      <span className="text-sm leading-snug text-[#737373] group-hover:text-white transition-colors line-clamp-2">
                        {rp.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA to platform */}
            <div className="bg-gradient-to-b from-[#141414] to-[#1a1a1a] border border-[#262626] rounded-2xl p-5 text-center">
              <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7L6.5 3.5L10 7L6.5 10.5L3 7Z" fill="white"/></svg>
              </div>
              <h4 className="font-semibold text-sm mb-2">Try it on Kivora</h4>
              <p className="text-xs text-[#737373] mb-4 leading-relaxed">
                Generate a custom opportunity guide on any topic — free, no account needed.
              </p>
              <a href="https://kivora.pages.dev" target="_blank" rel="noopener noreferrer"
                className="block bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors press">
                Open Kivora →
              </a>
            </div>

            {/* Category link */}
            <Link href={`/${cat.slug}`}
              className="group flex items-center justify-between bg-[#141414] border border-[#262626] hover:border-[#3a3a3a] rounded-2xl p-5 transition-all">
              <div>
                <p className="text-xs text-[#737373] mb-0.5">Browse all</p>
                <p className="font-semibold text-sm" style={{ color: cat.color }}>{cat.label} articles</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#404040] group-hover:text-white group-hover:translate-x-0.5 transition-all">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </aside>
        </div>
      </div>

      {/* ── CTA Image Section ──────────────────────────────── */}
      {post.ctaImage && (
        <section className="border-t border-[#141414] py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#262626]">
              <Image
                src={post.ctaImage}
                alt={post.ctaText || 'Take action'}
                width={1344}
                height={768}
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-white">
                  {post.ctaText}
                </h3>
                <a href="https://kivora.pages.dev" target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors press">
                  Get started →
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Related posts bottom ───────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-[#141414] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-bold text-lg tracking-tight mb-6">Keep reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(rp => <PostCard key={rp.slug} post={rp} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
