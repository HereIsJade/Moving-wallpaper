PFont font;
String[] text = {"Oh you can't help that,",  "said the Cat.", "We're all mad here.",  "I'm mad. You're mad." };
int size = 48;
int index = 0;

void setup(){
  size(800, 800);
  background(0);
  textAlign(CENTER);
  //font = loadFont("TlwgTypewriter-48.vlw"); //You can create fonts with Tools/Create Font in Processing
  //textFont(font, size);
  for (int i = 0; i < text.length; i++){
    float posx = 200;
    float posy =  200 + i * 50;
    for (int j = 0; j < text[i].length(); j++){
    textSize(size);
    text(text[i].charAt(j), posx, posy);
    posx = posx + textWidth(text[i].charAt(j)) +random(-10, 10);
    if (random(0.0, 1.0) < 0.3){
       size = size + int(random(-10, 10));
       glitch(posx, posy); 
      }
    }
  }
}

void draw(){
}

void glitch(float x, float y){
  char c = char(int(random(130, 255)));
  text(c, x + random(-10, 10), y + random(-10, 10));
}