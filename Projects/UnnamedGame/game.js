const LEVELCOUNT = 3;

const DOUBLEJUMP = true;
//FrameSize
const WIDTH = 1600;
const HEIGHT = 800;
// Player Start
const STARTX = 300;
const STARTY = 500;
// HealthBars
const HEALTHBARHEIGHT = 10;
const HEALTHBARTIME = 200;
const NEXTLEVELLOADTIME = 200;

// Images Multipliers
const BACKMULTI = 0.75; 
let backgroundPic; // Stars
let backgroundx;
let backgroundy;
const MIDMULTI = 0.85;
let backGrass; // Black Shadow
let backGrassx;
let backGrassy;
const FOREMULTI = 0.4;
let foregroundGrass; // Grass infront
let foregroundGrassx;
let foregroundGrassy;

let foregroundHud;
const foreGroundHudY = 800;

// Player fields
let playerHud;
let player;

// Level Objects
let squares = [];
let scenery = [];
let enemies = [];
let guns = [];
let bullets = [];
let droppedGuns = [];


let drops = new DropController();

// let
let worldX;
let worldY;



let frameRateTotal;
let frameRateCount;

let clicked;
let gameOver;
let overScreen;
let overCount;
let imageOpacity;

let nextLevel = false;
let nextLevelPic;
let nextLevelCount = 0;

let paused;
let pauseScreen;
let started;
let startScreen;
let level = 1;

function setup() {
  clicked = false;
  loaded = false;
  canvas = createCanvas(WIDTH, HEIGHT);
  nextLevelPic = loadImage("assets/images/loading-next.png");
  pauseScreen = loadImage("assets/images/pauseScreen.png")
  startScreen = loadImage("assets/images/startScreen.png")
  gameOverScreen = loadImage("assets/images/AllLevelsForNow.png")
  overScreen = loadImage("assets/images/gameOver.png");
  playerPic = loadImage("assets/images/player-image.png");
  backgroundPic = loadImage("assets/images/background-stars.png");
  playerHud = loadImage("assets/images/hud.png");
  backGrass = loadImage("assets/images/background-grass.png");
  foregroundGrass = loadImage("assets/images/foreground-grass-blurred.png");
  foregroundHud = loadImage("assets/images/hud.png");
  shopBack = loadImage("assets/images/shop-back.png");
  coins = loadImage("assets/images/shop-coins.png");
  exitShop = loadImage("assets/images/shop-exit.png")

  paused = false;
  started = false;
  gameOver = false;
  shopping = true;

  squares = [];
  scenery = [];
  enemies = [];
  guns = [];
  droppedGuns = [];
  

  shopButtons = [];
  createButtons();

  tips = [];
  loadTips();

  loadLevel(level);
  loadGuns();

  imageOpacity = 0;
  overCount = 0;
  backgroundx = 0;
  backGrassx = 0;
  foregroundGrassx = 0;
  gunTickCount = 0;
  worldX = 0;
  worldY = 0;
  frameRateTotal = 0;
  frameRateCount = 0;

  frameRate(75);
  textSize(30);
  // noStroke();

  if (level === 1){
    player = new Player(STARTX, STARTY, 200, 1);
  }
  else{
    player.playerX = STARTX;
    player.playerY = STARTY;
  }
}



function loadGuns() {
  let gun1Right = "assets/images/gun-rifle-right.png"
  let gun1Left = "assets/images/gun-rifle-left.png"
  let gun1RightBullet = "assets/images/guns/rifle-bullet-right.png";
  let gun1LeftBullet = "assets/images/guns/rifle-bullet-left.png";

  let gun2Right = "assets/images/guns/shitpg.png"
  let gun2Left = "assets/images/guns/shitpg-left.png"
  let gun2RightBullet = "assets/images/guns/rpg-bullet-right.png"
  let gun2LeftBullet = "assets/images/guns/rpg-bullet-left.png"

  //


  // START GUN
  guns.push (new Gun(17, 7, 10, 20, gun1Left, gun1Right, gun1RightBullet, gun1LeftBullet, 0, 20, 2, 30, 50, "Starter Rifle"))
  // ROCKET
  guns.push (new Gun(6, 25, 80, 50, gun2Left, gun2Right, gun2RightBullet, gun2LeftBullet, 50, 20, 10, 100, 100, "Basic RPG"))
  // BOSS FIGHT ROCKET
  guns.push (new Gun(8, 55, 100, 75, gun2Left, gun2Right, gun2RightBullet, gun2LeftBullet, 0, 0, 0, 0, 0, "Boss RPG"))

  // DROPPED GUNS

  switch (level){
    case 1:
        droppedGuns.push (new GunController(false, 2250, -20, guns[1]))
        droppedGuns[0].dropped = true;
        droppedGuns[0].canBePicked = true;
      break;
  }
}



