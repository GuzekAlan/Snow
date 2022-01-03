const frame = document.getElementById('canva');
const ctx = frame.getContext('2d');

// Settings

frame.width = window.innerWidth - 50;
frame.height = window.innerHeight - 50;
const frameWidth = frame.width;
const frameHeight = frame.height;

const wind = 5; // [-10, 10]
const gravity = 7;
const maxFPS = 90;
const rainDensity = 30;

const rainWidth = 4;
const rainHeight = 4;
const rainCount = parseInt((frameWidth / 100) * rainDensity);

// Helping functions

const getColor = (opacity) => {
  return `rgba(220,220,220,${opacity})`;
};

const drawRect = (x, y, width, height, opacity) => {
  ctx.fillStyle = getColor(opacity);
  ctx.fillRect(x, y, width, height);
};

// Rain

const makeDrop = () => {
  const size = Math.random();
  const x = parseInt(Math.random() * frameWidth - (frameWidth / 20) * wind);
  const y = parseInt(Math.random() * -frameHeight);
  return [x, y, size];
};

const drawDrop = ([x, y, size]) => {
  drawRect(x, y, size * rainWidth, size * rainHeight, size);
};

const moveDrop = ([x, y, size]) => {    
  const _x = x + (wind * (60 / maxFPS) * (3 - size)) / 3;
  const _y = y + gravity * (60 / maxFPS) * (1 + size);
  if (_y > frameHeight) {
    return makeDrop();
  } else {
    return [_x, _y, size];
  }
};

const createRain = (rainCount) => {
  console.log('Rain created');
  return Array(rainCount).fill(0).map(makeDrop);  // Using existing classes and methods
};

const refreshRain = (rainArray) => {
  rainArray.forEach((drop, i) => {
    rainArray[i] = moveDrop(drop);
    drawDrop(drop);
  });
};

const rainLoop = () => {
  let rain = createRain(rainCount);
  setInterval(() => {
    ctx.clearRect(0, 0, frameWidth, frameHeight);
    refreshRain(rain);
  }, 1000 / maxFPS);
};

// Main Loop
window.addEventListener(
  'resize',
  () => {
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
  },
  false,
); // Only changes size on reload (probably problem is not here)
window.addEventListener('load', rainLoop);
