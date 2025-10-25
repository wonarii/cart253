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

//keeps track of which state the game is in
//options: start, play, tutorial, gameOver, chat, submitDialog
let gameState = "tutorial"

//counts the number of clicks per second
//affects back pain
let clickCounter = 0;

//minimum clicks before you get back pain
let backPainMin = 10;

//keeps track of how many times draw is called while user hasn't moved
let stillnessCounter = 0;

let tutorialStage = 15;

let mathProblemCalculated = false;

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
    //for the sine wave
    offset: 100,
    angle: 0,
    scalar: 30,
    size: 10,
    speedOfSine: 0.15,
    speed: 3,
    color:"#000000",
    //i'm using ints for the fly type to use the randomizer but the types are as follows:
    //0: healthy
    //1: wise
    //2: fun
    type:0,
    wings:{
        x:undefined,
        y:undefined,
        sizeX: 10,
        sizeY: 5,
        colour: 255,
    },
};
//math fly
const mathFly = {
    appears: false,
    x: 100,
    y: 100, // Will be random
    //for the sine wave
    offset: 100,
    angle: 0,
    scalar: 20,
    size: 10,
    speedOfSine: 0.15,
    direction: 3,
    wings:{
        x:undefined,
        y:undefined,
        sizeX: 10,
        sizeY: 5,
        colour: 255,
    },
    value1: 0,
    value2: 0,
};

const UI = {
    font: undefined,
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
    },
    notificationText: "",
}

const title = {
    frogTitleFont: undefined,
    subtitleFont: undefined,
    glowAlpha: 230,
    glowChange: 1,
    x:150,
    y:180,
    offset: 140,
    angle: 0,
    scalar: 5,
    speedOfSine: 0.05,
}

const endGame = {
    frogDeathMessages : ["Frog has died of tuberculosis.", "Frog just wasn't feeling it.", "Frog has succumbed to a heart attack.", "Frog sneezed too hard."],
    funNotWise: ["Live fast, die young", 'Maybe buying that "vintage" motorcycle wasn\'t the best idea', "No matter how tempting, do not eat the deep fried icecream", "A life filled with fun is a life well lived."],
    wiseNotFun: ["Perhaps the greatest wisdom of all is learning to have fun", "So wise yet so unhappy..."],
    noWiseNoFun: ["A life spent only to extend it is a life wasted away", "All those chia seed smoothies, and for what?", "Time is so short"],
    
    
    subtitle: "Oops.",
}

const cataracts = {
    colour:{
        r:217,
        g:188,
        b:122,
    },
    alpha: 0,
    blur:0,
}

const frogDialog = {

    isTalking: false,
wiseSayings : ["\“Appear weak when you are strong, and strong when you are weak.\” - Sun Tzu",
    "\“If you know the enemy and know yourself, you need not fear the result of a hundred battles.\” -Sun Tzu",
    "\“Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.\” - Sun Tzu",
    "Great power comes with great responsibility - Uncle Ben",

 ],
 filler:[
    "The weather these days… The farmers won’t be too happy.",
    "Did you know that my neighbour bought new types of trash bags? Wonder if it’s the divorce making them crazy.",
    "Back in my days, we didn’t have any of these weefees in our homes. We just had lead and arsenic.",
    "You should come visit more often. I made this new thing called strawberry-chicken pot pie.",
    "This reminds me of when my cousin drowned in the sewers.",
    "Remember my aunt’s best friend’s daughter’s husband’s uncles’ cousin? Yes, well, he’s studying to be a doctor. "
 ],
 responses:[
    "Oh! Interesting opinion…",
    "Hahah, you always say such silly things!",
    "Someone once said something similar to me…",
    "I love talking to you!",
 ],
dialogToPrint:"hi",
userDialog:"",
answerIndex:0,
};

const nextButton = {
    box:{
        x:500,
        y:420,
        width:120,
        height:40,
        roundedness:5
    },
    text:{
        size:24,
        fill:0,
        x:525,
        y:448,
        width:100,
    },
    glowIntensity: 0,

}


let backgroundColour = "#87ceeb";

function preload(){
    title.frogTitleFont = loadFont('./assets/Chewy-Regular.ttf');
    title.subtitleFont = loadFont('./assets/TradeWinds-Regular.ttf'); 
    UI.font = loadFont('./assets/TitanOne-Regular.ttf');
}


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
//game timer, every third of a second, the timeIt method gets called
    setInterval(timeIt, 1000/3);
    //for the click counter, it will -1 click every second
    setInterval(decreaseClickCount, 1000);
    // Give the fly its first random position
    resetFly();

}

