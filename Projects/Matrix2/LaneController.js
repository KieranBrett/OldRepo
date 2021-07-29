class LaneController{
    constructor(string){

        this.lanes = [];

        for (let i = 0; i < string.length; i++){

            this.lanes.push(new Lane(string.charAt(i),
            (i * (windowWidth / string.length)) + ((windowWidth / string.length) / 2)));
        }
        // console.log(this.lanes)
    }

    update(){
        for (let i = 0; i < this.lanes.length; i++){
            this.lanes[i].update();
        }

        if (goOnce){

            if (frameCount % SPAWNRATE == 0){ // Spawns a string on every lane once
                let randomLane = parseInt(random(0, this.lanes.length))
    
                if (this.lanes[randomLane].available){
    
                    this.lanes[randomLane].spawnString();
                    this.lanes[randomLane].available = false;
                }
            }

        }
        else{
            if (frameCount % SPAWNRATE == 0) // Keeps spawning strings
        {

                let randomLane = parseInt(random(0, this.lanes.length))

                if (this.lanes[randomLane].available){
    
                    this.lanes[randomLane].spawnString();
                    this.lanes[randomLane].available = false;
                }
        }
        }
        

        // Randomly updating characters
      for (let i = 0; i < SWITCHCHANCES; i++){

          if (random(0, 100) < CHANGERATE){
              this.lanes[parseInt(random(0, this.lanes.length))].updateCharacters();
          }
      }
    }
}