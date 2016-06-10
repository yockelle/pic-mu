var capture;
var w;
var h;
var osc;
var fft;

function setup() {
  // w = 800;
  // h = 600;
    w = document.getElementById('myContainer').clientWidth;
    h = w * 3 / 4;               // 4:3 camera aspect?
    myCanvas = createCanvas(w, h);
    myCanvas.parent('myContainer');
    stroke(0);

    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();             // Stop the raw capture appearing too.

    // osc = new p5.TriOsc(); // set frequency and type
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.amp(.5);

    fft = new p5.FFT();
    osc.start();
}


function draw() {
    background(0);
    var d = pixelDensity();

  imageMode(CENTER);
  image(capture, w/2, h/2, w, h);
  filter(GRAY);

  capture.loadPixels();
  capture.get();
  var index = 0;
  index = capture.pixels[Math.floor(mouseX + (mouseY * w/2 * 4)) * d];
  console.log(Math.floor(mouseX + (mouseY * w * 4)) * d);
  console.log(index);

  // change oscillator frequency based on index value
  if (index !== undefined) {
    var freq = map(index, 0, 255, 40, 880);
    osc.freq(freq);

    var amp = map(index, 0, 255, 1, .01);
    osc.amp(amp);
  } else {
    console.log("holly shit")
  }
}
