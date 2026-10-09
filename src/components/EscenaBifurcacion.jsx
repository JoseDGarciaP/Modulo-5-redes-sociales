import Canoa from './Canoa.jsx'

// Posiciones de la canoa dentro del viewBox 1000 x 560.
const POSICIONES = {
  abajo: { x: 500, y: 680, r: 0, s: 1 },
  espera: { x: 500, y: 450, r: 0, s: 0.95 },
  centro: { x: 500, y: 320, r: 0, s: 0.8 },
  izquierda: { x: 175, y: 30, r: -42, s: 0.42 },
  derecha: { x: 825, y: 30, r: 42, s: 0.42 },
}

const RIO =
  'M310 560 C380 460 410 380 425 310 C370 230 230 120 70 0 L250 0 C350 110 450 200 500 235 C550 200 650 110 750 0 L930 0 C770 120 630 230 575 310 C590 380 620 460 690 560 Z'

const ISLA = 'M500 235 C560 190 650 110 750 0 L250 0 C350 110 440 190 500 235 Z'

// Mechones de pasto repartidos de forma fija (sin aleatoriedad para que no "salten").
const PASTO = [
  [40, 320], [90, 500], [150, 300], [210, 420], [260, 520], [60, 160], [180, 200], [120, 90],
  [940, 330], [880, 510], [830, 300], [790, 430], [740, 530], [950, 170], [820, 200], [890, 90],
  [420, 120], [580, 120], [500, 60], [460, 190], [545, 185],
]

function Mechon({ x, y }) {
  return (
    <path
      d={`M${x - 6} ${y} l3 -9 l3 9 l3 -12 l3 12 l3 -8 l2 8`}
      stroke="#3d7a37"
      strokeWidth="2"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  )
}

// Árbol visto desde arriba
function Copa({ x, y, r = 40, color = '#2f6b33' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={r * 0.18} cy={r * 0.22} r={r} fill="#173d1c" opacity="0.35" />
      <circle r={r} fill={color} />
      <circle cx={-r * 0.35} cy={-r * 0.2} r={r * 0.55} fill="#ffffff" opacity="0.07" />
      <circle cx={r * 0.35} cy={r * 0.25} r={r * 0.5} fill="#000000" opacity="0.08" />
      <circle cx={-r * 0.45} cy={-r * 0.35} r={r * 0.22} fill="#ffffff" opacity="0.1" />
    </g>
  )
}

