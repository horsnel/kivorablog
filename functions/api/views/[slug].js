// Cloudflare Pages Function: GET/POST /api/views/[slug]
// Tracks and returns view counts using Cloudflare KV

export async function onRequestGet(context) {
  const { env, params } = context
  const slug = params.slug

  if (!env.VIEWS_KV) {
    return new Response(JSON.stringify({ count: 0 }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const count = parseInt(await env.VIEWS_KV.get(`views:${slug}`) || '0', 10)
    return new Response(JSON.stringify({ count }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ count: 0, error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function onRequestPost(context) {
  const { env, params } = context
  const slug = params.slug

  if (!env.VIEWS_KV) {
    return new Response(JSON.stringify({ count: 1 }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const current = parseInt(await env.VIEWS_KV.get(`views:${slug}`) || '0', 10)
    const newCount = current + 1
    await env.VIEWS_KV.put(`views:${slug}`, String(newCount))
    return new Response(JSON.stringify({ count: newCount }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ count: 0, error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
