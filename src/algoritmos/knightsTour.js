import { contarCasillasLibres, estaDentroDelTablero } from '../utils/tablero.js'

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
 * Resuelve el recorrido del caballo usando backtracking.
 *
 * @param {Array<Array<object>>} tablero Tablero con obstáculos configurados.
 * @returns {object} Resultado con pasos, estadísticas y mensaje.
 */
export function resolverRecorridoCaballo(tablero) {
  const tiempoInicio = Date.now()
  const tableroNumerico = crearTableroNumerico(tablero)
  const inicio = buscarPrimeraCasillaLibre(tableroNumerico)
  const totalLibres = contarCasillasLibres(tablero)
  const pasos = []
  const estadisticas = {
    movimientosIntentados: 0,
    retrocesos: 0,
    tiempo: 0,
  }

  if (inicio === null) {
    estadisticas.tiempo = Date.now() - tiempoInicio

    return {
      encontroSolucion: false,
      pasos,
      estadisticas,
      mensaje: 'No hay casillas libres para iniciar.',
    }
  }

  tableroNumerico[inicio.fila][inicio.columna] = 1
  pasos.push({
    tipo: 'avance',
    fila: inicio.fila,
    columna: inicio.columna,
    orden: 1,
  })

  const solucion = recorridoCaballo(
    tableroNumerico,
    inicio.fila,
    inicio.columna,
    2,
    totalLibres,
    pasos,
    estadisticas,
  )

  if (!solucion) {
    tableroNumerico[inicio.fila][inicio.columna] = 0
    estadisticas.retrocesos++
    pasos.push({
      tipo: 'retroceso',
      fila: inicio.fila,
      columna: inicio.columna,
      orden: 1,
    })
  }

  estadisticas.tiempo = Date.now() - tiempoInicio

  return {
    encontroSolucion: solucion,
    pasos,
    estadisticas,
    mensaje: solucion ? 'Se encontró un recorrido.' : 'No se encontró un recorrido.',
  }
}

/**
 * Función recursiva principal del backtracking.
 *
 * @param {Array<Array<number>>} tablero Tablero numérico usado por el algoritmo.
 * @param {number} fila Fila actual del caballo.
 * @param {number} columna Columna actual del caballo.
 * @param {number} orden Número de visita que se intenta colocar.
 * @param {number} totalLibres Cantidad de casillas que deben visitarse.
 * @param {Array<object>} pasos Lista de pasos para animar el proceso.
 * @param {object} estadisticas Contadores del proceso.
 * @returns {boolean} Verdadero si encuentra una solución.
 */
function recorridoCaballo(tablero, fila, columna, orden, totalLibres, pasos, estadisticas) {
  if (orden > totalLibres) {
    return true
  }

  for (let i = 0; i < movimientosCaballo.length; i++) {
    const nuevaFila = fila + movimientosCaballo[i][0]
    const nuevaColumna = columna + movimientosCaballo[i][1]

    estadisticas.movimientosIntentados++

    if (validarMovimiento(tablero, nuevaFila, nuevaColumna)) {
      tablero[nuevaFila][nuevaColumna] = orden
      pasos.push({
        tipo: 'avance',
        fila: nuevaFila,
        columna: nuevaColumna,
        orden,
      })

      const recursion = recorridoCaballo(
        tablero,
        nuevaFila,
        nuevaColumna,
        orden + 1,
        totalLibres,
        pasos,
        estadisticas,
      )

      if (recursion) {
        return true
      }

      tablero[nuevaFila][nuevaColumna] = 0
      estadisticas.retrocesos++
      pasos.push({
        tipo: 'retroceso',
        fila: nuevaFila,
        columna: nuevaColumna,
        caballoFila: fila,
        caballoColumna: columna,
        orden,
      })
    }
  }

  return false
}

/**
 * Revisa si el caballo puede caer en la casilla indicada.
 *
 * @param {Array<Array<number>>} tablero Tablero numérico.
 * @param {number} fila Fila que se desea revisar.
 * @param {number} columna Columna que se desea revisar.
 * @returns {boolean} Verdadero si el movimiento es válido.
 */
function validarMovimiento(tablero, fila, columna) {
  return estaDentroDelTablero(fila, columna, tablero.length) && tablero[fila][columna] === 0
}

/**
 * Convierte el tablero de objetos a números para trabajar más fácil.
 *
 * @param {Array<Array<object>>} tablero Tablero de la interfaz.
 * @returns {Array<Array<number>>} Tablero numérico para backtracking.
 */
function crearTableroNumerico(tablero) {
  const tableroNumerico = []

  for (let i = 0; i < tablero.length; i++) {
    const fila = []

    for (let j = 0; j < tablero[i].length; j++) {
      if (tablero[i][j].esObstaculo) {
        fila.push(-1)
      } else {
        fila.push(0)
      }
    }

    tableroNumerico.push(fila)
  }

  return tableroNumerico
}

/**
 * Busca la primera casilla libre para iniciar el recorrido.
 *
 * @param {Array<Array<number>>} tablero Tablero numérico.
 * @returns {object|null} Posición inicial o null si no existe.
 */
function buscarPrimeraCasillaLibre(tablero) {
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (tablero[i][j] === 0) {
        return {
          fila: i,
          columna: j,
        }
      }
    }
  }

  return null
}
