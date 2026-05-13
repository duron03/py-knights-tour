import { useEffect, useRef, useState } from 'react'
import './App.css'
import { contarCaminosCaballo } from './algoritmos/conteoCaminos.js'
import { resolverRecorridoCaballo } from './algoritmos/knightsTour.js'
import ConteoCaminos from './components/ConteoCaminos.jsx'
import Controles from './components/Controles.jsx'
import PanelEstadisticas from './components/PanelEstadisticas.jsx'
import Tablero from './components/Tablero.jsx'
import {
  TAMANO_MAXIMO,
  TAMANO_MINIMO,
  aplicarPasoAlTablero,
  aplicarPasosAlTablero,
  contarCasillasLibres,
  contarObstaculos,
  copiarTableroConObstaculo,
  crearTablero,
  limpiarObstaculos,
  limpiarRecorrido,
  validarTableroConObstaculos,
} from './utils/tablero.js'

const TAMANO_INICIAL = 5
const TIEMPO_ANIMACION = 20
const MENSAJE_INICIAL = 'Configure el tablero y presione iniciar.'
const MENSAJE_CONTEO = 'Ingrese origen, destino y K.'

function crearEstadisticasVacias() {
  return {
    movimientosIntentados: 0,
    retrocesos: 0,
    tiempo: 0,
  }
}

function crearDatosConteo(tamano) {
  return {
    origenFila: 1,
    origenColumna: 1,
    destinoFila: tamano,
    destinoColumna: tamano,
    movimientos: 3,
  }
}

function crearResultadoConteoVacio() {
  return {
    total: 0,
    tiempo: 0,
    mensaje: MENSAJE_CONTEO,
  }
}

