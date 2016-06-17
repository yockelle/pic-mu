var capture;
var w;
var h;
var osc;
var fft;
var frameWidth=640;
var frameHeight=480;

function setup() {
  // w = 800;
  // h = 600;
    song = loadSound('songs/song1.mp3');
    song2 = loadSound('songs/blue_tit.mp3');
    song3 = loadSound('songs/bullfinch.mp3');
    song4 = loadSound('songs/great_tit.mp3');
    song5 = loadSound('songs/tawny_owl.mp3');

    w = document.getElementById('myContainer').clientWidth;
    h = w * 3 / 4;               // 4:3 camera aspect?
    myCanvas = createCanvas(w, h);
    myCanvas.parent('myContainer');
    offsetX = (w-frameWidth)/2;
    offsetY = (h-frameHeight)/2;

    capture = createCapture(VIDEO);
    capture.size(frameWidth, frameHeight);
    capture.hide();             // Stop the raw capture appearing too.
    frameRate(10);

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

    image(capture, offsetX, offsetY);
    filter(GRAY);

    // capture.loadPixels();

    // var yomo = capture.get(mouseX,mouseY,10,10);
    // console.log(yomo);


    var index = 0;

    // var c = capture.get(50,90);
    // console.log(c);

  // index = capture.pixels[Math.floor(mouseX + (mouseY * w/2 * 4)) * d];
  // console.log(Math.floor(mouseX + (mouseY * w * 4)) * d);
  // console.log(index);

  // // change oscillator frequency based on index value
  //   if (index !== undefined) {
  //     var freq = map(index, 0, 255, 40, 880);
  //     osc.freq(freq);

  //     var amp = map(index, 0, 255, 1, .01);
  //     osc.amp(amp);
  // } else {
  //   console.log("holly shit");
  // }
}

function mousePressed() {

  capture.loadPixels();

  var c = capture.get(mouseX-offsetX,mouseY-offsetY);

  console.log(c);

  // console.log('kurfa');

  // capture.loadPixels();

  // var x = mouseX;

  // var y = mouseY;


  // var d = pixelDensity();

  // var off = ( x + (y * w/2 * 4)) * d;

  // var grabd = [pixels[off], pixels[off+1], pixels[off+2], pixels[off+3]];

  // console.log(grabd);


  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();

    //background(255,0,0);
  } else {
    song.play();
    //background(0,255,0);

  }
}
