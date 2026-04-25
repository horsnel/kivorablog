import Link from 'next/link'
import { CATEGORIES } from '@/lib/posts'

export default function CategoryNav({ active = null }) {
  const cats = Object.values(CATEGORIES)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Link href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
          active === null
            ? 'bg-white text-[#0a0a0a] border-white'
            : 'bg-[#141414] border-[#262626] text-[#737373] hover:text-white hover:border-[#3a3a3a]'
        }`}>
        All
      </Link>
      {cats.map(cat => (
        <Link key={cat.slug} href={`/${cat.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
            active === cat.slug
              ? 'text-[#0a0a0a] border-transparent'
              : 'bg-[#141414] border-[#262626] text-[#737373] hover:text-white hover:border-[#3a3a3a]'
          }`}
          style={active === cat.slug ? { background: cat.color, borderColor: cat.color } : {}}>
          {cat.label}
        </Link>
      ))}
    </div>
  )
}
