// Letrero de madera con una de las dos respuestas.
// Los dos letreros tienen el mismo estilo para que no se sepa
// cuál es la respuesta correcta antes de elegir.

function Clavo({ className }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-2 w-2 rounded-full bg-stone-400 shadow-[inset_-1px_-1px_0_#57534e] ${className}`}
    />
  )
}

export default function Letrero({ lado, texto, onElegir, estado = 'normal', deshabilitado, retraso = 0 }) {
  const izquierda = lado === 'izquierda'
  const giro = izquierda ? '-1.5deg' : '1.5deg'

  const estilosEstado = {
    normal: 'hover:-translate-y-1 hover:shadow-[0_10px_0_#3b2410,0_14px_24px_rgba(0,0,0,.35)] focus-visible:-translate-y-1',
    elegido: 'ring-4 ring-amber-300 scale-[1.03]',
    descartado: 'opacity-40 saturate-50 scale-[0.97]',
  }[estado]

  return (
    <button
      type="button"
      onClick={onElegir}
      disabled={deshabilitado}
      className={`letrero-entrar group relative flex h-full w-full cursor-pointer flex-col rounded-2xl border-4 border-madera-oscura px-3 pb-3 pt-2 text-left shadow-[0_6px_0_#3b2410,0_10px_18px_rgba(0,0,0,.3)] transition duration-200 outline-none focus-visible:ring-4 focus-visible:ring-amber-300 disabled:cursor-default md:px-4 md:pb-4 ${estilosEstado}`}
      style={{
        '--giro': giro,
        animationDelay: `${retraso}s`,
        backgroundColor: '#8a5a2b',
        backgroundImage:
          'repeating-linear-gradient(176deg, rgba(0,0,0,.07) 0 2px, transparent 2px 11px), linear-gradient(180deg, #9c6634, #7b4e24)',
      }}
      aria-label={`Ir por la ${lado}: ${texto}`}
    >
      <Clavo className="left-1.5 top-1.5" />
      <Clavo className="right-1.5 top-1.5" />
      <Clavo className="bottom-1.5 left-1.5" />
      <Clavo className="bottom-1.5 right-1.5" />

      <span
        className={`mb-1.5 flex items-center gap-1.5 px-1 font-titulo text-xs font-semibold uppercase tracking-wider text-amber-100 md:text-sm ${
          izquierda ? '' : 'flex-row-reverse self-end'
        }`}
      >
        <span
          aria-hidden
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100/90 text-[11px] text-madera-oscura transition-transform md:h-6 md:w-6 md:text-xs ${
            izquierda ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
          }`}
        >
          {izquierda ? '◀' : '▶'}
        </span>
        {izquierda ? 'Por la izquierda' : 'Por la derecha'}
      </span>
      <span className="relative flex-1 rounded-lg bg-papel px-2.5 py-2 text-[13px] font-semibold leading-snug text-stone-800 shadow-[inset_0_1px_4px_rgba(0,0,0,.18)] md:px-3 md:text-[15px]">
        {texto}
      </span>
    </button>
  )
}
