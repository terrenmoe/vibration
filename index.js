let HEIGHT;
let WIDTH;
let cnv;
let elem;
let fft;
let h;
let mic;
let micLevel;
let spectrum;
let x;

function setup() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  cnv = createCanvas(WIDTH, HEIGHT);
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  noFill();
  frameRate(20);
  strokeWeight(2);
  mic.start();
  micLevel = mic.getLevel();
  fft.setInput(mic);
  elem = document.createElement('ul');
  document.body.appendChild(elem);
}

function createRichElement(htmlTag, txt) {
  const outputElement = document.createElement(htmlTag);
  outputElement.textContent = txt;
  return outputElement;
}

function appendNewRichElement(target, tag, text) {
  const newRich = createRichElement(tag, text);
  target.appendChild(newRich);
  return target;
}

const ident = (value) => value;

function draw() {
  background(0, 0, 0, 30);
  spectrum = fft.analyze();
  spectrum.filter(ident).forEach((cur, idx, arr) => {
    stroke(255 - (idx % 255), 2 * (idx % 127), 5 * (idx % 51), 171);
    x = map(cur, 0, 255, 0, WIDTH);
    h = -HEIGHT + map(arr[cur], 0, 255, HEIGHT, 0);
    arc(x, HEIGHT, WIDTH / arr.length, h, 0, HALF_PI);
  });
}

function mouseClicked() {
  elem.innerHTML = '';
  spectrum.filter(ident).forEach((cur, idx) => {
    appendNewRichElement(elem, 'li', `${cur.toPrecision(3)}db`);
  });
}
