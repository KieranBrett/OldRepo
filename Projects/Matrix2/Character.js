class Character{
    constructor(letter){
      this.letter = letter;
      this.bright = false;
      this.flipped = false;
      
    this.r = textR + random(-CHARCOLOUROFFSET, CHARCOLOUROFFSET);
    this.g = textG + random(-CHARCOLOUROFFSET, CHARCOLOUROFFSET);
    this.b = textB + random(-CHARCOLOUROFFSET, CHARCOLOUROFFSET)
    
    }
    
    update(){
      this.letter = characters[parseInt(random(0, characters.length))]
    }
  }
  