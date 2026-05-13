/**
 * Dibuja una casilla del tablero y permite marcar obstáculos.
 *
 * @param {object} props Propiedades del componente.
 * @param {object} props.casilla Datos de la casilla.
 * @param {boolean} props.estaEjecutando Indica si hay animación activa.
 * @param {Function} props.onCambiarObstaculo Función para cambiar obstáculos.
 * @returns {JSX.Element} Casilla del tablero.
 */
function Casilla({ casilla, estaEjecutando, onCambiarObstaculo }) {
  let claseColor = 'casilla clara'
  let texto = ''

  if ((casilla.fila + casilla.columna) % 2 !== 0) {
    claseColor = 'casilla oscura'
  }

  if (casilla.esObstaculo) {
    claseColor += ' obstaculo'
  }

  if (casilla.estado === 'avance') {
    claseColor += ' avance'
  }

  if (casilla.estado === 'retroceso') {
    claseColor += ' retroceso'
  }

  if (casilla.estado === 'solucion') {
    claseColor += ' solucion'
  }

  if (casilla.esObstaculo) {
    texto = 'X'
  } else if (casilla.orden !== null) {
    texto = casilla.orden
  }

  /**
   * Avisa cuál casilla fue seleccionada.
   *
   * @returns {void}
   */
  function marcarCasilla() {
    onCambiarObstaculo(casilla.fila, casilla.columna)
  }

  return (
    <button
      className={claseColor}
      disabled={estaEjecutando}
      onClick={marcarCasilla}
      type="button"
    >
      <span className="numero-casilla">{texto}</span>
      {casilla.tieneCaballo && <span className="caballo">&#9822;</span>}
    </button>
  )
}

export default Casilla
