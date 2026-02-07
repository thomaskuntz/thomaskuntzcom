import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getPostBySlug } from '../utils/markdown'
import NotFound from './NotFound'

function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <NotFound />
  }

  return (
    <article className="animate-fade-in max-w-2xl mx-auto">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1 text-sm text-forest-500 hover:text-mystic-600 transition-colors font-body mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to blog
      </Link>

      <header className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-forest-800 mb-3">
          {post.title}
        </h1>
        <time className="text-sm text-forest-500 font-body">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.tags.length > 0 && (
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
      </header>

      <div className="ornament-divider mb-8">
        <span className="text-gold-500 text-lg">&loz;</span>
      </div>

      <div className="prose-wizard">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default BlogPost
