// SCENERY CONSTANT
const GRASSPOS = 720;
const GRASSOFFSET = 80;
const SHADOWOFFSET = 190;

function drawBackground() {
    // Background that will scroll foreverrrrrrrrr
  
    // BACKGROUND
    image(backgroundPic, backgroundx, backgroundy);
  
    if (backgroundx <= 0) {
      image(backgroundPic, backgroundx + backgroundPic.width, backgroundy); // Image width is 1200
    } else {
      image(backgroundPic, backgroundx - backgroundPic.width, backgroundy);
    }
  
    if (backgroundx >= backgroundPic.width) {
      backgroundx = 0;
    } else if (backgroundx <= -backgroundPic.width) {
      backgroundx = 0;
    }
  
    // MIDGROUND
    image(backGrass, backGrassx, backGrassy);
  
    if (backGrassx <= 0) {
      image(backGrass, backGrassx + backGrass.width, backGrassy);
    } else {
      image(backGrass, backGrassx - backGrass.width, backGrassy);
    }
  
    if (backGrassx >= backGrass.width) {
      backGrassx = 0;
    } else if (backGrassx <= -backGrass.width) {
      backGrassx = 0;
    }
  }
  
  function drawForeground() {
  
    image(foregroundGrass, foregroundGrassx, foregroundGrassy);
  
    if (foregroundGrassx <= 0) {
      image(
        foregroundGrass,
        foregroundGrassx + foregroundGrass.width,
        foregroundGrassy
      );
    } else {
      image(
        foregroundGrass,
        foregroundGrassx - foregroundGrass.width,
        foregroundGrassy
      );
    }
  
    if (foregroundGrassx >= foregroundGrass.width) {
      foregroundGrassx = 0;
    } else if (foregroundGrassx <= -foregroundGrass.width) {
      foregroundGrassx = 0;
    }
  
    frameRateTotal += frameRate();
    frameRateCount++;
  
    if (frameRateCount > 2000) {
      frameRateCount = 0;
      frameRateTotal = 0;
    }
  
    // FPS AND WORLD X
    // fill(color("white"));
    // text(`World X : ${worldX}`, 50, 550);
    // text(
    //   `Average FPS : ${(frameRateTotal / frameRateCount).toFixed(2)}`,
    //   50,
    //   100
    // );
  }


  class Scenery {
    constructor(x, y, imageURL){
      this.x = x;
      this.y = y;
      this.relX;
      this.picture = loadImage(imageURL);
    }
  
    DrawScenery() {
      image(this.picture, parseInt(this.relX), this.relY);
    }
  }