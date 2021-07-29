function loadLevel(level){

    let objectUrl = `levels/level${level}/level${level}-objects.json`;
    let sceneryUrl = `levels/level${level}/level${level}-scenery.json`;
    let enemiesUrl = `levels/level${level}/level${level}-enemies.json`;

fetch(objectUrl)
  .then(response => response.json())
  .then(data => {
    let objects = data;

    for (var i = 0; i < objects.boxes.length; i++) {
      squares.push(
        new Barriers(
          objects.boxes[i].positionX,
          objects.boxes[i].positionY,
          objects.boxes[i].imageurl,
          objects.boxes[i].breakable,
          objects.boxes[i].health
        )
      );
    }

    console.log(squares);
  });

fetch(sceneryUrl)
  .then(response => response.json())
  .then(data => {
    let objects = data;
    console.log(objects.scenery.length);

    for (var i = 0; i < objects.scenery.length; i++) {
      scenery.push(
        new Scenery(
          objects.scenery[i].positionX,
          objects.scenery[i].positionY,
          objects.scenery[i].imageurl,
        )
      );
    }

    console.log(scenery);
  });

fetch(enemiesUrl)
  .then(response => response.json())
  .then(data => {
    let objects = data;
    console.log(objects.enemies.length);

    for (var i = 0; i < objects.enemies.length; i++) {
      enemies .push(
        new Enemy(
          objects.enemies[i].positionX,
          objects.enemies[i].positionY,
          objects.enemies[i].imageurl,
          objects.enemies[i].health,
          objects.enemies[i].speed,
          objects.enemies[i].fireRate,
          objects.enemies[i].gunIndex
        )
      );
    }

    console.log(enemies);
  });
  
  // fetch("assets/guns.json")
  //   .then(response => response.json())
  //   .then(data => {
  //     let objects = data;
  
      
  
  //     // guns.push(new Gun(10, 5, 15, 7, 10, 20))
  
  //     for (var i = 0; i < objects.guns.length; i++) {
  //       guns.push(
  //         new Gun(objects.guns[i].bulletWidth,
  //           objects.guns[i].bulletHeight,
  //           objects.guns[i].bulletVel,
  //           objects.guns[i].fireRate,
  //           objects.guns[i].bulletSpread,
  //           objects.guns[i].bulletDmg
  //         )
  //       );
  //      }
  //   });

}

  