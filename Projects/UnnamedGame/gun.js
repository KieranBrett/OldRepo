// // BULLET CONSTS
// const BULLETWIDTH = 10;
// const BULLETHEIGHT = 5;
// const BULLETVELOCITY = 15;
// const FIRERATE = 7;
// const BULLETSPREAD = 10;
// const BULLETDMG = 20;
const GUNPOS = 70;

let gunTickCount;

class GunController {
    constructor(enemy, playerX, playerY, gun) {
      this.bullets = [];
      this.gunRight = loadImage(gun.gunRight);
      this.gunLeft = loadImage(gun.gunLeft);
      this.bulletRight = loadImage(gun.bulletRight);
      this.bulletLeft = loadImage(gun.bulletLeft);
      this.gunRightFlash = loadImage("assets/images/gun-rifle-right-flash.png");
      this.gunLeftFlash = loadImage("assets/images/gun-rifle-left-flash.png");
      this.gunY = playerY;
      this.gunX = playerX;
      this.relX;
      this.relY;

      this.gunName = gun.gunName;
      this.bulletWidth = gun.bulletWidth;
      this.bulletHeight = gun.bulletHeight;
      this.bulletVel = gun.bulletVel;
      this.fireRate = gun.fireRate;
      this.bulletSpread = gun.bulletSpread;
      this.bulletDmg = gun.bulletDmg;
      this.gunOffset = gun.gunOffset;

      this.maxVelocity = gun.maxVelocity;
      this.maxFirerate = gun.maxFirerate;
      this.maxSpread = gun.maxSpread;
      this.maxDamage = gun.maxDamage;

      this.enemyGun = enemy;
      this.direction = 1;


      this.dropped;
      this.bobbed = false;
      this.yBob = 0;
      this.canBePicked;
      this.dropCount = 0;
    }
  
    shoot() {
      if (this.direction == 1) {
        bullets.push(
          new Bullet(
            this.gunX + worldX + PLAYERWIDTH / 2 + this.gunRight.width - this.gunOffset,
            this.gunY + worldY + (GUNPOS + 13) + random(-this.bulletSpread, this.bulletSpread),
            this.direction,
            this.bulletRight,
            this.bulletVel,
            this.bulletDmg,
            this.enemyGun
          )
        );
      } else {
        bullets.push(
          new Bullet(
            this.gunX + worldX + PLAYERWIDTH / 2 - this.gunLeft.width + this.gunOffset,
            this.gunY + worldY + (GUNPOS + 13) + random(-this.bulletSpread, this.bulletSpread),
            this.direction,
            this.bulletLeft,
            this.bulletVel,
            this.bulletDmg,
            this.enemyGun
          )
        );
      }
    }
  
    update() {

      if (!this.dropped){
        if (this.direction == 1) {
          image(this.gunRight, this.gunX + PLAYERWIDTH / 2 - this.gunOffset, this.gunY + GUNPOS);
        } else {
          image( this.gunLeft, this.gunX + PLAYERWIDTH / 2 - this.gunLeft.width + this.gunOffset, this.gunY + GUNPOS);
        }

        // this.shooting = false;
      }
      else{ // IF IT IS DROPPED
        if (this.direction == 1) {
          image(this.gunRight, this.relX + PLAYERWIDTH / 2 - this.gunOffset, this.relY + GUNPOS + this.yBob);
        } else {
          image( this.gunLeft, this.relX + PLAYERWIDTH / 2 - this.gunLeft.width + this.gunOffset, this.relY + GUNPOS + this.yBob);
        }

        if (!this.bobbed){
          this.yBob++;
        }
        else{
            this.yBob--;
        }

        if (this.yBob > BOBHEIGHT){
            this.bobbed = true;
        }
        else if (this.yBob < -BOBHEIGHT){
            this.bobbed = false;
        }
      }
    }

