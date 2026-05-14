import { TAMANO_MAXIMO, TAMANO_MINIMO } from '../utils/tablero.js'

/**
 * Muestra los controles generales del tablero y recorrido.
 *
 * @param {object} props Propiedades del componente.
 * @param {number} props.cantidadObstaculos Cantidad de obstáculos.
 * @param {boolean} props.estaEjecutando Indica si hay animación activa.
 * @param {Function} props.onCambiarTamano Función para cambiar tamaño.
 * @param {Function} props.onIniciarRecorrido Función para iniciar backtracking.
 * @param {Function} props.onLimpiarObstaculos Función para limpiar obstáculos.
 * @param {Function} props.onReiniciarRecorrido Función para limpiar recorrido.
 * @param {Function} props.onSaltarAnimacion Función para saltar animación.
 * @param {boolean} props.puedeIniciar Indica si se puede iniciar.
 * @param {number} props.tamano Tamaño actual del tablero.
 * @returns {JSX.Element} Panel de controles.
 */
function Controles({
  cantidadObstaculos,
  estaEjecutando,
  onCambiarTamano,
  onIniciarRecorrido,
  onLimpiarObstaculos,
  onReiniciarRecorrido,
  onSaltarAnimacion,
  puedeIniciar,
  tamano,
}) {
  /**
   * Lee el tamaño elegido por el usuario.
   *
   * @param {object} evento Evento del input.
   * @returns {void}
   */
  function manejarCambioTamano(evento) {
    onCambiarTamano(parseInt(evento.target.value, 10))
  }

  return (
    <section className="panel">
      <h2>Configuración</h2>

      <label htmlFor="tamano-tablero">
        Tamaño del tablero: {tamano} x {tamano}
      </label>

      <input
        id="tamano-tablero"
        disabled={estaEjecutando}
        max={TAMANO_MAXIMO}
        min={TAMANO_MINIMO}
        onChange={manejarCambioTamano}
        step="1"
        type="range"
        value={tamano}
      />

      <div className="limites">
        <span>{TAMANO_MINIMO} x {TAMANO_MINIMO}</span>
        <span>{TAMANO_MAXIMO} x {TAMANO_MAXIMO}</span>
      </div>

      <button disabled={!puedeIniciar} onClick={onIniciarRecorrido} type="button">
        Iniciar recorrido
      </button>

      <button disabled={!estaEjecutando} onClick={onSaltarAnimacion} type="button">
        Saltar animación
      </button>

      <button disabled={estaEjecutando} onClick={onReiniciarRecorrido} type="button">
        Limpiar recorrido
      </button>

      <button
        disabled={cantidadObstaculos === 0 || estaEjecutando}
        onClick={onLimpiarObstaculos}
        type="button"
      >
        Limpiar obstáculos
      </button>
    </section>
  )
}

export default Controles
