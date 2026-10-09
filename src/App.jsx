import { useCallback, useEffect, useRef, useState } from 'react'
import { PREGUNTAS, PUNTAJE_TOTAL, TEMAS } from './data/preguntas.js'
import EscenaBifurcacion from './components/EscenaBifurcacion.jsx'
import { EscenaParaiso, EscenaTenebrosa } from './components/EscenasDestino.jsx'
import Letrero from './components/Letrero.jsx'

// Sortea en qué lado aparece la respuesta correcta en cada pregunta,
// repartiendo de forma pareja entre izquierda y derecha.
function sortearLados(n) {
  const mitad = Math.floor(n / 2)
  const extraIzq = Math.random() < 0.5
  const lados = [
    ...Array(mitad + (extraIzq ? n % 2 : 0)).fill('izquierda'),
    ...Array(mitad + (extraIzq ? 0 : n % 2)).fill('derecha'),
  ]
  for (let i = lados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[lados[i], lados[j]] = [lados[j], lados[i]]
  }
  return lados
}

function mensajeFinal(puntaje) {
  if (puntaje === PUNTAJE_TOTAL)
    return { titulo: '¡Navegante experto!', texto: 'Elegiste siempre el rumbo que acerca a las personas. Sabes usar la tecnología como puente y no como muro.' }
  if (puntaje >= 80)
    return { titulo: '¡Muy buen rumbo!', texto: 'Reconoces casi siempre cuándo las redes conectan y cuándo aíslan. Revisa las preguntas falladas para afinar la brújula.' }
  if (puntaje >= 60)
    return { titulo: 'Vas por buen camino', texto: 'Tienes claras varias ideas del módulo, pero algunas corrientes te arrastraron. Repasa la retroalimentación y vuelve a intentarlo.' }
  return { titulo: 'El río estuvo movido', texto: 'Varias decisiones te llevaron a aguas turbias. Repasa los temas del módulo y vuelve a remar: cada intento cuenta.' }
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

/* ------------------------------------------------------------------ */

function Marco({ children }) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(ellipse_at_top,#155e75_0%,#0b2530_60%)] px-3 py-3 text-white sm:px-4 md:py-5">
      <div className="mx-auto flex max-w-5xl flex-col gap-3">{children}</div>
    </div>
  )
}

function MarcoEscena({ children, className = '', reserva = 250 }) {
  return (
    <div
      className={`relative mx-auto w-full overflow-hidden rounded-3xl border-4 border-madera-oscura bg-sky-900 shadow-2xl ${className}`}
      style={{ aspectRatio: '1000 / 560', maxWidth: `max(320px, calc((100dvh - ${reserva}px) * 1.786))` }}
    >
      {children}
    </div>
  )
}

