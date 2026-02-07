function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="text-center py-12">
        <div className="inline-block bg-parchment-200 rounded-full p-6 mb-6 border-2 border-gold-400">
          <svg
            className="w-16 h-16 text-mystic-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-forest-800 mb-3">
          Thomas Kuntz
        </h1>
        <p className="text-lg text-mystic-600 font-body">
          Software Engineering Manager
        </p>
      </section>

      <div className="ornament-divider mb-10">
        <span className="text-gold-500 text-lg">&loz;</span>
      </div>

      {/* Intro */}
      <section className="max-w-2xl mx-auto mb-12">
        <p className="font-body text-forest-700 leading-relaxed text-lg">
          Welcome, fellow traveler. I'm a software engineering manager passionate about
          building teams and products that make a difference. With experience spanning
          the full stack, I enjoy crafting elegant solutions to complex problems and
          helping engineers grow in their craft.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl text-forest-800 mb-6 text-center">
          Tools of the Trade
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[
            'React',
            'TypeScript',
            '.NET / C#',
            'Node.js',
            'Python',
            'AWS',
            'PostgreSQL',
            'Docker',
            'GraphQL',
          ].map((skill) => (
            <div
              key={skill}
              className="bg-parchment-100 border border-parchment-300 rounded-lg px-4 py-3 text-center font-body text-forest-700 hover:border-gold-400 hover:text-mystic-600 transition-all duration-200"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      <div className="ornament-divider mb-10">
        <span className="text-gold-500 text-lg">&loz;</span>
      </div>

      {/* Career */}
      <section className="max-w-2xl mx-auto mb-12">
        <h2 className="font-heading text-2xl text-forest-800 mb-6 text-center">
          The Journey So Far
        </h2>
        <div className="space-y-6">
          <div className="bg-parchment-100 border border-parchment-300 rounded-lg p-6">
            <h3 className="font-heading text-lg text-forest-800 mb-1">
              Software Engineering Manager
            </h3>
            <p className="text-sm text-mystic-500 mb-3 font-body">
              Leading teams, shipping products
            </p>
            <p className="font-body text-forest-600 leading-relaxed">
              Managing cross-functional engineering teams, driving technical strategy,
              and fostering a culture of continuous improvement and innovation.
            </p>
          </div>
          <div className="bg-parchment-100 border border-parchment-300 rounded-lg p-6">
            <h3 className="font-heading text-lg text-forest-800 mb-1">
              Senior Software Engineer
            </h3>
            <p className="text-sm text-mystic-500 mb-3 font-body">
              Full-stack development & architecture
            </p>
            <p className="font-body text-forest-600 leading-relaxed">
              Designed and built scalable applications, mentored junior developers,
              and contributed to architectural decisions across the stack.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="text-center mb-8">
        <h2 className="font-heading text-2xl text-forest-800 mb-4">
          Send a Raven
        </h2>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/thomaskuntzz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest-600 hover:text-mystic-600 transition-colors font-body"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/thomaskuntz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest-600 hover:text-mystic-600 transition-colors font-body"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
