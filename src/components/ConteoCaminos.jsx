/**
 * Muestra el formulario para contar caminos con programación dinámica.
 *
 * @param {object} props Propiedades del componente.
 * @param {object} props.datosConteo Datos de origen, destino y K.
 * @param {boolean} props.estaEjecutando Indica si el recorrido está animándose.
 * @param {Function} props.onCalcularConteo Función para ejecutar el conteo.
 * @param {Function} props.onCambiarDatoConteo Función para actualizar datos.
 * @param {object} props.resultadoConteo Resultado mostrado al usuario.
 * @param {number} props.tamano Tamaño actual del tablero.
 * @returns {JSX.Element} Panel de conteo de caminos.
 */
function ConteoCaminos({
  datosConteo,
  estaEjecutando,
  onCalcularConteo,
  onCambiarDatoConteo,
  resultadoConteo,
  tamano,
}) {
  /**
   * Lee un input numérico y actualiza el dato correspondiente.
   *
   * @param {object} evento Evento del input.
   * @returns {void}
   */
  function cambiarDato(evento) {
    const numero = parseInt(evento.target.value, 10)

    onCambiarDatoConteo(evento.target.name, Number.isNaN(numero) ? 0 : numero)
  }

  return (
    <section className="panel">
      <h2>Conteo de caminos</h2>

      <div className="grupo-doble">
        <label htmlFor="origen-fila">
          Origen fila
          <input
            disabled={estaEjecutando}
            id="origen-fila"
            max={tamano}
            min="1"
            name="origenFila"
            onChange={cambiarDato}
            type="number"
            value={datosConteo.origenFila}
          />
        </label>

        <label htmlFor="origen-columna">
          Origen columna
          <input
            disabled={estaEjecutando}
            id="origen-columna"
            max={tamano}
            min="1"
            name="origenColumna"
            onChange={cambiarDato}
            type="number"
            value={datosConteo.origenColumna}
          />
        </label>
      </div>

      <div className="grupo-doble">
        <label htmlFor="destino-fila">
          Destino fila
          <input
            disabled={estaEjecutando}
            id="destino-fila"
            max={tamano}
            min="1"
            name="destinoFila"
            onChange={cambiarDato}
            type="number"
            value={datosConteo.destinoFila}
          />
        </label>

        <label htmlFor="destino-columna">
          Destino columna
          <input
            disabled={estaEjecutando}
            id="destino-columna"
            max={tamano}
            min="1"
            name="destinoColumna"
            onChange={cambiarDato}
            type="number"
            value={datosConteo.destinoColumna}
          />
        </label>
      </div>

      <label htmlFor="movimientos-k">
        K movimientos
        <input
          disabled={estaEjecutando}
          id="movimientos-k"
          min="0"
          name="movimientos"
          onChange={cambiarDato}
          type="number"
          value={datosConteo.movimientos}
        />
      </label>

      <button disabled={estaEjecutando} onClick={onCalcularConteo} type="button">
        Calcular caminos
      </button>

      <p className="mensaje">
        Caminos encontrados: {resultadoConteo.total}
        <br />
        Tiempo: {resultadoConteo.tiempo} ms
        <br />
        {resultadoConteo.mensaje}
      </p>
    </section>
  )
}

export default ConteoCaminos
