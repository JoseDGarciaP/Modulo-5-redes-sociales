import Canoa from './Canoa.jsx'

// Río en perspectiva que se pierde en el horizonte (viewBox 1000 x 560).
const RIO = 'M240 560 C330 420 440 300 485 205 L515 205 C560 300 670 420 760 560 Z'

function CanoaEnDestino({ agua }) {
  return (
    <g className="avanzar">
      <g style={{ transform: 'translate(500px, 445px) scale(0.82)' }}>
        <Canoa agua={agua} />
      </g>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  Paraíso: el lado al que lleva la respuesta correcta                 */
/* ------------------------------------------------------------------ */

function ArbolFrondoso({ x, y, s = 1, copa = '#3f9d4a', frutas = true }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="4" rx="46" ry="9" fill="#14532d" opacity="0.25" />
      <path d="M-8 4 L-6 -62 L6 -62 L8 4 Z" fill="#8b5a2b" />
      <path d="M-2 -40 L-22 -64 M2 -50 L20 -72" stroke="#8b5a2b" strokeWidth="5" strokeLinecap="round" />
      <circle cx="-28" cy="-72" r="30" fill={copa} />
      <circle cx="26" cy="-76" r="32" fill={copa} />
      <circle cx="0" cy="-104" r="35" fill={copa} />
      <circle cx="-4" cy="-78" r="26" fill={copa} />
      <circle cx="12" cy="-70" r="22" fill="#000" opacity="0.08" />
      <circle cx="-12" cy="-112" r="14" fill="#ffffff" opacity="0.14" />
      <circle cx="-34" cy="-80" r="9" fill="#ffffff" opacity="0.1" />
      {frutas && (
        <g fill="#ef4444">
          <circle cx="-20" cy="-80" r="5" />
          <circle cx="18" cy="-94" r="5" />
          <circle cx="10" cy="-62" r="5" />
          <circle cx="-34" cy="-60" r="4.5" />
        </g>
      )}
    </g>
  )
}

function Palmera({ x, y, s = 1, flip = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s * flip} ${s})`}>
      <ellipse cx="10" cy="4" rx="34" ry="7" fill="#14532d" opacity="0.22" />
      <path d="M0 0 C6 -50 20 -100 40 -150" stroke="#a16b3a" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M2 -20 l8 -3 M8 -50 l8 -3 M18 -80 l8 -3 M28 -110 l8 -3" stroke="#7a4d24" strokeWidth="3" strokeLinecap="round" />
      <g fill="#2f9e44" transform="translate(40 -150)">
        <path d="M0 0 C-30 -20 -70 -10 -90 20 C-60 0 -30 0 0 0 Z" />
        <path d="M0 0 C30 -24 70 -18 92 14 C60 -2 30 -2 0 0 Z" />
        <path d="M0 0 C-10 -34 -40 -56 -70 -56 C-40 -40 -20 -24 0 0 Z" />
        <path d="M0 0 C14 -34 46 -52 76 -48 C46 -36 22 -20 0 0 Z" />
        <path d="M0 0 C-20 10 -40 40 -44 66 C-30 40 -16 20 0 0 Z" fill="#37b24d" />
        <circle cx="-4" cy="6" r="6" fill="#7a4d24" />
        <circle cx="6" cy="8" r="6" fill="#7a4d24" />
      </g>
    </g>
  )
}

function Flor({ x, y, color, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 L0 18" stroke="#3f7d3a" strokeWidth="3" />
      <path d="M0 12 Q-8 8 -10 2" stroke="#3f7d3a" strokeWidth="3" fill="none" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-7" rx="5" ry="6.5" fill={color} transform={`rotate(${a})`} />
      ))}
      <circle r="4" fill="#fde047" />
    </g>
  )
}

function Mariposa({ x, y, color, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1.8)`}>
      <g className="revolotear" style={{ animationDelay: `${delay}s` }}>
        <g className="aletear-x" style={{ animationDuration: '0.4s' }}>
          <path d="M0 0 C-10 -14 -16 -4 -12 2 C-16 8 -8 12 0 2 Z" fill={color} />
          <path d="M0 0 C10 -14 16 -4 12 2 C16 8 8 12 0 2 Z" fill={color} />
          <circle cx="-8" cy="-4" r="1.6" fill="#fff" opacity="0.8" />
          <circle cx="8" cy="-4" r="1.6" fill="#fff" opacity="0.8" />
        </g>
        <rect x="-1.2" y="-6" width="2.4" height="12" rx="1.2" fill="#1f2937" />
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

