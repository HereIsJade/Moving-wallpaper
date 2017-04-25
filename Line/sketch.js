var Line=[];
var Num=30;
var c;

function setup() { 
  createCanvas(600, 400);
  c=width/Num;
  for(var i=0; i< Num; i++){
     Line[i] = new drawLine(c*i);
    }
} 

function draw() { 
  background(250);
  for(var i=0; i< Num; i++){
   Line[i].display();
 
  }
}

function drawLine(x) {
  this.x=x;
  
  this.update=function(){
  }
  
  this.display=function(){
    //stroke(0);
    line(this.x,-20,this.x,height+20);
      //console.log(this.x);
  }
  
}