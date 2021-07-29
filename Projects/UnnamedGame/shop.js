let shopping = false;
let shopButtons = [];
let shopBack;
let coins;

let exitShop;
const EXITX = 1250;
const EXITY = 600;

const GUNFIELDS = 4;

const BUTTONGAP = 75;
const GUNNEGX = 200;
const GUNPOSX = 275;
const BUTTONYSTART = 250;

const STATBARLENGTH = 280;
const STATBARHEIGHT = 20;

function showShop(nextLevel){
    // if (shopping != nextLevel){
    //     shopping = nextLevel;
    // }

    textSize(30)
    text(`Your Balance: ${player.score}`, 280, 180)

    image(shopBack, 175, 200)
    let fieldText;
    let value;

    for (var i = 0; i < GUNFIELDS; i++){
        switch (i){
            case 0:
                fieldText = "Bullet Velocity"
                value = 80;
                break;

            case 1:
                fieldText = "Bullet Damage"
                value = 70;
                break;
            
            case 2:
                fieldText = "Bullet Spread"
                value = 50;
                break;
            
            case 3:
                fieldText = "Fire Rate"
                value = 100;
                break;
    
            
        }


        let textX = (GUNNEGX + ((GUNPOSX - GUNNEGX) / 2)) - textWidth(text);
        let textY = BUTTONYSTART + 30 + (i * BUTTONGAP);
        fill(255,255,255)
        textSize(20)
        text(fieldText, GUNPOSX + 75, textY)
        image(coins, GUNPOSX + 250, textY - 25);
        text(value, GUNPOSX + 300, textY);
    }

    // Drawing Gun Stats
    // Inventory
    for (var i = 0; i < 4; i++){
        if (player.inventory[i] != null){
          if (i == player.inventoryIndex){
            fill (255, 0, 0);
          }
          text(`${i + 1}. ${player.inventory[i].gunName}`, 900, BUTTONYSTART + 30 + (35 * i));
          fill (255,255,255)
        }
        else{
          text(`${i + 1}. Empty`, 900, BUTTONYSTART + 30 + (35 * i))
        }
      }
    // Stats
    strokeWeight(4);
    stroke(0);
    fill(50)
    // Outter
    rect(1070, BUTTONYSTART, 300, 300)
    
    // Displaying stats
    
    fill(255);
    let ammount = (player.inventory[player.inventoryIndex].bulletVel / player.inventory[player.inventoryIndex].maxVelocity) * STATBARLENGTH;
    text("Bullet Velocity", 1080, BUTTONYSTART + 30);
    rect(1080, BUTTONYSTART + 30 + 10, STATBARLENGTH, STATBARHEIGHT);
    fill(20, 200, 20);
    rect(1080, BUTTONYSTART + 30 + 10, ammount, STATBARHEIGHT);

    
    fill(255);
    ammount = (player.inventory[player.inventoryIndex].bulletDmg / player.inventory[player.inventoryIndex].maxDamage) * STATBARLENGTH;
    text("Bullet Damage", 1080, BUTTONYSTART + 95);
    rect(1080, BUTTONYSTART + 95 + 10, STATBARLENGTH, STATBARHEIGHT);
    fill(20, 200, 20);
    rect(1080, BUTTONYSTART + 95 + 10, ammount, STATBARHEIGHT);
    
    fill(255);
    ammount = (player.inventory[player.inventoryIndex].bulletSpread / player.inventory[player.inventoryIndex].maxSpread) * STATBARLENGTH;
    text("Bullet Spread", 1080, BUTTONYSTART + 160);
    rect(1080, BUTTONYSTART + 160 + 10, STATBARLENGTH, STATBARHEIGHT);
    fill(20, 200, 20);
    rect(1080, BUTTONYSTART + 160 + 10, ammount, STATBARHEIGHT);

    fill(255);
    ammount = (player.inventory[player.inventoryIndex].maxFirerate / player.inventory[player.inventoryIndex].fireRate) * STATBARLENGTH;
    text("Gun Fire Rate", 1080, BUTTONYSTART + 225);
    rect(1080, BUTTONYSTART + 225 + 10, STATBARLENGTH, STATBARHEIGHT);
    fill(20, 200, 20);
    rect(1080, BUTTONYSTART + 225 + 10, ammount, STATBARHEIGHT);



    // Drawing Buttons
    shopButtons.forEach(b => {
        b.draw();
    })

    image(exitShop, EXITX, EXITY)

    return shopping;
}

const UPGRADEAMMOUNT = 2;
const BULLETUPGRADE = 5;

