
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

  export class Mono{
    constructor(id, tipo, index, damage, rango, tiempoRecarga) {
      this.id = id;
      this.tipo = tipo;
      this.index = index;
      this.damage = damage;
      this.rango = rango;
      this.recarga = 0; // Tiempo de recarga en segundos
      this.tiempoRecarga = tiempoRecarga;
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

    getPosition() {
      return this.index;
    }

    puedeAtacar() {
      this.recarga = (this.recarga + 1) % this.tiempoRecarga;
      return this.recarga === 0; // El mono puede atacar si el tiempo de recarga es 0
    }

    attack(globos) {

      let globoAtacar = null;
      globos.forEach(globo => {
        if( alcanzable( this.index, globo.getPosition, this.rango ) ){
          if( globoAtacar === null || globoAtacar.id > globo.id ){   // Ataca al globo que salio antes
            globoAtacar = globo;
          }
           
        }
      });
      if( globoAtacar === null ){               // Si no a rango de nadie, mantiene el arma cargada
        this.recarga = this.tiempoRecarga - 1;  // Está cargado
      }
      return globoAtacar;
  }

  mejorarRango(){
    this.rango += 50;
  }

  mejorarDamage(){
    this.damage += 1;
  }

  mejorarTiempoRecarga(){
    this.tiempoRecarga -= 1;
  }
}

function alcanzable( indexMono, indexGlobo, rango ){
  return true; // Implementar la lógica para determinar si el globo es alcanzable por el mono
  // Por ahora, asumimos que todos los globos son alcanzables
}