function draw() {
    background(backgroundColour);

    if(gameState === "play"){
    moveFly();
    drawFly();
    moveMathFly();
    drawMathFly();
    moveFrog();
    depression();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawCataracts();
    drawUI();
    backPain();
    dialog();
    checkMovement();
    //when the timer runs out
    if (timerValue == 0) {
    gameState = "gameOver";
  }
}
else if(gameState === "start"){
    startScreen();
}
else if(gameState === "gameOver"){
    gameOver();
}
else if(gameState === "math"){

    drawFrog();
    drawCataracts();
    drawUI();
    backPain();
}
else if(gameState === "chat"){
    drawFrog();
    drawCataracts();
    drawUI();
    //add a slight opacity filter 
    fadeBackground(0,0);
    drawFrogBubble();
    drawUserBubble();
}
else if(gameState === "submitDialog"){
    drawFrog();
    drawCataracts();
    drawUI();
    //add a slight opacity filter 
    fadeBackground(0,0);
    drawFrogBubble();
    drawUserBubble();
    submitDialog();

}
if(gameState === "tutorial"){
    drawTutorial();
}
}

/**
 * Controls the frog's aging and game time
 * The game ends when the timer runs out
 * https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG
 */
function timeIt(){
    //only runs the timer during gameplay
    if(timerValue > 0 && gameState === "play"){
        //decreases the timer value
        timerValue --;
        //agse the frog
        getOlder();
        
    }
    if(gameState === "tutorial" && (tutorialStage === 7 || tutorialStage === 11)){
        getOlder();
    }
}



/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    //trying out a sine wave
    fly.y = fly.offset + sin(fly.angle) * fly.scalar;
    fly. angle+= fly.speedOfSine;
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
    //new randomized fly colours!
    fill(fly.color);
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
moveWings(fly.x, fly.y);
pop();

}

function moveWings(x,y){
    fly.wings.x = x - Math.floor(Math.random() * 3);
    fly.wings.y = y -Math.floor(Math.random() * 8);
}

function moveMathWings(x,y){
    mathFly.wings.x = x - Math.floor(Math.random() * 3);
    mathFly.wings.y = y - Math.floor(Math.random() * 8);
}



function moveMathFly() {
    //trying out a sine wave
    mathFly.y = mathFly.offset + sin(mathFly.angle) * mathFly.scalar;
    mathFly.angle+= mathFly.speedOfSine;
    //random number between -2 and 2
    mathFly.direction = Math.floor(Math.random()*(2 +2)) - 2;
    mathFly.x += mathFly.direction;
    mathFly.x = constrain(mathFly.x, 30, width-30);
}

function drawMathFly(){

    if(mathFly.appears === false){
    //rolls a dice to see if math fly appears
    let diceRoll = Math.floor(Math.random()*200);

    if(diceRoll === 1){
        mathFly.appears = true;
        //math fly goes away after 2 seconds
        setTimeout(mathFlyDisappears, 2000);
    }
    }
    
    if(mathFly.appears === true){
     push();
    noStroke();
    fill(UI.colour.wisdom);
    ellipse(mathFly.x, mathFly.y, mathFly.size);
    pop();
    //draws the wings of the fly
    push();
    noStroke();
    let wingColour = color(fly.wings.colour);
    wingColour.setAlpha(1000);
    fill(wingColour);
    ellipse(mathFly.wings.x, mathFly.wings.y, mathFly.wings.sizeX, mathFly.wings.sizeY);
    //moveWings
    moveMathWings(mathFly.x, mathFly.y);
    pop();
    }
}


function mathFlyDisappears(){
    mathFly.appears = false;
    mathFly.x = random(30, width-30);
    mathFly.y = random(80, 300);
}
/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.offset = random(50, 300);
    //i want green flies more frequently so:
    let diceRoll = Math.floor(Math.random() * 6);
    if(diceRoll > 3){
        //1/3 chance of getting green fly automatically
        fly.type = 0;
    }
    else{
    //randomizing the fly types and giving them differetn colours
    fly.type = Math.floor(Math.random() * 3);
    }
    switch(fly.type){
        case 0: {
        fly.color = UI.colour.health;
        break;
        }
        case 1: {
        fly.color = UI.colour.wisdom;
        break;
        }
        case 2:{
        fly.color = UI.colour.fun;
        break;
        }
    };
    
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
    frog.eyes.leftX = mouseX -40;
    frog.eyes.rightX= mouseX +40;
}


