/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//game timer
//start with 60 seconds
let timerValue = 60*3;


// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        fill:{
            h:120,
            s:87,
            b:71,
        },
        x: 320,
        y: 510,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    //frog's eyes (white part)
    eyes:{
        leftX:320,
        rightX:320,
        y:455,
        size: 30,
        pupils:{
        size: 10,
        }
    },
    wrinkles:{
        h:106,
        s: 51,
        b:42,
        alpha:0,
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3,
    wings:{
        x:undefined,
        y:undefined,
        sizeX: 10,
        sizeY: 5,
        colour: 255,
    },
};

const UI = {
    colour:{
health:"#17B617" ,
wisdom:"#5c42b1ff",
fun:"#eba708ff",
empty: "#d1d1d2ff"
    },
    points:{
        health:150,
        wisdom:150,
        fun:150,
    }
}
/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
//game timer, every third of a second, the timeIt method gets called
    setInterval(timeIt, 1000/3);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawUI();
    //when the timer runs out
    if (timerValue == 0) {
    win();
  }
}

/**
 * Controls the frog's aging and game time
 * The game ends when the timer runs out
 * https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG
 */
function timeIt(){
    if(timerValue > 0){
        //decreases the timer value
        timerValue --;
        //agse the frog
        getOlder();
        
    }
}



/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
//draws the wings of the fly
push();
noStroke();
let wingColour = color(fly.wings.colour);
wingColour.setAlpha(1000);
fill(wingColour);
ellipse(fly.wings.x, fly.wings.y, fly.wings.sizeX, fly.wings.sizeY);
//moveWings
moveWings();
pop();


}

