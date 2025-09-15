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
    featuresColour:"#573a16ff"
};

let glasses={
    frameColour:"#100a01ff",
    lenseColour: "#e7e1d6ff",
    
};

let hair={
    colour1:"#573a16ff",
    colour2:"#f4be2bff"
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

    //Draw hair (back of head)
    drawHair();
    //draw neck
 //   drawNeck();
    //Draw face
    drawFace();
    //Draw eyes and mouth
    drawFeatures();
    //Draw glasses
    drawGlasses();
    //Draw bangs
    drawBangs();
 
    
}

function drawHair(){
    push();
    fill(hair.colour1);
    //left side
    triangle(180, 180, 80,540, 370, 500);
    //small top triangle (left)
    triangle(170, 200, 70, 400, 370, 300);
    //right side
    triangle(460, 180, 560,540, 300, 500);
    //small top triangle (right)
    triangle(470, 200, 570, 400, 300, 340);
    pop();

    //yellow bits
    push();
    fill(hair.colour2);
    //left
    triangle(100, 580, 300, 200, 340, 540);
    //right
    triangle(540, 580, 340, 200, 300, 540);
    pop();
}

// function drawNeck(){
//     push();
//     fill(face.colour);
//     rect(260, 400,120,180,10);
//     pop();
// }

function drawFace(){
    push();
    fill(face.colour);
    rect(canvasSize/4, canvasSize/4+10,320,320,60);
    pop();
}


function drawFeatures(){
    push();
    fill(face.featuresColour);
    //left eye
    ellipse(220,400,80,40);
    //right eye
    ellipse(420,400,80,40);
    pop();
    
    //little smile
    push();
    stroke(face.featuresColour);
    noFill();
    strokeWeight(6);
    curve(280, 295, 294, 459, 350, 460, 380, 350);
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
    pop();
}

function drawBangs(){
    push();
    fill(hair.colour1);
   //left
    triangle(180, 150, 100, 360, 400,160);
    //right
    triangle(460, 150, 540, 360, 200, 160);
    //left detail
    triangle(220, 180, 360, 180, 200, 340);



    pop();
}
