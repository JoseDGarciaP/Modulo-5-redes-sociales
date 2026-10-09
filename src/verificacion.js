// Utilidades para el nombre del participante y el código de verificación.
//
// El código se calcula a partir del nombre, el puntaje y la fecha/hora en que
// se terminó la partida. Si alguien edita el pantallazo (o la página) para
// cambiar el puntaje o el nombre, el código ya no coincide. El docente puede
// comprobarlo en la página de verificación: <dirección del juego>/#verificar

const SAL = 'rio-decisiones-m5::capi-vueltiao::2026'

// Hash cyrb53 (rápido y sin dependencias). Devuelve un número de 53 bits.
function cyrb53(texto, semilla = 0) {
  let h1 = 0xdeadbeef ^ semilla
  let h2 = 0x41c6ce57 ^ semilla
  for (let i = 0; i < texto.length; i++) {
    const c = texto.charCodeAt(i)
    h1 = Math.imul(h1 ^ c, 2654435761)
    h2 = Math.imul(h2 ^ c, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

// Quita espacios repetidos y espacios al inicio o al final.
export function limpiarNombre(nombre) {
  return nombre.replace(/\s+/g, ' ').trim()
}

// Versión del nombre para el código: sin tildes y en minúsculas.
function normalizarNombre(nombre) {
  return limpiarNombre(nombre)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// Devuelve un mensaje de error, o null si el nombre es válido.
export function validarNombre(nombre) {
  const limpio = limpiarNombre(nombre)
  if (!limpio) return 'Escribe tu nombre para poder empezar.'
  if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(limpio)) return 'Usa solo letras y espacios (sin números ni símbolos).'
  const palabras = limpio.split(' ').filter((p) => p.replace(/[' -]/g, '').length >= 2)
  if (palabras.length < 2) return 'Escribe tu nombre y tu apellido.'
  if (limpio.length > 50) return 'El nombre es demasiado largo (máximo 50 caracteres).'
  return null
}

// Fecha y hora con formato fijo dd/mm/aaaa hh:mm (24 h), igual en todos los navegadores.
export function formatearFecha(fecha) {
  const dos = (n) => String(n).padStart(2, '0')
  return `${dos(fecha.getDate())}/${dos(fecha.getMonth() + 1)}/${fecha.getFullYear()} ${dos(fecha.getHours())}:${dos(fecha.getMinutes())}`
}

// Código de 8 caracteres con el formato XXXX-XXXX.
export function generarCodigo(nombre, puntaje, fechaTexto) {
  const base = `${normalizarNombre(nombre)}|${Number(puntaje)}|${fechaTexto.replace(/\s+/g, ' ').trim()}|${SAL}`
  const crudo = cyrb53(base).toString(36).toUpperCase().padStart(8, '0').slice(-8)
  return `${crudo.slice(0, 4)}-${crudo.slice(4)}`
}

export function codigoValido(nombre, puntaje, fechaTexto, codigo) {
  const limpio = codigo.toUpperCase().replace(/[^0-9A-Z]/g, '')
  const esperado = generarCodigo(nombre, puntaje, fechaTexto).replace('-', '')
  return limpio === esperado
}
