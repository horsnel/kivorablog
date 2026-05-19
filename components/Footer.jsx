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
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#dc2626"/>
                <path d="M16 4L6 24L16 18Z" fill="white" opacity="0.95"/>
                <path d="M16 4L26 24L16 18Z" fill="white" opacity="0.55"/>
                <rect x="6" y="26" width="20" height="3" rx="1.5" fill="white" opacity="0.3"/>
              </svg>
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
