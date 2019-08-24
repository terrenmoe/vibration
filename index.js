
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
  noStroke();
  frameRate(10);
  mic.start();
  micLevel = mic.getLevel();
  fft.setInput(mic);
  elem = document.createElement('ul');
  document.body.appendChild(elem);
}
function createRichElement(htmlTag, txt) {
  let outputElement = document.createElement(htmlTag);
  outputElement.textContent = txt;
  return outputElement;
}
function appendNewRichElement(target, tag, text) {
  const newRich = createRichElement(tag, text)
  target.appendChild(newRich);
  return;
}

function draw() {
  background(127);
  spectrum = fft.analyze();
  spectrum.forEach((i) => {
  //for (let i = 0; i < spectrum.length; i += 2) {
    x = map(i, 0, spectrum.length, 0, width * 2);
    h = -height + map(spectrum[i], 0, 255, height, 0);
    arc(x, height, width / spectrum.length, h, 0, HALF_PI);
  })
}

function mouseClicked() {
  elem.innerHTML = '';
  spectrum.forEach((cur, idx) => {
    if(cur === 0) return;
    appendNewRichElement(elem, 'li', `${cur.toPrecision(3)}db`);
  });
}
