let frame = document.getElementById('canva');
const ctx = frame.getContext('2d');

// Settings

frame.width = window.innerWidth - 50;
frame.height = window.innerHeight - 50;
const frameWidth = frame.width;
const frameHeight = frame.height;

const wind = -5; // [-10, 10]
const gravity = 7;
const maxFPS = 90;
const rainDensity = 40;
const snowSize = 4; // only to snow

const rainWidth = snowSize;
const rainHeight = snowSize;
const rainCount = (frameWidth / 100) * rainDensity;

// Helping functions

const getColor = (opacity) => {
  return 'rgba(220,220,220,' + opacity + ')';
};

const drawRect = (x, y, width, height, opacity) => {
  ctx.fillStyle = getColor(opacity);
  ctx.fillRect(x, y, width, height);
  // console.log("Drawing Rect");
};

// Rain

const makeDrop = () => {
  size = Math.random();
  x = parseInt(Math.random() * frameWidth - (frameWidth / 20) * wind);
  y = parseInt(Math.random() * -frameHeight);
  return [x, y, size];
};

const drawDrop = ([x, y, size]) => {
  // console.log("Drawing Drop")
  drawRect(x, y, size * rainWidth, size * rainHeight, size);
};

const moveDrop = ([x, y, size]) => {
  x = x + (wind * (60 / maxFPS) * (3 - size)) / 3;
  y = y + gravity * (60 / maxFPS) * (1 + size);
  if (y > frameHeight) return makeDrop();
  else return [x, y, size];
};

const createRain = () => {
  let rainArray = [];
  let i = rainCount;
  while (i > 0) {
    rainArray.push(makeDrop());
    i--;
  }
  // console.log(rainArray.length + " " + rainArray[0].length);
  return rainArray;
};

const refreshRain = (rainArray) => {
  let i = rainArray.length - 1;
  while (i >= 0) {
    rainArray[i] = moveDrop(rainArray[i]);
    drawDrop(rainArray[i]);
    console.log(rainArray[i][0] + ' ' + rainArray[i][1]);
    i--;
  }
};

const update = (rain) => {
  ctx.clearRect(0, 0, frameWidth, frameHeight);

  refreshRain(rain);
  // wind = wind + (Math.random() - 0.5)*0.01
  console.log('Updated');
};

const rainLoop = () => {
  let rain = createRain();
  console.log('Rain made');
  // setInterval(update(), 20)
  // let n = 1000;
  // while(n > 0){
  //     update();
  //     n--;
  // }
  setInterval(() => {
    update(rain);
  }, 1000 / maxFPS);
};

// Main Loop
window.addEventListener(
  'resize',
  () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false,
); // doesn't change canvas size
window.addEventListener('load', rainLoop);
