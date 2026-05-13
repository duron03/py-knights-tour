import Casilla from './Casilla.jsx'

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
