// Letrero de madera con una de las dos respuestas.
// Los dos letreros tienen el mismo estilo para que no se sepa
// cuál es la respuesta correcta antes de elegir.

export default function Letrero({ lado, texto, onElegir, estado = 'normal', deshabilitado, retraso = 0 }) {
  const izquierda = lado === 'izquierda'
  const giro = izquierda ? '-1.5deg' : '1.5deg'

  const estilosEstado = {
    normal: 'hover:-translate-y-1 hover:shadow-[0_10px_0_#3b2410] focus-visible:-translate-y-1',
    elegido: 'ring-4 ring-amber-300 scale-[1.02]',
    descartado: 'opacity-40 saturate-50',
  }[estado]

  return (
    <button
      type="button"
      onClick={onElegir}
      disabled={deshabilitado}
      className={`letrero-entrar group relative flex h-full w-full flex-col rounded-2xl border-4 border-madera-oscura bg-madera px-3 pb-3 pt-2 text-left shadow-[0_6px_0_#3b2410] transition duration-200 outline-none focus-visible:ring-4 focus-visible:ring-amber-300 disabled:cursor-default md:px-4 md:pb-4 ${estilosEstado}`}
      style={{ '--giro': giro, animationDelay: `${retraso}s` }}
      aria-label={`Ir por la ${lado}: ${texto}`}
    >
      {/* vetas de la madera */}
      <span aria-hidden className="pointer-events-none absolute inset-x-3 top-1/3 h-px bg-black/15" />
      <span aria-hidden className="pointer-events-none absolute inset-x-6 top-2/3 h-px bg-black/10" />

      <span
        className={`mb-1.5 flex items-center gap-1.5 font-titulo text-xs font-semibold uppercase tracking-wider text-amber-100 md:text-sm ${
          izquierda ? '' : 'flex-row-reverse self-end'
        }`}
      >
        <span aria-hidden className="text-base md:text-lg">{izquierda ? '⬅' : '➡'}</span>
        {izquierda ? 'Por la izquierda' : 'Por la derecha'}
      </span>
      <span className="relative flex-1 rounded-lg bg-papel px-2.5 py-2 text-[13px] font-semibold leading-snug text-stone-800 shadow-inner md:px-3 md:text-[15px]">
        {texto}
      </span>
    </button>
  )
}
