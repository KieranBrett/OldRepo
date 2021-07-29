const DROPHEIGHT = 130;
const HEALVALUE = 30;
const COINVALUE = 100;
const DROPWIDTH = 50;

class DropController {
    constructor(){

        this.drops = [];
    }

    drop(posX, posY, value, entHeight, entWidth){
        // entWidth and entHeight are Entity Height, the entity that caused the spawn
        // Drop will be in middle of entity just above the floor they stand on

        // 0 is coin
        // 1 is health
        // 2 is gun

        if (random(5) < 2){
            console.log("heal");
            this.drops.push(new Coin(parseInt(posX) + (entWidth / 2), (parseInt(posY) + entHeight) - DROPHEIGHT, value, 1));
        }
        else{
            this.drops.push(new Coin(parseInt(posX) + (entWidth / 2), (parseInt(posY) + entHeight) - DROPHEIGHT, value, 0));
        }


        
    }

    updateDrops(){
        for (var d = 0; d < this.drops.length; d++){
            this.drops[d].Update();

            this.drops[d].relX = parseInt(this.drops[d].posX) - worldX;
            this.drops[d].relY = parseInt(this.drops[d].posY) - worldY;

            if (this.drops[d].relX + DROPWIDTH > player.playerX && this.drops[d].relX < player.playerX + DROPWIDTH &&
                this.drops[d].relY < player.playerY + playerPic.height && this.drops[d].relY + DROPWIDTH > player.playerY){
                    switch(this.drops[d].type){
                        case 0:{
                            player.score += this.drops[d].value;
                            break;
                        }
                        case 1:{

                            if (player.playerHealth <= player.startHealth - HEALVALUE){
                                player.playerHealth += HEALVALUE;
                            }
                            else{
                                player.playerHealth = player.startHealth;
                            }
                            break;
                        }
                    }
                this.drops.splice(d, 1);
                return;
            }
        }
    }
}