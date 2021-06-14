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

function createRandomizeButton() {
  const button = document.createElement('button');
  button.innerHTML = 'Randomize!';
  button.addEventListener('click', () => {
    const rnd = () => Math.floor(Math.random() * 800);
    coordinates = [[rnd(), rnd()], [rnd(), rnd()], [rnd(), rnd()]];
    const canvas = document.querySelector('.canvas');

    if (canvas) canvas.remove();

    x = rnd();
    x = rnd();
    init([x, y], coordinates, +document.querySelector('input')!.value ?? INTERVAL_MS);
  });

  document.querySelector('#app')!.append(button);
}

function createInput(ms: number) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = 'Set a speed in MS';
  input.value = ms.toString();

  input.addEventListener('change', (event: any) => {
    const canvas = document.querySelector('.canvas');
    if (canvas) canvas.remove();

    init([x, y], coordinates, !!event.target.value.length ? +event.target.value : INTERVAL_MS);
  })
  label.appendChild(input);
  label.prepend('Speed (ms)');
  document.querySelector('#app')!.append(label);
}

function init([x, y]: number[], targetCoordinates: number[][], ms: number) {
  const canvas = document.createElement('div');
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.classList.add('canvas');
  document.querySelector('#app')!.append(canvas);

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
let canvasHeight = window.innerHeight - 154;
let canvasWidth = Math.min(1024, window.innerWidth - 20);
let coordinates = [
  [Math.floor(canvasWidth * 4 / 8), Math.floor(canvasHeight / 40)],
  [Math.floor(canvasWidth * 1 / 8), Math.floor(canvasHeight * 7 / 8)],
  [Math.floor(canvasWidth * 7 / 8), Math.floor(canvasHeight * 7 / 8)]
];
const INTERVAL_MS = 200;
let x = canvasHeight * 1 / 4;
let y = canvasWidth * 1 / 4;


createInput(INTERVAL_MS);
createRandomizeButton();
init([x, y], coordinates, INTERVAL_MS);

window.addEventListener('resize', () => {
  const canvas = document.querySelector('.canvas');

  if (canvas) canvas.remove();

  canvasHeight = window.innerHeight - 154;
  canvasWidth = Math.min(1024, window.innerWidth - 20);
  coordinates = [
    [Math.floor(canvasWidth * 4 / 8), Math.floor(canvasHeight / 40)],
    [Math.floor(canvasWidth * 1 / 8), Math.floor(canvasHeight * 7 / 8)],
    [Math.floor(canvasWidth * 7 / 8), Math.floor(canvasHeight * 7 / 8)]
  ];
  console.log(canvasWidth, canvasHeight);

  init([x, y], coordinates, +document.querySelector('input')!.value ?? INTERVAL_MS);
});