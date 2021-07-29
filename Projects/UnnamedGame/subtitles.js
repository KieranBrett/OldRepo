
const SUBTITLEWIDTH = 800;
const LETTERSPEED = 1;
const PAUSESENTENCE = 80;
const SUBTITLEHEIGHT = 200;
let textShowing = false;

// SUBTITLES
let introStrings = {
    // Level 1
    "intro":"Welcome to Unnamed Game",
    "doubleJump":"You could sprint double jump using shift",
    "Weapon":"Stand on a weapon to pick it up, press Q to drop it",
    "shoot": "Hold space to shoot your gun",
    "drops":"Enemies will drop items which you can pickup",
    "portal":"Jump in the portal to continue",

    // Level 2
    "breakable":"Cracked boxes can be shot and broken"
  }

function loadTips(){
    switch (level){
        case 1:
                tips.push(new CheckPoints(200, "intro"))
                tips.push(new CheckPoints(1200, "doubleJump"))
                tips.push(new CheckPoints(2200, "Weapon"))
                tips.push(new CheckPoints(2800, "shoot"))
                tips.push(new CheckPoints(3200, "drops"))
                tips.push(new CheckPoints(4500, "portal"))
            break;

        case 2:
            tips.push(new CheckPoints(500, "breakable"))
            break;
    }
  }
  
function updateText(){
    fill(255, 255, 255)
    textStyle(BOLD)

    for (var i =0; i < tips.length; i++){
        tips[i].relX = parseInt(tips[i].x) - worldX;

        if (!textShowing){
            if (player.playerX > tips[i].relX && tips[i].drawing == false){ // If player trips tip  
                tips[i].drawing = true;
                textShowing = true;

                // return;
            }
            else{

            }
        }
        else{ // If text is showing
            if (tips[i].drawing == true){
                tips[i].drawText(i);
                
                // Remove tip if player has run past
                // if (player.playerX > tips[i].relX + SUBTITLEWIDTH){
                //     tips.splice(i, 1)
                //     textShowing = false;
                // }
            }
        }
    }
}

class CheckPoints {
    constructor(x, tipName){
        this.x = x;
        this.relX;
        this.tipName = tipName;
        this.textDone = false;
        this.textCount = 0;
        this.charIndex = 0;
        this.stringIndex = 0;
        this.timerDone = false;
        this.timerCount = 0;
        this.drawing = false;

    }

    drawText(i){
        if (!this.timerDone){
            if (!this.textDone){
                this.textCount++;
                if (this.textCount > LETTERSPEED){
                    this.textCount = 0;
                    
                    this.charIndex++;
                    if (this.charIndex > introStrings[`${this.tipName}`].length){
                        
                        console.log(this.tipName);
                            this.textDone = true;
                            this.stringIndex--;
                    }
                }
                
                    let textWid = textWidth(introStrings[`${this.tipName}`].substring(0, this.charIndex))
                    text(`${introStrings[`${this.tipName}`].substring(0, this.charIndex)}`, 800 - (textWid / 2), SUBTITLEHEIGHT)
            }
            else{
                this.timerCount++;
                if (this.timerCount >= PAUSESENTENCE){
                    this.timerDone = true;
                    textShowing = false;
                }

                let textWid = textWidth(introStrings[`${this.tipName}`].substring(0, this.charIndex))
                text(`${introStrings[`${this.tipName}`].substring(0, this.charIndex)}`, 800 - (textWid / 2), SUBTITLEHEIGHT)
            }
        }
    }
}

let tips = [];