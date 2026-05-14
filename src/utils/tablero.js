export const TAMANO_MINIMO = 4
export const TAMANO_MAXIMO = 7

const movimientosCaballo = [
  [-1, 2],
  [1, 2],
  [2, 1],
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [1, -2],
  [2, -1],
]

/**
 * Crea un tablero vacío de tamaño N x N.
 *
 * @param {number} tamano Tamaño del tablero.
 * @returns {Array<Array<object>>} Tablero inicial sin obstáculos.
 */
export function crearTablero(tamano) {
  const tablero = []

  for (let i = 0; i < tamano; i++) {
    const fila = []

    for (let j = 0; j < tamano; j++) {
      fila.push({
        fila: i,
        columna: j,
        esObstaculo: false,
        orden: null,
        estado: 'normal',
        tieneCaballo: false,
      })
    }

    tablero.push(fila)
  }

  return tablero
}

/**
 * Copia el tablero y cambia una casilla entre libre y obstáculo.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @param {number} fila Fila de la casilla.
 * @param {number} columna Columna de la casilla.
 * @returns {Array<Array<object>>} Nuevo tablero con el obstáculo cambiado.
 */
export function copiarTableroConObstaculo(tablero, fila, columna) {
  const nuevoTablero = []

  for (let i = 0; i < tablero.length; i++) {
    const nuevaFila = []

    for (let j = 0; j < tablero[i].length; j++) {
      const casilla = tablero[i][j]

      if (i === fila && j === columna) {
        const nuevoObstaculo = !casilla.esObstaculo

        nuevaFila.push({
          ...casilla,
          esObstaculo: nuevoObstaculo,
          estado: nuevoObstaculo ? 'obstaculo' : 'normal',
          orden: null,
          tieneCaballo: false,
        })
      } else {
        nuevaFila.push({ ...casilla })
      }
    }

    nuevoTablero.push(nuevaFila)
  }

  return nuevoTablero
}

/**
 * Quita todos los obstáculos del tablero.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @returns {Array<Array<object>>} Tablero sin obstáculos ni recorrido.
 */
export function limpiarObstaculos(tablero) {
  const nuevoTablero = []

  for (let i = 0; i < tablero.length; i++) {
    const nuevaFila = []

    for (let j = 0; j < tablero[i].length; j++) {
      nuevaFila.push({
        ...tablero[i][j],
        esObstaculo: false,
        orden: null,
        estado: 'normal',
        tieneCaballo: false,
      })
    }

    nuevoTablero.push(nuevaFila)
  }

  return nuevoTablero
}

/**
 * Quita números y colores del recorrido, pero deja los obstáculos.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @returns {Array<Array<object>>} Tablero listo para volver a ejecutar.
 */
export function limpiarRecorrido(tablero) {
  const nuevoTablero = []

  for (let i = 0; i < tablero.length; i++) {
    const nuevaFila = []

    for (let j = 0; j < tablero[i].length; j++) {
      nuevaFila.push({
        ...tablero[i][j],
        orden: null,
        estado: tablero[i][j].esObstaculo ? 'obstaculo' : 'normal',
        tieneCaballo: false,
      })
    }

    nuevoTablero.push(nuevaFila)
  }

  return nuevoTablero
}

/**
 * Aplica un paso del algoritmo al tablero que se muestra en pantalla.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @param {object} paso Paso generado por el backtracking.
 * @returns {Array<Array<object>>} Tablero actualizado con avance o retroceso.
 */
