import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-[100px] font-black leading-none tracking-tighter text-[#141414] mb-4 select-none">
          404
        </div>
        <h1 className="text-xl font-bold tracking-tight mb-2">Article not found</h1>
        <p className="text-[#737373] text-sm mb-8 leading-relaxed">
          This page doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/"
            className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            Back to blog →
          </Link>
        </div>
      </div>
    </main>
  )
}
