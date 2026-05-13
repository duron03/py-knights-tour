import { TAMANO_MAXIMO, TAMANO_MINIMO } from '../utils/tablero.js'

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
