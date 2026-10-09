// Preguntas 1 a 11 de la actividad evaluativa del Módulo 5.
// "correcta" es el texto de la respuesta correcta e "incorrecta" el de la otra.
// La posición (izquierda o derecha) se sortea al iniciar cada partida.
// Puntaje: 10 preguntas valen 9 puntos y una vale 10 (total 100).
// Para cambiar cuál vale 10, mueve el valor "puntos: 10" a otra pregunta.

export const TEMAS = {
  1: 'La paradoja de la hiperconectividad',
  2: 'Comparación social, FOMO y validación digital',
  3: 'Recuperando la presencia',
}

export const PREGUNTAS = [
  {
    id: 1,
    tema: 1,
    puntos: 9,
    situacion:
      'Andrés tiene más de 800 amigos en redes y chatea todo el día, pero dice que no tiene con quién hablar cuando le va mal. ¿Cómo se explica?',
    correcta:
      'Tener muchos contactos no garantiza sentirse acompañado: la soledad depende de la calidad de los vínculos.',
    incorrecta: 'Andrés necesita agregar más contactos para encontrar a alguien con quien hablar.',
    retro:
      'Esta es la paradoja de la hiperconectividad: estar conectado no es lo mismo que sentirse acompañado.',
  },
  {
    id: 2,
    tema: 1,
    puntos: 9,
    situacion:
      'Laura pasa dos horas cada noche viendo historias de otras personas sin escribirle a nadie. Su hermana pasa el mismo tiempo en videollamada con una amiga que vive lejos. ¿Cuál uso favorece más el bienestar relacional?',
    correcta: 'El de la hermana, porque usa la tecnología para interactuar y no solo para mirar.',
    incorrecta: 'Los dos por igual, porque pasan el mismo tiempo en el celular.',
    retro:
      'El uso activo (conversar, interactuar) se asocia con más bienestar que el uso pasivo de mirar la vida de otros.',
  },
  {
    id: 3,
    tema: 1,
    puntos: 9,
    situacion:
      'Un grupo de amigos dejó de verse en persona porque “igual hablamos todos los días por el chat”. ¿Qué está pasando?',
    correcta: 'La tecnología está reemplazando el encuentro en lugar de servir como puente hacia él.',
    incorrecta: 'El chat es suficiente para mantener la amistad igual de cercana.',
    retro: 'Cuando el tiempo en pantalla reemplaza el tiempo juntos, el vínculo pierde profundidad.',
  },
  {
    id: 4,
    tema: 1,
    puntos: 9,
    situacion:
      'Carlos se mudó a otra ciudad y usa el celular para llamar a su familia cada domingo y organizar visitas. ¿Cómo describirías este uso?',
    correcta: 'Es un uso que conecta: la tecnología funciona como puente con quienes están lejos.',
    incorrecta: 'Es un uso problemático, porque igual depende del celular.',
    retro:
      'La tecnología no es buena ni mala por sí sola; depende de si nos acerca o nos aleja de las personas.',
  },
  {
    id: 5,
    tema: 2,
    puntos: 9,
    situacion:
      'Sofía borra sus fotos si en la primera hora no tienen suficientes likes, porque siente que “nadie la quiere”. ¿Qué está ocurriendo?',
    correcta:
      'Su autoestima depende de la validación digital: los likes se volvieron el termómetro de su valor.',
    incorrecta: 'Es una forma sana de saber qué contenido le gusta a la gente.',
    retro:
      'Cuando la aprobación en redes define cómo nos sentimos, la autoestima queda en manos de otros.',
  },
  {
    id: 6,
    tema: 2,
    puntos: 9,
    situacion:
      'Mateo ve fotos de sus compañeros de viaje y siente que su vida es aburrida en comparación. ¿Qué debería tener en cuenta?',
    correcta:
      'Que compara su vida completa con una versión editada y seleccionada de la vida de otros.',
    incorrecta: 'Que sus compañeros realmente tienen una vida más interesante que la suya.',
    retro:
      'En redes se muestra lo mejor; compararse con eso distorsiona la percepción de la propia vida.',
  },
  {
    id: 7,
    tema: 2,
    puntos: 9,
    situacion:
      'Valentina no puede dejar el celular un sábado porque teme que sus amigos estén haciendo algo divertido sin ella. ¿Qué está experimentando?',
    correcta: 'FOMO: ansiedad de estar perdiéndose experiencias que otros están viviendo.',
    incorrecta: 'Interés normal en saber qué hacen sus amigos, sin ningún efecto emocional.',
    retro:
      'El FOMO es una ansiedad que empuja a revisar constantemente las redes, y suele aumentar el malestar en lugar de calmarlo.',
  },
  {
    id: 8,
    tema: 2,
    puntos: 9,
    situacion:
      'Julián dice que revisa el celular “a ver si hay algo nuevo” decenas de veces al día, aunque casi nunca hay nada importante. ¿Por qué pasa esto?',
    correcta:
      'Porque las redes están diseñadas para captar la atención con notificaciones y recompensas impredecibles.',
    incorrecta:
      'Porque tiene poca fuerza de voluntad, ya que las redes no influyen en ese comportamiento.',
    retro:
      'Funciones como el scroll infinito y las notificaciones están pensadas para que volvamos una y otra vez.',
  },
  {
    id: 9,
    tema: 3,
    puntos: 9,
    situacion:
      'Durante el almuerzo familiar, Daniel deja el celular boca arriba sobre la mesa “por si acaso”, aunque no lo usa. ¿Qué sería mejor?',
    correcta:
      'Guardarlo lejos de la mesa, porque incluso su sola presencia puede restarle calidad a la conversación.',
    incorrecta: 'Dejarlo ahí, porque si no lo usa no afecta la conversación.',
    retro: 'Tener el celular a la vista divide la atención, aunque no se toque.',
  },
  {
    id: 10,
    tema: 3,
    puntos: 9,
    situacion:
      'Camila quiere concentrarse en una conversación importante con su mejor amiga, pero su celular no para de sonar. ¿Qué estrategia de higiene digital le sirve?',
    correcta: 'Activar el modo no molestar y guardar el celular mientras conversan.',
    incorrecta: 'Revisar cada notificación rápido para que no se acumulen.',
    retro: 'Silenciar las notificaciones protege los momentos de presencia de interrupciones.',
  },
  {
    id: 11,
    tema: 3,
    puntos: 10,
    situacion:
      'Pedro abre el celular sin pensar cada vez que se aburre. ¿Qué haría alguien que practica el consumo digital consciente?',
    correcta: 'Detenerse antes de abrirlo y preguntarse para qué lo va a usar.',
    incorrecta: 'Abrirlo, porque es la forma más rápida de quitarse el aburrimiento.',
    retro: 'El consumo consciente consiste en pasar del uso automático al uso con intención.',
  },
]

export const PUNTAJE_TOTAL = PREGUNTAS.reduce((suma, p) => suma + p.puntos, 0) // 100
