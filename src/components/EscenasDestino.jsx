import Canoa from './Canoa.jsx'

// Río en perspectiva que se pierde en el horizonte (viewBox 1000 x 560).
const RIO = 'M240 560 C330 420 440 300 485 205 L515 205 C560 300 670 420 760 560 Z'

function CanoaEnDestino() {
  return (
    <g style={{ transform: 'translate(500px, 440px) scale(0.85)' }}>
      <Canoa />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Paraíso: el lado al que lleva la respuesta correcta                 */
/* ------------------------------------------------------------------ */

function ArbolFrondoso({ x, y, s = 1, copa = '#3f9d4a' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="4" rx="40" ry="8" fill="#14532d" opacity="0.25" />
      <rect x="-7" y="-60" width="14" height="64" rx="5" fill="#8b5a2b" />
      <circle cx="-26" cy="-70" r="30" fill={copa} />
      <circle cx="24" cy="-74" r="32" fill={copa} />
      <circle cx="0" cy="-100" r="34" fill={copa} />
      <circle cx="-10" cy="-108" r="12" fill="#ffffff" opacity="0.12" />
      <circle cx="-20" cy="-78" r="5" fill="#ef4444" />
      <circle cx="18" cy="-92" r="5" fill="#ef4444" />
      <circle cx="10" cy="-62" r="5" fill="#ef4444" />
    </g>
  )
}

function Flor({ x, y, color }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 L0 16" stroke="#3f7d3a" strokeWidth="3" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx="0" cy="-7" r="5" fill={color} transform={`rotate(${a})`} />
      ))}
      <circle r="4" fill="#fde047" />
    </g>
  )
}

function Mariposa({ x, y, color, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1.7)`}>
      <g className="flotar" style={{ animationDelay: `${delay}s` }}>
        <g className="aletear" style={{ animationDuration: '0.5s' }}>
          <ellipse cx="-7" cy="0" rx="7" ry="9" fill={color} />
          <ellipse cx="7" cy="0" rx="7" ry="9" fill={color} />
        </g>
        <rect x="-1.5" y="-7" width="3" height="14" rx="1.5" fill="#1f2937" />
      </g>
    </g>
  )
}

function Pajaro({ y, delay, s = 1 }) {
  return (
    <g className="volar" style={{ animationDelay: `${delay}s` }}>
      <g transform={`translate(0 ${y}) scale(${s})`}>
        <g className="aletear" style={{ animationDuration: '0.6s' }}>
          <path d="M-14 0 Q-7 -8 0 0 Q7 -8 14 0" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </g>
  )
}

export function EscenaParaiso({ canoa = true }) {
  const flores = [
    [70, 470, '#f472b6'], [130, 520, '#facc15'], [190, 455, '#fb923c'], [40, 540, '#a78bfa'],
    [210, 530, '#f472b6'], [860, 470, '#facc15'], [920, 525, '#f472b6'], [800, 520, '#a78bfa'],
    [960, 450, '#fb923c'], [780, 455, '#f9a8d4'], [300, 330, '#facc15'], [700, 330, '#f472b6'],
  ]
  return (
    <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" role="img" aria-label="Paisaje soleado y tranquilo con flores, arcoíris y agua clara">
      <defs>
        <linearGradient id="cieloParaiso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#60c5f1" />
          <stop offset="1" stopColor="#fde8b0" />
        </linearGradient>
        <linearGradient id="aguaParaiso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7ee0e8" />
          <stop offset="1" stopColor="#22b8cf" />
        </linearGradient>
      </defs>

      <rect width="1000" height="560" fill="url(#cieloParaiso)" />

      {/* sol */}
      <g transform="translate(830 90)">
        <g className="girar">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="-4" y="-78" width="8" height="26" rx="4" fill="#fcd34d" transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle r="44" fill="#fde047" />
        <circle r="44" fill="none" stroke="#fbbf24" strokeWidth="4" />
      </g>

      {/* arcoíris */}
      <g fill="none" strokeWidth="14" opacity="0.6">
        {['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa'].map((c, i) => (
          <path key={c} d={`M${140 + i * 14} 230 A${360 - i * 14} ${300 - i * 14} 0 0 1 ${860 - i * 14} 230`} stroke={c} />
        ))}
      </g>

      {/* nubes */}
      <g fill="#ffffff" opacity="0.95">
        <g className="flotar">
          <ellipse cx="190" cy="80" rx="60" ry="22" />
          <ellipse cx="225" cy="64" rx="36" ry="24" />
          <ellipse cx="160" cy="68" rx="28" ry="18" />
        </g>
        <g className="flotar" style={{ animationDelay: '-1.5s' }}>
          <ellipse cx="560" cy="60" rx="50" ry="18" />
          <ellipse cx="585" cy="47" rx="30" ry="20" />
        </g>
      </g>

      <Pajaro y={120} delay={0} />
      <Pajaro y={150} delay={-1.2} s={0.8} />
      <Pajaro y={100} delay={-7} s={0.9} />

      {/* colinas */}
      <path d="M0 240 Q160 160 330 220 Q480 170 620 215 Q800 150 1000 230 L1000 560 L0 560 Z" fill="#86d36b" />
      <path d="M0 290 Q200 230 420 270 L580 270 Q800 230 1000 290 L1000 560 L0 560 Z" fill="#5fbf55" />

      {/* río */}
      <path d={RIO} fill="#e8d5a3" stroke="#e8d5a3" strokeWidth="24" strokeLinejoin="round" />
      <path d={RIO} fill="url(#aguaParaiso)" />
      <g stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.75">
        <path className="corriente" d="M500 560 C500 420 500 300 500 210" />
        <path className="corriente-lenta" d="M430 560 C450 420 480 300 492 215" />
        <path className="corriente-lenta" d="M570 560 C550 420 520 300 508 215" />
      </g>
      {[[455, 330], [540, 380], [470, 500], [600, 470], [420, 420]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l6 -6 l6 6 l-6 6 z`} fill="#ffffff" className="parpadeo" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}

      {/* árboles y flores */}
      <ArbolFrondoso x={110} y={400} s={1.15} />
      <ArbolFrondoso x={900} y={410} s={1.2} copa="#38a169" />
      <ArbolFrondoso x={260} y={290} s={0.65} copa="#48b356" />
      <ArbolFrondoso x={745} y={290} s={0.6} />
      {flores.map(([x, y, c], i) => (
        <Flor key={i} x={x} y={y} color={c} />
      ))}
      <Mariposa x={250} y={420} color="#f472b6" />
      <Mariposa x={760} y={400} color="#facc15" delay={-1} />
      <Mariposa x={680} y={250} color="#a78bfa" delay={-2} />

      {canoa && <CanoaEnDestino />}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Tenebroso: el lado al que lleva la respuesta incorrecta             */
