var lines=[];
var Num=30;
var c;

var wiggles=[];
var wiggles1=[];
var wiggle;
var wiggle1;
function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
  noFill();
  c=width/Num;
  for(var i=0; i< Num; i++){
     lines[i] = new VerticalLine(c*i);
     wiggles[i]=new Wiggle(random(100,150), 5,2);
     wiggles1[i]=new Wiggle(random(150,170), 5,2);
  }
  console.log(wiggles);

  // wiggle = new Wiggle(100, 5,2); // amp,freq,dimen, 1s摆动1次， 一次最大摆动200px
  // wiggle1 = new Wiggle(150, 5,2);
}

function draw() {
  background(0);
  for(var i=0; i< Num; i++){
   lines[i].display();
  }
}

function mouseMoved() {
  for(var i=0; i< Num; i++){
     wiggles[i].amp=random(mouseX,mouseX+10);
     wiggles1[i].amp=random(mouseY,mouseY+10);
  }

}

function wiggleBezier(i,startX,startY,endX,endY){
  //mouseX constrols the amplitude of the bezier p2, mouseY p3

  // wiggle.amp=random(mouseX,mouseX+10);
  // wiggle1.amp=random(mouseY,mouseY+10);
  var num = wiggles[i].getNum();
  var num1 = wiggles1[i].getNum();

  push();
  translate((endX+startX)/2,(endY+startY)/2);
  p4 = {x: (endX-startX)/2, y: (endY-startY)/2}, p1 = {x: (startX-endX)/2, y: (startY-endY)/2}
  p2 = {x: num[0], y: num[1]}, p3= {x: num1[0], y: num1[1]}

  bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
  pop();

}

//vertical line
function VerticalLine(x) {
  this.x=x;
  this.isMoving=false;

  this.endY=0;
  this.startY=10;
  console.log(this.startY);
  // this.display=function(){
  //   stroke(255);
  //   line(this.x,-20,this.x,height+20);
  // }

  this.display=function(){
    stroke(255);
    if(this.isMoving){
      line(this.x,0,this.x,this.startY);
      wiggleBezier(this.x,this.x,this.startY,this.x,this.endY);
      line(this.x,this.endY,this.x,height);
    }
    else{
      line(this.x,-20,this.x,height+20);
    }
  }
}

function keyTyped() {
  for(var i=0;i<10;i++){
    if(key==i.toString()){
      lines[i].isMoving=true;
      lines[i].startY=random(height/1.5);
      lines[i].endY=lines[i].startY+random(height/10);
    }
  }

}
