var alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
var cols=100;
var rows=70;
var horizontalTextSize;
var verticalTextSize;
var letters=[];
var isMoving=false;
var isFalling=false;
function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
  horizontalTextSize=displayWidth/cols;
  verticalTextSize=displayHeight/rows;
  letters=make2Darray(cols,rows);
  for (var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      letters[i][j]=new Letter(i,j);
    }
  }

  for (var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      letters[i][j].display();
    }
  }

    console.log(letters.length);
}

function mousePressed(){
  isMoving=true;
}
function keyPressed(){

    isFalling=true;
    console.log(isFalling);

}

function draw() {
  background(0);

  if(isMoving){
    for (var i=0;i<cols;i++){
      for(var j=0;j<rows;j++){
        letters[i][j].moveUp(20);
      }
    }
  }

  if(isFalling){
    for (var i=0;i<cols;i++){
      for(var j=0;j<rows;j++){
        letters[i][j].fall();
      }
    }
  }

  for (var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      letters[i][j].display();
    }
  }
  // horizontallyMove(20);
  // horizontallyMove(12);
  // horizontallyMove(50);
  // horizontallyMove(51);
}


function horizontallyMove(n){
  var head=letters[0][n].letter;
  fill(0);
  rect(0,(n-1)*verticalTextSize,width,verticalTextSize+3);
  for (var i=0;i<cols;i++){
    if (i==cols-1){
      letters[i][n].letter=head;
    }
    else{
      letters[i][n].letter=letters[i+1][n].letter;
    }
    letters[i][n].display();
  }
}

function Letter(x,y){
  this.letter=alphabets[parseInt(random(alphabets.length))];
  this.x=x*horizontalTextSize;
  this.y=y*verticalTextSize;

  this.wiggle=true;
  this.velocityX=0;
  this.velocityY=0;


  this.fall=function(){
    if(abs(this.y-50)<5){
      this.velocityY=random(240,280);
    }
    else if(abs(this.y-50)<10  && abs(this.y-50)>5){
      this.velocityY=random(200,240);
    }
    else if(abs(this.y-50)<15  && abs(this.y-50)>10){
      this.velocityY=random(160,200);
    }
    else if(abs(this.y-50)<25  && abs(this.y-50)>15){
      this.velocityY=random(120,160);
    }
    else{
      this.velocityY=random(90,120);
    }

    this.velocityX=0;

    if(abs(this.y-height)<30){
      this.velocityY=random(-10,10);
    }

    this.y+=this.velocityY;
  }

  this.moveUp=function(targetY){

    if(abs(targetY-this.y)>50){
      this.wiggle=false;
      this.velocityY=random(8,20);
      this.velocityX=random(-5,5);
    }
    else{
      this.wiggle=true;
    }
    if(this.wiggle===true){
    this.velocityX=random(-2,2);
    this.velocityY=random(-20,20);;
    }

      this.y-=this.velocityY;
      this.x+=this.velocityX;


    //   if(abs(this.y-targetY)>abs(this.x-targetX)){
    //     this.velocityY=map(abs(this.y-targetY),0,height,1,14)*random(1,2);
    //     this.velocityX=map(abs(this.x-targetX),0,width,1,15)*random(0.5,1);
    //   }
    //   else{
    //     this.velocityY=map(abs(this.y-targetY),0,height,1,14)*random(0.5,1);
    //     this.velocityX=map(abs(this.x-targetX),0,width,1,15)*random(1,2);
    //   }
    //
    //   if(this.x<targetX){
    //     this.x+=this.velocityX;
    //   }
    //   else if(this.x>=targetX){
    //     this.x-=this.velocityX;
    //   }
    //   if(this.y<targetY){
    //     this.y+=this.velocityY;
    //   }
    //   else if(this.y>=targetY){
    //     this.y-=this.velocityY;
    //   }
      // else if(this.y>targetY){
      //   this.y-=this.velocityY;
      // }
    // }
    // else{
    //   this.pause=true;
    // }
  }

  this.display=function(){
    fill(0, 255, 255);
    // textSize(3);
    text(this.letter, this.x, this.y);
  }
}

function make2Darray(cols,rows){
   var arr = new Array (cols);
  for(var i=0; i<arr.length; i++){
    arr[i]=new Array(rows);
  }
  return arr;
}
