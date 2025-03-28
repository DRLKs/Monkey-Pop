
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