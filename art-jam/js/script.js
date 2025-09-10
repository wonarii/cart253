/**
 * Ari and Soup
 * Arielle Wong
 * 
 * Self portrait
 * 
 */

"use strict";

/**
 * Creates a square canvas
*/
function setup() {
    //640px x 640px canvas
    createCanvas(640, 640);
}


/**
 * Draws the self portrait
*/
function draw() {
    background("#ebd487ff");
    //testing colors
    //skin
    push();
    noStroke();
    fill("#d8ab75ff");
    circle(320,320,50);
    pop();
    //hair
    push();
    noStroke();
    fill("#573a16ff");
    circle(380,380,50);
    pop();
    //hair2
    push();
    noStroke();
    fill("#f4be2bff");
    circle(360,360,50);
    pop();
    //glasses frame
    push();
    noStroke();
    fill("#100a01ff");
    circle(420,380,50);
    pop();
    //fog
    push();
    noStroke();
    fill("#e7e1d6ff");
    circle(360,330,50);
    pop();

    //soup
    push();
    noStroke();
    fill("#f39017ff");
    circle(40,400,50);
    pop();
    //bowl
    push();
    noStroke();
    fill("#6097a6ff");
    circle(70,400,50);
    pop();
    
}