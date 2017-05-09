/**
 * Hey there!
 * Try these inputs:
 * Press key 1: change the stroke color
 * Press key f: freeze the movement, press again to resume
 * Mouse Click: start a new circle-like form
 * Press Delete: restart drawing
 */
var formDimen = 25;
var moveSize = 2;
var radius_0 = 100;
var centerX, centerY;
var x = new Array(formDimen);
var y = new Array(formDimen);

// Declare kinectron
var kinectron = null;
// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;
// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

function setup(){

  createCanvas(displayWidth, displayHeight);
  smooth();

  // initial forms
  centerX=mouseX;
  centerY=mouseY;
  // centerX = width/2;
  // centerY = height/2;
  var angle = radians(360/(formDimen));
  for (var i=0; i<formDimen; i++){
    x[i] = cos(angle*i) * radius_0;
    y[i] = sin(angle*i) * radius_0;
  }

  stroke(0,255,255,100);
  background(0);
}


function draw(){
  // floating towards mouse pos
  if (mouseX !== 0 || mouseY !== 0) {
    centerX += (mouseX-centerX) * 0.01;
    centerY += (mouseY-centerY) * 0.01;
  }

  // calculate new
  for (var i=0; i<formDimen; i++){
    x[i] += random(-moveSize,moveSize);
    y[i] += random(-moveSize,moveSize);
  }

  strokeWeight(0.8);
  noFill();

  beginShape();
  curveVertex(x[formDimen-1]+centerX, y[formDimen-1]+centerY);
  for (var i=0; i<formDimen; i++){
    curveVertex(x[i]+centerX, y[i]+centerY);
  }
  curveVertex(x[0]+centerX, y[0]+centerY);
  curveVertex(x[1]+centerX, y[1]+centerY);
  endShape();
}


function mousePressed() {
  // restart a new form on mouse position
  centerX = mouseX;
  centerY = mouseY;
  var angle, radius;

  centerX = mouseX;
  centerY = mouseY;
  angle = radians(360/(formDimen));
  radius = radius_0 * random(0.5,1.0);
  for (var i=0; i<formDimen; i++){
    x[i] = cos(angle*i) * radius;
    y[i] = sin(angle*i) * radius;
  }
}

function keyReleased() {
  if (keyCode === DELETE) background(0);
  if (key == '1')//maybe choose from a color palette
    stroke(random(0,20),random(100,200),random(100,200),25);
}
