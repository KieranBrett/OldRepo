const SHOOTINGTIMER = 20;

class Enemy {

    constructor(x, y, imgUrl, health, speed, fireRate, gunIndex) {
        this.x = x;
        this.y = y;
        this.relX;
        this.relY;
        this.picture = loadImage(imgUrl);
        this.health = health;
        this.startHealth = health;
        this.speed = speed;
        this.direction = -1;
        this.healthBarCount = 0;
        this.damaged = false;
        this.enemyGun = new GunController(true, this.x, this.y, guns[gunIndex])
        this.enemyGun.direction = 0;

        this.fireRate = fireRate;
        this.gunTickCount = 0;
        this.shooting = false;
        this.shootCount = 0;
    }

    UpdateEnemy() {
        this.move()

        if (this.damaged){
            this.drawHealth();
            this.healthBarCount++;

            if (this.healthBarCount > HEALTHBARTIME){
                this.damaged = false;
                this.healthBarCount = 0;
            }
        }
        image(this.picture, this.relX, this.relY)

        this.enemyGun.gunX = this.relX;
        this.enemyGun.gunY = this.relY;
        this.enemyGun.update();
        this.lookForPlayer();
        
        if (this.shooting){
            this.gunTickCount++;
            if (this.gunTickCount >= this.fireRate){
                this.enemyGun.shoot(this.picture.width, this.picture.height);
                this.gunTickCount = 0;
            }
        }
    }

    lookForPlayer(){
        if (this.shooting){
            this.shootCount++;

            if (this.shootCount > SHOOTINGTIMER){
                this.shooting = false;
                this.shootCount = 0;
            }
        }

        this.shooting = this.canISeeHim();
    }

    canISeeHim(){
        let canI = true;


        if (this.direction === -1){
            if (player.playerX < this.relX){
                canI = true;
            }
            else{
                canI = false;
            }
        }
        else{
            if (player.playerX > this.relX){
                canI = true;
            }
            else{
                canI = false;
            }
        }


        return canI;
    }

    move(){

        if (this.direction === -1){ // If Left
            this.x = parseInt(this.x) - this.speed;
        }
        else{
            this.x = parseInt(this.x) + parseInt(this.speed);
        }

        for (var i = 0; i < squares.length; i++){
            if (parseInt(this.x) + this.picture.width >= squares[i].x &&
            this.x <= parseInt(squares[i].x) + squares[i].picture.width &&
            this.y < parseInt(squares[i].y) + squares[i].picture.height &&
            this.y + this.picture.height > parseInt(squares[i].y)){

                if (parseInt(this.x) <= parseInt(squares[i].x) + squares[i].picture.width && parseInt(this.x) + this.picture.width >= parseInt(squares[i].x) + squares[i].picture.width){
                    this.x = parseInt(squares[i].x) + squares[i].picture.width
                    this.direction *= -1;
                    this.enemyGun.direction = 1;
                }
                else{
                    this.x = parseInt(squares[i].x) - this.picture.width
                    this.direction *= -1;
                    this.enemyGun.direction = 0;
                }

                break;
            }
        }
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