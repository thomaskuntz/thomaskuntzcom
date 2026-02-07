import { getAllPosts } from '../utils/markdown'
import BlogCard from '../components/BlogCard'

function BlogList() {
  const posts = getAllPosts()

  return (
    <div className="animate-fade-in">
      <h1 className="font-heading text-3xl md:text-4xl text-forest-800 mb-2 text-center">
        The Blog
      </h1>
      <p className="text-center text-forest-500 font-body mb-8">
        Musings, tutorials, and tales from the codebase
      </p>

      <div className="ornament-divider mb-8">
        <span className="text-gold-500 text-lg">&loz;</span>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-forest-500 font-body py-12">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogList
