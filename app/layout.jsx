import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: { default: 'Kivora Blog', template: '%s — Kivora Blog' },
  description: 'Guides for builders. How to build, automate, monetize, scale, and what actually happened. No fluff, no paywalls.',
  openGraph: {
    title: 'Kivora Blog',
    description: 'Guides for builders. No fluff. No paywalls.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white min-h-screen antialiased">
        <Navbar />
        <div className="pt-14">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
