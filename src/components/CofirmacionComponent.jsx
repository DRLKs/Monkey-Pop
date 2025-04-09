
function ConfirmacionComponent({ msg, msgAccion, funcion, onClose }) {
  
  
    return (
    <div className="confirmacion-overlay">
      <div className="confirmacion-container">
          <div className="confirmacion-titulo" >
            <h2> {msg} </h2>
          </div>
          <button onClick={funcion}>{msgAccion}</button>
          <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default ConfirmacionComponent;