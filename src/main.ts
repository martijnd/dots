import './style.css'

function setDot(canvas: HTMLDivElement, [x, y]: number[]) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.top = `${y}px`;
  dot.style.left = `${x}px`;
  canvas.append(dot);
}

function setTargets(canvas: Element, coords: number[][]) {
  coords.forEach(([x, y], index) => {
    const target = document.createElement('div');

    target.classList.add('target');
    target.style.top = `${y}px`;
    target.style.left = `${x}px`;
    target.innerHTML = `${(index + 1) * 2 - 1},${(index + 1) * 2}`
    canvas.append(target);
  })
}

function init([x, y]: number[], targetCoordinates: number[][], ms: number) {
  const canvas = document.createElement('div');
  canvas.classList.add('canvas');
  document.body.append(canvas);
  
  const resultEl = document.createElement('div');
  resultEl.classList.add('result');
  canvas.append(resultEl);
  
  setTargets(canvas, coordinates);
  setDot(canvas, [x, y]);

  setInterval(() => {
    const num = Math.floor(Math.random() * 6);
    
    resultEl.innerHTML = `i = ${num + 1}`;
    const [targetX, targetY] = targetCoordinates[Math.floor(num / 2)];
    x = Math.floor((x + targetX) / 2);
    y = Math.floor((y + targetY) / 2);

    setDot(canvas, [x, y]);
  }, ms);
}

const coordinates = [[400, 20], [100, 700], [700, 700]];
let x = 200;
let y = 200;
const INTERVAL_MS = 3000;

init([x, y], coordinates, INTERVAL_MS);