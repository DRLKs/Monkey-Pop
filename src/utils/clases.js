
export class Globo {

    constructor(id, index, health, tiempoDeVida) {
      this.id = id;
      this.index = index;
      this.health = health;
      this.tiempoDeVida = tiempoDeVida; // Tiempo de vida del globo en segundos
      }
    


    setPosition(newIndex) {
      this.index = newIndex;
    }

    getPosition() {
      return this.index;
    }

    dealDamage(damage) {
      this.health -= damage;
      return this.health <= 0;  // El globo ha sido destruido si la salud es menor o igual a 0
    }

    getHealth() {
      return this.health;
    }

    getTiempoDeVida() {
      return this.tiempoDeVida;
    }

    addTiempoDeVida() {
      this.tiempoDeVida += 1; // Aumenta el tiempo de vida en 1 game loop;
    }

  }

  /**
   * La clase de los defensores (monos)
   * 
   * Estos pueden mejorarse hasta el nivel 3 ( Por ahora )
   * 
   * 
   */
  export class Mono{
    constructor(id, tipo, index, damage, rango, tiempoRecarga) {
      this.id = id;
      this.tipo = tipo;
      this.index = index;
      this.damage = damage;
      this.rango = rango;
      this.recarga = 0;                   // Tiempo de recarga en segundos
      this.tiempoRecarga = tiempoRecarga;
      this.mejorable = true;              // Indica si el mono es mejorable
      this.nivel = 1;                     // Contador de mejoras
    }

    /**
     * Función usada para determinar si el botón en los ajustes de cada mono debe estar visible
     * @returns {Boolean} true si el mono es mejorable, false en caso contrario
     */
    esMejorable() {
      return this.mejorable;
    }

    getTipo() {
      return this.tipo;
    }

    getDamage() {
      return this.damage;
    }

    getRango() {
      return this.rango;
    }

    getTiempoRecarga() {
      return this.tiempoRecarga;
    }

    setPosition(newIndex) {
      this.index = newIndex;
    }

    /**
     * @returns {Integer} Devuelve la posición del mono en el mapa
     */
    getPosition() {
      return this.index;
    }

    /**
     * Función que indica si el mono puede atacar o no
     * @returns {Boolean} true si el mono puede atacar, false en caso contrario
     */
    puedeAtacar() {
      this.recarga = (this.recarga + 1) % this.tiempoRecarga;
      return this.recarga === 0; // El mono puede atacar si el tiempo de recarga es 0
    }

    /**
     * Función que usa cada mono para atacar a los globos
     * @param {*} globos Array de globos que están en el mapa
     * @returns {Globo} Clase Globo que ataca el mono. En caso de que el mono no pueda atacar, devuelve null
     */
    attack(globos) {

      let globoAtacar = null;
      globos.forEach(globo => {
        if( alcanzable( this.index, globo.getPosition, this.rango ) ){
          if( globoAtacar === null || globoAtacar.id > globo.id ){   // Ataca al globo que salio antes, el globo que tiene un id menor
            globoAtacar = globo;
          }  
        }
      });

      if( globoAtacar === null ){               // Si no está a rango de nadie, mantiene el arma cargada
        this.recarga = this.tiempoRecarga - 1;  // Está cargado
      }

      return globoAtacar;
  }

  /**
   * Función que hace mejorar las estatisticas del mono
   */
  mejorarMono(){
    if( this.nivel < 3 ){

      ++this.nivel;
      this.damage += 1; // Mejora el daño
      this.rango += 12; // Mejora el rango
      this.tiempoRecarga -= 1; // Mejora el tiempo de recarga
    }

    if( this.nivel >= 3 ){
      this.mejorable = false; // El mono no se puede mejorar más
    }
  }

  getNivel(){
    if( this.nivel >= 3 ) return "MAX";
    return this.nivel.toString();
  }


}

/**
 * 
 * @param {Integer} indexMono Posición en el mapa del mono
 * @param {Integer} indexGlobo Posición en el mapa del globo
 * @param {Integer} rango Rango del mono
 * @returns {Boolean} true si el globo es alcanzable por el mono, false en caso contrario
 */
function alcanzable( indexMono, indexGlobo, rango ){
  return true; // Implementar la lógica para determinar si el globo es alcanzable por el mono
  // Por ahora, asumimos que todos los globos son alcanzables
}