import { getAllPosts, CATEGORIES } from '@/lib/posts'

export default function sitemap() {
  const base  = 'https://blog.kivora.com'
  const posts = getAllPosts()
  const cats  = Object.keys(CATEGORIES)

  const postUrls = posts.map(p => ({
    url:          `${base}/post/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const catUrls = cats.map(slug => ({
    url:          `${base}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    ...catUrls,
    ...postUrls,
  ]
}
