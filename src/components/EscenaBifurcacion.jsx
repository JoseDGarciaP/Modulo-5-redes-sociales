import Canoa from './Canoa.jsx'

// Posiciones de la canoa dentro del viewBox 1000 x 560.
const POSICIONES = {
  abajo: { x: 500, y: 660, r: 0, s: 1 },
  espera: { x: 500, y: 455, r: 0, s: 1 },
  centro: { x: 500, y: 315, r: 0, s: 0.85 },
  izquierda: { x: 165, y: 40, r: -42, s: 0.45 },
  derecha: { x: 835, y: 40, r: 42, s: 0.45 },
}

const RIO =
  'M310 560 C380 460 410 380 425 310 C370 230 230 120 70 0 L250 0 C350 110 450 200 500 235 C550 200 650 110 750 0 L930 0 C770 120 630 230 575 310 C590 380 620 460 690 560 Z'

function Junco({ x, y, flip = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip} 1)`}>
      <path d="M0 0 Q-4 -30 -10 -52" stroke="#3f7d3a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M6 0 Q8 -26 4 -46" stroke="#4d9145" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M12 0 Q18 -20 26 -36" stroke="#3f7d3a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="-14" y="-66" width="7" height="18" rx="3.5" fill="#7a4d24" transform="rotate(-12 -10 -57)" />
    </g>
  )
}

function Arbusto({ x, y, s = 1, color = '#2f6b33' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="8" rx="46" ry="10" fill="#1f4d24" opacity="0.35" />
      <circle cx="-22" cy="-6" r="22" fill={color} />
      <circle cx="18" cy="-8" r="24" fill={color} />
      <circle cx="-2" cy="-24" r="24" fill={color} />
      <circle cx="-6" cy="-28" r="10" fill="#ffffff" opacity="0.08" />
    </g>
  )
}

function Roca({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-28 6 Q-26 -18 -4 -22 Q22 -20 28 4 Z" fill="#6b7280" />
      <path d="M-16 -10 Q-4 -18 10 -14" stroke="#9ca3af" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  )
}

export default function EscenaBifurcacion({ posicion = 'espera', mostrarNiebla = true }) {
  const p = POSICIONES[posicion] ?? POSICIONES.espera
  const viajando = posicion === 'izquierda' || posicion === 'derecha'

  return (
    <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" role="img" aria-label="Capi rema por el río hasta una bifurcación cubierta de niebla">
      <defs>
        <linearGradient id="pasto" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c7a45" />
          <stop offset="1" stopColor="#5f9a4f" />
        </linearGradient>
        <linearGradient id="agua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b8ea5" />
          <stop offset="1" stopColor="#2fa3b8" />
        </linearGradient>
        <radialGradient id="nieblaGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#eef2f5" stopOpacity="0.98" />
          <stop offset="0.7" stopColor="#dfe6eb" stopOpacity="0.85" />
          <stop offset="1" stopColor="#dfe6eb" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* tierra */}
      <rect width="1000" height="560" fill="url(#pasto)" />
      <path d="M0 470 Q120 440 250 480 L250 560 L0 560 Z" fill="#6aa856" opacity="0.5" />
      <path d="M1000 470 Q880 440 750 480 L750 560 L1000 560 Z" fill="#6aa856" opacity="0.5" />

      {/* orillas de arena */}
      <path d={RIO} fill="#d9c08a" transform="translate(0 0) scale(1.0)" stroke="#d9c08a" strokeWidth="26" strokeLinejoin="round" />

      {/* río */}
      <path d={RIO} fill="url(#agua)" />

      {/* corrientes */}
      <g stroke="#bff3ff" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7">
        <path className="corriente" d="M500 560 C500 470 500 390 500 300" />
        <path className="corriente" d="M450 560 C455 470 460 400 465 330" />
        <path className="corriente" d="M550 560 C545 470 540 400 535 330" />
        <path className="corriente-lenta" d="M470 300 C400 220 280 110 160 0" />
        <path className="corriente-lenta" d="M530 300 C600 220 720 110 840 0" />
      </g>

      {/* isla del centro */}
      <path d="M500 235 C560 190 650 110 750 0 L250 0 C350 110 440 190 500 235 Z" fill="#3f6e3b" />
      <Roca x={500} y={222} s={0.9} />
      <Arbusto x={470} y={175} s={0.8} color="#2c5f2f" />
      <Arbusto x={540} y={160} s={0.9} />

      {/* decoración de las orillas */}
      <Arbusto x={120} y={380} s={1.1} />
      <Arbusto x={60} y={250} s={0.9} color="#356f37" />
      <Arbusto x={880} y={390} s={1.1} color="#356f37" />
      <Arbusto x={950} y={260} s={0.9} />
      <Junco x={300} y={470} />
      <Junco x={330} y={400} flip={-1} />
      <Junco x={700} y={470} flip={-1} />
      <Junco x={670} y={400} />
      <Roca x={240} y={540} s={1.2} />
      <Roca x={780} y={520} />
      <circle cx="200" cy="470" r="6" fill="#facc15" />
      <circle cx="214" cy="480" r="5" fill="#f9a8d4" />
      <circle cx="820" cy="450" r="6" fill="#facc15" />
      <circle cx="806" cy="462" r="5" fill="#fca5a5" />

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
        <g>
          <g className="niebla">
            <ellipse cx="170" cy="40" rx="260" ry="120" fill="url(#nieblaGrad)" />
            <ellipse cx="500" cy="10" rx="220" ry="90" fill="url(#nieblaGrad)" />
            <ellipse cx="830" cy="40" rx="260" ry="120" fill="url(#nieblaGrad)" />
          </g>
          <g className="niebla" style={{ animationDelay: '-3s' }}>
            <ellipse cx="300" cy="110" rx="200" ry="60" fill="url(#nieblaGrad)" />
            <ellipse cx="700" cy="110" rx="200" ry="60" fill="url(#nieblaGrad)" />
          </g>
        </g>
      )}
    </svg>
  )
}