function depression(){
    if(UI.points.fun < 50){
        //halves the speed
        frog.tongue.speed = 10;
    }
    else{
        //regular speed
        frog.tongue.speed = 20;
    }
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
    //constrain frog thinness
    frog.body.size = constrain(frog.body.size, 90, 150);

    //make eye bags and wrinkles appear 
   frog.wrinkles.alpha += 0.005;
    frog.wrinkles.alpha = constrain(frog.wrinkles.alpha, 0 ,100);

    //health decreases as you get older
    //that's life:/
    UI.points.health -=2;
    UI.points.health = constrain(UI.points.health, -1 ,150);
    //ensure you can't die during the tutorial
    if(gameState === "tutorial"){
        UI.points.health = constrain(UI.points.health, 1, 150);
    }

    //wisdom will also decrease over time
    UI.points.wisdom -=1;
    UI.points.wisdom = constrain(UI.points.wisdom, 0 ,150);

        //fun will also decrease over time
    UI.points.fun -=1;
    UI.points.fun = constrain(UI.points.fun, 0 ,150);

    //frog cataracts
    //at a certain age, frog will develop cataracts and it will be harder to see
    if(timerValue < 20*3){
        cataracts.alpha += 1;
        cataracts.blur += 0.02;
        cataracts.alpha = constrain(cataracts.alpha, 0, 40);
        cataracts.blur = constrain(cataracts.blur, 0 , 4);
    }


}
/**
 * Decreases the clickCounter by 1 every second
 */
function decreaseClickCount(){
    clickCounter -= 1;
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
        gameState = "gameOver";
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
        //do fly effect
        flyEffect();
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }

    if(mathFly.appears){
        //check if you catch the math fly
         // Get distance from tongue to fly
        const dmf = dist(frog.tongue.x, frog.tongue.y, mathFly.x, mathFly.y);
        // Check if it's an overlap
        const mathFlyEaten = (dmf < frog.tongue.size/2 + mathFly.size/2);
        if (mathFlyEaten) {
            if(gameState === "tutorial" && tutorialStage === 12){
                tutorialStage += 1;
            }
            else{
                mathProblem();
            }
        
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
    }
}

function mathProblem(){
    //get an extra 5 seconds of game time
    timerValue += 5*3;
    mathFly.value1 = Math.floor(Math.random()*10);
    mathFly.value2 = Math.floor(Math.random()*10);
    UI.notificationText = mathFly.value1 + " + " + mathFly.value2+ " = ";
    if(gameState === "play" || gameState === "math"){
        gameState = "math";
    }
}

function checkAnswer(){
   //verifies answer
   //gets only what is entered after the =
   let answer = UI.notificationText.split("=");
   //get rid of whitespace
   answer = answer[1].trim();
   if(answer == (mathFly.value1 + mathFly.value2)){
    //correct answer
    UI.notificationText = "Correct!";
    UI.points.wisdom += 40;
    UI.points.wisdom = constrain(UI.points.wisdom, 0 ,150);

   }
   else{
     UI.notificationText = "Incorrect.";
     UI.points.wisdom -= 10;
    UI.points.wisdom = constrain(UI.points.wisdom, 0 ,150);
   }
   if(gameState === "math"){
   setTimeout(backToPlay, 1000);
   }
   else{
    setTimeout(advanceTutorialStage, 1000);
   }
}

function backToPlay(){
    gameState = "play";
    UI.notificationText="";
}

function advanceTutorialStage(){
    tutorialStage += 1;
}
/**
 * Launch the tongue on click (if it's not launched yet)
 * also controls button presses
 */
function mousePressed() {

    //increases the click counter
    clickCounter += 1;

    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
  
    //START SCREEN
    if(gameState === "start"){
        //if you press on the play button
        if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
        //game state switches to play
            gameState = "play";
        }
        //if you press on tutorial button
        if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
            //gamestate swtches to tutorial
            gameState = "tutorial";
        }

    }
    //END SCREEN
    if(gameState === "gameOver"){
        //if you press on the play button
        if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
        //game state switches to play
            gameState = "play";
            gameReset();
        }
        //if you press on tutorial button
        if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
            //gamestate swtches to tutorial
            gameState = "tutorial";
        }

    }
    //Tutorial
    if(gameState === 'tutorial' && tutorialStage != 14 && tutorialStage !== 15){
        if(mouseX > nextButton.box.x && mouseX < nextButton.box.x+nextButton.box.width && mouseY > nextButton.box.y && mouseY < nextButton.box.y + nextButton.box.height){
            //moves the tutorial stage over by 1
            tutorialStage += 1;
        }
    }

}