export function aplicarPasoAlTablero(tablero, paso) {
  const nuevoTablero = []
  let filaCaballo = paso.fila
  let columnaCaballo = paso.columna

  if (paso.tipo === 'retroceso') {
    filaCaballo = paso.caballoFila
    columnaCaballo = paso.caballoColumna
  }

  for (let i = 0; i < tablero.length; i++) {
    const nuevaFila = []

    for (let j = 0; j < tablero[i].length; j++) {
      const casilla = tablero[i][j]
      const tieneCaballo = i === filaCaballo && j === columnaCaballo

      if (i === paso.fila && j === paso.columna) {
        if (paso.tipo === 'avance') {
          nuevaFila.push({
            ...casilla,
            orden: paso.orden,
            estado: 'avance',
            tieneCaballo,
          })
        } else {
          nuevaFila.push({
            ...casilla,
            orden: null,
            estado: 'retroceso',
            tieneCaballo,
          })
        }
      } else {
        nuevaFila.push({
          ...casilla,
          tieneCaballo,
        })
      }
    }

    nuevoTablero.push(nuevaFila)
  }

  return nuevoTablero
}

/**
 * Aplica todos los pasos para mostrar directamente el resultado final.
 *
 * @param {Array<Array<object>>} tablero Tablero inicial de la animación.
 * @param {Array<object>} pasos Lista de pasos generados por el algoritmo.
 * @returns {Array<Array<object>>} Tablero resultante después de todos los pasos.
 */
export function aplicarPasosAlTablero(tablero, pasos) {
  let tableroFinal = tablero

  for (let i = 0; i < pasos.length; i++) {
    tableroFinal = aplicarPasoAlTablero(tableroFinal, pasos[i])
  }

  return tableroFinal
}

/**
 * Resalta las casillas del recorrido cuando la solución fue encontrada.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @param {boolean} encontroSolucion Indica si el recorrido fue exitoso.
 * @returns {Array<Array<object>>} Tablero con la solución resaltada.
 */
export function resaltarSolucionFinal(tablero, encontroSolucion) {
  if (!encontroSolucion) {
    return tablero
  }

  const nuevoTablero = []

  for (let i = 0; i < tablero.length; i++) {
    const nuevaFila = []

    for (let j = 0; j < tablero[i].length; j++) {
      const casilla = tablero[i][j]

      if (casilla.orden !== null) {
        nuevaFila.push({
          ...casilla,
          estado: 'solucion',
        })
      } else {
        nuevaFila.push({ ...casilla })
      }
    }

    nuevoTablero.push(nuevaFila)
  }

  return nuevoTablero
}

/**
 * Cuenta las casillas que el caballo sí puede usar.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @returns {number} Cantidad de casillas libres.
 */
export function contarCasillasLibres(tablero) {
  let total = 0

  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (!tablero[i][j].esObstaculo) {
        total++
      }
    }
  }

  return total
}

/**
 * Cuenta las casillas marcadas como obstáculos.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @returns {number} Cantidad de obstáculos.
 */
export function contarObstaculos(tablero) {
  let total = 0

  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (tablero[i][j].esObstaculo) {
        total++
      }
    }
  }

  return total
}

/**
 * Revisa que la posición exista dentro del tablero.
 *
 * @param {number} fila Fila a validar.
 * @param {number} columna Columna a validar.
 * @param {number} tamano Tamaño del tablero.
 * @returns {boolean} Verdadero si la posición existe.
 */
export function estaDentroDelTablero(fila, columna, tamano) {
  return fila >= 0 && fila < tamano && columna >= 0 && columna < tamano
}

/**
 * Busca los movimientos posibles desde una casilla.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @param {number} fila Fila actual.
 * @param {number} columna Columna actual.
 * @returns {Array<object>} Lista de movimientos válidos.
 */
export function obtenerMovimientosValidos(tablero, fila, columna) {
  const movimientosValidos = []
  const tamano = tablero.length

  for (let i = 0; i < movimientosCaballo.length; i++) {
    const nuevaFila = fila + movimientosCaballo[i][0]
    const nuevaColumna = columna + movimientosCaballo[i][1]

    if (
      estaDentroDelTablero(nuevaFila, nuevaColumna, tamano) &&
      !tablero[nuevaFila][nuevaColumna].esObstaculo
    ) {
      movimientosValidos.push({
        fila: nuevaFila,
        columna: nuevaColumna,
      })
    }
  }

  return movimientosValidos
}

