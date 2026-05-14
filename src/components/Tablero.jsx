import Casilla from './Casilla.jsx'

/**
 * Dibuja el tablero completo usando las casillas actuales.
 *
 * @param {object} props Propiedades del componente.
 * @param {boolean} props.estaEjecutando Indica si hay animación activa.
 * @param {Function} props.onCambiarObstaculo Función para marcar obstáculos.
 * @param {Array<Array<object>>} props.tablero Matriz del tablero.
 * @param {number} props.tamano Tamaño actual del tablero.
 * @returns {JSX.Element} Tablero renderizado.
 */
function Tablero({ estaEjecutando, onCambiarObstaculo, tablero, tamano }) {
  return (
    <div
      className="tablero"
      style={{ gridTemplateColumns: `repeat(${tamano}, minmax(0, 1fr))` }}
    >
      {tablero.map((fila) => {
        return fila.map((casilla) => {
          return (
            <Casilla
              casilla={casilla}
              estaEjecutando={estaEjecutando}
              key={`${casilla.fila}-${casilla.columna}`}
              onCambiarObstaculo={onCambiarObstaculo}
            />
          )
        })
      })}
    </div>
  )
}

export default Tablero
