import React from 'react';
import '../styles/finJuego.css';

/**
 * Componente que muestra la pantalla de fin de juego
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.visible - Indica si el componente debe mostrarse
 * @param {Object} props.estadisticas - Estadísticas del juego
 * @param {number} props.estadisticas.ronda - Ronda alcanzada
 * @param {number} props.estadisticas.monedas - Monedas obtenidas
 * @param {number} props.estadisticas.tiempoJugado - Tiempo jugado en segundos
 * @param {number} props.estadisticas.globosExplotados - Cantidad de globos explotados
 * @param {function} props.onReiniciar - Función para reiniciar el juego
 * @returns {JSX.Element}
 */
const FinJuego = ({ visible, estadisticas, onReiniciar }) => {
  if (!visible) return null;

  return (
    <div className="fin-juego-overlay">
      <div className="fin-juego-contenedor">
        <h1 className="fin-juego-titulo">Partida Finalizada</h1>
        
        <div className="fin-juego-estadisticas">
          <div className="estadistica">
            <span className="etiqueta">Ronda alcanzada:</span>
            <span className="valor">{estadisticas.ronda}</span>
          </div>
          
          <div className="estadistica">
            <span className="etiqueta">Monedas obtenidas:</span>
            <span className="valor">{estadisticas.monedas}</span>
          </div>
          
          <div className="estadistica">
            <span className="etiqueta">Tiempo jugado:</span>
            <span className="valor">
              {Math.floor(estadisticas.tiempoJugado / 60)}m {estadisticas.tiempoJugado % 60}s
            </span>
          </div>
          
          <div className="estadistica">
            <span className="etiqueta">Globos explotados:</span>
            <span className="valor">{estadisticas.globosExplotados}</span>
          </div>
          
        </div>
        
        <button className="fin-juego-boton" onClick={onReiniciar}>
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
};

export default FinJuego;