    dropGun(playerX, playerY) {
      this.canBePicked = false;
      this.dropped = true;
      this.dropCount = 0;
      this.gunX = playerX + worldX;
      this.gunY = playerY + worldY;
    }
  }

  class Bullet {
    constructor(posX, posY, direction, image, bulletVel, dmg, enemy) {
      this.posX = posX;
      this.posY = posY;
      this.direction = direction;
      this.image = image;
      this.vel = bulletVel
      this.width = image.width;
      this.dmg = dmg;
      this.enemyBullet = enemy;

      this.relX;
      this.relY;
    }
  
    update(bulletVel) {
      fill(230, 190, 20); // Drawing before updating so we can see the bullet before it is moved
      // rect(this.posX - bulletWidth / 2, this.posY, bulletWidth, bulletHeight);
      image(this.image,this.relX - this.image.width / 2, this.relY)
      // console.log(this.image)
  
      if (this.direction == 1) {
        this.posX += this.vel;
      } else {
        this.posX -= this.vel;
      }
    }
  }

  class Gun{
    constructor(bulletVel, fireRate, bulletSpread, bulletDmg, gunLeft, gunRight, bulletRight, bulletLeft, gunOffset, maxVelocity, maxFirerate, maxSpread, maxDamage, gunName){
      this.bulletLeft = bulletLeft;
      this.bulletRight = bulletRight;

      this.bulletVel = bulletVel;
      this.fireRate = fireRate;
      this.bulletSpread = bulletSpread;
      this.bulletDmg = bulletDmg;
      this.gunLeft = gunLeft;
      this.gunRight = gunRight;
      this.gunOffset = gunOffset;
      this.gunName = gunName;

      this.maxVelocity = maxVelocity;
      this.maxFirerate = maxFirerate;
      this.maxSpread = maxSpread;
      this.maxDamage = maxDamage;
    }
  }

  function bulletUpdate(){
    for (var i = 0; i < bullets.length; i++) {
    
      bullets[i].relY = parseInt(bullets[i].posY) - worldY;
      bullets[i].relX = parseInt(bullets[i].posX) - worldX;
      bullets[i].update();
  
      
  
      if (
        bullets[i].relX > WIDTH ||
        parseInt(bullets[i].relX) + bullets[i].width < 0
      ) {
        bullets.splice(i, 1);
      } else { // If bullet is on screen
  
        for (var s = 0; s < squares.length; s++) {
          if (
            parseInt(bullets[i].relX) + bullets[i].width >= squares[s].relX &&
            bullets[i].relX <= parseInt(squares[s].relX) + squares[s].picture.width
          ) {
            if (
              bullets[i].relY >= squares[s].relY &&
              bullets[i].relY <=
                parseInt(squares[s].relY) + squares[s].picture.height
            ) {
              if (squares[s].breakable && !bullets[i].enemyBullet) {
                squares[s].health -= bullets[i].dmg;
                
                if (squares[s].health <= 0) {
                  squares.splice(s, 1);
                }
                else{
                  squares[s].healthBarCount = 0;
                  squares[s].damaged = true;
                }
              }

              bullets.splice(i, 1);
              return;
            }
          }
        } // Massive for loop checking each square
  
        if (!bullets[i].enemyBullet){ // Checking enemy hit
          for (var e = 0; e < enemies.length; e++){
            if (
              bullets[i].relX + bullets[i].width >= enemies[e].relX && bullets[i].relX <= enemies[e].relX + enemies[e].picture.width
            ) {
              
  
              if (
                bullets[i].relY + bullets[i].image.height >= enemies[e].relY && bullets[i].relY <= parseInt(enemies[e].relY) + enemies[e].picture.height
              ) {
                enemies[e].health -= bullets[i].dmg;
                bullets.splice(i, 1);
  
                if (enemies[e].health <= 0){ // if enemy is dead
                  drops.drop(parseInt(enemies[e].x), enemies[e].y, COINVALUE, enemies[e].picture.height, enemies[e].picture.width);
                  enemies.splice(e, 1);
                }
                else{
                  enemies[e].healthBarCount = 0;
                  enemies[e].damaged = true;
                }
  
                return;
              }
            }
          }
        }
        else{ // checking player hit
          if (bullets[i].relY + bullets[i].image.height > player.playerY && bullets[i].relY <= player.playerY + PLAYERHEIGHT){
            if (bullets[i].relX + bullets[i].width >= player.playerX && bullets[i].relX <= player.playerX + PLAYERWIDTH){
              player.playerHealth -= bullets[i].width;
              bullets.splice(i, 1);
  
              if (player.playerHealth < 0){
                gameOver = true;
              }
            }
          }
        }
      }
    }
  }