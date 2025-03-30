
import { VALORES_PREDETERMINADOS } from "./constantes";

export const guardarConfiguracionSonido = (volumen, efectos) => {
  localStorage.setItem('volumen', volumen);
  localStorage.setItem('efectos', efectos);
}

export const cargarConfiguracionSonido = () => {
  const volumen = localStorage.getItem('volumen') || VALORES_PREDETERMINADOS.volumen;
  let efectos;
  if( localStorage.getItem('volumen') === null) {
    efectos = localStorage.setItem('volumen', VALORES_PREDETERMINADOS.volumen);
  }else{
    efectos = localStorage.setItem('volumen', volumen);
  }
  return { volumen, efectos };
}

export const guardarConfiguracionPartida = (configuracion) => {
  localStorage.setItem('configuracionPartida', JSON.stringify(configuracion));
}

export const cargarConfiguracionPartida = () => {
  const configuracion = JSON.parse(localStorage.getItem('configuracionPartida'));
  return configuracion || null;
}






