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

// Resuelve el recorrido del caballo usando backtracking
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

// Función recursiva principal del backtracking
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

// Revisa si el caballo puede caer en la casilla indicada
function validarMovimiento(tablero, fila, columna) {
  return estaDentroDelTablero(fila, columna, tablero.length) && tablero[fila][columna] === 0
}

// Convierte el tablero de objetos a números para trabajar más fácil
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

// Busca la primera casilla libre para iniciar el recorrido
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
