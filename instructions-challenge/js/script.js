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
    background("#0b0d53ff");

    drawLand();
    drawAstronaut();
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

/**
 * Draws the astronaut
 */
function drawAstronaut(){
    noStroke();
   
    //head
    push();
    fill(217, 221, 222);
    ellipse(320, 270, 150);
    pop();
    
    //visor
    push();
    fill(54, 60, 61);
    ellipse(320, 270, 120);
    pop();

    //shine
    push();
    stroke(149, 160, 163);
    strokeWeight(10);
    fill(149, 160, 163);
    curve(280, 230, 340, 230, 360, 270, 320, 320);
    pop();

    //torso
    push();
    fill(217, 221, 222);
    square(252.5, 330, 135, 20);
    pop();

   //legs
    push();
    stroke(217, 221, 222);
    strokeWeight(40);
    //left leg
    line(275, 400, 270, 480);
    //right leg
    line(365, 400, 370, 480);
    pop();

    //feet
    push();
     fill(217, 221, 222);
    //left foot
    rect(230, 477.6, 60, 40, 10);
    
    //Right foot
    rect(350.5, 477.6, 60, 40, 10)
    pop();

    //Right arm
    push();
        stroke(217, 221, 222);
    strokeWeight(40);
    //right arm
    line(377, 340, 450, 270);
    pop();
    //right wristband
    push();
    fill(54, 60, 61);
    ellipse(450, 270, 60)
    pop();
    //Right hand
    push();
    fill(217, 221, 222);
    ellipse(460, 260, 60)
    pop();
//Left arm
    push();
        stroke(217, 221, 222);
    strokeWeight(40);
    //left arm
    line(270, 350, 210, 420);
    pop();
    //left wristband
    push();
    fill(54, 60, 61);
    ellipse(210, 420, 60)
    pop();
    //left hand
    push();
    fill(217, 221, 222);
    ellipse(201, 428, 60)
    pop();
}