import React from 'react';
import '../styles/orientationWarning.css';
import iconoRotar from '../assets/images/ui/rotate-phone.png'; // Asegúrate de añadir este ícono

function OrientationWarning() {
  return (
    <div className="orientation-overlay">
      <div className="orientation-container">
        <img src={iconoRotar} alt="Rotar dispositivo" className="rotate-icon" />
        <h2>¡Gira tu dispositivo!</h2>
        <p>Para disfrutar de Monkey Pop, por favor utiliza tu dispositivo en modo horizontal.</p>
      </div>
    </div>
  );
}

export default OrientationWarning;