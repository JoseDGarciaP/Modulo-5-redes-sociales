import { useCallback, useEffect, useRef, useState } from 'react'
import { PREGUNTAS, PUNTAJE_TOTAL, TEMAS } from './data/preguntas.js'
import EscenaBifurcacion from './components/EscenaBifurcacion.jsx'
import { EscenaParaiso, EscenaTenebrosa } from './components/EscenasDestino.jsx'
import Letrero from './components/Letrero.jsx'
import { codigoValido, formatearFecha, generarCodigo, limpiarNombre, validarNombre } from './verificacion.js'

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
      className={`marco-escena relative mx-auto w-full overflow-hidden rounded-3xl border-4 border-madera-oscura bg-sky-900 shadow-[0_20px_50px_rgba(0,0,0,.45)] ${className}`}
      style={{ aspectRatio: '1000 / 560', '--reserva': `${reserva}px` }}
    >
      {children}
    </div>
  )
}

function Hud({ nombre, indice, respuestas, puntaje, golpe }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="min-w-0">
        <h1 className="font-titulo text-xl font-bold tracking-wide text-amber-200 md:text-2xl">Río de las Decisiones</h1>
        <p className="truncate text-xs font-semibold text-white/70 md:text-sm">Participante: {nombre}</p>
      </div>
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
          className={`relative overflow-hidden rounded-full border-2 border-amber-300/70 bg-black/30 px-3 py-1 font-titulo text-sm font-semibold md:text-base ${golpe ? 'temblor' : ''}`}
          aria-live="polite"
          aria-label={`Puntaje: ${puntaje} de ${PUNTAJE_TOTAL}`}
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 bg-amber-300/20 transition-[width] duration-700"
            style={{ width: `${(puntaje / PUNTAJE_TOTAL) * 100}%` }}
          />
          <span className="relative text-amber-200">{puntaje}</span>
          <span className="relative text-white/60"> / {PUNTAJE_TOTAL} pts</span>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */

function PantallaInicio({ nombreInicial = '', onEmpezar }) {
  const [nombre, setNombre] = useState(nombreInicial)
  const [tocado, setTocado] = useState(false)
  const error = validarNombre(nombre)
  const mostrarError = tocado && error

  const enviar = (e) => {
    e.preventDefault()
    setTocado(true)
    if (!error) onEmpezar(limpiarNombre(nombre))
  }

  return (
    <Marco>
      <MarcoEscena reserva={560}>
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
        <ul className="mt-3 grid gap-2 text-sm font-semibold text-stone-700 sm:grid-cols-3">
          <li className="rounded-xl bg-amber-100 px-3 py-2">🧭 11 bifurcaciones</li>
          <li className="rounded-xl bg-amber-100 px-3 py-2">⭐ Empiezas con 100 puntos</li>
          <li className="rounded-xl bg-amber-100 px-3 py-2">🌊 Cada error resta lo que vale la pregunta</li>
        </ul>

        <form onSubmit={enviar} noValidate className="mt-4 rounded-2xl border-2 border-amber-200 bg-white/70 p-4">
          <label htmlFor="nombre" className="block font-titulo text-lg font-semibold text-stone-800">
            ¿Cómo te llamas? <span className="text-rose-600">*</span>
          </label>
          <p className="text-sm text-stone-600">Escribe tu nombre y apellido. Aparecerá en tu constancia de puntaje.</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={() => nombre && setTocado(true)}
              maxLength={50}
              autoComplete="name"
              placeholder="Ej.: Laura Gómez"
              aria-invalid={mostrarError ? 'true' : 'false'}
              aria-describedby="nombre-error"
              className={`min-w-0 flex-1 rounded-xl border-2 bg-white px-4 py-3 text-base font-semibold text-stone-800 outline-none transition placeholder:font-normal placeholder:text-stone-400 focus:ring-4 ${
                mostrarError ? 'border-rose-400 focus:ring-rose-200' : 'border-stone-300 focus:border-emerald-500 focus:ring-emerald-200'
              }`}
            />
            <button
              type="submit"
              disabled={Boolean(error)}
              className="rounded-full bg-emerald-600 px-8 py-3 font-titulo text-xl font-semibold text-white shadow-[0_5px_0_#065f46] transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:shadow-[0_5px_0_#78716c] disabled:hover:translate-y-0"
            >
              ¡A remar!
            </button>
          </div>
          <p id="nombre-error" className="mt-2 min-h-5 text-sm font-semibold text-rose-600" aria-live="polite">
            {mostrarError ? error : ''}
          </p>
        </form>
        <p className="mt-1 text-center text-xs text-stone-500">Durante el juego puedes elegir con las flechas ← → del teclado.</p>
      </section>
    </Marco>
  )
}

/* ------------------------------------------------------------------ */

function Confeti() {
  const colores = ['#facc15', '#f472b6', '#4ade80', '#60a5fa', '#fb923c', '#a78bfa']
  return (
    <div aria-hidden>
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className="confeti"
          style={{
            left: `${(i * 37) % 100}%`,
            backgroundColor: colores[i % colores.length],
            animationDuration: `${2.6 + ((i * 13) % 20) / 10}s`,
            animationDelay: `${((i * 7) % 15) / 10}s`,
            rotate: `${(i * 47) % 360}deg`,
          }}
        />
      ))}
    </div>
  )
}

