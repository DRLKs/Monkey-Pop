import React from 'react';

// Importar imágenes de globos Habrá que ponerlo mejor en un futuro
import globoFuxia1 from '../assets/images/globos/globo_fuxia1.webp';  
import globoRosa1 from '../assets/images/globos/globo_rosa1.webp';
import globoMorado1 from '../assets/images/globos/globo_morado1.webp';
import globoAzul1 from '../assets/images/globos/globo_azul1.webp';
import globoVerde1 from '../assets/images/globos/globo_verde1.webp';
import globoCeleste1 from '../assets/images/globos/globo_celeste1.webp';

import globoRojo from '../assets/images/globos/globoRojo.webp';
import globoAmarillo from '../assets/images/globos/globoAmarillo.webp';
import globoMorado from '../assets/images/globos/globoMorado.webp';
import globoVerde from '../assets/images/globos/globoVerde.webp';

function Globo({ health }) {
  const getImage = () => {
    if (health === 1) return globoFuxia1;
    if (health === 2) return globoRosa1;
    if (health === 3) return globoMorado1;
    if (health === 4) return globoAzul1;
    if (health === 5) return globoVerde1;
    if (health === 6) return globoCeleste1;
    if (health === 7) return globoRojo;
    if (health === 8) return globoAmarillo;
    if (health === 9) return globoMorado;
    
    return globoVerde;
  };

  return (
    <div className="globo">
      <img src={getImage()} alt="Globo" className="globo" />
    </div>
  );
}

export default Globo;