function checkClick(x, y){
    console.log("CheckClick")
    
    shopButtons.forEach(s => {
        if (s.x < x && s.x + s.image.width > x &&
            s.y < y && s.y + s.image.height > y){
                console.log("Clicked")

                if (player.score >= s.cost){

                switch(s.fieldIndex){
                    case 0:
                    if (s.positive){
                        if (player.inventory[player.inventoryIndex].bulletVel <= player.inventory[player.inventoryIndex].maxVelocity - UPGRADEAMMOUNT){
                            player.inventory[player.inventoryIndex].bulletVel += UPGRADEAMMOUNT;
                            player.score -= parseInt(s.cost);
                        }  
                    }
                    else{
                        player.inventory[player.inventoryIndex].bulletVel -= UPGRADEAMMOUNT;
                    }
                    break;

                case 1:
                    if (s.positive){
                        if (player.inventory[player.inventoryIndex].bulletDmg <= player.inventory[player.inventoryIndex].maxDamage - BULLETUPGRADE){

                            player.inventory[player.inventoryIndex].bulletDmg += BULLETUPGRADE;
                            player.score -= parseInt(s.cost);
                        }
                    }
                    else{
                        player.inventory[player.inventoryIndex].bulletDmg -= BULLETUPGRADE;
                    }
                    break;
            
                case 2:
                    if (s.positive){
                        if (player.inventory[player.inventoryIndex].bulletSpread <= player.inventory[player.inventoryIndex].maxSpread - UPGRADEAMMOUNT){

                            player.inventory[player.inventoryIndex].bulletSpread += UPGRADEAMMOUNT;
                            player.score -= parseInt(s.cost);
                        }
                    }
                    else{
                        if (player.inventory[player.inventoryIndex].bulletSpread > 0 + UPGRADEAMMOUNT){
                            player.inventory[player.inventoryIndex].bulletSpread -= UPGRADEAMMOUNT;
                            player.score -= parseInt(s.cost);
                        }
                        
                    }
                    break;
            
                case 3:
                    if (s.positive){
                        if (player.inventory[player.inventoryIndex].fireRate >= player.inventory[player.inventoryIndex].maxFirerate + 1){

                            player.inventory[player.inventoryIndex].fireRate -= 1;
                            player.score -= parseInt(s.cost);
                        }
                    }
                    else{
                        player.inventory[player.inventoryIndex].fireRate += 1;
                    }
                    break;
                }
            }

            return;
        }
    })

    if (x > EXITX && x < EXITX + exitShop.width &&
        y > EXITY && y < EXITY + exitShop.height){
            console.log("exit shop");
            shopping = false;
        }
}

function createButtons(){

    let fieldText;
    let minus;
    let positive;
    let value;

    for (var i = 0; i < GUNFIELDS; i++){
        switch (i){
            case 0:
                fieldText = "Bullet Velocity"
                minus = false;
                positive = true;
                value = 80;
                break;

            case 1:
                fieldText = "Bullet Damage"
                minus = false;
                positive = true;
                value = 70;
                break;
            
            case 2:
                fieldText = "Bullet Spread"
                minus = true;
                positive = true;
                value = 50;
                break;
            
            case 3:
                fieldText = "Fire Rate"
                minus = false;
                positive = true;
                value = 100;
                break;
    
            
        }
    
        if (minus){
            shopButtons.push(new Buttons(GUNNEGX, BUTTONYSTART + (i * BUTTONGAP), i, value, false))
        }
        if (positive){
            shopButtons.push(new Buttons(GUNPOSX, BUTTONYSTART + (i * BUTTONGAP), i, value, true))
        }
        let textX = (GUNNEGX + ((GUNPOSX - GUNNEGX) / 2)) - textWidth(text);
        let textY = BUTTONYSTART + (i * BUTTONGAP);
        text(fieldText, textX, textY)
    }
}

class Buttons{
    constructor(x, y, fieldIndex, cost, positive){
        this.x = x;
        this.y = y;
        this.fieldIndex = fieldIndex;
        this.cost = cost;
        this.positive = positive;
        this.positiveImage = loadImage("assets/images/shop-plus.png");
        this.negativeImage = loadImage("assets/images/shop-minus.png");
        this.image;

        this.setUpButton();
    }
    
    setUpButton(){
        if (this.positive == true){
            this.image = this.positiveImage;
        }
        else{
            this.image = this.negativeImage;
        }
    }

    draw(){
        
        image(this.image, this.x, this.y);
    }
}