function PantallaFinal({ resultado, onReiniciar, onCambiarParticipante }) {
  const { nombre, respuestas, puntaje, fecha, codigo } = resultado
  const { titulo, texto } = mensajeFinal(puntaje)
  const aciertos = respuestas.filter((r) => r?.acierto).length
  const aprobado = puntaje >= 60
  return (
    <Marco>
      {puntaje >= 80 && <Confeti />}
      <MarcoEscena reserva={420}>
        {aprobado ? <EscenaParaiso /> : <EscenaTenebrosa />}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <div className="saltar-puntos max-w-[90%] rounded-3xl bg-black/50 px-6 py-3 text-center backdrop-blur-sm md:px-10 md:py-5">
            <p className="truncate font-titulo text-lg font-semibold text-white md:text-2xl">{nombre}</p>
            <p className="font-titulo text-xs uppercase tracking-[0.2em] text-amber-200 md:text-sm">Puntaje final</p>
            <p className="font-titulo text-5xl font-bold leading-none md:text-7xl">
              {puntaje}
              <span className="text-2xl text-white/70 md:text-3xl"> / {PUNTAJE_TOTAL}</span>
            </p>
          </div>
        </div>
      </MarcoEscena>

      {/* Constancia para el pantallazo */}
      <section
        className="entrar mx-auto w-full max-w-3xl rounded-3xl border-4 border-dashed border-amber-400 bg-papel p-4 text-stone-800 shadow-xl md:p-5"
        aria-label="Constancia de puntaje"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Constancia · Río de las Decisiones · Módulo 5</p>
            <p className="mt-0.5 break-words font-titulo text-2xl font-bold text-stone-900 md:text-3xl">{nombre}</p>
            <p className={`font-titulo text-lg font-semibold ${aprobado ? 'text-emerald-700' : 'text-purple-800'}`}>{titulo}</p>
          </div>
          <div className={`rounded-2xl px-4 py-2 text-center text-white ${aprobado ? 'bg-emerald-600' : 'bg-purple-700'}`}>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Puntaje</p>
            <p className="font-titulo text-4xl font-bold leading-none">
              {puntaje}
              <span className="text-lg opacity-80">/{PUNTAJE_TOTAL}</span>
            </p>
          </div>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
          <div className="rounded-xl bg-white/80 px-3 py-2">
            <dt className="text-xs font-bold uppercase text-stone-500">Aciertos</dt>
            <dd className="whitespace-nowrap font-titulo text-lg font-semibold">{aciertos} de {PREGUNTAS.length}</dd>
          </div>
          <div className="rounded-xl bg-white/80 px-3 py-2 sm:order-last">
            <dt className="text-xs font-bold uppercase text-stone-500">Código</dt>
            <dd className="whitespace-nowrap font-mono text-lg font-bold tracking-wider">{codigo}</dd>
          </div>
          <div className="col-span-2 rounded-xl bg-white/80 px-3 py-2 sm:col-span-1">
            <dt className="text-xs font-bold uppercase text-stone-500">Fecha y hora</dt>
            <dd className="whitespace-nowrap font-titulo text-lg font-semibold">{fecha}</dd>
          </div>
        </dl>
        <div className="mt-3 flex gap-3 rounded-2xl bg-sky-100 px-4 py-3 text-sky-950">
          <span aria-hidden className="text-2xl">📸</span>
          <div className="text-sm leading-snug md:text-base">
            <p className="font-bold">Toma un pantallazo de esta constancia y envíalo por Microsoft Teams a tu docente.</p>
            <p className="mt-1 text-sky-900">
              En Windows: <kbd className="rounded bg-white px-1.5 font-semibold">Win + Shift + S</kbd> · En Mac:{' '}
              <kbd className="rounded bg-white px-1.5 font-semibold">Cmd + Shift + 4</kbd> · En el celular: encendido + bajar volumen.
              Asegúrate de que se vean tu nombre, el puntaje, la fecha y el código.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl rounded-3xl bg-papel p-5 text-stone-800 shadow-xl md:p-7">
        <p className="leading-relaxed">{texto}</p>
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
                  <span className="font-semibold">{p.situacion.split('¿')[0].trim()}</span>
                  {!r?.acierto && <span className="mt-1 block text-stone-600">Respuesta correcta: {p.correcta}</span>}
                </span>
                <span className={`whitespace-nowrap font-titulo font-semibold ${r?.acierto ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {r?.acierto ? `✓ ${p.puntos}` : `✗ −${p.puntos}`}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="mt-5 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onReiniciar}
            className="rounded-full bg-emerald-600 px-8 py-3 font-titulo text-xl font-semibold text-white shadow-[0_5px_0_#065f46] transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          >
            Volver a jugar
          </button>
          <button
            type="button"
            onClick={onCambiarParticipante}
            className="text-sm font-semibold text-stone-500 underline underline-offset-2 hover:text-stone-700"
          >
            Cambiar de participante
          </button>
        </div>
      </section>
    </Marco>
  )
}

/* ------------------------------------------------------------------ */

// Página para el docente: comprueba que un pantallazo no fue alterado.
// Se abre agregando #verificar al final de la dirección del juego.
function PantallaVerificar() {
  const [datos, setDatos] = useState({ nombre: '', puntaje: '', fecha: '', codigo: '' })
  const [veredicto, setVeredicto] = useState(null)
  const cambiar = (campo) => (e) => {
    setDatos((d) => ({ ...d, [campo]: e.target.value }))
    setVeredicto(null)
  }
  const verificar = (e) => {
    e.preventDefault()
    const completo = datos.nombre.trim() && datos.puntaje.trim() && datos.fecha.trim() && datos.codigo.trim()
    if (!completo) return setVeredicto('incompleto')
    setVeredicto(codigoValido(datos.nombre, datos.puntaje, datos.fecha, datos.codigo) ? 'valido' : 'invalido')
  }
  const campos = [
    ['nombre', 'Nombre (como aparece en el pantallazo)', 'Laura Gómez'],
    ['puntaje', 'Puntaje', '82'],
    ['fecha', 'Fecha y hora (dd/mm/aaaa hh:mm)', '09/10/2026 12:55'],
    ['codigo', 'Código', 'AB12-CD34'],
  ]
  return (
    <Marco>
      <section className="entrar mx-auto mt-6 w-full max-w-xl rounded-3xl bg-papel p-6 text-stone-800 shadow-xl">
        <h1 className="font-titulo text-2xl font-bold">Verificar constancia</h1>
        <p className="mt-1 text-sm text-stone-600">
          Copia los datos del pantallazo. Si alguien cambió el nombre, el puntaje o la fecha, el código no coincidirá.
        </p>
        <form onSubmit={verificar} className="mt-4 grid gap-3">
          {campos.map(([campo, etiqueta, ejemplo]) => (
            <label key={campo} className="grid gap-1 text-sm font-semibold">
              {etiqueta}
              <input
                value={datos[campo]}
                onChange={cambiar(campo)}
                placeholder={ejemplo}
                inputMode={campo === 'puntaje' ? 'numeric' : undefined}
                className="rounded-xl border-2 border-stone-300 bg-white px-3 py-2 font-normal outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
              />
            </label>
          ))}
          <button type="submit" className="mt-1 rounded-full bg-cyan-700 px-6 py-2.5 font-titulo text-lg font-semibold text-white hover:bg-cyan-600">
            Verificar
          </button>
        </form>
        {veredicto && (
          <p
            role="status"
            className={`mt-4 rounded-xl px-4 py-3 font-semibold ${
              veredicto === 'valido' ? 'bg-emerald-100 text-emerald-900' : veredicto === 'invalido' ? 'bg-rose-100 text-rose-900' : 'bg-amber-100 text-amber-900'
            }`}
          >
            {veredicto === 'valido' && '✓ La constancia es auténtica: los datos coinciden con el código.'}
            {veredicto === 'invalido' && '✗ Los datos no coinciden con el código. Revisa que estén bien copiados; si lo están, la constancia fue modificada.'}
            {veredicto === 'incompleto' && 'Completa los cuatro campos.'}
          </p>
        )}
        <a href="#" className="mt-4 inline-block text-sm font-semibold text-stone-500 underline">Ir al juego</a>
      </section>
    </Marco>
  )
}

/* ------------------------------------------------------------------ */

function Juego({ nombre, onTerminar }) {
  const [lados] = useState(() => sortearLados(PREGUNTAS.length))
  const [indice, setIndice] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [fase, setFase] = useState('llegando') // llegando | eligiendo | navegando | resultado
  const [posicion, setPosicion] = useState('abajo')
  const [eleccion, setEleccion] = useState(null)
  const vigente = useRef(0)
  const bloqueado = useRef(true) // evita dobles elecciones o saltarse preguntas con teclas repetidas
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
    bloqueado.current = true
    setFase('llegando')
    setPosicion('abajo')
    setEleccion(null)
    ;(async () => {
      await esperar(60)
      if (id !== vigente.current) return
      setPosicion('espera')
      await esperar(850)
      if (id !== vigente.current) return
      bloqueado.current = false
      setFase('eligiendo')
    })()
  }, [indice])

  const elegir = useCallback(
    async (lado) => {
      if (fase !== 'eligiendo' || bloqueado.current) return
      bloqueado.current = true
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
      bloqueado.current = false
      // En celulares los letreros quedan debajo: sube para mostrar la retroalimentación.
      if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [fase, ladoCorrecto, indice],
  )

  const seguir = useCallback(() => {
    if (fase !== 'resultado' || bloqueado.current) return
    bloqueado.current = true
    if (indice === PREGUNTAS.length - 1) {
      onTerminar(respuestas)
      return
    }
    setFase('llegando')
    setIndice((i) => i + 1)
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
  const viajando = posicion === 'izquierda' || posicion === 'derecha'
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
      <Hud nombre={nombre} indice={indice} respuestas={respuestas} puntaje={puntaje} golpe={errores} />

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
          role="status"
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
          <div
            className={`absolute inset-x-[2.5%] top-[4%] hidden grid-cols-2 gap-[24%] transition duration-500 md:grid ${
              viajando ? 'pointer-events-none -translate-y-6 opacity-0' : ''
            }`}
          >
            {letreros}
          </div>
        )}
      </MarcoEscena>

      {/* Letreros debajo de la escena en celulares */}
      {mostrarLetreros && <div className="grid grid-cols-2 gap-2 md:hidden">{letreros}</div>}
    </Marco>
  )
}

/* ------------------------------------------------------------------ */

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const alCambiar = () => setHash(window.location.hash)
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const [pantalla, setPantalla] = useState('inicio')
  const [partida, setPartida] = useState(0)
  const [nombre, setNombre] = useState('')
  const [resultado, setResultado] = useState(null)

  if (hash === '#verificar') return <PantallaVerificar />

  if (pantalla === 'inicio')
    return (
      <PantallaInicio
        nombreInicial={nombre}
        onEmpezar={(n) => {
          setNombre(n)
          setPartida((x) => x + 1)
          setPantalla('juego')
          window.scrollTo({ top: 0 })
        }}
      />
    )

  if (pantalla === 'final' && resultado)
    return (
      <PantallaFinal
        resultado={resultado}
        onReiniciar={() => {
          setResultado(null)
          setPartida((x) => x + 1)
          setPantalla('juego')
          window.scrollTo({ top: 0 })
        }}
        onCambiarParticipante={() => {
          setResultado(null)
          setNombre('')
          setPantalla('inicio')
          window.scrollTo({ top: 0 })
        }}
      />
    )

  return (
    <Juego
      key={partida}
      nombre={nombre}
      onTerminar={(respuestas) => {
        // El puntaje se calcula una sola vez aquí, a partir de las respuestas,
        // y la constancia queda congelada para que no se pueda alterar.
        const puntaje = PUNTAJE_TOTAL - respuestas.reduce((s, r, i) => s + (r?.acierto ? 0 : PREGUNTAS[i].puntos), 0)
        const fecha = formatearFecha(new Date())
        setResultado(
          Object.freeze({
            nombre,
            respuestas: Object.freeze(respuestas.map((r) => Object.freeze({ ...r }))),
            puntaje,
            fecha,
            codigo: generarCodigo(nombre, puntaje, fecha),
          }),
        )
        setPantalla('final')
        window.scrollTo({ top: 0 })
      }}
    />
  )
}