function keyPressed(event){
    if(frogDialog.isTalking && gameState === "play"){
        
        if(event.key === "Enter"){
            gameState = "chat";
        }
    }
    else if( gameState === "math" || (gameState === "tutorial" && tutorialStage === 14)){
        if(event.key === "Enter"){
            checkAnswer();
        }
        else if(event.key === "Backspace"){
            //if the last two characters are not = then delete
            if(UI.notificationText.substring(UI.notificationText.length -2, UI.notificationText.length) != "= "){
                UI.notificationText = UI.notificationText.substring(0, UI.notificationText.length-1);
            }
            
        }
        else{
            UI.notificationText += event.key;
        }
    }
    else if(gameState === "chat" || tutorialStage === 16){
        if(event.key === "Enter"){
            if(tutorialStage === 16){
                advanceTutorialStage();
            }   
            else{
                gameState = "submitDialog"
            }
        }
            
        else if(event.key === "Backspace"){
            frogDialog.userDialog = frogDialog.userDialog.substring(0, frogDialog.userDialog.length -1);
        }
        else{
            frogDialog.userDialog += event.key;
        }
    }
    else if(gameState === "submitDialog"){
        if(event.key === "Enter"){
            //only get points if you say something to the frog
            if(frogDialog.userDialog != ""){
            UI.points.fun += 50;
            UI.points.fun = constrain(UI.points.fun, 0, 150);
            }
            //reset user dialog
            frogDialog.userDialog = "";
            frogDialog.isTalking = false;
            gameState = "play";   
        }
    }
    else if((tutorialStage === 15 && frogDialog.isTalking) || tutorialStage === 17){
        if(event.key === "Enter"){
            advanceTutorialStage();

        }
    }
}

