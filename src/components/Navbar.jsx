import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? 'text-gold-600 border-b-2 border-gold-400'
        : 'text-forest-700 hover:text-mystic-600'
    }`

  return (
    <nav className="bg-parchment-100/80 backdrop-blur-sm border-b border-parchment-300 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-heading text-2xl font-bold text-forest-800 hover:text-mystic-600 transition-colors"
        >
          Thomas Kuntz
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 font-body text-sm tracking-wide uppercase">
          <NavLink to="/" end className={linkClass}>
            About
          </NavLink>
          <NavLink to="/blog" className={linkClass}>
            Blog
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-forest-700 hover:text-mystic-600 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-parchment-300 bg-parchment-100/95 backdrop-blur-sm">
          <div className="px-4 py-3 flex flex-col gap-3 font-body text-sm tracking-wide uppercase">
            <NavLink
              to="/"
              end
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/blog"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
