const BOBHEIGHT = 20;

class Coin {
    constructor(posX, posY, value, type){
        this.coin = loadImage("./drops/coin.png");
        this.medipack = loadImage("./drops/medipack.png");
        this.relX = posX;
        this.relY = posY;
        this.posX = posX;
        this.posY = posY;
        this.value = value;

        this.yBob = 0;
        this.bobbed = false;
        this.type = type;

        // 0 is coin
        // 1 is health
        // 2 is gun
    }

    Update(){
        switch(this.type){
            case 0:{
                image(this.coin, this.relX, parseInt(this.relY) + this.yBob)
                break;
            }
            case 1:{
                image(this.medipack, this.relX, parseInt(this.relY) + this.yBob)
                break;
            }
        }

        // if (this.type == 0){
        //     image(this.coin, this.relX, parseInt(this.posY) + this.yBob)
        // }
        // else{
        //     image(this.medipack, this.relX, parseInt(this.posY) + this.yBob)
        // }
        
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