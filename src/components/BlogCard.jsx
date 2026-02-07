import { Link } from 'react-router-dom'

function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block group"
    >
      <article className="bg-parchment-100 border border-parchment-300 rounded-lg p-6 hover:border-gold-400 hover:shadow-lg hover:shadow-gold-100/50 transition-all duration-300">
        <h2 className="font-heading text-xl text-forest-800 group-hover:text-mystic-600 transition-colors mb-2">
          {post.title}
        </h2>
        <time className="text-sm text-forest-500 font-body">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-mystic-100 text-mystic-700 px-2 py-0.5 rounded-full font-body"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.excerpt && (
          <p className="mt-3 text-forest-600 font-body text-sm leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </article>
    </Link>
  )
}

export default BlogCard
