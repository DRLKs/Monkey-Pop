
import globo_img from '../assets/images/globos/globoAmarillo.webp';


function Globo(health) {
  return (
    <div className="globo">
      <img src={globo_img} alt="Globo" className="globo" />
    </div>
  );
}

export default Globo;