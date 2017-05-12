var gif;
var gifW=400;
var gifH=800;

var hline;
var hline2;
var grid;

var flash;
var isFlashing=false;
var fx=0;
function preload() {
  flash = loadImage("flash.png");
  gif = loadGif('a5.gif');

}
function setup() {
  createCanvas(displayWidth, displayHeight);
  // photo.copy(bricks, 0, 0, x, y, 0, 0, x, y);
  hline=new horizontalLine();
  hline2=new horizontalLine2();
  grid=new Grid();
}

function draw() {
  background(0);
  copy(gif, 0, 0, 400, 800, width/3, 0, width/3, height);

  // image(gif, width/2-gifW/2, 0);
  // fill(0, 96, 93,90);
  // fill(1, 66, 64,90);
  fill(3, 66, 62,90);

  rect( width/3, 0,width/3,height);
  hline.move();
  hline.display();
  hline2.move();
  hline2.display();
  grid.display();

  if(isFlashing){
    image(flash,fx,0);
    fx++;
  }

  if(fx>=2880){
    fx=0;
    isFlashing=false;
  }
}

function mousePressed(){
  isFlashing=true;
}

function Grid(){
  this.display=function(){
    push();
    translate(width/3,0);
    stroke(255,50);
    for(var i=0; i<20; i++){
      rect(0,i*height/20,width/3,1);
      // line(0,height/2,width,height/2);
      // line(width/3,i*height/10,width/3,i*height/10);
    }
    for(var i=0;i<7;i++){
      rect(i*width/20,0,1,height);

    }
      // for(var i=0; i<20; i++){
      //
      //   stroke(255,20);
      //   rect(0,i*height/20,width,1);
      //   rect(i*width/20,0,1,height);
      //   // line(0,height/2,width,height/2);
      //   // line(width/3,i*height/10,width/3,i*height/10);
      // }
    pop();

  }

}

function horizontalLine(){
  this.y=0;
  this.move=function(){
    if(this.y>=height){
      this.y=0;
    }
    else{
      this.y=this.y+2;
    }
  }
  this.display=function(){
    push();
    strokeWeight(5);
    var offset=random(-1,1);
    stroke(255,100+offset*30);
    line(0,this.y+offset,width,this.y+offset);

    fill(255);
    rect(0,this.y+offset,width,1);
    pop();
  }
}

function horizontalLine2(){
  this.y=height;
  this.move=function(){
    if(this.y<=0){
      this.y=height+100;
    }
    else{
      this.y=this.y-2;
    }
  }
  this.display=function(){
    push();
    strokeWeight(5);
    var offset=random(-1,1);
    stroke(255,100+offset*30);
    line(0,this.y+offset,width,this.y+offset);

    fill(255);
    rect(0,this.y+offset,width,1);
    pop();
  }
}
