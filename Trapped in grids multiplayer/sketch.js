var tethers = [];
var xCount = 40;
var yCount = 40;
var xOffset, yOffset;
var xSpacing, ySpacing;
var pushRadius;
var startAngle = 0;
var angleVel = 0.23;

// Declare kinectron
var kinectron = null;

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;
function make2Darray(cols,rows){
   var arr = new Array (cols);
  for(var i=0; i<arr.length; i++){
    arr[i]=new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  frameRate(60);
  ellipseMode(CENTER);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.231.112");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;

  background(0);
  // noStroke();

  //xCount, yCount=40
  xSpacing = width / xCount;
  ySpacing = height / yCount;
  tethers = make2Darray(xCount, yCount);
  for(var y=0; y<yCount; y++){
    for(var x=0; x<xCount; x++){
      var xpos = x*xSpacing;
      var ypos = y*ySpacing;
      tethers[x][y]= new Tether(xpos, ypos);

      //console.log(tethers[x][y].y);
    }
  }
  pushRadius = windowWidth/4;
  xOffset = xSpacing/2;
  yOffset = ySpacing/2;
}

function draw() {
  background(0);
  // Get positions of all bodies
  var positions = bm.getPositions(kinectron.HEAD);
  // var positions=[createVector(width/2,height/2),createVector(width/3,height/4),createVector(width/4,height/2)];

  push();
  translate(xOffset, yOffset);

  for(var j=0; j<yCount-1; j++){

    beginShape(TRIANGLE_STRIP);

    for(var i=0; i<xCount; i=i+1){

      for (var p = 0; p < positions.length; p++) {

        // Draw all the body positions
        var pos = positions[p];
        console.log(pos);
        tethers[i][j].move(pos.x,pos.y);
      }
      stroke(0,250,250);
      noFill();
        //strokeWeight(4);
      var u = map(i, 0, xCount, 0, width);
      var v = map(j, 0, yCount, 0, height);

      vertex(tethers[i][j].x, tethers[i][j].y);
      vertex(tethers[i][j+1].x, tethers[i][j+1].y);

     }
     endShape();
  }
  pop();

}

function Tether(x, y){
  this.x = x;
  this.y = y;
  this.xv = 0;
  this.yv = 0;
  this.startX = x;
  this.startY = y;
  this.damping = 0.97;
  this.springMult = 0.01;
  this.pushMult = 0.5;
  this.d = 3;

  this.move = function(xpos,ypos){
    var xdiff = (xpos-xOffset) - this.x;
    var ydiff = (ypos-yOffset) - this.y;
    var dist = sqrt(xdiff*xdiff + ydiff*ydiff);
    var xdiffNorm = xdiff/dist;
    var ydiffNorm = ydiff/dist;

    // move away from cursor when within pushRadius
    if(dist < pushRadius){
      var force = (1 - dist/pushRadius) * this.pushMult;
      this.xv -= xdiffNorm * force;
      this.yv -= ydiffNorm * force;
    }

    // get the distance of the tether end from its start position
    var springXdiff = this.startX - this.x;
    var springYdiff = this.startY - this.y;
    var springDist = sqrt(springXdiff*springXdiff + springYdiff*springYdiff);
    if(springDist > 0){
      // get the normalized vectors of the spring tether
      var normSpringX = springXdiff / springDist;
      var normSpringY = springYdiff / springDist;
      //console.log(normSpringX +", "+ normSpringY +" = "+ springDist);
      this.xv += normSpringX * (springDist * this.springMult);
      this.yv += normSpringY * (springDist * this.springMult);
    }


    this.x+=this.xv;
    this.y+=this.yv;
    this.xv *= this.damping;
    this.yv *= this.damping;
    //fill(255,0,0);
    //ellipse(this.xv,this.yv,8,8);
    fill(0,255,255);
    ellipse(this.x,this.y,3,3);
  }
}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}
