/**
 * The Duck
 * Arielle Wong
 * 
 * A duck made of shapes is stuck in a vast field of yellow
 * It is wondering why it itself isn't yellow too, and where
 * it fits in in a world like this.
 * 
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates a 640x480 canvas for the drawing to go on.
*/
function setup() {
    //Create the canvas at a standard resolution
    createCanvas(640, 480);
}


/**
 * Draws a simple geometric duck on a yellow background
*/
function draw() {
    //A yellow Background
    background(255, 255, 100);
    //The duck's beak
    rect(80, 80, 30, 30);
    //The duck's head
    circle(150, 100, 100);
    //The duck's body
    rect(100, 150, 200, 100);
}