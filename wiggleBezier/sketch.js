var wiggle;
var wiggle1;
function setup() {
  createCanvas(700, 600);
  background(0);
  wiggle = new Wiggle(100, 5,2); // amp,freq,dimen, 1s摆动1次， 一次最大摆动200px
  wiggle1 = new Wiggle(150, 5,2);
}

function draw() {
  background(0);

  //mouseX constrols the amplitude of the bezier p2, mouseY p3
  wiggle.amp=mouseX;
  wiggle1.amp=mouseY;
  
  var num = wiggle.getNum();
  var num1 = wiggle1.getNum();
  console.log(num[0]);
  noFill();
  stroke(0, 255, 255);


  push();
  translate(width/2,height/2);

  p1 = {x: 0, y: -200}, p4 = {x: 0, y: 200}
  p2 = {x: num[0], y: num[1]}, p3= {x: num1[0], y: num1[1]}

  bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
  pop();
}
