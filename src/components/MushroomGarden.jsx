import { useMemo, useRef } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'

// Seeded pseudo-random number generator (mulberry32)
function seededRandom(seed) {
  let s = seed
  return function () {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const VARIETIES = [
  { type: 'round', capColor: '#9464c1', spotColor: '#d1bbe7', glow: true },
  { type: 'tall', capColor: '#d4a00e', spotColor: '#fce985', glow: false },
  { type: 'wide', capColor: '#3d8b42', spotColor: '#a8d5ab', glow: false },
  { type: 'tiny', capColor: '#b48fd6', spotColor: '#e8ddf3', glow: false },
  { type: 'cluster', capColor: '#f0bf1a', spotColor: '#fdf4bf', glow: true },
]

function Mushroom({ variety, scale }) {
  const { type, capColor, spotColor } = variety

  if (type === 'round') {
    return (
      <svg width={30 * scale} height={40 * scale} viewBox="0 0 30 40">
        {/* Stem */}
        <path d="M11 24 Q10 38 9 40 L21 40 Q20 38 19 24 Z" fill="#e8ddf3" />
        {/* Cap */}
        <ellipse cx="15" cy="18" rx="14" ry="12" fill={capColor} />
        {/* Spots */}
        <circle cx="10" cy="14" r="2.5" fill={spotColor} opacity="0.7" />
        <circle cx="18" cy="11" r="2" fill={spotColor} opacity="0.6" />
        <circle cx="14" cy="20" r="1.5" fill={spotColor} opacity="0.5" />
      </svg>
    )
  }

  if (type === 'tall') {
    return (
      <svg width={20 * scale} height={48 * scale} viewBox="0 0 20 48">
        {/* Stem */}
        <path d="M7 22 Q6 44 5 48 L15 48 Q14 44 13 22 Z" fill="#fdf4bf" />
        {/* Cap */}
        <ellipse cx="10" cy="14" rx="10" ry="14" fill={capColor} />
        {/* Spots */}
        <circle cx="7" cy="10" r="1.5" fill={spotColor} opacity="0.6" />
        <circle cx="13" cy="8" r="2" fill={spotColor} opacity="0.5" />
      </svg>
    )
  }

  if (type === 'wide') {
    return (
      <svg width={40 * scale} height={32 * scale} viewBox="0 0 40 32">
        {/* Stem */}
        <path d="M16 20 Q15 30 14 32 L26 32 Q25 30 24 20 Z" fill="#d8ecd9" />
        {/* Cap */}
        <ellipse cx="20" cy="14" rx="19" ry="10" fill={capColor} />
        {/* Spots */}
        <circle cx="12" cy="11" r="2" fill={spotColor} opacity="0.6" />
        <circle cx="24" cy="9" r="2.5" fill={spotColor} opacity="0.5" />
        <circle cx="18" cy="15" r="1.5" fill={spotColor} opacity="0.4" />
      </svg>
    )
  }

  if (type === 'tiny') {
    return (
      <svg width={16 * scale} height={22 * scale} viewBox="0 0 16 22">
        {/* Stem */}
        <path d="M6 12 Q5.5 20 5 22 L11 22 Q10.5 20 10 12 Z" fill="#e8ddf3" />
        {/* Cap */}
        <ellipse cx="8" cy="8" rx="7.5" ry="7" fill={capColor} />
        {/* Spot */}
        <circle cx="6" cy="6" r="1.5" fill={spotColor} opacity="0.6" />
      </svg>
    )
  }

  // cluster
  return (
    <svg width={36 * scale} height={38 * scale} viewBox="0 0 36 38">
      {/* Stem 1 */}
      <path d="M6 18 Q5.5 34 5 38 L11 38 Q10.5 34 10 18 Z" fill="#fdf4bf" />
      {/* Cap 1 */}
      <ellipse cx="8" cy="13" rx="7" ry="8" fill={capColor} />
      <circle cx="6" cy="10" r="1.2" fill={spotColor} opacity="0.6" />
      {/* Stem 2 */}
      <path d="M18 14 Q17.5 34 17 38 L23 38 Q22.5 34 22 14 Z" fill="#fdf4bf" />
      {/* Cap 2 */}
      <ellipse cx="20" cy="9" rx="8" ry="9" fill={capColor} />
      <circle cx="18" cy="6" r="1.5" fill={spotColor} opacity="0.5" />
      <circle cx="24" cy="8" r="1" fill={spotColor} opacity="0.6" />
      {/* Stem 3 */}
      <path d="M28 20 Q27.5 34 27 38 L33 38 Q32.5 34 32 20 Z" fill="#fdf4bf" />
      {/* Cap 3 */}
      <ellipse cx="30" cy="16" rx="6" ry="6" fill={capColor} />
      <circle cx="29" cy="14" r="1" fill={spotColor} opacity="0.5" />
    </svg>
  )
}

function generateMushrooms(count, seed) {
  const rng = seededRandom(seed)
  const mushrooms = []

  for (let i = 0; i < count; i++) {
    const variety = VARIETIES[Math.floor(rng() * VARIETIES.length)]
    const x = 3 + rng() * 94 // 3–97% horizontal
    const scale = 0.6 + rng() * 0.6 // 0.6–1.2x
    const swayDelay = rng() * 2 // 0–2s
    const threshold = i < 3 ? 0 : 0.05 + ((i - 3) / (count - 3)) * 0.9

    mushrooms.push({
      id: i,
      variety,
      x,
      scale,
      swayDelay,
      threshold,
    })
  }

  return mushrooms
}

export default function MushroomGarden() {
  const progress = useScrollProgress()
  const revealedRef = useRef(new Set())

  const desktopMushrooms = useMemo(() => generateMushrooms(18, 42), [])
  const mobileMushrooms = useMemo(() => generateMushrooms(10, 42), [])

  // Update revealed set — once grown, stays grown
  const updateRevealed = (mushrooms) => {
    mushrooms.forEach((m) => {
      if (progress >= m.threshold) {
        revealedRef.current.add(m.id)
      }
    })
  }

  updateRevealed(desktopMushrooms)
  updateRevealed(mobileMushrooms)

  const renderMushroom = (m) => {
    const isRevealed = revealedRef.current.has(m.id)

    return (
      <div
        key={m.id}
        className="absolute bottom-0"
        style={{ left: `${m.x}%` }}
      >
        <div className={isRevealed ? 'mushroom-grow' : 'mushroom-hidden'}>
          <div
            className={`mushroom-sway ${m.variety.glow ? 'mushroom-glow' : ''}`}
            style={{ animationDelay: `${m.swayDelay}s` }}
          >
            <Mushroom variety={m.variety} scale={m.scale} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-[60px] md:h-[80px] lg:h-[100px] overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, var(--color-parchment-100), var(--color-forest-800) 60%, var(--color-forest-900))',
      }}
    >
      {/* Ground line */}
      <div className="absolute bottom-0 w-full h-[2px] bg-forest-700" />

      {/* Desktop mushrooms */}
      <div className="hidden md:block h-full">
        {desktopMushrooms.map(renderMushroom)}
      </div>

      {/* Mobile mushrooms */}
      <div className="md:hidden h-full">
        {mobileMushrooms.map(renderMushroom)}
      </div>
    </div>
  )
}
