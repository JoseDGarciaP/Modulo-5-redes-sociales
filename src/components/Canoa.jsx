// Capi, una capibara con sombrero vueltiao, remando en su canoa.
// Vista desde arriba y atrás (la canoa avanza hacia arriba de la pantalla).
// Se dibuja centrada en (0, 0); mide unos 70 x 150 unidades.

export default function Canoa({ remando = true }) {
  return (
    <g className="balanceo">
      {/* estela en el agua */}
      <path
        d="M-30 70 Q0 110 30 70"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-44 84 Q0 135 44 84"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.3"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* casco de la canoa */}
      <path d="M0 -78 C34 -44 36 44 0 76 C-36 44 -34 -44 0 -78 Z" fill="#7c3f12" />
      <path d="M0 -68 C26 -40 27 40 0 66 C-27 40 -26 -40 0 -68 Z" fill="#c2702d" />
      <path d="M0 -60 C19 -36 20 36 0 58 C-20 36 -19 -36 0 -60 Z" fill="#9a5520" />
      {/* tablas */}
      <rect x="-20" y="-38" width="40" height="5" rx="2" fill="#7c3f12" />
      <rect x="-22" y="34" width="44" height="5" rx="2" fill="#7c3f12" />

      {/* remo */}
      <g className={remando ? 'remo' : ''}>
        <rect x="-3" y="-6" width="6" height="74" rx="3" fill="#e2b06b" transform="rotate(-60)" />
        <ellipse cx="0" cy="66" rx="9" ry="16" fill="#d49a4c" transform="rotate(-60)" />
      </g>

      {/* cuerpo de la capibara */}
      <ellipse cx="0" cy="14" rx="21" ry="26" fill="#8b5a2b" />
      <ellipse cx="0" cy="18" rx="14" ry="18" fill="#a06a36" />
      {/* patitas sobre el remo */}
      <ellipse cx="-18" cy="0" rx="6" ry="5" fill="#6e4520" />
      <ellipse cx="18" cy="2" rx="6" ry="5" fill="#6e4520" />

      {/* cabeza */}
      <ellipse cx="0" cy="-16" rx="15" ry="14" fill="#7a4d24" />
      <ellipse cx="-11" cy="-27" rx="4" ry="3.5" fill="#5c3a1a" />
      <ellipse cx="11" cy="-27" rx="4" ry="3.5" fill="#5c3a1a" />

      {/* sombrero vueltiao (visto desde arriba) */}
      <ellipse cx="0" cy="-19" rx="22" ry="17" fill="#f3e3bf" />
      <ellipse cx="0" cy="-19" rx="22" ry="17" fill="none" stroke="#1f1a17" strokeWidth="2.5" />
      <ellipse cx="0" cy="-19" rx="17" ry="13" fill="none" stroke="#1f1a17" strokeWidth="1.5" strokeDasharray="4 3" />
      <ellipse cx="0" cy="-20" rx="10" ry="8" fill="#eedcae" />
      <ellipse cx="0" cy="-20" rx="10" ry="8" fill="none" stroke="#1f1a17" strokeWidth="2" />
      <ellipse cx="0" cy="-20" rx="5" ry="4" fill="none" stroke="#1f1a17" strokeWidth="1.5" />
    </g>
  )
}
