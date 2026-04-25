'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const CATS = [
  { slug: 'build',    label: 'Build',    color: '#3b82f6' },
  { slug: 'automate', label: 'Automate', color: '#a855f7' },
  { slug: 'monetize', label: 'Monetize', color: '#16a34a' },
  { slug: 'scale',    label: 'Scale',    color: '#f59e0b' },
  { slug: 'stories',  label: 'Stories',  color: '#dc2626' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]' : 'bg-transparent'
    }`}>
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 bg-[#dc2626] rounded-lg flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M3 7L6.5 3.5L10 7L6.5 10.5L3 7Z" fill="white"/>
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[15px] tracking-tight">Ki<span className="text-red-500">vora</span></span>
            <span className="text-[#262626] font-light text-sm">/</span>
            <span className="text-[#737373] text-sm font-medium">Blog</span>
          </div>
        </Link>

        {/* Desktop categories */}
        <div className="hidden md:flex items-center gap-0.5">
          {CATS.map(cat => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(`/${cat.slug}`)
                  ? 'text-white bg-[#1a1a1a]'
                  : 'text-[#737373] hover:text-white hover:bg-[#141414]'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link href="https://kivora.pages.dev" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs text-[#737373] hover:text-white transition-colors border border-[#262626] hover:border-[#3a3a3a] px-3 py-1.5 rounded-lg">
            Back to app
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 flex items-center justify-center text-[#737373]">
            {open
              ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 3.5h11M1.5 7h11M1.5 10.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#141414] px-4 py-3 space-y-1">
          {CATS.map(cat => (
            <Link key={cat.slug} href={`/${cat.slug}`}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(`/${cat.slug}`) ? 'bg-[#1a1a1a] text-white' : 'text-[#737373] hover:text-white'
              }`}>
              {cat.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#141414] mt-2">
            <Link href="https://kivora.pages.dev" className="block px-3 py-2.5 text-sm text-[#737373]">
              ← Back to app
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
