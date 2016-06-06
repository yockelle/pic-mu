float diam = 0;
float freq = 0;
float amp = 0;
float pos = 0;
float add = 0;
/**
 * Getting Started with Capture.
 * 
 * Reading and displaying an image from an attached Capture device. 
 */
//int rows = width/20;
//int cols = height/20;
//int imageArray [] [] = new int [cols][rows];

import processing.sound.*;
import processing.video.*;
SinOsc sine;
Capture cam;

void setup() {
  size(640, 480);
  cam = new Capture(this, 640, 480);
  cam.start();
  sine = new SinOsc(this);
  sine.play();
}

void draw() {
  background(255);
  if (cam.available() == true) {
    cam.read();
  }
  //image(cam, 0, 0);
  
  for (int i=0; i<width; i+=10)
  {
    for (int j=0; j<height; j+=10)
    {
      float bright = (cam.get(i, j));
      diam = map(brightness(int(bright)), 255, 0, 0, 15);
      fill(0);
      ellipse(i, j, diam, diam);
    }
  }
  
  for (int i=0; i< width; i+=100)
  {
    for (int j=0; j<height; j+=100)
    {
      float bright = (cam.get(i, j));
      freq = map(brightness(int(bright)), 255, 0, 200, 500);
      amp = map(brightness(int(bright)), 255, 0, 0.0, 1.0);
      sine.set(freq, amp, 0.0, 0.0 );
    }
  }
}