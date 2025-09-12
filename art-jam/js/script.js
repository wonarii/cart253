/**
 * Ari and Soup
 * Arielle Wong
 * 
 * Self portrait
 * 
 */

"use strict";


/**
 * Variables!!!
 */

let canvasSize = 640;

let face={
    colour:"#d8ab75ff",
};

let glasses={
    frameColour:"#100a01ff",
    lenseColour: "#e7e1d6ff",
    
};

/**
 * Creates a square canvas
*/
function setup() {
    //640px x 640px canvas
    createCanvas(canvasSize, canvasSize);
}


/**
 * Draws the self portrait
*/
function draw() {
    background("#ebd487ff");
    
    noStroke();

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

    //Draw face
    drawFace();
    //Draw glasses
    drawGlasses();
    
}

function drawFace(){
    push();
    fill(face.colour);
    rect(canvasSize/4, canvasSize/4,320,320,60);
    pop();
}

function drawGlasses(){
    push();
    stroke(glasses.frameColour);
    strokeWeight(10);
    
    //lense transparency https://p5js.org/reference/p5.Color/setAlpha/
    //creating a color object
    let lenseColour = color(231, 225, 214);
    lenseColour.setAlpha(100);
    fill(lenseColour);
    

    //left lense
    rect(canvasSize/4-20, canvasSize/2+10, 160, 120, 20);
    //right lense
    rect(canvasSize/2+20, canvasSize/2+10, 160, 120, 20);
    //nose bar thing
    line(canvasSize/2-20, canvasSize/2+40 ,canvasSize/2+20, canvasSize/2+40);
}