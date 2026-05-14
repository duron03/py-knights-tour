/**
 * Muestra el estado del tablero y las estadísticas del recorrido.
 *
 * @param {object} props Propiedades del componente.
 * @param {number} props.cantidadLibres Cantidad de casillas libres.
 * @param {number} props.cantidadObstaculos Cantidad de obstáculos.
 * @param {boolean} props.estaEjecutando Indica si hay animación activa.
 * @param {object} props.estadisticas Estadísticas del backtracking.
 * @param {string} props.mensajeRecorrido Mensaje del recorrido.
 * @param {number} props.tamano Tamaño actual del tablero.
 * @param {object} props.validacionTablero Resultado de validación.
 * @returns {JSX.Element} Panel de estadísticas.
 */
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