// Main method
function draw() {
  if (!gameOver){
    if (!nextLevel){
      if (started){
        if (!paused){
          if (player.playerHealth > 0){
            clear();
            drawBackground();
            drawObjects();
            drops.updateDrops();
            player.updatePlayer();
            drawForeground();
            bulletUpdate();
            updateText();
            }
            else{ // If game is over
              endGameFade();
          }
        }
        else{ // if game is paused
          image(pauseScreen, 0, 0);
        }
      }
      else{ // if game hasnt started
        mainMenu();
      }
    }
    else{ // If next level is being loaded
      loadNextLevel();
    }
  }
  else{ // If the have passed all levels
    image(gameOverScreen, 0, 0);
  }
}






function loadNextLevel() {
  nextLevelCount++;
  image(nextLevelPic, 0, 0);

  // Load screen
  fill(255,255,255);
  textSize(80);
  text(`Level ${level}`, 700, 550)

  if (!showShop(nextLevel)){
    nextLevel = false;
    level++;
    setup();
  }
}

function mainMenu(){ // MAIN MENU METHOD TO BE PUT HERE
  image(startScreen, 0, 0)
}

function endGameFade(){
  overCount++;
  if (overCount > 20){
    overCount = 0;
    imageOpacity += 20;
  }

  tint(255, imageOpacity);
  image(overScreen, 0, 0);
}


// Event Methods
function keyPressed() {

  if (started){
      if (keyCode == LEFT_ARROW) {
        player.moving = true;
        player.direction = 0;
        if (player.inventory[player.inventoryIndex] != null)
          player.inventory[player.inventoryIndex].direction = 0;

      }
      else if (keyCode == RIGHT_ARROW) {
        player.moving = true;
        player.direction = 1;
        if (player.inventory[player.inventoryIndex] != null)
          player.inventory[player.inventoryIndex].direction = 1;

      }
      else if (keyCode == UP_ARROW) {
        if (!player.jumping) {
          player.yVelocity = JUMPFORCE;
          player.jumping = true;
        } else {
          if (DOUBLEJUMP && !player.doubleJumped) {
            player.yVelocity = JUMPFORCE;
            player.doubleJumped = true;
          }
        }
        jumping = true;
      } // Shooting
      else if (keyCode == 32) {
        player.shooting = true;
        gunTickCount = player.inventory[player.inventoryIndex].fireRate;
      } // Sprinting
      else if (keyCode == 16){
        player.sprinting = true;
      }// INVENTORY BLOCK
      else if (keyCode == 49 || keyCode == 50 || keyCode == 51 || keyCode == 52 || keyCode == 81) // inventory
      {
        switch (keyCode){
          case 49:
            if (player.inventory[0] != null && player.inventory[player.inventoryIndex] != null){
            player.inventory[0].direction = player.inventory[player.inventoryIndex].direction;
            player.inventory[0].bullets = player.inventory[player.inventoryIndex].bullets
            player.inventoryIndex = 0;
            }
            else{
              player.inventoryIndex = 0;
            }

            break;

          case 50:
            if (player.inventory[1] != null){
              player.inventory[1].direction = player.inventory[player.inventoryIndex].direction;
              player.inventory[1].bullets = player.inventory[player.inventoryIndex].bullets
              player.inventoryIndex = 1;
            }
            break;

          case 51:
            if (player.inventory[2] != null){
              player.inventory[2].direction = player.inventory[player.inventoryIndex].direction;
              player.inventory[2].bullets = player.inventory[player.inventoryIndex].bullets
              player.inventoryIndex = 2;
            }
            break;

          case 52:
            if (player.inventory[3] != null){
              player.inventory[3].direction = player.inventory[player.inventoryIndex].direction;
              player.inventory[3].bullets = player.inventory[player.inventoryIndex].bullets
              player.inventoryIndex = 3;
            }
            break;

            case 81:
              if (player.inventory[player.inventoryIndex] != null){
                player.inventory[player.inventoryIndex].dropGun(player.playerX, player.playerY)
              droppedGuns.push(player.inventory[player.inventoryIndex]);
              player.inventory.splice(player.inventoryIndex, 1);
              }

              // player.shuffleInventory();
              break;

        }
      }
      // Pause
    if (keyCode == 27){
      paused = !paused;
    }
  }
  else{
    if (keyCode == 13){
      started = true;
    }
  }
}