function drawCataracts(){
    //draws a big rectangle over whole screen
    push();
    let cataractsColour = color(cataracts.colour.r, cataracts.colour.g, cataracts.colour.b);
    cataractsColour.setAlpha(cataracts.alpha);
    fill(cataractsColour);
    noStroke();
    rect(0,0,width,height);
    pop();

    if(timerValue <= 20*3){
        filter(BLUR, cataracts.blur);
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

function flyEffect(){
    //checks the type of fly and then adds/removes points from the bars accordingly!
    switch(fly.type){
        case 0:{
            //increases health points!
            UI.points.health += 30;
            UI.points.health = constrain(UI.points.health, -1 ,150);
            //decreases fun:(
            //we don't like vegetables here
            UI.points.fun -= 2;
            UI.points.fun = constrain(UI.points.fun, 0 ,150);
            break;
        }
        case 1:{
            //increases wisdom!
            UI.points.wisdom += 20;
            UI.points.wisdom = constrain(UI.points.wisdom, 0 ,150);
            //lowers fun
            UI.points.fun -=2;
            UI.points.fun = constrain(UI.points.fun, 0 ,150);
            break;
        }
        case 2:{
            //increases fun
            UI.points.fun += 20;
            UI.points.fun = constrain(UI.points.fun, 0 ,150);
            //lowers health
            UI.points.health -= 2;
            UI.points.health = constrain(UI.points.health, -1 ,150);
            break;
        }
    }
}

/**
 * If the user clicks too much, the frog gets back pain
 */
function backPain(){
    //over 45 seconds left
    if(timerValue > 45*3){
        backPainMin = 10;
    }
    //over half time left
    else if(timerValue> 30*3){
        backPainMin = 8;
    }//over 15 sseconds time left
    else if(timerValue > 15*3){
        backPainMin = 6;
    }
    //under 15 seconds left
    else{
        backPainMin = 3;
    }
    //if you exceed the backPain number, you get back pain
    if(clickCounter > backPainMin){
        //red flash
        backgroundColour = "#ff0000";
        //reset clickCounter
        clickCounter = 0;
        //ouch text is written
        UI.notificationText = "OUCH! My back!";

        //reduces health by 30 points
        UI.points.health -= 30;
        UI.points.health = constrain(UI.points.health, -1, 150);
     
    //sets background to blue
   //this is a reset from the red if you get back pain
    setTimeout(resetBg, 1000/2);
    }
       //ouch text
        push();
        textStyle(BOLD);
        textSize(32);
        text(UI.notificationText, 250, 200)
        pop();
}

function resetBg(){
    backgroundColour = "#87ceeb";
    UI.notificationText = "";
}

/**
 * Displays the frog's dialog
 */
function dialog(){
    checkTalking();
    if(frogDialog.isTalking){
        //draw speech bubble
        drawSpeechBubble();
        //display dialog
        printDialog(frogDialog.dialogToPrint);

    }
}

/**
 * Decides if the frog is talking
 */
function checkTalking(){
    if(!frogDialog.isTalking){
        //randomly rolls a dice to check if it should be talking
        let diceroll = Math.floor(Math.random()*200);
        if(diceroll === 1){
            //lucky roll, frog starts talking
            frogDialog.isTalking = true;
            frogDialog.dialogToPrint = decideDialog();
            //after 3 seconds, the dialog will be reset
            setTimeout(resetDialog, 4000);
        }
    }
}

function resetDialog(){
    frogDialog.isTalking = false;
}


function drawSpeechBubble(){
    //check which side to draw the sppech bubble
    //if frog in right half
    if(frog.body.x > width/2){
        //bubble on left
        push();
        noStroke();
        fill(255);
        //main body
        rect(frog.body.x - 200, frog.body.y -150, 120, 100, 20);
         //little tail
        triangle(frog.body.x -100, frog.body.y -100, frog.body.x -80, frog.body.y-120, frog.body.x -50, frog.body.y - 80);
        pop();
        
    }
    else{
        //bubble on right
        push();
        noStroke();
        fill(255);
        //main body
        rect(frog.body.x + 80, frog.body.y - 150, 120, 100, 20);
         //little tail
        triangle(frog.body.x +100, frog.body.y -100, frog.body.x +80, frog.body.y-120, frog.body.x +50, frog.body.y - 80);
        pop();
    }
}

function decideDialog(){
    //if frog wisdom is over half, it might say wise things
    if(UI.points.wisdom > 75){
        let coinflip = Math.floor(Math.random()*2);
        if(coinflip === 0){
            //generate random wise dialog
            let wiseDialogIndex = Math.floor(Math.random()*4);
            return frogDialog.wiseSayings[wiseDialogIndex];
        }
    }
    //generate random dialog from filler
    let fillerDialogIndex = Math.floor(Math.random()*6);
    //generates random answer to the dialog
    //yes, the answer is decided before you even type anything
    frogDialog.answerIndex = Math.floor(Math.random()*4);
    return frogDialog.filler[fillerDialogIndex];
}

function printDialog(dialog){
    if(frog.body.x > width/2){
    //bubble on left
    push();
    textAlign(CENTER);
    textSize(10);
    text(dialog, frog.body.x - 190, frog.body.y - 140, 100);
    pop();
    }
    else{
        //bubble on right
    push();
    textAlign(CENTER);
    textSize(10);
    text(dialog, frog.body.x + 90, frog.body.y - 140, 100);
    pop();
    }

   
}

function checkMovement(){
    if(!mouseIsMoving()){
        stillnessCounter += 1;
    }
    else{
        stillnessCounter = 0;
    }
    //if stay still too long you start meditating:)

    if(stillnessCounter > 400){
        meditate();
    }
    console.log(stillnessCounter);

}

function mouseIsMoving(){
    //checks if mouse is moving
    if(movedX !== 0 || movedY !== 0){
        return true;
    }
    else{
        return false;
    }
}

function meditate(){
    console.log("meditating");
    //draw eyes closed(just green)
    push();
    colorMode(HSB);
    fill(frog.body.fill.h, frog.body.fill.s, frog.body.fill.b);
    noStroke();
    ellipse(frog.eyes.leftX, frog.eyes.y, frog.eyes.size);
    ellipse(frog.eyes.rightX, frog.eyes.y, frog.eyes.size);
    pop();


    //increase wisdom
    UI.points.wisdom += 0.1;
}

//-------CHAT GAME STATE--------//

function drawFrogBubble(){
    //bg white bubble
    push();
    noStroke();
    fill(255);
    rect(30, 40, 320, 150, 20);
     //bubble's tail
    triangle(40, 150, 50,175, 10, 180);
    pop();
   
    //text inside the bubble
    push();
    fill(0);
    textAlign(LEFT);
    textSize(18);
    text(frogDialog.dialogToPrint,60,70, 260);
    pop();
}

function drawUserBubble(){
    //bg white bubble
    push();
    noStroke();
    fill(255);
    rect(width-350, 200, 320, 150, 20);
     //bubble's tail
    triangle(width-40, 310, width-50,335, width-10, 340);
    pop();
   
    //text inside the bubble
    push();
    fill(0);
    textAlign(LEFT);
    textSize(18);
    textWrap(CHAR);
    text(frogDialog.userDialog,width-320,230, 260);
    pop();
}

function fadeBackground(x,y){
    push();
    noStroke();
    let rectColor = color(0);
    rectColor.setAlpha(100);
    fill(rectColor);
    rect(x,y,width,height);
    pop();
}

function submitDialog(){
    //print answer for 4 seconds
    //bg white bubble
    push();
    noStroke();
    fill(255);
    rect(30, 300, 220, 150, 20);
     //bubble's tail
    triangle(40, 410, 50,435, 10, 440);
    pop();
   
    //text inside the bubble
    push();
    fill(0);
    textAlign(LEFT);
    textSize(18);
    text(frogDialog.responses[frogDialog.answerIndex],60,330, 200);
    pop();
}

//--------START SCREEN--------------//
function startScreen(){
     moveTongue();
    //set frog coords to bottom corner of screen
    frog.body.x = 100;
    frog.eyes.leftX = 100 -40;
    frog.eyes.rightX= 100 +40;
    drawFrog();


    //yellow rectangle
    push();
    noStroke();
    fill(UI.colour.fun);
    rect(20, 70, 600, 150, 20);

    pop();
    //frogfrogfrog title
    push();
    textSize(32);
    fill(UI.colour.health);
    stroke("#000000");
    strokeWeight(10);
    textFont(title.frogTitleFont);
    text('FrogFrogFrog:', 230, 80);
    pop();
    //text shine
    titleAnimation();
    //subtitle
    push();
    textSize(48);
    fill("#000000");
    textFont(title.subtitleFont);
    text('The Quest for', title.x, title.y);
    text('Immortality', title.x+20, title.y+50);
    pop();

    //button 1: PLAY
    drawPlayButton();
    
    //button 2: TUTORIAL
    drawTutorialButton();
}

function titleAnimation(){

    if(title.glowAlpha > 230){
        title.glowChange = -2;
    }
    else if(title.glowAlpha < 180){
        title.glowChange = 1;
    }

    title.glowAlpha += title.glowChange;
    
    title.y = title.offset + sin(title.angle) * title.scalar;
    title.angle += title.speedOfSine;
    push();
    textSize(48);
    let titleGlow = color(255);
    titleGlow.setAlpha(title.glowAlpha);
    stroke(titleGlow);
    strokeWeight(10);
    textFont(title.subtitleFont);
    text('The Quest for', title.x, title.y);
    text('Immortality', title.x+20, title.y+50);
    pop();
}

function drawPlayButton(){
  
    //back shadow
    push();
    noStroke();
    fill(UI.colour.wisdom);
    if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
  	rect(218, 253, 209, 89, 20);
    }else{
  	rect(220, 255, 205, 85, 20);
    } 
    pop();
    //yellow button
    push();
    noStroke();
    fill(UI.colour.fun);
    if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
  	rect(218, 248, 204, 84, 20);
    }else{
  	rect(220, 250, 200, 80, 20);
    } 
    
    pop();
    //text
    push();
    textSize(32);
    textFont(UI.font);
    //create a hover https://editor.p5js.org/ehersh/sketches/Fb6hxZmzQ
    if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
  	fill(UI.colour.health);
    }else{
  	fill(0);
    } 
    text('PLAY', 277, 302);
    pop();

    
}

