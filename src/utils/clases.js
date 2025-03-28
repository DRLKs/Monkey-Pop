
export class Globo {

    constructor(id, index, health) {
      this.id = id;
      this.index = index;
      this.health = health;
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


  }