var alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
var cols=280;
var rows=190;
var horizontalTextSize;
var verticalTextSize;
var letters=[];
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
}

function draw() {

  horizontallyMove(20);
  horizontallyMove(12);
  horizontallyMove(50);
  horizontallyMove(51);
}

function mousePressed(){
  // horizontallyMove(parseInt(random(rows)));
  horizontallyMove(20);
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
  this.display=function(){
    fill(0, 255, 255);
    textSize(3);
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
