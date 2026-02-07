import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="animate-fade-in text-center py-20">
      <h1 className="font-heading text-6xl text-forest-800 mb-4">404</h1>
      <p className="font-body text-lg text-forest-600 mb-8">
        You've wandered off the map. This page doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-forest-700 text-parchment-100 px-6 py-3 rounded-lg font-body hover:bg-mystic-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}

export default NotFound