function moveWings(){
    fly.wings.x = fly.x - Math.floor(Math.random() * 3);
    fly.wings.y = fly.y -Math.floor(Math.random() * 8);
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
    frog.eyes.leftX = mouseX -40;
    frog.eyes.rightX= mouseX +40;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Modifies the frog's attributes to make it look older.
 */
function getOlder(){
    //modify frog colour 
    frog.body.fill.h -= 0.5;
    frog.body.fill.s -= 0.5;
    frog.body.fill.b += 0.5;
    //constrain frog colour
    frog.body.fill.h = constrain(frog.body.fill.h, 72, 120);
    frog.body.fill.s = constrain(frog.body.fill.s, 32, 87);
    frog.body.fill.b = constrain(frog.body.fill.b, 71, 82);

    //make frog thinner
    frog.body.size -=0.2;

    //make eye bags and wrinkles appear 
   frog.wrinkles.alpha += 0.005;
    frog.wrinkles.alpha = constrain(frog.wrinkles.alpha, 0 ,100);

    //health decreases as you get older
    //that's life:/
    UI.points.health -=2;
    UI.points.health = constrain(UI.points.health, -1 ,150);

    //wisdom will also decrease over time
    UI.points.wisdom -=1;
    UI.points.wisdom = constrain(UI.points.wisdom, 0 ,150);

        //fun will also decrease over time
    UI.points.fun -=1;
    UI.points.fun = constrain(UI.points.fun, 0 ,150);

    
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    //changes colours to hsb
    colorMode(HSB);
    fill(frog.body.fill.h, frog.body.fill.s, frog.body.fill.b);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

     //eye bags
    push();
    noStroke();
    colorMode(HSB);
    let wrinkleColour = color(frog.wrinkles.h, frog.wrinkles.s, frog.wrinkles.b);
    wrinkleColour.setAlpha(frog.wrinkles.alpha);
    fill(wrinkleColour);
    //eye bags
    ellipse(frog.eyes.leftX-5, frog.eyes.y+6, frog.eyes.size+2);
    ellipse(frog.eyes.rightX+5, frog.eyes.y+6, frog.eyes.size+2);
    pop();
    push();
    colorMode(HSB);
    stroke(wrinkleColour);
    noFill();
    strokeWeight(4);
    //forehead wrinkles
    curve(frog.eyes.leftX + 10, frog.eyes.y+6 ,frog.eyes.leftX+30, frog.eyes.y,frog.eyes.leftX+50, frog.eyes.y,frog.eyes.leftX+75, frog.eyes.y+6);
    curve(frog.eyes.leftX, frog.eyes.y+15 ,frog.eyes.leftX+20, frog.eyes.y+9,frog.eyes.leftX+60, frog.eyes.y+9,frog.eyes.leftX+85, frog.eyes.y+15);
    curve(frog.eyes.leftX + 10, frog.eyes.y+23 ,frog.eyes.leftX+30, frog.eyes.y+17,frog.eyes.leftX+50, frog.eyes.y+17,frog.eyes.leftX+75, frog.eyes.y+23);
    pop();

    //drawing the eyes
    push();
    fill("#fffffff");
    noStroke();
    ellipse(frog.eyes.leftX, frog.eyes.y, frog.eyes.size);
    ellipse(frog.eyes.rightX, frog.eyes.y, frog.eyes.size);
    pop();

    //drawing the pupils
    push();
    fill("#000000");
    noStroke();

    ellipse(frog.eyes.leftX, frog.eyes.y-10, frog.eyes.pupils.size);
    ellipse(frog.eyes.rightX, frog.eyes.y-10, frog.eyes.pupils.size);
    pop();

   //check if frog dies
    //death = health points at 0
    if(UI.points.health <= 0){
        gameOver();
    }
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

/**
 * Displays the user interface (three points bars)
 * 
 */

function drawUI(){
    drawHealthBar();
   drawWisdomBar();
    drawFunBar();
}

function drawHealthBar(){
    //back bar
    push();
    noStroke();
    fill(UI.colour.empty);
    rect(50, 30, 150, 20, 5);
    pop();
    //color bar
    push();
    noStroke();
    fill(UI.colour.health);
    rect(50, 30, UI.points.health, 20, 5, 0, 0, 5);
    pop();
    //border bar
    push();
    noFill();
    strokeWeight(3);
    rect(50, 30, 150, 20, 5);
    pop();
    //icon
    //stroke
    push();
    strokeWeight(6);
    noFill();
    rect(20, 25, 10, 30, 2);
    rect(10, 35, 30, 10, 2);
    pop();
    //colour
    push();
    noStroke();
    fill(UI.colour.health);
    rect(20, 25, 10, 30, 2);
    rect(10, 35, 30, 10, 2);
    pop();
  
}

function drawWisdomBar(){
    //back bar
    push();
    noStroke();
    fill(UI.colour.empty);
    rect(width/3+50, 30,150 , 20, 5);
    pop();
    //color
    push();
    noStroke();
    fill(UI.colour.wisdom);
    rect(width/3+50, 30, UI.points.wisdom, 20,  5, 0, 0, 5);
    pop();
    //stroke
    push();
    noFill();
    strokeWeight(3);
    rect(width/3+50, 30, 150, 20,  5);
    pop();
    //icon
    //stroke
    push();
   strokeWeight(6);
    noFill();
    ellipse(width/3+18, 38, 36,25);
    ellipse(width/3+29, 44, 20,29);
    pop();
    //colour
    push();
    noStroke();
    fill(UI.colour.wisdom);
    ellipse(width/3+18, 38, 36,25);
    ellipse(width/3+29, 44, 20,29);
    pop();
    
}

function drawFunBar(){
    //back bar
    push();
    noStroke();
    fill(UI.colour.empty);
    rect(width/3*2+50, 30, 150, 20,5);
    pop();
    //colour bar
    push();
    noStroke();
    fill(UI.colour.fun);
    rect(width/3*2+50, 30, UI.points.fun, 20,5, 0, 0, 5);
    pop();
    //stroke bar
    push();
    strokeWeight(3);
    noFill();
    rect(width/3*2+50, 30, 150, 20,5);
    pop();
    //icon 
    //stroke
    push();
    strokeWeight(6);
    noFill();
    circle(width/3*2 +20, 40, 37);
    pop();
    //colour
    push();
    noStroke();
    fill(UI.colour.fun);
    circle(width/3*2 +20, 40, 37);
    pop();
    //smile 
    push();
    strokeWeight(3);
    noFill();
    curve(width/3*2, 20, width/3*2 +10, 47, width/3*2 +30, 47,width/3*2 +35,20)
    pop();
    //eyes
    push();
    noStroke();
    fill("#000000");
    ellipse(width/3*2+11, 36, 5,10);
    ellipse(width/3*2+28, 36, 5,10);
    pop();
}

//--------ENDGAME STUFF--------------//

//placeholders for now
function gameOver(){
    text('Game Over', width / 2, height / 2 + 15);
}

function win(){
    text('Win', width / 2, height / 2 + 15);
}

