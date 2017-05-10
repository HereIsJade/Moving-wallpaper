int n=80;
int spaceX=0;
int spaceY=0;
void setup()
{
  background(0);
  fullScreen();
  spaceX=width/n;
  spaceY=height/n;
  
  strokeWeight(0.6);
  stroke(0,255,255);
  for(int i=0;i<n;i++){
    //line(i*spaceX,0,i*spaceX,height);
    line(0,i*spaceY,width/2,i*spaceY);
  }
  
  for(int i=0;i<n;i++){
    line(i*spaceX,0,width,height-i*spaceY);
    line(width,i*spaceY,i*spaceX,height);
  }
}


void draw(){
  
}