function drawTutorialButton(){
    //back shadow
    push();
    noStroke();
    fill(UI.colour.wisdom);
    if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
  	rect(218, 353, 209, 89, 20);
    }else{
  	rect(220, 355, 205, 85, 20);}
    pop();
    //yellow button
    push();
    noStroke();
    fill(UI.colour.fun);
    if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
  	rect(218, 348, 209, 84, 20);
    }else{
  	rect(220, 350, 205, 80, 20);}
    pop();
    //text
    push();
    textSize(32);
    textFont(UI.font);
    if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
  	fill(UI.colour.health);
    }else{
  	fill(0);
    } 
    text('TUTORIAL', 237, 402);
    pop();
}
//--------ENDGAME STUFF--------------//

//placeholders for now
function gameOver(){
    //different situations based on points bars

    //a route of balance leads to immortality
    if(UI.points.health > 0 && UI.points.fun > 50 && UI.points.wisdom >50){
    //achieves immortality
    //TITLE
    push();
    textFont(title.subtitleFont);
    textSize(54);
    text('CONGRATULATIONS!', width/20, height/4);
    pop();

    //subtitle
    endGame.subtitle = "Frog has achieved immortality through inner balance."
    }
    //anything else is considered a loss
    else{
    //frog dies before timer ends
    if(UI.points.health <= 0){
        //randomize a death message
        if(endGame.subtitle === "Oops."){
            let arrayIndex = Math.floor(Math.random() * 4);
            endGame.subtitle = "Health points at 0: " + endGame.frogDeathMessages[arrayIndex];
        }
    }
    //survives but wisdom is low
    else if(UI.points.fun > 50 && UI.points.wisdom <= 50){
         if(endGame.subtitle === "Oops."){
        let arrayIndex = Math.floor(Math.random() * 4);
        endGame.subtitle = "Not enough wisdom: " + endGame.funNotWise[arrayIndex];
         }
    }
    //survives but fun is low
    else if(UI.points.fun <=50 && UI.points.wisdom > 50){
         if(endGame.subtitle === "Oops."){
        let arrayIndex = Math.floor(Math.random() * 2);
        endGame.subtitle = "Not enough fun: " + endGame.wiseNotFun[arrayIndex];
         }
    }
    //survives but both wisdom and fun are low
    else if(UI.points.fun <=50 && UI.points.wisdom <= 50){
         if(endGame.subtitle === "Oops."){
        let arrayIndex = Math.floor(Math.random() * 3);
        endGame.subtitle = "Not wise nor happy: " + endGame.noWiseNoFun[arrayIndex];
         }
    }

    //TITLE
    push();
    textFont(title.subtitleFont);
    textSize(64);
    text('GAME OVER', width/6, height/4);
    pop();
}
    //subtitle
    push();
    textStyle(BOLD);
    textSize(16);
    text(endGame.subtitle, 120,190, 5*width/6);
    pop();


    //Buttons 
    drawPlayAgainButton();
    drawTutorialButton();

}


