function PanelEstadisticas({
  cantidadLibres,
  cantidadObstaculos,
  estaEjecutando,
  estadisticas,
  mensajeRecorrido,
  tamano,
  validacionTablero,
}) {
  return (
    <section className="panel">
      <h2>Estado del tablero</h2>

      <p>Dimensión: {tamano} x {tamano}</p>
      <p>Casillas libres: {cantidadLibres}</p>
      <p>Obstáculos: {cantidadObstaculos}</p>
      <p>Movimientos intentados: {estadisticas.movimientosIntentados}</p>
      <p>Retrocesos: {estadisticas.retrocesos}</p>
      <p>Tiempo: {estadisticas.tiempo} ms</p>

      <p className={`mensaje ${validacionTablero.tipo}`}>
        {validacionTablero.mensaje}
      </p>

      <p className="mensaje">{estaEjecutando ? 'Animando recorrido...' : mensajeRecorrido}</p>
    </section>
  )
}

export default PanelEstadisticas