function Roca({ x, y, s = 1, enAgua = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {enAgua && <ellipse cx="0" cy="4" rx="34" ry="12" fill="#e6fbff" opacity="0.55" />}
      <path d="M-28 6 Q-26 -18 -4 -22 Q22 -20 28 4 Q0 12 -28 6 Z" fill="#6b7280" />
      <path d="M-28 6 Q0 12 28 4 Q20 -4 0 -2 Q-18 0 -28 6 Z" fill="#4b5563" />
      <path d="M-16 -10 Q-4 -18 10 -14" stroke="#a7b0bd" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Nenufar({ x, y, r = 12, flor }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M0 0 L${r} -3 A${r} ${r * 0.75} 0 1 1 ${r} 3 Z`} fill="#4f9a45" />
      <path d={`M0 0 L${r} -3 A${r} ${r * 0.75} 0 1 1 ${r} 3 Z`} fill="none" stroke="#3a7d33" strokeWidth="1.2" />
      {flor && (
        <g transform={`translate(${-r * 0.2} ${-r * 0.1})`}>
          <circle r="4.5" fill="#fbcfe8" />
          <circle r="2" fill="#fde047" />
        </g>
      )}
    </g>
  )
}

function Poste() {
  // Letrero de cruce en la punta de la isla
  return (
    <g transform="translate(500 222)">
      <ellipse cx="4" cy="6" rx="14" ry="5" fill="#000" opacity="0.25" />
      <rect x="-4" y="-62" width="8" height="66" rx="3" fill="#6b3f1d" />
      <path d="M-4 -58 L-44 -58 L-54 -49 L-44 -40 L-4 -40 Z" fill="#a8692f" stroke="#5c3a1a" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M4 -36 L44 -36 L54 -27 L44 -18 L4 -18 Z" fill="#a8692f" stroke="#5c3a1a" strokeWidth="2.5" strokeLinejoin="round" />
      <text x="-26" y="-43.5" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="15" fill="#fdf3dc">?</text>
      <text x="26" y="-21.5" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="15" fill="#fdf3dc">?</text>
    </g>
  )
}

export default function EscenaBifurcacion({ posicion = 'espera', mostrarNiebla = true }) {
  const p = POSICIONES[posicion] ?? POSICIONES.espera
  const viajando = posicion === 'izquierda' || posicion === 'derecha'

  return (
    <svg
      viewBox="0 0 1000 560"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="img"
      aria-label="Capi rema por el río hasta una bifurcación cubierta de niebla"
    >
      <defs>
        <linearGradient id="bf-pasto" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#467340" />
          <stop offset="1" stopColor="#62a052" />
        </linearGradient>
        <linearGradient id="bf-agua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f7f98" />
          <stop offset="0.6" stopColor="#2b9bb2" />
          <stop offset="1" stopColor="#38b3c6" />
        </linearGradient>
        <radialGradient id="bf-niebla" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f3f6f8" stopOpacity="1" />
          <stop offset="0.65" stopColor="#e3e9ee" stopOpacity="0.9" />
          <stop offset="1" stopColor="#e3e9ee" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bf-vineta" cx="0.5" cy="0.55" r="0.75">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
        <clipPath id="bf-clip-rio">
          <path d={RIO} />
        </clipPath>
      </defs>

      {/* tierra */}
      <rect width="1000" height="560" fill="url(#bf-pasto)" />
      <g fill="#71b35d" opacity="0.35">
        <ellipse cx="120" cy="470" rx="140" ry="50" />
        <ellipse cx="890" cy="480" rx="150" ry="55" />
        <ellipse cx="80" cy="230" rx="90" ry="40" />
        <ellipse cx="930" cy="230" rx="90" ry="40" />
      </g>
      {PASTO.map(([x, y], i) => (
        <Mechon key={i} x={x} y={y} />
      ))}

      {/* orillas de arena */}
      <path d={RIO} fill="#d9c08a" stroke="#d9c08a" strokeWidth="28" strokeLinejoin="round" />
      <path d={RIO} fill="none" stroke="#c4a76c" strokeWidth="12" strokeLinejoin="round" />

      {/* río */}
      <path d={RIO} fill="url(#bf-agua)" />
      <g clipPath="url(#bf-clip-rio)">
        {/* borde poco profundo, más claro */}
        <path d={RIO} fill="none" stroke="#8fe3ee" strokeWidth="26" strokeOpacity="0.35" strokeLinejoin="round" />
        {/* corrientes */}
        <g stroke="#c8f6ff" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7">
          <path className="corriente" d="M500 560 C500 470 500 390 500 300" />
          <path className="corriente" d="M452 560 C456 470 460 400 466 330" />
          <path className="corriente" d="M548 560 C544 470 540 400 534 330" />
          <path className="corriente-lenta" d="M470 300 C400 220 280 110 160 0" />
          <path className="corriente-lenta" d="M530 300 C600 220 720 110 840 0" />
          <path className="corriente-lenta" d="M440 300 C380 230 260 130 120 10" />
          <path className="corriente-lenta" d="M560 300 C620 230 740 130 880 10" />
        </g>
        {/* destellos */}
        {[[470, 520], [540, 470], [480, 400], [520, 360], [400, 230], [610, 220], [330, 150], [680, 160]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="9" ry="2.5" fill="#ffffff" className="destellar" style={{ animationDelay: `${-i * 0.45}s` }} />
        ))}
      </g>

      {/* nenúfares y rocas en el agua */}
      <Nenufar x={360} y={520} r={14} flor />
      <Nenufar x={385} y={540} r={10} />
      <Nenufar x={650} y={470} r={13} />
      <Nenufar x={628} y={492} r={9} flor />
      <Nenufar x={335} y={170} r={10} flor />
      <Roca x={590} y={420} s={0.55} enAgua />
      <Roca x={400} y={300} s={0.45} enAgua />

      {/* isla del centro */}
      <path d={ISLA} fill="#3f6e3b" />
      <path d={ISLA} fill="none" stroke="#d9c08a" strokeWidth="10" strokeLinejoin="round" />
      <Copa x={455} y={150} r={34} color="#2c5f2f" />
      <Copa x={550} y={140} r={40} />
      <Copa x={500} y={80} r={46} color="#336d36" />
      <Poste />

      {/* árboles y vegetación de las orillas */}
      <Copa x={90} y={390} r={52} />
      <Copa x={190} y={500} r={30} color="#356f37" />
      <Copa x={40} y={250} r={44} color="#2b6130" />
      <Copa x={915} y={400} r={54} color="#356f37" />
      <Copa x={820} y={505} r={30} />
      <Copa x={965} y={250} r={44} />
      <g fill="#facc15">
        <circle cx="230" cy="440" r="5" />
        <circle cx="770" cy="440" r="5" />
        <circle cx="160" cy="300" r="4" />
      </g>
      <g fill="#f9a8d4">
        <circle cx="244" cy="452" r="4.5" />
        <circle cx="784" cy="454" r="4.5" />
        <circle cx="850" cy="310" r="4" />
      </g>
      <Roca x={250} y={545} s={1.1} />
      <Roca x={760} y={530} s={0.9} />

      {/* canoa */}
      <g
        style={{
          transform: `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg) scale(${p.s})`,
          transition: viajando
            ? 'transform 1.3s cubic-bezier(.45,.05,.55,.95)'
            : 'transform 0.9s cubic-bezier(.3,.7,.4,1)',
        }}
      >
        <Canoa />
      </g>

      {/* niebla que oculta los dos destinos */}
      {mostrarNiebla && (
        <g pointerEvents="none">
          <g className="niebla">
            <ellipse cx="170" cy="30" rx="280" ry="130" fill="url(#bf-niebla)" />
            <ellipse cx="500" cy="0" rx="240" ry="80" fill="url(#bf-niebla)" />
            <ellipse cx="830" cy="30" rx="280" ry="130" fill="url(#bf-niebla)" />
          </g>
          <g className="niebla" style={{ animationDelay: '-3s', animationDuration: '8s' }}>
            <ellipse cx="290" cy="115" rx="210" ry="60" fill="url(#bf-niebla)" opacity="0.85" />
            <ellipse cx="710" cy="115" rx="210" ry="60" fill="url(#bf-niebla)" opacity="0.85" />
          </g>
        </g>
      )}

      <rect width="1000" height="560" fill="url(#bf-vineta)" pointerEvents="none" />
    </svg>
  )
}
