/**
 * Creating variables
 * Arielle Wong
 * 
 * Learning how to create variables!
 */

"use strict";

//cheese colour
let cheeseRed = 255;
let cheeseGreen = 215;
let cheeseBlue = 40;

//cheese hole
let holeShade = 0; //greyscale value
let holeX = 140;
let holeY = 175;
let holeSize = 170;

/**
 * Creates the canvas for the drawing
*/
function setup() {
    //create the canvas
    createCanvas(480, 480);
}


/**
 * Draws a hole in cheese
*/
function draw() {
    //cheese colour (yellow)
    background(cheeseRed, cheeseGreen, cheeseBlue);

    //draw a hole in upper left
    push();
    noStroke();
    fill(holeShade);
    ellipse(holeX,holeY,holeSize);
    pop();
}