function Hud({ indice, respuestas, puntaje, golpe }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <h1 className="font-titulo text-xl font-bold tracking-wide text-amber-200 md:text-2xl">
        Río de las Decisiones
      </h1>
      <div className="flex items-center gap-3">
        <ol className="flex items-center gap-1" aria-label="Progreso">
          {PREGUNTAS.map((p, i) => {
            const r = respuestas[i]
            const color = r ? (r.acierto ? 'bg-emerald-400' : 'bg-rose-500') : i === indice ? 'bg-amber-300 ring-2 ring-amber-100/60' : 'bg-white/20'
            return <li key={p.id} className={`h-2.5 w-2.5 rounded-full transition-colors md:h-3 md:w-3 ${color}`} title={`Pregunta ${i + 1}`} />
          })}
        </ol>
        <div
          key={golpe}
          className={`rounded-full border-2 border-amber-300/70 bg-black/30 px-3 py-1 font-titulo text-sm font-semibold md:text-base ${golpe ? 'temblor' : ''}`}
          aria-live="polite"
        >
          <span className="text-amber-200">{puntaje}</span>
          <span className="text-white/60"> / {PUNTAJE_TOTAL} pts</span>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */

function PantallaInicio({ onEmpezar }) {
  return (
    <Marco>
      <MarcoEscena reserva={400}>
        <EscenaBifurcacion posicion="espera" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-center md:p-8">
          <p className="font-titulo text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 md:text-sm">
            Re-Conectados · Módulo 5
          </p>
          <h1 className="font-titulo text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Río de las Decisiones</h1>
        </div>
      </MarcoEscena>

      <section className="entrar mx-auto w-full max-w-3xl rounded-3xl bg-papel p-5 text-stone-800 shadow-xl md:p-7">
        <p className="text-base leading-relaxed md:text-lg">
          <strong>Capi</strong> es una capibara con sombrero vueltiao que desea llegar a su destino atravesando las
          diversas bifurcaciones del río.
        </p>
        <p className="mt-3 text-base leading-relaxed md:text-lg">
          Acompaña a <strong>Capi</strong> río abajo. En cada bifurcación verás una situación y dos letreros: uno lleva a
          <strong className="text-emerald-700"> aguas tranquilas</strong> y el otro a
          <strong className="text-purple-800"> aguas tenebrosas</strong>. La niebla no deja ver cuál es cuál, así que lee
          con atención y elige la mejor respuesta.
        </p>
        <ul className="mt-4 grid gap-2 text-sm font-semibold text-stone-700 sm:grid-cols-3 md:text-base">
          <li className="rounded-xl bg-amber-100 px-3 py-2">🧭 11 bifurcaciones</li>
          <li className="rounded-xl bg-amber-100 px-3 py-2">⭐ Empiezas con 100 puntos</li>
          <li className="rounded-xl bg-amber-100 px-3 py-2">🌊 Cada error resta lo que vale la pregunta</li>
        </ul>
        <div className="mt-5 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onEmpezar}
            className="rounded-full bg-emerald-600 px-8 py-3 font-titulo text-xl font-semibold text-white shadow-[0_5px_0_#065f46] transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          >
            ¡A remar!
          </button>
          <p className="text-xs text-stone-500">También puedes elegir con las flechas ← → del teclado.</p>
        </div>
      </section>
    </Marco>
  )
}

/* ------------------------------------------------------------------ */

function PantallaFinal({ respuestas, puntaje, onReiniciar }) {
  const { titulo, texto } = mensajeFinal(puntaje)
  const aciertos = respuestas.filter((r) => r.acierto).length
  return (
    <Marco>
      <MarcoEscena>
        {puntaje >= 60 ? <EscenaParaiso /> : <EscenaTenebrosa />}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="saltar-puntos rounded-3xl bg-black/45 px-6 py-3 text-center backdrop-blur-sm md:px-10 md:py-5">
            <p className="font-titulo text-xs uppercase tracking-[0.2em] text-amber-200 md:text-sm">Puntaje final</p>
            <p className="font-titulo text-5xl font-bold md:text-7xl">
              {puntaje}
              <span className="text-2xl text-white/70 md:text-3xl"> / {PUNTAJE_TOTAL}</span>
            </p>
          </div>
        </div>
      </MarcoEscena>

      <section className="entrar mx-auto w-full max-w-3xl rounded-3xl bg-papel p-5 text-stone-800 shadow-xl md:p-7">
        <h2 className="font-titulo text-2xl font-bold text-emerald-800 md:text-3xl">{titulo}</h2>
        <p className="mt-1 leading-relaxed">{texto}</p>
        <p className="mt-2 text-sm font-semibold text-stone-600">
          Acertaste {aciertos} de {PREGUNTAS.length} bifurcaciones.
        </p>

        <ol className="mt-4 grid gap-2">
          {PREGUNTAS.map((p, i) => {
            const r = respuestas[i]
            return (
              <li
                key={p.id}
                className={`flex gap-3 rounded-xl border-l-4 px-3 py-2 text-sm ${r?.acierto ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50'}`}
              >
                <span className="font-titulo font-bold text-stone-500">{i + 1}.</span>
                <span className="flex-1">
                  <span className="font-semibold">{p.situacion.split('. ')[0]}.</span>
                  {!r?.acierto && <span className="mt-1 block text-stone-600">Respuesta correcta: {p.correcta}</span>}
                </span>
                <span className={`whitespace-nowrap font-titulo font-semibold ${r?.acierto ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {r?.acierto ? `✓ ${p.puntos}` : `✗ −${p.puntos}`}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onReiniciar}
            className="rounded-full bg-emerald-600 px-8 py-3 font-titulo text-xl font-semibold text-white shadow-[0_5px_0_#065f46] transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          >
            Volver a remar
          </button>
        </div>
      </section>
    </Marco>
  )
}

/* ------------------------------------------------------------------ */

function Juego({ onTerminar }) {
  const [lados] = useState(() => sortearLados(PREGUNTAS.length))
  const [indice, setIndice] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [fase, setFase] = useState('llegando') // llegando | eligiendo | navegando | resultado
  const [posicion, setPosicion] = useState('abajo')
  const [eleccion, setEleccion] = useState(null)
  const vigente = useRef(0)
  const botonSeguir = useRef(null)

  const pregunta = PREGUNTAS[indice]
  const ladoCorrecto = lados[indice]
  const textos = {
    izquierda: ladoCorrecto === 'izquierda' ? pregunta.correcta : pregunta.incorrecta,
    derecha: ladoCorrecto === 'derecha' ? pregunta.correcta : pregunta.incorrecta,
  }
  const puntaje = PUNTAJE_TOTAL - respuestas.reduce((s, r, i) => s + (r.acierto ? 0 : PREGUNTAS[i].puntos), 0)
  const respuestaActual = respuestas[indice]
  const errores = respuestas.filter((r) => !r.acierto).length

  // Llegada de la canoa a cada bifurcación
  useEffect(() => {
    const id = ++vigente.current
    setFase('llegando')
    setPosicion('abajo')
    setEleccion(null)
    ;(async () => {
      await esperar(60)
      if (id !== vigente.current) return
      setPosicion('espera')
      await esperar(850)
      if (id !== vigente.current) return
      setFase('eligiendo')
    })()
  }, [indice])

  const elegir = useCallback(
    async (lado) => {
      if (fase !== 'eligiendo') return
      const id = vigente.current
      const acierto = lado === ladoCorrecto
      setEleccion(lado)
      setFase('navegando')
      setPosicion('centro')
      await esperar(700)
      if (id !== vigente.current) return
      setPosicion(lado)
      await esperar(1250)
      if (id !== vigente.current) return
      setRespuestas((prev) => {
        const nuevo = [...prev]
        nuevo[indice] = { acierto, lado }
        return nuevo
      })
      setFase('resultado')
    },
    [fase, ladoCorrecto, indice],
  )

  const seguir = useCallback(() => {
    if (fase !== 'resultado') return
    if (indice === PREGUNTAS.length - 1) onTerminar(respuestas)
    else setIndice((i) => i + 1)
  }, [fase, indice, onTerminar, respuestas])

  // Teclado: flechas para elegir, Enter o espacio para continuar
  useEffect(() => {
    const alPresionar = (e) => {
      if (fase === 'eligiendo' && e.key === 'ArrowLeft') elegir('izquierda')
      else if (fase === 'eligiendo' && e.key === 'ArrowRight') elegir('derecha')
      else if (fase === 'resultado' && (e.key === 'Enter' || e.key === ' ') && e.target.tagName !== 'BUTTON') {
        e.preventDefault()
        seguir()
      }
    }
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [fase, elegir, seguir])

  useEffect(() => {
    if (fase === 'resultado') botonSeguir.current?.focus({ preventScroll: true })
  }, [fase])

  const mostrarLetreros = fase === 'eligiendo' || fase === 'navegando'
  const estadoLetrero = (lado) => (!eleccion ? 'normal' : eleccion === lado ? 'elegido' : 'descartado')

  const letreros = (
    <>
      {['izquierda', 'derecha'].map((lado) => (
        <Letrero
          key={`${indice}-${lado}`}
          lado={lado}
          texto={textos[lado]}
          onElegir={() => elegir(lado)}
          estado={estadoLetrero(lado)}
          deshabilitado={fase !== 'eligiendo'}
          retraso={lado === 'derecha' ? 0.12 : 0}
        />
      ))}
    </>
  )

  return (
    <Marco>
      <Hud indice={indice} respuestas={respuestas} puntaje={puntaje} golpe={errores} />

      {/* Tarjeta superior: situación o retroalimentación */}
      {fase !== 'resultado' ? (
        <section key={`p-${indice}`} className="entrar rounded-2xl bg-papel px-4 py-3 text-stone-800 shadow-lg md:px-6 md:py-4">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-wide text-stone-500">
            <span className="rounded-full bg-cyan-800 px-2 py-0.5 text-cyan-50">
              Bifurcación {indice + 1} de {PREGUNTAS.length}
            </span>
            <span>Tema {pregunta.tema}: {TEMAS[pregunta.tema]}</span>
            <span className="ml-auto text-amber-700">Vale {pregunta.puntos} pts</span>
          </p>
          <p className="mt-2 text-[15px] font-semibold leading-snug md:text-lg">{pregunta.situacion}</p>
        </section>
      ) : (
        <section
          key={`r-${indice}`}
          className={`entrar rounded-2xl px-4 py-3 shadow-lg md:px-6 md:py-4 ${
            respuestaActual?.acierto ? 'bg-emerald-50 text-emerald-950' : 'bg-purple-50 text-purple-950'
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="font-titulo text-xl font-bold md:text-2xl">
              {respuestaActual?.acierto ? '¡Buen rumbo! Aguas tranquilas' : '¡Uy! Aguas turbulentas'}
            </h2>
            <span
              className={`saltar-puntos rounded-full px-3 py-0.5 font-titulo text-sm font-semibold text-white ${
                respuestaActual?.acierto ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            >
              {respuestaActual?.acierto ? `Conservas tus ${pregunta.puntos} pts` : `−${pregunta.puntos} pts`}
            </span>
          </div>
          {!respuestaActual?.acierto && (
            <p className="mt-1.5 text-sm md:text-base">
              <span className="font-bold">La mejor respuesta era: </span>
              {pregunta.correcta}
            </p>
          )}
          <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <p className="flex-1 rounded-xl bg-white/70 px-3 py-2 text-sm leading-snug md:text-base">
            <span aria-hidden>💡 </span>
            {pregunta.retro}
          </p>
          <div className="flex justify-end">
            <button
              ref={botonSeguir}
              type="button"
              onClick={seguir}
              className="rounded-full bg-cyan-700 px-6 py-2 font-titulo text-lg font-semibold text-white shadow-[0_4px_0_#164e63] transition hover:-translate-y-0.5 hover:bg-cyan-600 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300"
            >
              {indice === PREGUNTAS.length - 1 ? 'Llegar al final →' : 'Seguir remando →'}
            </button>
          </div>
          </div>
        </section>
      )}

      {/* Escena del río */}
      <MarcoEscena reserva={fase === 'resultado' ? 290 : 250}>
        <EscenaBifurcacion posicion={posicion} />

        {fase === 'resultado' && (
          <div className="aparecer absolute inset-0">
            {respuestaActual?.acierto ? <EscenaParaiso /> : <EscenaTenebrosa />}
            <div className="absolute inset-x-0 top-[6%] flex justify-center">
              <span
                className={`saltar-puntos rounded-full px-5 py-2 font-titulo text-2xl font-bold shadow-xl md:text-4xl ${
                  respuestaActual?.acierto ? 'bg-white/85 text-emerald-700' : 'temblor bg-black/60 text-rose-400'
                }`}
              >
                {respuestaActual?.acierto ? `✓ +${pregunta.puntos} a salvo` : `−${pregunta.puntos}`}
              </span>
            </div>
          </div>
        )}

        {/* Letreros sobre la escena en pantallas medianas y grandes */}
        {mostrarLetreros && (
          <div className="absolute inset-x-[2.5%] top-[4%] hidden grid-cols-2 gap-[24%] md:grid">{letreros}</div>
        )}
      </MarcoEscena>

      {/* Letreros debajo de la escena en celulares */}
      {mostrarLetreros && <div className="grid grid-cols-2 gap-2 md:hidden">{letreros}</div>}
    </Marco>
  )
}

/* ------------------------------------------------------------------ */

export default function App() {
  const [pantalla, setPantalla] = useState('inicio')
  const [partida, setPartida] = useState(0)
  const [respuestas, setRespuestas] = useState([])

  const puntaje = PUNTAJE_TOTAL - respuestas.reduce((s, r, i) => s + (r?.acierto ? 0 : PREGUNTAS[i].puntos), 0)

  if (pantalla === 'inicio') return <PantallaInicio onEmpezar={() => setPantalla('juego')} />

  if (pantalla === 'final')
    return (
      <PantallaFinal
        respuestas={respuestas}
        puntaje={puntaje}
        onReiniciar={() => {
          setRespuestas([])
          setPartida((n) => n + 1)
          setPantalla('juego')
        }}
      />
    )

  return (
    <Juego
      key={partida}
      onTerminar={(r) => {
        setRespuestas(r)
        setPantalla('final')
        window.scrollTo({ top: 0 })
      }}
    />
  )
}
