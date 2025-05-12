import React from 'react';
import '../../styles/tutorial/protip.css'; // Asegúrate de tener un archivo CSS para los estilos

// Imagenes
import proTipBombilla from '../../assets/images/tutorial/proTip.png';


/**
 * Componente ProTips que muestra un mensaje de tip profesional
 * @param {Object} props - Propiedades del componente
 * @param {string} props.message - El mensaje a mostrar como tip profesional
 * @param {string} [props.title="Pro Tip"] - El título del tip (opcional)
 * @returns {JSX.Element} El componente ProTips
 */
function ProTip({ message, title = "Pro-Tip" }) {
  return (
    <div className="pro-tip">
      <div className="pro-tip-header">
        <div className="pro-tip-icon">
          <img src={proTipBombilla} alt="Pro Tip" />
        </div>
        <h2>{title}</h2>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default ProTip;