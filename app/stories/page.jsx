import CategoryPageTemplate from '@/components/CategoryPageTemplate'

export const metadata = {
  title: 'Stories — Kivora Blog',
  description: 'Case studies, wins, failures, and what actually happened.',
}

export default function StoriesPage() {
  return <CategoryPageTemplate slug="stories" />
}