function keyReleased() {

  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) player.moving = false;
  else if (keyCode == 32) {
    // Space bar
    player.shooting = false;
  }
  else if (keyCode == 16){
    player.sprinting = false;
  }
}

function mousePressed() {
  if (nextLevel){
    checkClick(mouseX, mouseY)
  }
}



// Object Methods
function drawObjects() {
  fill(color(30, 90, 200));

  backGrassy = parseInt(GRASSPOS) - SHADOWOFFSET - worldY;
  backgroundy = -1800 - worldY;
  foregroundGrassy = parseInt(GRASSPOS) - GRASSOFFSET - worldY;

  for (var i = 0; i < scenery.length; i++){
    // if (
    //   parseInt(scenery[i].x) + scenery[i].picture.width >= worldX &&
    //   squares[i].x <= worldX + WIDTH
    // ) {
    //   // FIX THIS!!!
      
    // }
    
    scenery[i].relX = parseInt(scenery[i].x) - worldX;
    scenery[i].relY = parseInt(scenery[i].y) - worldY;
      scenery[i].DrawScenery();
  }

  if (player.playerX > scenery[scenery.length - 1].relX && parseInt(player.playerX) + playerPic.width < parseInt(scenery[scenery.length - 1].relX) + scenery[scenery.length - 1].picture.width){
    if (parseInt(player.playerY) + playerPic.height > scenery[scenery.length - 1].relY){
      if (level >= LEVELCOUNT){
        gameOver = true;
        console.log(level);
      }
      else{
        nextLevel = true;
      }
      }
  }



  for (var i = 0; i < squares.length; i++){
    if (
      parseInt(squares[i].x) + squares[i].picture.width >= worldX &&
      squares[i].x <= worldX + WIDTH
    ) {
      squares[i].relX = parseInt(squares[i].x) - worldX;
      squares[i].relY = parseInt(squares[i].y) - worldY;
      squares[i].Update();
    }
  }

  for (var i = 0; i < enemies.length; i++){
      enemies[i].relX = parseInt(enemies[i].x) - worldX;
      enemies[i].relY = parseInt(enemies[i].y) - worldY;
      enemies[i].UpdateEnemy();
  }

  for (var i = 0; i < droppedGuns.length; i++){
    droppedGuns[i].relX = parseInt(droppedGuns[i].gunX) - worldX;
    droppedGuns[i].relY = parseInt(droppedGuns[i].gunY) - worldY;
    droppedGuns[i].update();

    if (droppedGuns[i].relX < player.playerX + PLAYERWIDTH &&
      droppedGuns[i].relX + droppedGuns[i].gunRight.width > player.playerX &&
      droppedGuns[i].relY < player.playerY + PLAYERHEIGHT &&
      droppedGuns[i].relY + droppedGuns[i].gunRight.height > player.playerY &&
      droppedGuns[i].canBePicked){
        console.log("inside gun");
        droppedGuns[i].dropped = false;
        player.inventory.push(droppedGuns[i]);

        droppedGuns.splice(i, 1);
        return;
      }

    droppedGuns[i].dropCount++;

    if (droppedGuns[i].dropCount > 200){
      droppedGuns[i].canBePicked = true;
    }
  }
}
