'use client'

import { useState, useEffect } from 'react'

export default function LikeButton({ slug }) {
  const [likes, setLikes] = useState(null)
  const [liked, setLiked] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const likeKey = `kivora_liked_${slug}`
    // Check if user already liked
    const hasLiked = localStorage.getItem(likeKey) === '1'
    setLiked(hasLiked)

    // Fetch live like count
    async function fetchLikes() {
      try {
        const res = await fetch(`/api/likes/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setLikes(data.count || 0)
          return
        }
      } catch {
        // API not available
      }

      // Fallback: localStorage
      const stored = parseInt(localStorage.getItem(`kivora_likes_${slug}`) || '0', 10)
      setLikes(stored)
    }

    fetchLikes()
  }, [slug])

  const handleLike = async () => {
    const likeKey = `kivora_liked_${slug}`
    const newLiked = !liked

    // Optimistic update
    setLiked(newLiked)
    setLikes(prev => prev !== null ? (newLiked ? prev + 1 : Math.max(0, prev - 1)) : (newLiked ? 1 : 0))
    localStorage.setItem(likeKey, newLiked ? '1' : '0')

    if (newLiked) {
      setAnimating(true)
      setTimeout(() => setAnimating(false), 600)
    }

    // Send to API
    try {
      await fetch(`/api/likes/${slug}`, {
        method: newLiked ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
    } catch {
      // API not available, localStorage is the fallback
      const localLikesKey = `kivora_likes_${slug}`
      const current = parseInt(localStorage.getItem(localLikesKey) || '0', 10)
      localStorage.setItem(localLikesKey, String(newLiked ? current + 1 : Math.max(0, current - 1)))
    }
  }

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1.5 group transition-all duration-200"
      title={liked ? 'Unlike' : 'Like this article'}
    >
      <span className={`relative w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-200 ${
        liked
          ? 'bg-red-500/15 border-red-500/30'
          : 'bg-[#1a1a1a] border-[#262626] hover:border-red-500/30 group-hover:bg-red-500/10'
      } ${animating ? 'scale-125' : ''}`}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-200 ${liked ? 'text-red-500' : 'text-[#737373] group-hover:text-red-400'}`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        {animating && (
          <span className="absolute inset-0 rounded-lg animate-ping bg-red-500/20" />
        )}
      </span>
      <span className={`text-xs font-mono transition-colors duration-200 ${
        liked ? 'text-red-400' : 'text-[#404040] group-hover:text-red-400'
      }`}>
        {likes !== null ? likes.toLocaleString() : '--'}
      </span>
    </button>
  )
}
