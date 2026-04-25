import Link from 'next/link'
import { CATEGORIES } from '@/lib/posts'

export default function Footer() {
  return (
    <footer className="border-t border-[#141414] mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#dc2626] rounded-md flex items-center justify-center">
                <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M3 7L6.5 3.5L10 7L6.5 10.5L3 7Z" fill="white"/></svg>
              </div>
              <span className="font-bold text-sm">Ki<span className="text-red-500">vora</span> Blog</span>
            </Link>
            <p className="text-xs text-[#737373] leading-relaxed max-w-[180px]">
              Guides for builders. No fluff. No paywalls.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {Object.values(CATEGORIES).map(cat => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`}
                    className="text-xs text-[#737373] hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cat.color }} />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                ['Opportunity Engine', 'https://kivora.pages.dev'],
                ['AI Chat',            'https://kivora.pages.dev/chat'],
                ['StudyDesk',          'https://kivora.pages.dev/study'],
                ['Dev Tools',          'https://kivora.pages.dev/devtools'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#737373] hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">Kivora</h4>
            <ul className="space-y-2.5">
              {[
                ['About',   'https://kivora.pages.dev/about'],
                ['Contact', 'https://kivora.pages.dev/contact'],
                ['Privacy', 'https://kivora.pages.dev/privacy'],
                ['Terms',   'https://kivora.pages.dev/terms'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#737373] hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#141414] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#2e2e2e]">© {new Date().getFullYear()} Kivora. All rights reserved.</p>
          <p className="text-xs text-[#2e2e2e]">Free forever · Built for the world</p>
        </div>
      </div>
    </footer>
  )
}
