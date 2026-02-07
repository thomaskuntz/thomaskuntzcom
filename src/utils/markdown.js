const modules = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return { metadata: {}, content: raw }
  }

  const frontMatter = match[1]
  const content = match[2]
  const metadata = {}

  for (const line of frontMatter.split('\n')) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    let value = line.slice(colonIndex + 1).trim()

    // Handle arrays (e.g., tags: [react, javascript])
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    }

    // Handle quoted strings
    if (typeof value === 'string') {
      value = value.replace(/^["']|["']$/g, '')
    }

    metadata[key] = value
  }

  return { metadata, content }
}

export function getAllPosts() {
  const posts = Object.entries(modules).map(([filepath, raw]) => {
    const slug = filepath.split('/').pop().replace(/\.md$/, '')
    const { metadata, content } = parseFrontMatter(raw)

    return {
      slug,
      title: metadata.title || slug,
      date: metadata.date || '1970-01-01',
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      excerpt: metadata.excerpt || '',
      content,
    }
  })

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) || null
}
