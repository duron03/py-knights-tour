import assert from 'node:assert/strict'
import { contarCaminosCaballo } from '../algoritmos/conteoCaminos.js'
import { copiarTableroConObstaculo, crearTablero } from '../utils/tablero.js'

/**
 * Prueba el caso base cuando K es cero.
 *
 * @returns {void}
 */
function probarCeroMovimientos() {
  const tablero = crearTablero(4)
  const origen = { fila: 0, columna: 0 }
  const mismoDestino = { fila: 0, columna: 0 }
  const otroDestino = { fila: 1, columna: 2 }

  const resultadoMismo = contarCaminosCaballo(tablero, origen, mismoDestino, 0)
  const resultadoOtro = contarCaminosCaballo(tablero, origen, otroDestino, 0)

  assert.equal(resultadoMismo.total, 1)
  assert.equal(resultadoOtro.total, 0)
}

/**
 * Prueba un salto directo del caballo.
 *
 * @returns {void}
 */
function probarUnMovimiento() {
  const tablero = crearTablero(4)
  const origen = { fila: 0, columna: 0 }
  const destino = { fila: 1, columna: 2 }
  const resultado = contarCaminosCaballo(tablero, origen, destino, 1)

  assert.equal(resultado.total, 1)
}

/**
 * Prueba los dos caminos para volver al origen en dos movimientos.
 *
 * @returns {void}
 */
function probarDosMovimientos() {
  const tablero = crearTablero(4)
  const origen = { fila: 0, columna: 0 }
  const destino = { fila: 0, columna: 0 }
  const resultado = contarCaminosCaballo(tablero, origen, destino, 2)

  assert.equal(resultado.total, 2)
}

/**
 * Prueba que los obstáculos bloqueen el conteo.
 *
 * @returns {void}
 */
function probarObstaculos() {
  let tablero = crearTablero(4)

  tablero = copiarTableroConObstaculo(tablero, 1, 2)

  const origen = { fila: 0, columna: 0 }
  const destino = { fila: 1, columna: 2 }
  const resultado = contarCaminosCaballo(tablero, origen, destino, 1)

  assert.equal(resultado.total, 0)
}

/**
 * Prueba que un K inválido no ejecute el conteo.
 *
 * @returns {void}
 */
function probarMovimientosInvalidos() {
  const tablero = crearTablero(4)
  const origen = { fila: 0, columna: 0 }
  const destino = { fila: 1, columna: 2 }
  const resultado = contarCaminosCaballo(tablero, origen, destino, -1)

  assert.equal(resultado.total, 0)
}

probarCeroMovimientos()
probarUnMovimiento()
probarDosMovimientos()
probarObstaculos()
probarMovimientosInvalidos()
