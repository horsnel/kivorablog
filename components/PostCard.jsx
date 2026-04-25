import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES, formatDate } from '@/lib/posts'

export default function PostCard({ post, variant = 'default' }) {
  const cat = CATEGORIES[post.category]

  if (variant === 'featured') {
    return (
      <Link href={`/post/${post.slug}`} className="group block">
        <article className="bg-[#141414] border border-[#262626] hover:border-[#3a3a3a] rounded-2xl overflow-hidden transition-all duration-300">
          {/* Thumbnail with Kivora logo badge */}
          {post.thumbnail && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              {/* Kivora logo badge */}
              <div className="absolute top-3 left-3 w-7 h-7 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#262626] rounded-lg flex items-center justify-center">
                <Image
                  src="/images/kivora-logo.png"
                  alt="Kivora"
                  width={18}
                  height={18}
                  className="rounded"
                />
              </div>
              {/* Category strip at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: cat.color }} />
            </div>
          )}

          {!post.thumbnail && <div className="h-1 w-full" style={{ background: cat.color }} />}

          <div className="p-7">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                style={{ color: cat.color, background: cat.dim, borderColor: cat.border }}>
                {cat.label}
              </span>
              <span className="text-xs text-[#404040] font-mono">{post.readTime} min read</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold tracking-tight leading-snug mb-3 group-hover:text-red-400 transition-colors">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-[#737373] text-sm leading-relaxed line-clamp-3 mb-5">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#262626] rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#737373]">@</span>
                </div>
                <span className="text-xs text-[#737373]">{post.author}</span>
              </div>
              <span className="text-xs text-[#404040] font-mono">{formatDate(post.date)}</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/post/${post.slug}`} className="group flex gap-4 py-4 border-b border-[#141414] last:border-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-medium" style={{ color: cat.color }}>{cat.label}</span>
            <span className="text-xs text-[#2e2e2e]">·</span>
            <span className="text-xs text-[#404040] font-mono">{post.readTime}m</span>
          </div>
          <h3 className="text-sm font-semibold leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
        {post.thumbnail && (
          <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[#262626]">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-1 left-1 w-4 h-4 bg-[#0a0a0a]/80 rounded flex items-center justify-center">
              <Image
                src="/images/kivora-logo.png"
                alt="Kivora"
                width={10}
                height={10}
                className="rounded"
              />
            </div>
          </div>
        )}
        {!post.thumbnail && (
          <div className="shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ background: cat.color }} />
        )}
      </Link>
    )
  }

  // Default card
  return (
    <Link href={`/post/${post.slug}`} className="group block">
      <article className="bg-[#141414] border border-[#262626] hover:border-[#3a3a3a] rounded-2xl overflow-hidden transition-all duration-200 h-full flex flex-col">
        {/* Thumbnail with Kivora logo badge */}
        {post.thumbnail && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            {/* Kivora logo badge */}
            <div className="absolute top-3 left-3 w-7 h-7 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#262626] rounded-lg flex items-center justify-center">
              <Image
                src="/images/kivora-logo.png"
                alt="Kivora"
                width={18}
                height={18}
                className="rounded"
              />
            </div>
            {/* Category color strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: cat.color }} />
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ color: cat.color, background: cat.dim }}>
              {cat.label}
            </span>
            <span className="text-xs text-[#404040] font-mono">{post.readTime} min</span>
          </div>

          <h3 className="font-bold text-[15px] leading-snug tracking-tight mb-2.5 group-hover:text-red-400 transition-colors flex-1 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-[#737373] text-xs leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-[#404040]">{post.author}</span>
            <span className="text-xs text-[#2e2e2e] font-mono">{formatDate(post.date)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
