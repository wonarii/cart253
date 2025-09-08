/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

function setup() {
    // Create the canvas
    createCanvas(480, 480);
}

function draw() {
    background(0);
    
    // Draw a circle in the centre of the canvas
    push();
    noStroke();
    fill(255, 255, 0);
    //setting circle's coordinates to half the canvas size
    //(dividing the dimensions by 2)
    ellipse(width/2, height/2, 100, 100);
    pop();


    //moving circle
    push();
    noStroke();
    fill(0, 255, 255);
    //the circle will follow the mouse
    ellipse(mouseX, mouseY, 100, 100);
    pop();

    //circle sizedepends on mouse
    //also changes color
    push();
    noStroke();
    fill(mouseX, mouseX-mouseY, mouseY);
    //the circle will follow the mouse
    ellipse(width/2, width/2, mouseX, mouseY);
    pop();
}