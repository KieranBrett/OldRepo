const TESTSTR = `        THE MATRIX        `
let defaultStrings = ["Hello", "Tumeke", "Churr Cuzzi", "Bring Back $1 Frozen Cokes", "I think Jacinda is doing a good job", "Whats the weather like?", "Huh", 
                    "Creationism", "Eric the God eating penguin", "Snowflake", "Dunedin", "I like cheese", "Whats up?"]
const TRANSPARENCY = 90;

// DEFAULT COLOURS
const R = 40;
const G = 190;
const B = 40;

//Stroke Colours DIFFERENCE
const STROKER = 80;
const STROKEG = 80;
const STROKEB = 80;

//Shooting Stars
const STARR = 100;
const STARG = 100;
const STARB = 100;

// Strings
const VANISHONPASS = true; // if letters vanish when passing the message
const STRPAD = 8; // Ammount of blank spaces on either side of string
const SWEEP = false; // If it rains or just falls once per lane
const SPAWNRATE = 3;

// Characters
const CHARCOLOUROFFSET = 15
const FLASHWHENHIT = false; // flashes a box around the letter when a piece of text hits it
const STARRATE = 60; // PERCENT
const CHANCEOFFLIPPED = 50 // PERCENT
const CHANGERATE = 70; // PERCENT
const SWITCHCHANCES = 10; // Ammount of times to try for changing characters

// Rain
const TEXTSPEED = 12;
const SPEEDVARY = 4;
const LENGTHMIN = 3;
const LENGTHMAX = 15;

// Message
//MESSAGE Fade Colours
const COLOURJUMP = 2; // Ammount colour updates every frame

//Static Colours
const STATICR = 100;
const STATICG = 100;
const STATICB = 100;

//MESSAGE Border
const BORDERR = 255;
const BORDERG = 255;
const BORDERB = 255;
const BORDERWEIGHT = 3;

let characters = ['ﾊ', 'ﾐ',
                  'ﾋ', 'ｳ',
                  'ｼ', 'ﾅ', 'ﾓ',
                  'ｻ', 'ﾜ',
                  'ﾂ', 'ｵ', 'ﾘ',
                  'ｱ', 'ﾎ', 'ﾃ',
                 'ﾏ', 'ｹ', 'ﾒ',
                 'ｴ', 'ｶ', 'ｷ',
                 'ﾑ', 'ﾕ', 'ﾗ',
                 'ｾ', 'ﾈ', 'ｽ', 
                 'ﾀ', 'ﾇ', 'ﾍ',
                 'ｦ', 'ｲ', 'ｸ',
                 'ｺ', 'ｿ', 'ﾁ',
                 'ﾄ', 'ﾉ', 'ﾌ',
                 'ﾔ', 'ﾖ', 'ﾙ',
                 'ﾚ', 'ﾝ']

let english = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N',
              'O','P','Q','R','S','T','U','V','W','X','Y','Z']

let englishNum = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N',
                'O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3',
                '4','5','6','7','8','9','0']

let englishNumSymbol = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N',
                      'O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3',
                      '4','5','6','7','8','9','0','!','@','#','$','%','^','&','*',
                      '(',')','_','+','=','-','[',']','}','{','}',':','>','<','.',
                      ',','/','?','"','|','\\', `~`]

let collection = ['A', 'B','C','D','E','F','G','H','I','J','K','L','M','N',
                      'O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3',
                      '4','5','6','7','8','9','0','!','@','#','$','%','^','&','*',
                      '(',')','_','+','=','-','[',']','}','{','}',':','>','<','.',
                      ',','/','?','"','|','\\', `~`, 'ﾊ', 'ﾐ', 'ﾋ', 'ｳ', 'ｼ', 'ﾅ', 
                      'ﾓ', 'ｻ', 'ﾜ', 'ﾂ', 'ｵ', 'ﾘ',  'ｱ', 'ﾎ', 'ﾃ', 'ﾏ', 'ｹ', 'ﾒ', 
                      'ｴ', 'ｶ', 'ｷ', 'ﾑ', 'ﾕ', 'ﾗ', 'ｾ', 'ﾈ', 'ｽ', 'ﾀ', 'ﾇ', 'ﾍ',
                     'ｦ', 'ｲ', 'ｸ','ｺ', 'ｿ', 'ﾁ','ﾄ', 'ﾉ', 'ﾌ', 'ﾔ', 'ﾖ', 'ﾙ', 'ﾚ', 'ﾝ']  

let strController;
let fontSize;
let letters;
let goOnce;

let matrixFont;
let textR;
let textG;
let textB;


function setup(message, colour) {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  
  // Setting up user options
  // String 
  let string;
  if (message != null){
    string = message
    console.log(string)
  }
  else{
    string = random(defaultStrings)
  }

  // Colour
  if (colour != null){
    textR = hexToRgb(colour).r;
    textG = hexToRgb(colour).g;
    textB = hexToRgb(colour).b;
    
    console.log(`textR: ${textR} textG: ${textG} textB: ${textB}`)
  }
  else{
    console.log("default")

    textR = R;
    textG = G;
    textB = B;
  }
  

  

  textAlign(CENTER);
  stroke(textR - STROKER, textG - STROKEG, textB - STROKEB);
  strokeWeight(5)

  fontSize = windowWidth / (string.length + STRPAD);
  strController = new StringController(string);
  letters = [];
  goOnce = SWEEP;
  matrixFont = loadFont('WESTM.TTF')
}

function hexToRgb(hex) { // Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function draw() {
    background(0, TRANSPARENCY); // adds motion blur effect

  strController.update();

  for (let i = 0; i < letters.length; i++){
    push();
    
    letters[i].update();
    pop();
  }

  // Signature
  push();

  fill(255,255,255)
  noStroke();
  textSize(12);
  textAlign(LEFT);
  text("Made By Kieran Brett", 10, windowHeight - 10)
  pop();
}

class Letters{
  constructor(letter, x, y){
    this.letter = letter;
    this.x = x;
    this.y = y;

    // LETTERS COLOR
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.rDes = true;
    this.gDes = true;
    this.bDes = true;
  }
  update(){
    fill(this.r, this.g, this.b)
    stroke(BORDERR, BORDERG, BORDERB)
    strokeWeight(BORDERWEIGHT)
    textFont(matrixFont)
    text(this.letter, this.x, this.y)
    
    if (this.rDes){
      this.r -= COLOURJUMP
      if (this.r <= textR +STATICR){
        this.r = textR + STATICR;
        this.rDes = false;
      }
    }

    if (this.gDes){
      this.g -= COLOURJUMP
      if (this.g <= textG + STATICG){
        this.g = textG + STATICG;
        this.gDes = false;
      }
    }

    if (this.bDes){
      this.b -= COLOURJUMP
      if (this.b <= textB + STATICB){
        this.b = textB + STATICB;
        this.bDes = false;
      }
    }


  }
}
