const MINLENGTH = 3;
const MAXLENGTH = 15;
const MINTEXT = 5;
const MAXTEXT = 50

let r;
let g;
let b;
let rDes;
let gDes;
let bDes;

let characters = ['ﾊ', 'ﾐ',
                  'ﾋ', 'ｰ', 'ｳ',
                  'ｼ', 'ﾅ', 'ﾓ',
                  'ﾆ', 'ｻ', 'ﾜ',
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



let strings = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  r = random(256);
  rDes = false;
  g = random(256);
  gDes = false;
  b = random(256);
  bDes = false;

  fill(r, g, b);
}

function draw() {
  background(10, 200); // adds motion blur effect
  
  for (let i = strings.length - 1; i >= 0; i--){
    strings[i].update()
    
    if (strings[i].y - (strings[i].length * strings[i].textSize) > height){
      strings.splice(i, 1);
    }
  }
  
  if (frameCount % 4 == 0){
    strings.push(new TextString());
  }
  
  updateColour();

}

class TextString{
  constructor(){
    this.x = random(width)
    this.y = 0;
    
    this.textSize = random(MINTEXT, MAXTEXT);
    this.length = random(MINLENGTH, MAXLENGTH)
    this.textSpeed = parseInt(this.textSize * random(0.2, 0.3))
    // console.log(this.textSpeed);
    
    this.characters = [];
    
    for (let i = 0; i < this.length; i++){
      this.characters.push(new Character())
    }
  }
  
  update(){
    textSize(this.textSize)

    for (let i = 0; i < this.characters.length; i++){


      text(this.characters[i].character, this.x, this.y - (i * this.textSize))
      // filter(BLUR, 2);
      // text(this.characters[i].character, this.x, this.y - (i * this.textSize))

      if (random(0, 10) < 1.5){
        this.characters[i].update()

      }
    }
    
    this.y += this.textSpeed;
    // console.log(this.textSpeed);
  }
}

class Character{
  constructor(){
    this.character = characters[parseInt(random(0, characters.length - 1))]
    
  }
  
  update(){
      this.character = characters[parseInt(random(0, characters.length - 1))]
  }
}

function updateColour(){
  
  let number = parseInt(random(2));
  
  if (number === 0){
    if (rDes){
      r--
      if (r < 0){
        r = 0;
        rDes = false;
      }
    }
    else{
      r++
      if (r > 255){
        r = 255;
        rDes = true;
      }
    }
  } else if (number === 1){
   if (gDes){
      g--
      if (g < 0){
        g = 0;
        gDes = false;
      }
    }
    else{
      g++
      if (g > 255){
        g = 255;
        gDes = true;
      }
    }
  } else if (number === 2){
    if (bDes){
      b--
      if (b < 0){
        b = 0;
        bDes = false;
      }
    }
    else{
      b++
      if (b > 255){
        b = 255;
        bDes = true;
      }
    }
  } else{
    console.log("somehow got here");
  }
    
  fill(r, g, b);
}