/* ------------------------------------------------------------------ */

function ArbolSeco({ x, y, s = 1, flip = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s * flip} ${s})`} fill="none" stroke="#120d17" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0 C4 -50 -6 -90 4 -140" strokeWidth="16" />
      <path d="M2 -70 C24 -86 40 -90 62 -118" strokeWidth="9" />
      <path d="M44 -98 C58 -100 70 -96 80 -88" strokeWidth="5" />
      <path d="M0 -100 C-26 -116 -40 -136 -48 -164" strokeWidth="8" />
      <path d="M-34 -138 C-48 -140 -60 -136 -70 -128" strokeWidth="4" />
      <path d="M4 -140 C10 -160 6 -176 16 -196" strokeWidth="6" />
      <path d="M-2 -40 C-22 -46 -34 -58 -44 -72" strokeWidth="6" />
    </g>
  )
}

function Ojos({ x, y, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="parpadeo" style={{ animationDelay: `${delay}s` }}>
        <ellipse cx="-9" cy="0" rx="6" ry="4" fill="#fde047" />
        <ellipse cx="9" cy="0" rx="6" ry="4" fill="#fde047" />
        <ellipse cx="-9" cy="0" rx="1.6" ry="3.5" fill="#111" />
        <ellipse cx="9" cy="0" rx="1.6" ry="3.5" fill="#111" />
      </g>
    </g>
  )
}

function Murcielago({ y, delay, s = 1 }) {
  return (
    <g className="volar" style={{ animationDelay: `${delay}s`, animationDuration: '11s' }}>
      <g transform={`translate(0 ${y}) scale(${s})`}>
        <g className="aletear" style={{ animationDuration: '0.25s' }}>
          <path d="M0 0 Q-10 -12 -26 -6 Q-20 -2 -22 4 Q-14 0 -10 6 Q-6 0 0 4 Q6 0 10 6 Q14 0 22 4 Q20 -2 26 -6 Q10 -12 0 0 Z" fill="#0b0710" />
        </g>
        <circle cx="0" cy="0" r="5" fill="#0b0710" />
      </g>
    </g>
  )
}

export function EscenaTenebrosa({ canoa = true }) {
  return (
    <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" role="img" aria-label="Paisaje oscuro y tenebroso con rayos, árboles secos y agua turbia">
      <defs>
        <linearGradient id="cieloTenebroso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#120c24" />
          <stop offset="0.6" stopColor="#3b1650" />
          <stop offset="1" stopColor="#4a2340" />
        </linearGradient>
        <linearGradient id="aguaTenebrosa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d4a2a" />
          <stop offset="1" stopColor="#1b2416" />
        </linearGradient>
        <radialGradient id="nieblaMorada" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.35" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1000" height="560" fill="url(#cieloTenebroso)" />

      {/* luna */}
      <circle cx="730" cy="95" r="48" fill="#d9f99d" opacity="0.85" />
      <circle cx="712" cy="84" r="9" fill="#bef264" opacity="0.6" />
      <circle cx="745" cy="112" r="6" fill="#bef264" opacity="0.6" />
      <g fill="#1d1230" opacity="0.92" className="flotar">
        <ellipse cx="700" cy="128" rx="90" ry="20" />
        <ellipse cx="760" cy="116" rx="50" ry="18" />
      </g>
      <g fill="#1d1230" opacity="0.85">
        <ellipse cx="200" cy="70" rx="120" ry="26" />
        <ellipse cx="260" cy="52" rx="60" ry="24" />
      </g>

      {/* rayo */}
      <path className="rayo" d="M300 0 L270 80 L300 80 L250 190 L330 70 L298 70 L330 0 Z" fill="#fef9c3" />

      <Murcielago y={150} delay={0} />
      <Murcielago y={110} delay={-4} s={0.8} />
      <Murcielago y={180} delay={-7.5} s={0.7} />

      {/* colinas oscuras */}
      <path d="M0 250 Q140 180 300 230 Q470 170 640 225 Q820 160 1000 240 L1000 560 L0 560 Z" fill="#24142e" />
      <path d="M0 300 Q200 250 420 280 L580 280 Q800 250 1000 300 L1000 560 L0 560 Z" fill="#1a1022" />

      {/* río turbio */}
      <path d={RIO} fill="#2b2230" stroke="#2b2230" strokeWidth="24" strokeLinejoin="round" />
      <path d={RIO} fill="url(#aguaTenebrosa)" />
      <g stroke="#6b7f45" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6">
        <path className="corriente-lenta" d="M500 560 C500 420 500 300 500 210" />
        <path className="corriente-lenta" d="M440 560 C455 420 482 300 492 215" />
        <path className="corriente-lenta" d="M560 560 C545 420 518 300 508 215" />
      </g>
      {[[440, 470, 6], [580, 500, 8], [520, 340, 5], [470, 390, 4], [610, 410, 5]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#a3b86c" strokeWidth="2" className="flotar" style={{ animationDelay: `${-i * 0.6}s` }} />
      ))}

      {/* árboles secos, rocas y ojos */}
      <ArbolSeco x={110} y={470} s={1.3} />
      <ArbolSeco x={890} y={480} s={1.4} flip={-1} />
      <ArbolSeco x={280} y={320} s={0.6} flip={-1} />
      <ArbolSeco x={720} y={320} s={0.55} />
      <path d="M180 560 L210 500 L240 530 L260 480 L300 560 Z" fill="#0f0a14" />
      <path d="M720 560 L750 490 L780 520 L810 470 L840 560 Z" fill="#0f0a14" />
      <g fill="#0d0912">
        <circle cx="40" cy="380" r="40" />
        <circle cx="80" cy="360" r="34" />
        <circle cx="960" cy="380" r="42" />
        <circle cx="920" cy="360" r="30" />
      </g>
      <Ojos x={58} y={368} />
      <Ojos x={944} y={370} delay={-1.3} />
      <Ojos x={330} y={300} delay={-2.1} />

      {/* niebla baja */}
      <g className="niebla">
        <ellipse cx="250" cy="520" rx="300" ry="50" fill="url(#nieblaMorada)" />
        <ellipse cx="780" cy="530" rx="300" ry="50" fill="url(#nieblaMorada)" />
      </g>

      {canoa && <CanoaEnDestino />}

      {/* destello del rayo */}
      <rect className="destello" width="1000" height="560" fill="#ede9fe" pointerEvents="none" />
    </svg>
  )
}