function Pato({ x, y, s = 1, flip = 1, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s * flip} ${s})`}>
      <g className="balanceo" style={{ animationDelay: `${delay}s` }}>
        <ellipse cx="0" cy="6" rx="20" ry="4" fill="#ffffff" opacity="0.45" />
        <path d="M-16 0 C-16 -12 6 -12 12 -4 L16 -8 C18 2 10 6 0 6 C-10 6 -16 4 -16 0 Z" fill="#fde047" />
        <circle cx="10" cy="-12" r="7" fill="#fde047" />
        <path d="M16 -13 L24 -11 L16 -9 Z" fill="#fb923c" />
        <circle cx="12" cy="-14" r="1.4" fill="#1f2937" />
        <path d="M-8 -4 Q-2 -8 4 -3" stroke="#eab308" strokeWidth="2" fill="none" />
      </g>
    </g>
  )
}

export function EscenaParaiso({ canoa = true }) {
  const flores = [
    [70, 470, '#f472b6'], [130, 520, '#facc15'], [190, 455, '#fb923c'], [40, 540, '#a78bfa'],
    [215, 530, '#f472b6'], [860, 470, '#facc15'], [920, 525, '#f472b6'], [800, 520, '#a78bfa'],
    [960, 450, '#fb923c'], [775, 455, '#f9a8d4'], [300, 330, '#facc15'], [700, 330, '#f472b6'],
    [340, 380, '#fb923c'], [660, 385, '#a78bfa'],
  ]
  return (
    <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" role="img" aria-label="Paisaje soleado y tranquilo con flores, arcoíris y agua clara">
      <defs>
        <linearGradient id="pa-cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fb9ee" />
          <stop offset="0.7" stopColor="#a9e0f5" />
          <stop offset="1" stopColor="#fde8b0" />
        </linearGradient>
        <linearGradient id="pa-agua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9eeaf0" />
          <stop offset="1" stopColor="#1fb3cc" />
        </linearGradient>
        <linearGradient id="pa-reflejo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7c2" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff7c2" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pa-luz" cx="0.83" cy="0.15" r="0.6">
          <stop offset="0" stopColor="#fff7d6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff7d6" stopOpacity="0" />
        </radialGradient>
        <clipPath id="pa-clip-rio">
          <path d={RIO} />
        </clipPath>
      </defs>

      <rect width="1000" height="560" fill="url(#pa-cielo)" />

      {/* sol con rayos */}
      <g transform="translate(830 90)">
        <g className="girar">
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d="M-6 -56 L0 -84 L6 -56 Z" fill="#fcd34d" transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle r="50" fill="#fef08a" opacity="0.5" />
        <circle r="42" fill="#fde047" />
        <circle cx="-12" cy="-12" r="14" fill="#fffbe0" opacity="0.6" />
      </g>

      {/* arcoíris */}
      <g fill="none" strokeWidth="13" opacity="0.55">
        {['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa'].map((c, i) => (
          <path key={c} d={`M${150 + i * 13} 235 A${350 - i * 13} ${290 - i * 13} 0 0 1 ${850 - i * 13} 235`} stroke={c} />
        ))}
      </g>

      {/* montañas lejanas */}
      <path d="M0 240 L90 150 L150 200 L240 110 L330 205 L420 160 L500 215 L580 150 L680 210 L760 130 L860 205 L940 150 L1000 190 L1000 300 L0 300 Z" fill="#9fc7e0" />
      <path d="M240 110 L268 140 L254 138 L240 150 L226 138 L212 140 Z M760 130 L786 158 L772 156 L760 168 L748 156 L734 158 Z" fill="#ffffff" opacity="0.9" />

      {/* nubes */}
      <g fill="#ffffff" opacity="0.95">
        <g className="nube">
          <ellipse cx="190" cy="80" rx="62" ry="22" />
          <ellipse cx="225" cy="64" rx="36" ry="24" />
          <ellipse cx="160" cy="68" rx="28" ry="18" />
        </g>
        <g className="nube" style={{ animationDelay: '-9s' }}>
          <ellipse cx="560" cy="60" rx="50" ry="18" />
          <ellipse cx="585" cy="47" rx="30" ry="20" />
          <ellipse cx="535" cy="52" rx="22" ry="14" />
        </g>
      </g>

      <Pajaro y={120} delay={0} />
      <Pajaro y={150} delay={-1.2} s={0.8} />
      <Pajaro y={100} delay={-7} s={0.9} />

      {/* colinas */}
      <path d="M0 250 Q160 175 330 228 Q480 180 620 222 Q800 160 1000 238 L1000 560 L0 560 Z" fill="#86d36b" />
      <path d="M0 295 Q200 240 420 275 L580 275 Q800 240 1000 295 L1000 560 L0 560 Z" fill="#5fbf55" />
      <path d="M0 420 Q120 380 250 420 L250 560 L0 560 Z M1000 420 Q880 380 750 420 L750 560 L1000 560 Z" fill="#54b14b" />

      {/* río */}
      <path d={RIO} fill="#ead7a5" stroke="#ead7a5" strokeWidth="26" strokeLinejoin="round" />
      <path d={RIO} fill="url(#pa-agua)" />
      <g clipPath="url(#pa-clip-rio)">
        <path d={RIO} fill="none" stroke="#d5fbff" strokeWidth="20" strokeOpacity="0.5" />
        {/* reflejo del sol */}
        <path d="M470 210 L530 210 L620 560 L380 560 Z" fill="url(#pa-reflejo)" opacity="0.35" />
        <g stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.75">
          <path className="corriente" d="M500 560 C500 420 500 300 500 210" />
          <path className="corriente-lenta" d="M430 560 C450 420 480 300 492 215" />
          <path className="corriente-lenta" d="M570 560 C550 420 520 300 508 215" />
        </g>
        {[[455, 330], [540, 380], [470, 500], [600, 470], [420, 420], [520, 270], [560, 520]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} l5 -7 l5 7 l-5 7 z`} fill="#ffffff" className="destellar" style={{ animationDelay: `${-i * 0.5}s` }} />
        ))}
      </g>
      <Pato x={575} y={330} s={0.8} flip={-1} />
      <Pato x={600} y={350} s={0.6} flip={-1} delay={-0.8} />
      <g transform="translate(395 470)">
        <path d="M0 0 L14 -3 A14 10 0 1 1 14 3 Z" fill="#4f9a45" />
        <circle cx="-2" cy="-2" r="5" fill="#fbcfe8" />
        <circle cx="-2" cy="-2" r="2" fill="#fde047" />
      </g>

      {/* árboles, palmeras y flores */}
      <Palmera x={60} y={450} s={1.25} />
      <ArbolFrondoso x={210} y={400} s={0.85} copa="#48b356" />
      <Palmera x={950} y={455} s={1.3} flip={-1} />
      <ArbolFrondoso x={800} y={410} s={0.95} copa="#38a169" />
      <ArbolFrondoso x={290} y={292} s={0.5} copa="#4cb85a" frutas={false} />
      <ArbolFrondoso x={720} y={292} s={0.48} frutas={false} />
      {flores.map(([x, y, c], i) => (
        <Flor key={i} x={x} y={y} color={c} s={y < 400 ? 0.7 : 1} />
      ))}
      <Mariposa x={260} y={420} color="#f472b6" />
      <Mariposa x={750} y={380} color="#facc15" delay={-1.3} />
      <Mariposa x={680} y={250} color="#a78bfa" delay={-2.4} />

      {canoa && <CanoaEnDestino agua="clara" />}

      <rect width="1000" height="560" fill="url(#pa-luz)" pointerEvents="none" />
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
      <path d="M-14 2 C-8 -4 -4 -6 0 -4 M14 2 C8 -4 4 -6 0 -4" strokeWidth="6" />
      <path d="M2 -70 C24 -86 40 -90 62 -118" strokeWidth="9" />
      <path d="M44 -98 C58 -100 70 -96 80 -88" strokeWidth="5" />
      <path d="M0 -100 C-26 -116 -40 -136 -48 -164" strokeWidth="8" />
      <path d="M-34 -138 C-48 -140 -60 -136 -70 -128" strokeWidth="4" />
      <path d="M4 -140 C10 -160 6 -176 16 -196" strokeWidth="6" />
      <path d="M-2 -40 C-22 -46 -34 -58 -44 -72" strokeWidth="6" />
      {/* hueco con ojos */}
      <ellipse cx="2" cy="-60" rx="5" ry="8" fill="#000" stroke="none" />
    </g>
  )
}

