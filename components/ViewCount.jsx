'use client'

import { useState, useEffect } from 'react'

export default function ViewCount({ slug }) {
  const [views, setViews] = useState(null)

  useEffect(() => {
    const localKey = `kivora_views_${slug}`
    const sessionKey = `kivora_viewed_${slug}`

    // Track this page view (once per session)
    const hasViewed = sessionStorage.getItem(sessionKey)
    if (!hasViewed) {
      sessionStorage.setItem(sessionKey, '1')
    }

    // Fetch live view count from API
    async function fetchViews() {
      try {
        const res = await fetch(`/api/views/${slug}`, {
          method: hasViewed ? 'GET' : 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok) {
          const data = await res.json()
          setViews(data.count || 0)
          localStorage.setItem(localKey, String(data.count || 0))
          return
        }
      } catch {
        // API not available (static mode or KV not set up)
      }

      // Fallback: localStorage-based counting
      const stored = parseInt(localStorage.getItem(localKey) || '0', 10)
      const newCount = hasViewed ? stored : stored + 1
      setViews(newCount)
      localStorage.setItem(localKey, String(newCount))
    }

    fetchViews()
  }, [slug])

  if (views === null) {
    return (
      <span className="text-xs text-[#404040] font-mono flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        --
      </span>
    )
  }

  return (
    <span className="text-xs text-[#404040] font-mono flex items-center gap-1">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      {views.toLocaleString()} view{views !== 1 ? 's' : ''}
    </span>
  )
}