/**
 * Revisa problemas evidentes antes de iniciar el algoritmo.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @returns {object} Resultado de la validación para la interfaz.
 */
export function validarTableroConObstaculos(tablero) {
  const totalLibres = contarCasillasLibres(tablero)

  if (totalLibres === 0) {
    return {
      tipo: 'error',
      mensaje: 'Debe existir al menos una casilla libre.',
    }
  }

  if (totalLibres === 1) {
    return {
      tipo: 'correcto',
      mensaje: 'Hay una sola casilla libre.',
    }
  }

  if (!validarColores(tablero)) {
    return {
      tipo: 'error',
      mensaje: 'Hay demasiadas casillas de un mismo color.',
    }
  }

  if (existeCasillaAislada(tablero)) {
    return {
      tipo: 'error',
      mensaje: 'Hay una casilla libre sin movimientos posibles.',
    }
  }

  if (!tableroConectado(tablero, totalLibres)) {
    return {
      tipo: 'error',
      mensaje: 'Los obstáculos separan el tablero.',
    }
  }

  return {
    tipo: 'correcto',
    mensaje: 'El tablero está listo para iniciar.',
  }
}

/**
 * Valida que los colores del tablero permitan alternancia de caballo.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @returns {boolean} Verdadero si la diferencia de colores no bloquea el recorrido.
 */
function validarColores(tablero) {
  let claras = 0
  let oscuras = 0

  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (!tablero[i][j].esObstaculo) {
        if ((i + j) % 2 === 0) {
          claras++
        } else {
          oscuras++
        }
      }
    }
  }

  return Math.abs(claras - oscuras) <= 1
}

/**
 * Busca si alguna casilla libre quedó sin movimientos posibles.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @returns {boolean} Verdadero si existe una casilla aislada.
 */
function existeCasillaAislada(tablero) {
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (!tablero[i][j].esObstaculo) {
        const movimientos = obtenerMovimientosValidos(tablero, i, j)

        if (movimientos.length === 0) {
          return true
        }
      }
    }
  }

  return false
}

/**
 * Recorre las casillas libres para saber si todas se conectan por saltos.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @param {number} totalLibres Cantidad de casillas libres.
 * @returns {boolean} Verdadero si todas las casillas libres están conectadas.
 */
function tableroConectado(tablero, totalLibres) {
  const inicio = buscarInicio(tablero)
  const visitadas = crearMatrizVisitadas(tablero.length)
  const cola = [inicio]
  let posicion = 0
  let totalVisitadas = 0

  visitadas[inicio.fila][inicio.columna] = true

  while (posicion < cola.length) {
    const actual = cola[posicion]
    const movimientos = obtenerMovimientosValidos(tablero, actual.fila, actual.columna)

    totalVisitadas++
    posicion++

    for (let i = 0; i < movimientos.length; i++) {
      const siguiente = movimientos[i]

      if (!visitadas[siguiente.fila][siguiente.columna]) {
        visitadas[siguiente.fila][siguiente.columna] = true
        cola.push(siguiente)
      }
    }
  }

  return totalVisitadas === totalLibres
}

/**
 * Busca la primera casilla libre del tablero.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @returns {object} Posición de inicio para la revisión.
 */
function buscarInicio(tablero) {
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (!tablero[i][j].esObstaculo) {
        return {
          fila: i,
          columna: j,
        }
      }
    }
  }

  return {
    fila: 0,
    columna: 0,
  }
}

/**
 * Crea una matriz para marcar casillas visitadas.
 *
 * @param {number} tamano Tamaño del tablero.
 * @returns {Array<Array<boolean>>} Matriz inicializada en falso.
 */
function crearMatrizVisitadas(tamano) {
  const visitadas = []

  for (let i = 0; i < tamano; i++) {
    const fila = []

    for (let j = 0; j < tamano; j++) {
      fila.push(false)
    }

    visitadas.push(fila)
  }

  return visitadas
}
