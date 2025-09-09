/**
 * A Beautiful Landscape
 * Arielle Wong
 * Lanna Check
 * kerven-laurent casimir
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * Creates a 640x640 canvas
*/
function setup() {
    createCanvas(640,640);
}


/**
 * Draws our beautiful landscape
*/
function draw() {
    background(47,44,97);

    drawLand();
}

/**
 * Draws the lunar surface
 */
function drawLand(){
    //Draws the main body
    push();
    fill(150,150,143);
    noStroke();
    ellipse(320, 700, 700, 400);
    pop();
    
    //Draws the craters
    push();
    fill(99,99,94);
    noStroke();
    ellipse(100, 630, 50);
    ellipse(400, 600, 120);
    ellipse(580, 630, 60);
    ellipse(240, 570,40);
    pop();
}