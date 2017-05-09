float xOffset = 0;       // Perlin x-offset
float yOffset = 0;       // Perlin y-offset
float offsetInc = 0.006; // Perlin offset incremeint
float inc = 1;           // Perin incremeint
float s = 1;             // Start size of perlin ring
float m = 1.005;         // Size multiplier
int nPoints=0;

void setup() {
  size(500, 500);
  background(0);
  blendMode(ADD);
  noFill();
  stroke(255, 64, 8, 128);
}

void draw() {
  //ellipse(20,100,20,20);
  translate(width * 0.5, height * 0.5);

  if (s < 2000) {
    // Create a series of perlin rings from big to small
    for (int intimes = 0; intimes < 10; intimes++) {

      // Less poiints for smaller rings
      nPoints = int(2 * PI * s);
      nPoints = min(nPoints, 500);

      // Create ring
      beginShape(POINTS);
      for (int i = 0; i < nPoints; i++) {
        float a = i / nPoints * TAU;
        PVector p = PVector.fromAngle(i / nPoints * TAU);
        float n = noise(xOffset + p.x * inc, yOffset + p.y * inc) * s;
        // console.log(n);
        p.mult(n);
        vertex(p.x, p.y);
      }
      endShape();

      // Incremeint perlin offset for next ring
      xOffset += offsetInc;
      yOffset += offsetInc;

      // Update size
      s *= m;
      //ellipse(100,100,20,20);
    }
  } else {
    noLoop();
  }
}