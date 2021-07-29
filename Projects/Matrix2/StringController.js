class StringController{
    constructor(string){
      
      //////////////////////////////////// Setting up padding of word
      this.string = "";
      for (let i = 0; i < STRPAD; i++){
        this.string += ";"
      }
      this.string += string;
      for (let i = 0; i < STRPAD; i++){
        this.string += ";"
      }
      ////////////////////////////////////
  
      this.strings = [];
      // console.log(`String Length: ${this.string.length}`)
      textSize(fontSize)

      this.generateLanes();
    }

    generateLanes(){
      this.lanes = new LaneController(this.string);
    }

  
    update(){
      this.lanes.update();

      // // Randomly
      // for (let i = 0; i < charUpdate; i++){ 
      //   if (this.strings.length > 0){
      //     this.strings[parseInt(random(0, this.strings.length))].updateCharacters();
      //   }
      // }
      
    }
  }