function App() {
  const [tamano, setTamano] = useState(TAMANO_INICIAL)
  const [tablero, setTablero] = useState(() => crearTablero(TAMANO_INICIAL))
  const [estaEjecutando, setEstaEjecutando] = useState(false)
  const [estadisticas, setEstadisticas] = useState(() => crearEstadisticasVacias())
  const [mensajeRecorrido, setMensajeRecorrido] = useState(MENSAJE_INICIAL)
  const [datosConteo, setDatosConteo] = useState(() => crearDatosConteo(TAMANO_INICIAL))
  const [resultadoConteo, setResultadoConteo] = useState(() => crearResultadoConteoVacio())
  const animacion = useRef(null)
  const resultadoAnimacion = useRef(null)
  const tableroAnimacion = useRef(null)

  const cantidadObstaculos = contarObstaculos(tablero)
  const cantidadLibres = contarCasillasLibres(tablero)
  const validacionTablero = validarTableroConObstaculos(tablero)
  const puedeIniciar = validacionTablero.tipo === 'correcto' && !estaEjecutando

  useEffect(() => {
    return () => {
      if (animacion.current !== null) {
        clearInterval(animacion.current)
      }
    }
  }, [])

  // Detiene la animación actual si existe
  function detenerAnimacion() {
    if (animacion.current !== null) {
      clearInterval(animacion.current)
      animacion.current = null
    }
  }

  // Cambia el tamaño y reinicia el tablero
  function cambiarTamano(nuevoTamano) {
    if (estaEjecutando) {
      return
    }

    const numero = Number(nuevoTamano)

    if (numero < TAMANO_MINIMO || numero > TAMANO_MAXIMO) {
      return
    }

    setTamano(numero)
    setTablero(crearTablero(numero))
    setEstadisticas(crearEstadisticasVacias())
    setMensajeRecorrido(MENSAJE_INICIAL)
    setDatosConteo(crearDatosConteo(numero))
    setResultadoConteo(crearResultadoConteoVacio())
    resultadoAnimacion.current = null
    tableroAnimacion.current = null
  }

  // Marca o quita un obstáculo
  function cambiarObstaculo(fila, columna) {
    if (estaEjecutando) {
      return
    }

    setTablero((tableroActual) => {
      const tableroLimpio = limpiarRecorrido(tableroActual)

      return copiarTableroConObstaculo(tableroLimpio, fila, columna)
    })
    setEstadisticas(crearEstadisticasVacias())
    setMensajeRecorrido(MENSAJE_INICIAL)
    setResultadoConteo(crearResultadoConteoVacio())
    resultadoAnimacion.current = null
    tableroAnimacion.current = null
  }

  // Deja el tablero sin obstáculos
  function reiniciarObstaculos() {
    if (estaEjecutando) {
      return
    }

    setTablero((tableroActual) => {
      return limpiarObstaculos(tableroActual)
    })
    setEstadisticas(crearEstadisticasVacias())
    setMensajeRecorrido(MENSAJE_INICIAL)
    setResultadoConteo(crearResultadoConteoVacio())
    resultadoAnimacion.current = null
    tableroAnimacion.current = null
  }

  // Limpia solo el recorrido encontrado o intentado
  function reiniciarRecorrido() {
    if (estaEjecutando) {
      return
    }

    setTablero((tableroActual) => {
      return limpiarRecorrido(tableroActual)
    })
    setEstadisticas(crearEstadisticasVacias())
    setMensajeRecorrido(MENSAJE_INICIAL)
    resultadoAnimacion.current = null
    tableroAnimacion.current = null
  }

  // Actualiza los datos usados para el conteo de caminos
  function cambiarDatoConteo(nombre, valor) {
    setDatosConteo((datosActuales) => {
      return {
        ...datosActuales,
        [nombre]: valor,
      }
    })
    setResultadoConteo(crearResultadoConteoVacio())
  }

  // Calcula cuántos caminos llegan al destino en K movimientos
  function calcularConteoCaminos() {
    if (estaEjecutando) {
      return
    }

    const origen = {
      fila: datosConteo.origenFila - 1,
      columna: datosConteo.origenColumna - 1,
    }
    const destino = {
      fila: datosConteo.destinoFila - 1,
      columna: datosConteo.destinoColumna - 1,
    }

    const resultado = contarCaminosCaballo(
      tablero,
      origen,
      destino,
      datosConteo.movimientos,
    )

    setResultadoConteo(resultado)
  }

  // Ejecuta el algoritmo y luego muestra los pasos en pantalla
  function iniciarRecorrido() {
    if (!puedeIniciar) {
      setMensajeRecorrido(validacionTablero.mensaje)
      return
    }

    detenerAnimacion()

    const tableroLimpio = limpiarRecorrido(tablero)
    const resultado = resolverRecorridoCaballo(tableroLimpio)
    let posicion = 0

    resultadoAnimacion.current = resultado
    tableroAnimacion.current = tableroLimpio
    setTablero(tableroLimpio)
    setEstadisticas(resultado.estadisticas)
    setMensajeRecorrido('Ejecutando recorrido...')
    setEstaEjecutando(true)

    animacion.current = setInterval(() => {
      const paso = resultado.pasos[posicion]

      setTablero((tableroActual) => {
        return aplicarPasoAlTablero(tableroActual, paso)
      })

      posicion++

      if (posicion >= resultado.pasos.length) {
        detenerAnimacion()
        setEstaEjecutando(false)
        setMensajeRecorrido(resultado.mensaje)
      }
    }, TIEMPO_ANIMACION)
  }

  // Detiene la animación y muestra de una vez el tablero final
  function saltarAnimacion() {
    if (resultadoAnimacion.current === null || tableroAnimacion.current === null) {
      return
    }

    detenerAnimacion()
    setTablero(aplicarPasosAlTablero(tableroAnimacion.current, resultadoAnimacion.current.pasos))
    setEstaEjecutando(false)
    setMensajeRecorrido(resultadoAnimacion.current.mensaje)
  }

  return (
    <main className="aplicacion">
      <header className="encabezado">
        <h1>Recorrido del Caballo</h1>
        <p>Paso 3: programación dinámica</p>
      </header>

      <section className="zona-trabajo">
        <aside className="panel-lateral">
          <Controles
            cantidadObstaculos={cantidadObstaculos}
            estaEjecutando={estaEjecutando}
            onCambiarTamano={cambiarTamano}
            onIniciarRecorrido={iniciarRecorrido}
            onLimpiarObstaculos={reiniciarObstaculos}
            onReiniciarRecorrido={reiniciarRecorrido}
            onSaltarAnimacion={saltarAnimacion}
            puedeIniciar={puedeIniciar}
            tamano={tamano}
          />

          <PanelEstadisticas
            cantidadLibres={cantidadLibres}
            cantidadObstaculos={cantidadObstaculos}
            estaEjecutando={estaEjecutando}
            estadisticas={estadisticas}
            mensajeRecorrido={mensajeRecorrido}
            tamano={tamano}
            validacionTablero={validacionTablero}
          />

          <ConteoCaminos
            datosConteo={datosConteo}
            estaEjecutando={estaEjecutando}
            onCalcularConteo={calcularConteoCaminos}
            onCambiarDatoConteo={cambiarDatoConteo}
            resultadoConteo={resultadoConteo}
            tamano={tamano}
          />
        </aside>

        <section className="zona-tablero">
          <Tablero
            estaEjecutando={estaEjecutando}
            onCambiarObstaculo={cambiarObstaculo}
            tablero={tablero}
            tamano={tamano}
          />
        </section>
      </section>
    </main>
  )
}

export default App