function Ojos({ x, y, delay = 0, color = '#fde047' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="parpadeo" style={{ animationDelay: `${delay}s` }}>
        <ellipse cx="-9" cy="0" rx="6" ry="4" fill={color} />
        <ellipse cx="9" cy="0" rx="6" ry="4" fill={color} />
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
        <circle cx="-2" cy="-1" r="1" fill="#f87171" />
        <circle cx="2" cy="-1" r="1" fill="#f87171" />
      </g>
    </g>
  )
}

function Cuervo({ x, y, flip = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip} 1)`}>
      <path d="M-10 0 C-10 -10 4 -14 10 -8 L18 -10 L12 -4 C10 4 -4 6 -10 0 Z M-10 0 L-20 4 L-10 -3 Z" fill="#050307" />
      <circle cx="9" cy="-9" r="1.4" fill="#f87171" />
    </g>
  )
}

export function EscenaTenebrosa({ canoa = true }) {
  return (
    <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" role="img" aria-label="Paisaje oscuro y tenebroso con lluvia, rayos, árboles secos, un remolino y agua turbia">
      <defs>
        <linearGradient id="te-cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e0a1f" />
          <stop offset="0.6" stopColor="#35134a" />
          <stop offset="1" stopColor="#4a2340" />
        </linearGradient>
        <linearGradient id="te-agua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d4a2a" />
          <stop offset="1" stopColor="#18200f" />
        </linearGradient>
        <radialGradient id="te-niebla" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.4" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="te-luna" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d9f99d" stopOpacity="0.35" />
          <stop offset="1" stopColor="#d9f99d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="te-vineta" cx="0.5" cy="0.55" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <clipPath id="te-clip-rio">
          <path d={RIO} />
        </clipPath>
      </defs>

      <rect width="1000" height="560" fill="url(#te-cielo)" />

      {/* luna */}
      <circle cx="730" cy="95" r="110" fill="url(#te-luna)" />
      <circle cx="730" cy="95" r="48" fill="#d9f99d" opacity="0.85" />
      <circle cx="712" cy="84" r="9" fill="#bef264" opacity="0.6" />
      <circle cx="745" cy="112" r="6" fill="#bef264" opacity="0.6" />
      <g fill="#1d1230" opacity="0.92" className="nube">
        <ellipse cx="700" cy="128" rx="90" ry="20" />
        <ellipse cx="760" cy="116" rx="50" ry="18" />
      </g>
      <g fill="#1d1230" opacity="0.85">
        <ellipse cx="200" cy="70" rx="130" ry="28" />
        <ellipse cx="270" cy="50" rx="60" ry="24" />
        <ellipse cx="420" cy="40" rx="90" ry="20" />
      </g>

      {/* rayos */}
      <path className="rayo" d="M300 40 L270 110 L300 110 L250 210 L330 95 L298 95 L330 40 Z" fill="#fef9c3" />
      <path className="rayo" style={{ animationDelay: '-2.2s' }} d="M900 0 L880 60 L900 60 L870 130 L925 50 L902 50 L922 0 Z" fill="#e9d5ff" />

      <Murcielago y={150} delay={0} />
      <Murcielago y={110} delay={-4} s={0.8} />
      <Murcielago y={180} delay={-7.5} s={0.7} />

      {/* colinas oscuras */}
      <path d="M0 250 Q140 180 300 230 Q470 170 640 225 Q820 160 1000 240 L1000 560 L0 560 Z" fill="#24142e" />
      <path d="M0 300 Q200 250 420 280 L580 280 Q800 250 1000 300 L1000 560 L0 560 Z" fill="#1a1022" />

      {/* río turbio con remolino */}
      <path d={RIO} fill="#2b2230" stroke="#2b2230" strokeWidth="24" strokeLinejoin="round" />
      <path d={RIO} fill="url(#te-agua)" />
      <g clipPath="url(#te-clip-rio)">
        <g stroke="#6b7f45" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6">
          <path className="corriente-lenta" d="M500 560 C500 420 500 300 500 210" />
          <path className="corriente-lenta" d="M440 560 C455 420 482 300 492 215" />
          <path className="corriente-lenta" d="M560 560 C545 420 518 300 508 215" />
        </g>
        <g transform="translate(500 300) scale(1 0.38)">
          <g className="girar-rapido">
            <path
              d="M0 0 C10 -10 24 0 20 14 C14 32 -14 34 -28 18 C-46 -4 -34 -40 -4 -48 C30 -56 60 -30 60 4 C60 44 22 70 -18 66 C-64 60 -90 20 -84 -20"
              fill="none"
              stroke="#8aa35a"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle r="9" fill="#0c1208" />
          </g>
        </g>
      </g>
      {[[440, 470, 6], [580, 500, 8], [470, 390, 4], [610, 410, 5], [395, 520, 5]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#a3b86c" strokeWidth="2" className="burbuja" style={{ animationDelay: `${-i * 0.6}s` }} />
      ))}
      {/* rocas puntiagudas en el agua */}
      <path d="M560 380 L572 352 L580 368 L590 344 L604 382 Z" fill="#0f0a14" />
      <path d="M410 420 L420 398 L430 410 L438 392 L450 424 Z" fill="#0f0a14" />

      {/* árboles secos, rocas y ojos */}
      <ArbolSeco x={110} y={470} s={1.3} />
      <ArbolSeco x={890} y={480} s={1.4} flip={-1} />
      <ArbolSeco x={280} y={320} s={0.6} flip={-1} />
      <ArbolSeco x={720} y={320} s={0.55} />
      <Cuervo x={170} y={330} />
      <Cuervo x={820} y={312} flip={-1} />
      <path d="M180 560 L210 500 L240 530 L260 480 L300 560 Z" fill="#0f0a14" />
      <path d="M720 560 L750 490 L780 520 L810 470 L840 560 Z" fill="#0f0a14" />
      <g fill="#0d0912">
        <circle cx="40" cy="380" r="40" />
        <circle cx="80" cy="360" r="34" />
        <circle cx="960" cy="380" r="42" />
        <circle cx="920" cy="360" r="30" />
      </g>
      <Ojos x={58} y={368} />
      <Ojos x={944} y={370} delay={-1.3} color="#f87171" />
      <Ojos x={330} y={300} delay={-2.1} />

      {canoa && <CanoaEnDestino agua="turbia" />}

      {/* lluvia */}
      <g stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" opacity="0.45" pointerEvents="none">
        {Array.from({ length: 46 }).map((_, i) => {
          const x = (i * 97) % 1060 - 30
          const y = (i * 53) % 560
          return <line key={i} className="lluvia" x1={x} y1={y - 600} x2={x - 8} y2={y - 572} style={{ animationDelay: `${-((i * 37) % 100) / 100}s` }} />
        })}
      </g>

      {/* niebla baja */}
      <g className="niebla" pointerEvents="none">
        <ellipse cx="250" cy="520" rx="300" ry="50" fill="url(#te-niebla)" />
        <ellipse cx="780" cy="530" rx="300" ry="50" fill="url(#te-niebla)" />
      </g>

      <rect width="1000" height="560" fill="url(#te-vineta)" pointerEvents="none" />
      {/* destello del rayo */}
      <rect className="destello" width="1000" height="560" fill="#ede9fe" pointerEvents="none" />
    </svg>
  )
}