function drawPlayAgainButton(){
  
    //back shadow
    push();
    noStroke();
    fill(UI.colour.wisdom);
    if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
  	rect(218, 253, 209, 89, 20);
    }else{
  	rect(220, 255, 205, 85, 20);
    } 
    pop();
    //yellow button
    push();
    noStroke();
    fill(UI.colour.fun);
    if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
  	rect(218, 248, 204, 84, 20);
    }else{
  	rect(220, 250, 200, 80, 20);
    } 
    
    pop();
    //text
    push();
    textSize(32);
    textFont(UI.font);
    //create a hover https://editor.p5js.org/ehersh/sketches/Fb6hxZmzQ
    if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
  	fill(UI.colour.health);
    }else{
  	fill(0);
    } 
    text('RETRY', 267, 302);
    pop();

    
}

function gameReset(){
    UI.points.health = 150;
    UI.points.fun = 150;
    UI.points.wisdom = 150;
    timerValue= 60*3;
    endGame.subtitle = "Oops."
    UI.notificationText = "";
    clickCounter = 0;
    frog.body.size = 150;
    frog.wrinkles.alpha = 0;
    frog.body.fill.h= 120;
    frog.body.fill.s= 87;
    frog.body.fill.b= 71;

};



//-----------------------TUTORIAL RELATED THINGS HERE!!!!!!!!!!---------------//

function drawTutorial(){

    
    //using a switch to control the tutorial's flow
    switch(tutorialStage){
        case 0:{
            
            //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0,0);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Achieving immortality is not easy…\n\nTo do so, you must achieve balance through...");
        
            break;
        }    
        case 1:{
             //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Achieving immortality is not easy…\n\nTo do so, you must achieve balance through...");

            drawTextBox(20, 70, 175, 100, "HEALTH! \n If the meter reaches 0, frog dies.");
            break;
        }  
        case 2:{
             //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Achieving immortality is not easy…\n\nTo do so, you must achieve balance through...");

            drawTextBox(235, 70, 175, 100, "WISDOM! \n Frog becomes more insightful with higher wisdom.");
            
            break;
        }  
        case 3:{
                 //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Achieving immortality is not easy…\n\nTo do so, you must achieve balance through...");

            drawTextBox(450, 70, 175, 100, "HAPPINESS! \n Watch out for depression.");
            
            break;
        }
        case 4:{
                 //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Immortality will come with time (about 60 seconds) if you maintain balance of all three meters.");
            break;
        }
          case 5:{
                 //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0, 0);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("One thing stands in your way...");
            break;
        }
        case 6:{
            //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0, 0);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("One thing stands in your way... \n\nOLD AGE!!!");
            break;
        }
        case 7:{
            //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("As time moves forward, frog will lose health, wisdom and happiness.");
            break;
        }
        case 8:{

            //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //fly appears
            fly.offset = 120;
            fly.type = 0;
            fly.color = UI.colour.health;
            drawFly();
            moveFly();

            fadeBackground(0, -height+80);
            fadeBackground(0, 170);

            //eating flies
            drawTextBox(50, 230, 250, 60, "Eating flies will help replenish your meters");

            //next button
            drawNextButton();
            break;
        }

        case 9:{
            //set frog coords to bottom corner of screen
            drawFrog();
            moveFrog();

            drawUI();

            //fly appears
            fly.offset = 120;
            fly.type = 0;
            fly.color = UI.colour.health;
            drawFly();
            moveFly();

            fadeBackground(0, -height+80);
            fadeBackground(0, 170);

            //eating flies
            drawTextBox(50, 230, 250, 60, "Move the frog by sliding your mouse left or right");

            //next button
            drawNextButton();
            break;
        }
        case 10:{
              //set frog coords to bottom corner of screen
            drawFrog();
            moveFrog();

            moveTongue();
            checkTongueFlyOverlap();

            drawUI();

            //fly appears
            fly.offset = 120;
            fly.type = 0;
            fly.color = UI.colour.health;
            drawFly();
            moveFly();

            fadeBackground(0, -height+80);
            fadeBackground(0, 170);

            //eating flies
            drawTextBox(50, 230, 245, 100, "When aligned with the fly, press the left mouse button to shoot out your tongue!");

            //next button
            drawNextButton();
            break;
        }
        case 11:{
            //set frog coords to bottom corner of screen
            drawFrog();
            moveFrog();

            moveTongue();
            checkTongueFlyOverlap();

            //fly appears
            drawFly();
            moveFly();

            drawUI();

            //eating flies
            drawTextBox(50, 230, 245, 100, "Different coloured flies will increase the meter of the corresponding color. Try it out!");

            //next button
            drawNextButton();
            break;

        }
        case 12:{
            //set frog coords to bottom corner of screen
            drawFrog();
            moveFrog();

            moveTongue();
            checkTongueFlyOverlap();

            fadeBackground(0, -height+60);
            fadeBackground(0, 160);
            
            //math fly
            mathFly.appears = true;
            moveMathFly();
            drawMathFly();

            drawUI();

            drawTextBox(50, 230, 245, 100, "Occasionally, you may encounter a math fly! This fly will move differently from the other flies.");

            //next button
            drawNextButton();
            break;

        }
        case 13:{
            //set frog coords to bottom corner of screen
            drawFrog();

            fadeBackground(0, 0);
            
            //math fly
            mathFly.appears = true;
           //moveMathFly();
            drawMathFly();

            drawUI();

            drawTextMiddle('Correct answers will increase wisdom while incorrect answers will decrease wisdom.');

            //next button
            drawNextButton();
            break;
        }
        case 14:{
            
            //set frog coords to bottom corner of screen
            drawFrog();

            fadeBackground(0, 0);
            
            //math fly
            mathFly.appears = true;
           //moveMathFly();
            drawMathFly();

            drawUI();

            if(!mathProblemCalculated){
                mathProblem();
                mathProblemCalculated = true;
            }
            
            backPain();

            drawTextBox(50, 360, 400, 100, 'When caught, you will need to type your answer using the keyboard, then press "enter" to confirm.')

            break;
        }
        case 15:{
            
            //set frog coords to bottom corner of screen
            drawFrog();
            moveFrog();

             moveTongue();
            checkTongueFlyOverlap();

            //fly appears
            drawFly();
            moveFly();

            drawUI();

            frogDialog.isTalking = true;
            frogDialog.dialogToPrint = "Hello dear tutorial student!";
            dialog();

            drawTextBox(100, 250, 400, 80, 'Sometimes, Frog may speak to you. Press "enter" to respond.');
            break;
        }
        case 16:{
            fadeBackground(0,0);
            drawFrogBubble();
            drawUserBubble();

            drawTextBox(30, 220, 200, 100, 'Type your answer with the keyboard, then press "enter" to confirm.');
            break;
        }
        case 17:{
            fadeBackground(0,0);
            drawFrogBubble();
            drawUserBubble();

            submitDialog();
            drawTextBox(300, 360, 200, 100, 'Press "enter" again to exit the conversation.');
            break;
        }
    }

console.log(tutorialStage);
};

