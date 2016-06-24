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
    // song = loadSound('songs/song1.mp3');
    // song2 = loadSound('songs/blue_tit.mp3');
    // song3 = loadSound('songs/bullfinch.mp3');
    // song4 = loadSound('songs/great_tit.mp3');
    // song5 = loadSound('songs/tawny_owl.mp3');

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
    // osc = new p5.Oscillator();

    osc = new p5.SinOsc() // create new oscilator

    osc.setType('sine');

    // osc.freq(freq); // apply freq
    // osc.amp(.5);

    fft = new p5.FFT();
    osc.start();
}


function draw() {
    background(0);
    var d = pixelDensity();

    image(capture, offsetX, offsetY);

    filter('GRAY');

    capture.loadPixels();

    var index = 0;

    // var c = capture.get(50,90);
    // console.log(c);

  index = capture.pixels[Math.floor((mouseX - offsetX) + ((mouseY-offsetY) * w/2 * 4)) * d];
  // console.log(Math.floor(mouseX + (mouseY * w * 4)) * d);
  console.log(index);
  console.log('mouse' + (mouseX - offsetX) + (mouseY-offsetY));

  // freq = midiToFreq(60) // var to hold freq

  // change oscillator frequency based on index value
    if (index !== undefined) {

      if( index > 0 && index < 38 ){
         // midi = 60;
        //C4
        freq = 261.63;
      }
      else if( index > 51 && index < 102){
         // midi = 62;
        //D4
        freq = 293.67;
      }
      else if( index > 153 && index < 179){
         // midi = 64;
        //E4
        freq = 329.63;
      }
      else if( index > 191 && index < 204){
         // midi = 67;
        //F4
        freq = 349.23;
      }
      else if( index > 217 && index < 230){
         // midi = 67;
        //G4
        freq = 392;
      }
      else if( index > 230){
        // midi = 69;
        //A4
        freq = 440;
      }
      // else if( index > 189 && index < 210){
      //   freq = 70;
      // }
      // else if( index > 210){
      //   freq = 72;
      // }

      // var freq = map(index, 0, 255, 261, 415);
      osc.freq(freq);

      var amp = map(index, 0, 255, 1, 0.2);
      osc.amp(amp);
  } else {
    console.log("holly shit");
  }
}

// function mousePressed() {

//   capture.loadPixels();

//   var c = capture.get(mouseX-offsetX,mouseY-offsetY);

//   console.log(c);


//   // capture.loadPixels();

//   // var x = mouseX;

//   // var y = mouseY;


//   // var d = pixelDensity();



//   if ( song.isPlaying() ) { // .isPlaying() returns a boolean
//     song.stop();

//     //background(255,0,0);
//   } else {
//     song.play();
//     //background(0,255,0);

//   }
// }
