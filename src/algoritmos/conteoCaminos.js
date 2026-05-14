import { estaDentroDelTablero } from '../utils/tablero.js'

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
 * Cuenta caminos de A a B en exactamente K movimientos con programación dinámica.
 *
 * @param {Array<Array<object>>} tablero Tablero con obstáculos configurados.
 * @param {object} origen Casilla inicial.
 * @param {object} destino Casilla final.
 * @param {number} movimientos Cantidad exacta de movimientos.
 * @returns {object} Resultado del conteo con total, tiempo y mensaje.
 */
export function contarCaminosCaballo(tablero, origen, destino, movimientos) {
  const tiempoInicio = Date.now()
  const validacion = validarDatosConteo(tablero, origen, destino, movimientos)

  if (!validacion.esValido) {
    return {
      total: 0,
      tiempo: Date.now() - tiempoInicio,
      mensaje: validacion.mensaje,
    }
  }

  let anterior = crearMatrizCeros(tablero.length)

  anterior[origen.fila][origen.columna] = 1

  for (let paso = 1; paso <= movimientos; paso++) {
    const actual = crearMatrizCeros(tablero.length)

    for (let fila = 0; fila < tablero.length; fila++) {
      for (let columna = 0; columna < tablero.length; columna++) {
        if (anterior[fila][columna] > 0) {
          sumarMovimientos(tablero, actual, anterior, fila, columna)
        }
      }
    }

    anterior = actual
  }

  return {
    total: anterior[destino.fila][destino.columna],
    tiempo: Date.now() - tiempoInicio,
    mensaje: 'Conteo calculado con programación dinámica.',
  }
}

/**
 * Suma los caminos que salen desde una casilla en el siguiente movimiento.
 *
 * @param {Array<Array<object>>} tablero Tablero con obstáculos.
 * @param {Array<Array<number>>} actual Matriz del paso que se está calculando.
 * @param {Array<Array<number>>} anterior Matriz del paso anterior.
 * @param {number} fila Fila actual.
 * @param {number} columna Columna actual.
 * @returns {void}
 */
function sumarMovimientos(tablero, actual, anterior, fila, columna) {
  for (let i = 0; i < movimientosCaballo.length; i++) {
    const nuevaFila = fila + movimientosCaballo[i][0]
    const nuevaColumna = columna + movimientosCaballo[i][1]

    if (
      estaDentroDelTablero(nuevaFila, nuevaColumna, tablero.length) &&
      !tablero[nuevaFila][nuevaColumna].esObstaculo
    ) {
      actual[nuevaFila][nuevaColumna] += anterior[fila][columna]
    }
  }
}

/**
 * Revisa que origen, destino y K sean válidos.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @param {object} origen Casilla inicial.
 * @param {object} destino Casilla final.
 * @param {number} movimientos Cantidad exacta de movimientos.
 * @returns {object} Resultado de validación.
 */
function validarDatosConteo(tablero, origen, destino, movimientos) {
  if (!Number.isInteger(movimientos) || movimientos < 0) {
    return {
      esValido: false,
      mensaje: 'K debe ser un número entero mayor o igual a cero.',
    }
  }

  if (!posicionValida(tablero, origen) || !posicionValida(tablero, destino)) {
    return {
      esValido: false,
      mensaje: 'Origen y destino deben estar dentro del tablero.',
    }
  }

  if (tablero[origen.fila][origen.columna].esObstaculo) {
    return {
      esValido: false,
      mensaje: 'El origen no puede ser un obstáculo.',
    }
  }

  if (tablero[destino.fila][destino.columna].esObstaculo) {
    return {
      esValido: false,
      mensaje: 'El destino no puede ser un obstáculo.',
    }
  }

  return {
    esValido: true,
    mensaje: '',
  }
}

/**
 * Revisa si la posición existe dentro del tablero.
 *
 * @param {Array<Array<object>>} tablero Tablero actual.
 * @param {object} posicion Posición que se desea revisar.
 * @returns {boolean} Verdadero si la posición existe.
 */
function posicionValida(tablero, posicion) {
  return estaDentroDelTablero(posicion.fila, posicion.columna, tablero.length)
}

/**
 * Crea una matriz numérica inicializada en cero.
 *
 * @param {number} tamano Tamaño de la matriz.
 * @returns {Array<Array<number>>} Matriz de ceros.
 */
function crearMatrizCeros(tamano) {
  const matriz = []

  for (let i = 0; i < tamano; i++) {
    const fila = []

    for (let j = 0; j < tamano; j++) {
      fila.push(0)
    }

    matriz.push(fila)
  }

  return matriz
}
