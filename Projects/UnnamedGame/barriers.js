const BARLENGTH = 200;

class Barriers {
    constructor(x, y, imageURL, breakable, health) {
      this.x = x;
      this.y = y;
      this.relX;
      this.relY;
      this.picture = loadImage(imageURL);
      this.breakable = breakable;
      this.startHealth = health;
      this.health = health;
  
      this.healthBarCount = 0;
      this.damaged = false;
    }
  
    drawSquare() {
      image(this.picture, parseInt(this.relX), parseInt(this.relY));
    }
  
    Update(){
      if (this.damaged){
        this.drawHealth();
  
        this.healthBarCount++;
        if (this.healthBarCount > HEALTHBARTIME){
          this.damaged = false;
          this.healthBarCount = 0;
        }
      }
      this.drawSquare();
  
    }
  
    drawHealth(){
      fill(0)
      // BLACK BACKGROUND
      rect((parseInt(this.relX) + (this.picture.width / 2) - (BARLENGTH / 2) - 3),(this.relY - 50) - 3, parseInt(BARLENGTH) + 6, HEALTHBARHEIGHT + 6)
  
      // RED

      let ammount = (this.health / this.startHealth) * BARLENGTH;

      fill(200, 20, 20);
      rect((parseInt(this.relX) + (this.picture.width / 2) - (BARLENGTH / 2)),(this.relY - 50), BARLENGTH, HEALTHBARHEIGHT)
  
      // GREEN
      fill (20, 200, 20)
      rect((parseInt(this.relX) + (this.picture.width / 2) - (BARLENGTH / 2)),(this.relY - 50), ammount, HEALTHBARHEIGHT)
    }
  }

