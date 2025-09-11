/**
 * Drawing Practice
 * Arielle Wong
 * 
 * Draws a side view of a duckling's face.
 * 
 * Uses:
 * p5.js
 * https://p5js.org/
 * 
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    //square canvas to work with
    createCanvas(640, 640);

}


/**
 * Draws the sideview of a duckling's face
*/
function draw() {
    //cyan background
    background(150, 255, 255);
    //a yellow circle with an orange outline
    //remembers the previous settings
    push();
    //changes the settings fill and stroke of the shape
    //yellow fill
    fill(250, 230, 70);
    //orange outline
    stroke(250, 160,70);
    //draw new ellipse (the head)
    ellipse(320, 320, 480, 480);
    //restores original settings
    pop();
    
    //eye
    //remembers previous settings
    push();
    //black fill
    fill(0,0,0);
    //white stroke
    stroke(255,255,255);
    //draws the eye
    ellipse(300, 300, 200, 200);
    //resets 
    pop();

    //beak
    //remembers previoous settings
    push();
    //orange fill
    fill(250, 160,70);
    //no stroke
    noStroke();
    //creates a triangle on the left of the face (beak)
    triangle(30, 320, 100, 400, 100, 270);

}