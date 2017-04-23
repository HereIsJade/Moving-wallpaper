/**
 * 
 * PixelFlow | Copyright (C) 2016 Thomas Diewald - http://thomasdiewald.com
 * 
 * A Processing/Java library for high performance GPU-Computing (GLSL).
 * MIT License: https://opensource.org/licenses/MIT
 * 
 */
import com.thomasdiewald.pixelflow.java.DwPixelFlow;
import com.thomasdiewald.pixelflow.java.fluid.DwFluid2D;
import processing.core.*;
import processing.opengl.PGraphics2D;

private class MyFluidData implements DwFluid2D.FluidData {

  // update() is called during the fluid-simulation update step.
  @Override
    public void update(DwFluid2D fluid) {

    float px, py, vx, vy, radius, vscale, temperature;

    radius = 15;
    vscale = 10;
    px     = width/2;
    py     = 50;
    vx     = 1 * +vscale;
    vy     = 1 *  vscale;
    radius = 40;
    temperature = 1f;
    fluid.addDensity(px, py, radius, 0.2f, 0.3f, 0.5f, 1.0f);
    fluid.addTemperature(px, py, radius, temperature);
    particles.spawn(fluid, px, py, radius, 100);


    boolean mouse_input = mousePressed;

    // add impulse: density + velocity, particles
    if (mousePressed){
      radius = 15;
      vscale = 15;
      px     = mouseX;
      py     = height-mouseY;
      vx     = (mouseX - pmouseX) * +vscale;
      vy     = (mouseY - pmouseY) * -vscale;
      fluid.addDensity (px, py, radius, 0.25f, 0.0f, 0.1f, 1.0f);
      fluid.addVelocity(px, py, radius, vx, vy);
      particles.spawn(fluid, px, py, radius*2, 300);
    }


    // particles
    if (mouse_input && mouseButton == RIGHT) {
      px     = mouseX;
      py     = height - 1 - mouseY; // invert
      radius = 50;
      particles.spawn(fluid, px, py, radius, 300);
    }
  }
}


int viewport_w = 1280;
int viewport_h = 720;

int fluidgrid_scale = 3;

DwFluid2D fluid;

// render targets
PGraphics2D pg_fluid;
//texture-buffer, for adding obstacles
PGraphics2D pg_obstacles;

// custom particle system
MyParticleSystem particles;

// some state variables for the GUI/display
int     BACKGROUND_COLOR           = 0;
boolean UPDATE_FLUID               = true;
boolean DISPLAY_FLUID_TEXTURES     = false;
boolean DISPLAY_FLUID_VECTORS      = false;
int     DISPLAY_fluid_texture_mode = 0;
boolean DISPLAY_PARTICLES          = true;


public void settings() {
  fullScreen(P2D);
  size(viewport_w, viewport_h, P2D);
  smooth(4);
}



public void setup() {

  // main library context
  DwPixelFlow context = new DwPixelFlow(this);
  context.print();
  context.printGL();

  // fluid simulation
  fluid = new DwFluid2D(context, viewport_w, viewport_h, fluidgrid_scale);

  // set some simulation parameters
  fluid.param.dissipation_density     = 0.999f;
  fluid.param.dissipation_velocity    = 0.99f;
  fluid.param.dissipation_temperature = 0.80f;
  fluid.param.vorticity               = 0.10f;

  // interface for adding data to the fluid simulation
  MyFluidData cb_fluid_data = new MyFluidData();
  fluid.addCallback_FluiData(cb_fluid_data);

  // pgraphics for fluid
  pg_fluid = (PGraphics2D) createGraphics(viewport_w, viewport_h, P2D);
  pg_fluid.smooth(4);
  pg_fluid.beginDraw();
  pg_fluid.background(BACKGROUND_COLOR);
  pg_fluid.endDraw();

  // pgraphics for obstacles
  pg_obstacles = (PGraphics2D) createGraphics(viewport_w, viewport_h, P2D);
  pg_obstacles.smooth(4);
  pg_obstacles.beginDraw();
  pg_obstacles.clear();
  float radius;
  radius = 200;
  pg_obstacles.stroke(64);
  pg_obstacles.strokeWeight(10);
  pg_obstacles.noFill();
  pg_obstacles.rect(1*width/3, 1*height/4, radius, radius, 20);
  // border-obstacle
  pg_obstacles.strokeWeight(10);
  pg_obstacles.stroke(64);
  pg_obstacles.noFill();
  pg_obstacles.rect(0, 0, pg_obstacles.width, pg_obstacles.height);
  pg_obstacles.endDraw();

  fluid.addObstacles(pg_obstacles);

  // custom particle object
  particles = new MyParticleSystem(context, 1024 * 1024);

  //createGUI();

  background(0);
  frameRate(60);
}




public void draw() {    


  // update simulation
  if (UPDATE_FLUID) {
    fluid.addObstacles(pg_obstacles);
    fluid.update();
    particles.update(fluid);
  }

  // clear render target
  pg_fluid.beginDraw();
  pg_fluid.background(BACKGROUND_COLOR);
  pg_fluid.endDraw();


  // render fluid stuff
  if (DISPLAY_FLUID_TEXTURES) {
    // render: density (0), temperature (1), pressure (2), velocity (3)
    fluid.renderFluidTextures(pg_fluid, DISPLAY_fluid_texture_mode);
  }

  if (DISPLAY_FLUID_VECTORS) {
    // render: velocity vector field
    fluid.renderFluidVectors(pg_fluid, 10);
  }

  if ( DISPLAY_PARTICLES) {
    // render: particles; 0 ... points, 1 ...sprite texture, 2 ... dynamic points
    particles.render(pg_fluid, BACKGROUND_COLOR);
  }


  // display
  image(pg_fluid, 0, 0);
  image(pg_obstacles, 0, 0);


  // display number of particles as text
  //String txt_num_particles = String.format("Particles  %,d", particles.ALIVE_PARTICLES);
  //fill(0, 0, 0, 220);
  //noStroke();
  //rect(10, height-10, 160, -30);
  //fill(255, 128, 0);
  //text(txt_num_particles, 20, height-20);

  //// info
  //String txt_fps = String.format(getClass().getName()+ "   [size %d/%d]   [frame %d]   [fps %6.2f]", fluid.fluid_w, fluid.fluid_h, fluid.simulation_step, frameRate);
  //surface.setTitle(txt_fps);
}





public void fluid_resizeUp() {
  fluid.resize(width, height, fluidgrid_scale = max(1, --fluidgrid_scale));
}
public void fluid_resizeDown() {
  fluid.resize(width, height, ++fluidgrid_scale);
}
public void fluid_reset() {
  fluid.reset();
}
public void fluid_togglePause() {
  UPDATE_FLUID = !UPDATE_FLUID;
}
public void fluid_displayMode(int val) {
  DISPLAY_fluid_texture_mode = val;
  DISPLAY_FLUID_TEXTURES = DISPLAY_fluid_texture_mode != -1;
}
public void fluid_displayVelocityVectors(int val) {
  DISPLAY_FLUID_VECTORS = val != -1;
}

public void fluid_displayParticles(int val) {
  DISPLAY_PARTICLES = val != -1;
}