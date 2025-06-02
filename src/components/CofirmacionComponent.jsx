/**
 * Pop-Up de confirmación para acciones críticas
 * @param {string} param0.msg - Mensaje a mostrar en el componente de confirmación
 * @param {string} param0.msgAccion - Mensaje del botón de acción 
 * @param {function} param0.funcion - Función a ejecutar al confirmar
 * @param {function} param0.onClose - Función para cerrar el componente ante la confirmación
 * @returns 
 */
function ConfirmacionComponent({ msg, msgAccion, funcion, onClose }) {
  
  
    return (
    <div className="confirmacion-overlay">
      <div className="confirmacion-container">
          <div className="confirmacion-titulo" >
            <h2> {msg} </h2>
          </div>
          {/* Botón para confirmar la acción, ejecuta la función proporcionada */}
          <button onClick={funcion}>{msgAccion}</button>
          {/* Botón para cancelar la acción, cierra el Pop-Up */}
          <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default ConfirmacionComponent;