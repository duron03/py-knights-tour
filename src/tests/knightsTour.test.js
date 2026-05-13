import assert from 'node:assert/strict'
import { resolverRecorridoCaballo } from '../algoritmos/knightsTour.js'
import {
  aplicarPasoAlTablero,
  aplicarPasosAlTablero,
  contarCasillasLibres,
  copiarTableroConObstaculo,
  crearTablero,
  limpiarRecorrido,
} from '../utils/tablero.js'

// Revisa que el resultado tenga una casilla por cada número del recorrido
function validarNumerosDelRecorrido(tablero, totalLibres) {
  const numeros = []
  const posiciones = []
  let caballos = 0

  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (tablero[i][j].orden !== null) {
        numeros.push(tablero[i][j].orden)
        posiciones[tablero[i][j].orden] = {
          fila: i,
          columna: j,
        }
      }

      if (tablero[i][j].tieneCaballo) {
        caballos++
      }
    }
  }

  numeros.sort((a, b) => a - b)
  assert.equal(numeros.length, totalLibres)
  assert.equal(caballos, 1)

  for (let i = 0; i < numeros.length; i++) {
    assert.equal(numeros[i], i + 1)
  }

  for (let i = 1; i < posiciones.length - 1; i++) {
    assert.equal(esSaltoCaballo(posiciones[i], posiciones[i + 1]), true)
  }
}

// Revisa que dos posiciones formen un movimiento de caballo
function esSaltoCaballo(origen, destino) {
  const diferenciaFila = Math.abs(origen.fila - destino.fila)
  const diferenciaColumna = Math.abs(origen.columna - destino.columna)

  return (
    (diferenciaFila === 2 && diferenciaColumna === 1) ||
    (diferenciaFila === 1 && diferenciaColumna === 2)
  )
}

// Aplica la lista de pasos como lo hace la interfaz
function crearTableroAnimado(tablero, pasos) {
  let tableroAnimado = limpiarRecorrido(tablero)

  for (let i = 0; i < pasos.length; i++) {
    tableroAnimado = aplicarPasoAlTablero(tableroAnimado, pasos[i])
  }

  return tableroAnimado
}

// Aplica los pasos sin animación, como el botón para saltarla
function crearTableroSinAnimacion(tablero, pasos) {
  const tableroLimpio = limpiarRecorrido(tablero)

  return aplicarPasosAlTablero(tableroLimpio, pasos)
}

// Prueba que el tablero 5x5 se pueda resolver y numerar completo
function probarTableroConSolucion() {
  const tablero = crearTablero(5)
  const resultado = resolverRecorridoCaballo(tablero)
  const tableroAnimado = crearTableroAnimado(tablero, resultado.pasos)
  const tableroSinAnimacion = crearTableroSinAnimacion(tablero, resultado.pasos)

  assert.equal(resultado.encontroSolucion, true)
  assert.equal(resultado.estadisticas.retrocesos >= 0, true)
  assert.equal(resultado.estadisticas.movimientosIntentados > 0, true)
  validarNumerosDelRecorrido(tableroAnimado, contarCasillasLibres(tablero))
  validarNumerosDelRecorrido(tableroSinAnimacion, contarCasillasLibres(tablero))
}

// Prueba que el tablero 4x4 quede detectado como no resuelto
function probarTableroSinSolucion() {
  const tablero = crearTablero(4)
  const resultado = resolverRecorridoCaballo(tablero)

  assert.equal(resultado.encontroSolucion, false)
  assert.equal(resultado.estadisticas.movimientosIntentados > 0, true)
  assert.equal(resultado.estadisticas.retrocesos > 0, true)
}

// Prueba que los obstáculos no se pierdan durante la animación
function probarObstaculos() {
  let tablero = crearTablero(5)

  tablero = copiarTableroConObstaculo(tablero, 0, 0)
  tablero = copiarTableroConObstaculo(tablero, 2, 2)

  const resultado = resolverRecorridoCaballo(tablero)
  const tableroAnimado = crearTableroAnimado(tablero, resultado.pasos)

  assert.equal(tableroAnimado[0][0].esObstaculo, true)
  assert.equal(tableroAnimado[2][2].esObstaculo, true)
}

probarTableroConSolucion()
probarTableroSinSolucion()
probarObstaculos()