function drawNextButton(){

    //next glow
    nextButton.glowIntensity +=0.05;
    if(nextButton.glowIntensity > 5){
        nextButton.glowIntensity = 0;
    }

    push();
    fill(255);
    noStroke();
    rect(nextButton.box.x-nextButton.glowIntensity, nextButton.box.y-nextButton.glowIntensity, nextButton.box.width+nextButton.glowIntensity*2, nextButton.box.height+nextButton.glowIntensity*2, nextButton.box.roundedness);
    pop();


//hover?
if(mouseX > nextButton.box.x && mouseX < nextButton.box.x+nextButton.box.width && mouseY > nextButton.box.y && mouseY < nextButton.box.y + nextButton.box.height){

//yellow box
    push();
    fill(UI.colour.health);
    noStroke();
    rect(nextButton.box.x-5, nextButton.box.y-5, nextButton.box.width+10, nextButton.box.height+10, nextButton.box.roundedness);
    pop();

    //next text
    push();
    textFont(UI.font);
    fill(255);
    textSize(nextButton.text.size);
    text("NEXT",nextButton.text.x, nextButton.text.y, nextButton.text.width);
    pop();

}
else{
//yellow box
    push();
    fill(UI.colour.fun);
    noStroke();
    rect(nextButton.box.x, nextButton.box.y, nextButton.box.width, nextButton.box.height, nextButton.box.roundedness);
    pop();

    //next text
    push();
    textFont(UI.font);
    fill(nextButton.text.fill);
    textSize(nextButton.text.size);
    text("NEXT",nextButton.text.x, nextButton.text.y, nextButton.text.width);
    pop();
}

}

function drawTextMiddle(write){

    //white box
    push();
    fill(255);
    noStroke();
    rect(100, 200, 450, 180, 10);
    pop();

    push();
    textSize(24);
    text(write, 120, 230, 430);
            
    pop();
}

function drawTextBox(x,y,w,h,write){

    //white
    push();
    fill(255);
    noStroke();
    rect(x,y,w,h,10);
    pop();

    push();
    textSize(18);
    text(write,x+10, y+10, w-5, h-5);
    pop();
}