// Capi, una capibara con sombrero vueltiao, remando en su canoa.
// Vista desde arriba y atrás (la canoa avanza hacia arriba de la pantalla).
// Se dibuja centrada en (0, 0); mide unos 80 x 160 unidades.

export default function Canoa({ remando = true, agua = 'clara' }) {
  const espuma = agua === 'turbia' ? '#b5c98a' : '#ffffff'
  return (
    <g>
      {/* ondas que se expanden alrededor */}
      <g fill="none" stroke={espuma} strokeWidth="2.5">
        <ellipse className="onda" cx="0" cy="8" rx="44" ry="82" />
        <ellipse className="onda" cx="0" cy="8" rx="44" ry="82" style={{ animationDelay: '-1.2s' }} />
      </g>

      <g className="balanceo">
        {/* sombra en el agua */}
        <path d="M6 -70 C42 -36 44 52 6 84 C-30 52 -28 -36 6 -70 Z" fill="#06303d" opacity="0.28" />

        {/* estela */}
        <g fill="none" stroke={espuma} strokeLinecap="round">
          <path d="M-26 70 Q0 108 26 70" strokeOpacity="0.6" strokeWidth="4" />
          <path d="M-40 86 Q0 134 40 86" strokeOpacity="0.32" strokeWidth="3" />
        </g>

        {/* casco */}
        <path d="M0 -80 C36 -44 38 46 0 78 C-38 46 -36 -44 0 -80 Z" fill="#6b3410" />
        <path d="M0 -71 C28 -41 30 41 0 68 C-30 41 -28 -41 0 -71 Z" fill="#c9762f" />
        <path d="M0 -71 C-28 -41 -30 41 0 68 C-14 40 -16 -40 0 -71 Z" fill="#e08f45" opacity="0.55" />
        <path d="M0 -62 C20 -37 21 37 0 59 C-21 37 -20 -37 0 -62 Z" fill="#8f4c1b" />
        {/* proa con borde claro */}
        <path d="M0 -80 C8 -72 12 -66 14 -60" stroke="#f0b072" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* tablas */}
        <rect x="-21" y="-40" width="42" height="6" rx="3" fill="#6b3410" />
        <rect x="-23" y="34" width="46" height="6" rx="3" fill="#6b3410" />

        {/* remo con salpicaduras */}
        <g className={remando ? 'remo' : ''}>
          <rect x="-3" y="-6" width="6" height="76" rx="3" fill="#e9bd7d" transform="rotate(-60)" />
          <ellipse cx="0" cy="68" rx="9.5" ry="17" fill="#cf9247" transform="rotate(-60)" />
          <g fill={espuma} className="salpicar">
            <circle cx="66" cy="38" r="3" />
            <circle cx="74" cy="30" r="2.2" />
            <circle cx="60" cy="46" r="2" />
          </g>
        </g>

        {/* cuerpo */}
        <ellipse cx="0" cy="14" rx="22" ry="27" fill="#7d4f25" />
        <ellipse cx="-4" cy="16" rx="15" ry="20" fill="#9c6633" />
        <path d="M-12 4 Q-6 2 -2 6 M4 14 Q10 12 14 16 M-10 26 Q-4 24 0 28" stroke="#6b421d" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* patitas */}
        <ellipse cx="-19" cy="0" rx="6.5" ry="5.5" fill="#5f3b19" />
        <ellipse cx="19" cy="2" rx="6.5" ry="5.5" fill="#5f3b19" />

        {/* cabeza y orejas */}
        <ellipse cx="0" cy="-16" rx="15.5" ry="14.5" fill="#6f4520" />
        <ellipse cx="-12" cy="-27" rx="4.5" ry="4" fill="#4e2f12" />
        <ellipse cx="12" cy="-27" rx="4.5" ry="4" fill="#4e2f12" />
        <ellipse cx="-12" cy="-27" rx="2" ry="1.8" fill="#c48b5a" />
        <ellipse cx="12" cy="-27" rx="2" ry="1.8" fill="#c48b5a" />

        {/* sombrero vueltiao visto desde arriba */}
        <ellipse cx="2" cy="-17" rx="23" ry="18" fill="#000" opacity="0.18" />
        <ellipse cx="0" cy="-20" rx="23" ry="18" fill="#f5e6c4" />
        <ellipse cx="0" cy="-20" rx="23" ry="18" fill="none" stroke="#1c1714" strokeWidth="2.6" />
        <ellipse cx="0" cy="-20" rx="18.5" ry="14.2" fill="none" stroke="#1c1714" strokeWidth="1.4" strokeDasharray="3.5 2.5" />
        <ellipse cx="0" cy="-20" rx="15" ry="11.5" fill="none" stroke="#1c1714" strokeWidth="1.2" />
        <ellipse cx="0" cy="-21" rx="10" ry="8" fill="#ead6a6" />
        <ellipse cx="0" cy="-21" rx="10" ry="8" fill="none" stroke="#1c1714" strokeWidth="2" />
        <ellipse cx="0" cy="-21" rx="6" ry="4.6" fill="none" stroke="#1c1714" strokeWidth="1.3" strokeDasharray="2.5 2" />
        <ellipse cx="-3" cy="-24" rx="3" ry="2" fill="#fffaf0" opacity="0.7" />
      </g>
    </g>
  )
}
