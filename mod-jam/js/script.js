/**
 * Frogfrogfrog: The Quest for Immortality
 * Arielle Wong and Pippin Barr
 * 
 * Gain immortality by achieving balance in health, wisdom and happiness. 
 * Eat flies to keep those stats high and face the effects of old age!
 * 
 * Instructions:
 * - Keep meters high
 * - Frog dies if the green meter reaches 0
 * - Frog doesn't achieve immortality if wisdom and happiness are not sufficient
 * - Boost meter points by eating flies of the corresponding colours 
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * - Math flies will stay within one area of the screen and disappear quickly
 * - If caught, answer the math question correctly to boost wisdom
 * - Answer using the keyboard and press enter to confirm
 * - Pressing enter while Frog is talking will allow you to speak to them
 * - Type your answer then press enter to confirm
 * - Speaking to frog will increase happiness
 * - Clicking too fast will result in back pain
 * - Staying still will trigger a meditative state that boosts wisdom
 * - Depression happens if the happiness meter is too low
 * - Depression will lead to slower movement speed
 * - Frog develops cataracts over time, you can't do anything about it
 * 
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
let gameState = "start"

//counts the number of clicks per second
//affects back pain
let clickCounter = 0;

//minimum clicks before you get back pain
let backPainMin = 10;

//keeps track of how many times draw is called while user hasn't moved
let stillnessCounter = 0;

//keeps track of which part of the tutorial you have reached
//there are 23 stages
let tutorialStage = 0;

//checks if the math problem has been set up or not for the user
//prevents infinitely cycling through math problems
let mathProblemCalculated = false;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        //frog's colour
        fill:{
            h:120,
            s:87,
            b:71,
        },
        //frog's position
        x: 320,
        y: 510,
        //frog's size
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
        //the black part of the eyes
        pupils:{
        size: 10,
        }
    },
    //wrinkles will appear over time using the alpha
    wrinkles:{
        h:106,
        s: 51,
        b:42,
        //transparency of the wrinkles
        alpha:0,
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    //for the sine wave
    //height fly appears on the canvas
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
    //the wings flap very quickly
    wings:{
        x:undefined,
        y:undefined,
        sizeX: 10,
        sizeY: 5,
        //white
        colour: 255,
    },
};
//math fly (same as fly apart from changes in the movements and effects)
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
    //these are the numbers appearing in the math problem
    value1: 0,
    value2: 0,
};

//this controls the main user interface
//ex: points meters at the top of the screen
const UI = {
    //font is established after the preload
    font: undefined,
    //main colours used
    colour:{
health:"#17B617" ,
wisdom:"#5c42b1ff",
fun:"#eba708ff",
empty: "#d1d1d2ff"
    },
    //amount of points in each meter goes from 0 to 150
    points:{
        health:150,
        wisdom:150,
        fun:150,
    },
    //notification text appears in the middle of the screen 
    //it is used by back pain but also math problems
    notificationText: "",
}

//quest for immortality title
const title = {
    frogTitleFont: undefined,
    subtitleFont: undefined,
    //transparency of the glow
    glowAlpha: 230,
    //amount by which the glow will change (can be -2 or +1)
    glowChange: 1,
    //position of title
    x:150,
    y:180,
    //for the bobbing animation
    offset: 140,
    angle: 0,
    scalar: 5,
    speedOfSine: 0.05,
}

//messages used in the game over/success screens at the end of the game
const endGame = {
    //if your health reaches 0
    frogDeathMessages : ["Frog has died of tuberculosis.", "Frog just wasn't feeling it.", "Frog has succumbed to a heart attack.", "Frog sneezed too hard."],
    //if you reached the end but are missinf wisdom
    funNotWise: ["Live fast, die young", 'Maybe buying that "vintage" motorcycle wasn\'t the best idea', "No matter how tempting, do not eat the deep fried icecream", "A life filled with fun is a life well lived."],
    //reached end but missing fun
    wiseNotFun: ["Perhaps the greatest wisdom of all is learning to have fun", "So wise yet so unhappy..."],
    //reached end and missing both wisdom and fun
    noWiseNoFun: ["A life spent only to extend it is a life wasted away", "All those chia seed smoothies, and for what?", "Time is so short"],
    //the message that will end up being displayed. oops is a placeholder
    subtitle: "Oops.",
}

//frog cataracts
const cataracts = {
    colour:{
        r:217,
        g:188,
        b:122,
    },
    //transparency/intensity of the yellow
    alpha: 0,
    //bluriness of vision
    blur:0,
}
//anything related to the dialog feature
const frogDialog = {
//keeps track of whether or not the frog is talking
    isTalking: false,
    //dialog options if the frog is wise
    wiseSayings : ["\“Appear weak when you are strong, and strong when you are weak.\” - Sun Tzu",
    "\“If you know the enemy and know yourself, you need not fear the result of a hundred battles.\” -Sun Tzu",
    "\“Let your plans be dark and impenetrable as night, and when you move, fall like a thunderbolt.\” - Sun Tzu",
    "Great power comes with great responsibility - Uncle Ben",
    ],
    //filler dialog (old people sayings)
    filler:[
    "The weather these days… The farmers won’t be too happy.",
    "Did you know that my neighbour bought new types of trash bags? Wonder if it’s the divorce making them crazy.",
    "Back in my days, we didn’t have any of these weefees in our homes. We just had lead and arsenic.",
    "You should come visit more often. I made this new thing called strawberry-chicken pot pie.",
    "This reminds me of when my cousin drowned in the sewers.",
    "Remember my aunt’s best friend’s daughter’s husband’s uncles’ cousin? Yes, well, he’s studying to be a doctor. "
    ],
    //responses after being spoken to
    responses:[
    "Oh! Interesting opinion…",
    "Hahah, you always say such silly things!",
    "Someone once said something similar to me…",
    "I love talking to you!",
    ],
    //dialog that will be printed in the speech bubble
    dialogToPrint:"hi",
    //dialog the user types
    userDialog:"",
    //array index of which answer is chosen
    answerIndex:0,
};

//next button in the tutorial
const nextButton = {
    //yellow box 
    box:{
        x:500,
        y:420,
        width:120,
        height:40,
        //rounded corners
        roundedness:5
    },
    //text in the button
    text:{
        size:24,
        fill:0,
        x:525,
        y:448,
        width:100,
    },
    //how much glow around the button (varies for the flashing effect)
    glowIntensity: 0,

}


let backgroundColour = "#87ceeb"; //background colour of the game

//runs before anything else
//loads my fonts so they're ready to use!
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

/**
 * Called every frame by the computer
 * Main driver of my program
 * Controls what is seen on the screen.
 */
function draw() {
    //draw the beautiful blue background
    background(backgroundColour);

    //if the game is in play mode
    if(gameState === "play"){
    //move the fly across the screen
    moveFly();
    //draw the fly
    drawFly();
    //move the math fly
    moveMathFly();
    //draw the math fly
    drawMathFly();
    //move frog (follows the mouse)
    moveFrog();
    //checks if frog should have depression and if so, implements it
    depression();
    //moves Frog's tongue
    moveTongue();
    //draws frog
    drawFrog();
    //checks if user caught a fly
    checkTongueFlyOverlap();
    //draws the cataracts (UI is after just so you can still see the UI even with cataracts)
    drawCataracts();
    //draws the points meters
    drawUI();
    //checks for strenuous activity and gives back pain accordingly
    backPain();
    //makes the frog speak
    dialog();
    //for meditation purposes, checks if Frog is moving
    checkMovement();
    //when the timer runs out
    if (timerValue == 0) {
        //the game ends and we switch to game over phase
    gameState = "gameOver";
  }
}
//if we are at the start of the game, the start menu is displayed
else if(gameState === "start"){
    //displays the title screen and initial start menu
    startScreen();
}
//if we are in the game over state, we'll display the game over screen and end menu
else if(gameState === "gameOver"){
    //displays the end screen
    gameOver();
}
//if the state is math, a math fly is asking a math problem
else if(gameState === "math"){
//draws the frog
    drawFrog();
    //draws cataracts
    drawCataracts();
    //draws UI over everything (so math problem is visible)
    drawUI();
    //will display the math problem
    displayNotificationText();
}
//if the game state is chat then you are speaking to the frog
else if(gameState === "chat"){
    //frog still there
    drawFrog();
    //cataracts still there
    drawCataracts();
    //meters still there
    drawUI();
    //add a slight opacity filter 
    fadeBackground(0,0);
    //speech bubble for Frog
    drawFrogBubble();
    //speech bubble for you!
    drawUserBubble();
}
//if user submits a response to frog
else if(gameState === "submitDialog"){
    drawFrog();
    drawCataracts();
    drawUI();
    //add a slight opacity filter 
    fadeBackground(0,0);
    drawFrogBubble();
    drawUserBubble();
    //Frog's response to your insightful commentary
    submitDialog();

}
//if you're doing the tutorial
if(gameState === "tutorial"){
    //draw tutorial is the main driver for the tutorial
    //controls the tutorial's stages
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
        //ages the frog
        getOlder();
        
    }
    //only certain tutorial stages will require frog to age,
    // others will have frog be "intemporel", unaffected by the claws of time
    if(gameState === "tutorial" && (tutorialStage === 7 || tutorialStage === 11 || tutorialStage === 19 || tutorialStage === 20)){
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
 * Draws the fly 
 */
function drawFly() {
    push();
    noStroke();
    //new randomized fly colours! (colour is reset when fly exits the canvas)
    fill(fly.color);
    ellipse(fly.x, fly.y, fly.size);
    pop();
//draws the wings of the fly
push();
noStroke();
let wingColour = color(fly.wings.colour);
//slight transparency
wingColour.setAlpha(1000);
fill(wingColour);
ellipse(fly.wings.x, fly.wings.y, fly.wings.sizeX, fly.wings.sizeY);
//moveWings
moveWings(fly.x, fly.y);
pop();

}

/**
 * Moves the fly's wings in a randomized pattern
 */
function moveWings(x,y){
    fly.wings.x = x - Math.floor(Math.random() * 3);
    fly.wings.y = y -Math.floor(Math.random() * 8);
}

/**
 * Moves the math fly's wings in a randomized pattern
 */
function moveMathWings(x,y){
    mathFly.wings.x = x - Math.floor(Math.random() * 3);
    mathFly.wings.y = y - Math.floor(Math.random() * 8);
}

/**
 * Moves the math fly up and down and then random sideways movements
 */
function moveMathFly() {
    //trying out a sine wave (up and down bobbing)
    mathFly.y = mathFly.offset + sin(mathFly.angle) * mathFly.scalar;
    mathFly.angle+= mathFly.speedOfSine;
    //random number between -2 and 2
    //fly will randomly go left and right
    mathFly.direction = Math.floor(Math.random()*(2 +2)) - 2;
    mathFly.x += mathFly.direction;
    //constrain so the fly doesn't leave the canvas
    mathFly.x = constrain(mathFly.x, 30, width-30);
}

/**
 * Draws the math fly
 */
function drawMathFly(){
    //if math fly isn't already there
    if(mathFly.appears === false){
    //rolls a dice to see if math fly appears
    //it's a 200  sided dice!
    let diceRoll = Math.floor(Math.random()*200);
    //if you roll a 1, a math fly will appear
    if(diceRoll === 1){
        //set the boolean to true
        mathFly.appears = true;
        //math fly goes away after 2 seconds
        setTimeout(mathFlyDisappears, 2000);
    }
    }
    //if the math fly is on the canvas
    if(mathFly.appears === true){
        //draws the math fly
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
/**
 * After 2 seconds, the math fly disappears
 */
function mathFlyDisappears(){
    //set the boolean to false
    mathFly.appears = false;
    //set a new random starting position for the next math fly
    mathFly.x = random(30, width-30);
    //set a new random height for the next math fly
    mathFly.offset = random(80, 300);
}
/**
 * Resets the fly to the left with a random height
 */
function resetFly() {
    //all the way left
    fly.x = 0;
    //this is the height of the fly
    fly.offset = random(50, 300);
    //i want green flies more frequently so:
    let diceRoll = Math.floor(Math.random() * 6);
    if(diceRoll > 3){
        //1/3 chance of getting green fly automatically
        fly.type = 0;
    }
    else{
    //randomizing the fly types 0-2
    fly.type = Math.floor(Math.random() * 3);
    }
    //matching the fly colour to the type assigned
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
    //eyes also follow the body!
    frog.eyes.leftX = mouseX -40;
    frog.eyes.rightX= mouseX +40;
}

/**
 * makes frog slower if happiness is low
 */
function depression(){
    //if happinesss/fun is lower than 50 (1/3 the bar)
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
    //they will get darker with time
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
    //based off the eye positions so they follow the frog's movements
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
            //for the tutorial math fly 
            if(gameState === "tutorial" && tutorialStage === 12){
                tutorialStage += 1;
            }
            else{
                //calculates a math problem
                mathProblem();
            }
        
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
    }
}

/**
 * Generates a math problem
 */
function mathProblem(){
    //get an extra 5 seconds of game time
    timerValue += 5*3;
    //sets the first random number 0-9
    mathFly.value1 = Math.floor(Math.random()*10);
    //sets the second random number 0-9
    mathFly.value2 = Math.floor(Math.random()*10);
    //changes the notification text to display the equation
    UI.notificationText = mathFly.value1 + " + " + mathFly.value2+ " = ";
    //changes the game state to math
    if(gameState === "play" || gameState === "math"){
        gameState = "math";
    }
}

/**
 * Checks if the player answered the math question correctly
 */
function checkAnswer(){
   //verifies answer
   //gets only what is entered after the =
   let answer = UI.notificationText.split("=");
   //get rid of whitespace
   answer = answer[1].trim();
   if(answer == (mathFly.value1 + mathFly.value2)){
    //correct answer
    UI.notificationText = "Correct!";
    //increases wisdom points
    UI.points.wisdom += 40;
    UI.points.wisdom = constrain(UI.points.wisdom, 0 ,150);

   }
   else{
    //incorrect answer
     UI.notificationText = "Incorrect.";
     //decreases wisdom points
     UI.points.wisdom -= 10;
    UI.points.wisdom = constrain(UI.points.wisdom, 0 ,150);
   }
   if(gameState === "math"){
    //displays the correct/incorrect message for 1 second then returns to regular gameplay
   setTimeout(backToPlay, 1000);
   }
   else{
    //if you answer in the tutorial, you advance to the next stage of the tutorial
    setTimeout(advanceTutorialStage, 1000);
   }
}

/**
 * Returns the player back to regular gameplay 
 */
function backToPlay(){
    //switches the game state
    gameState = "play";
    //resets the notification text to empty
    UI.notificationText="";
}

/**
 * Advances the tutorial stage by 1
 */
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
    //resets the stillness counter
    stillnessCounter = 0;

    //if frog's tongue is in their mouth, shoot it out
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
  
    //START SCREEN and END OF TUTORIAL
    if(gameState === "start" || (gameState === "tutorial" && tutorialStage === 23)){
        //if you press on the play button
        if(mouseX> 220 && mouseX<425 && mouseY>255 && mouseY <340){
            gameReset();
        //game state switches to play
            gameState = "play";
        }
        //if you press on tutorial button
        if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
            //gamestate switches to tutorial
            tutorialStage = 0;
            gameState = "tutorial";
            gameReset();
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
            tutorialStage = 0;
            //gamestate swtches to tutorial
            gameState = "tutorial";
            gameReset();
        }

    }
    //Tutorial NEXT BUTTON
    if(gameState === 'tutorial' && tutorialStage != 14 && tutorialStage !== 15 && tutorialStage !== 16 && tutorialStage !== 17 && tutorialStage !==23){
        if(mouseX > nextButton.box.x && mouseX < nextButton.box.x+nextButton.box.width && mouseY > nextButton.box.y && mouseY < nextButton.box.y + nextButton.box.height){
            //moves the tutorial stage over by 1
            tutorialStage += 1;
        }
    }

}

/**
 * Reacts to any key pressed on the keyboard
 */
function keyPressed(event){

    //triggers the chat with Frog
    //if Forg is talking and you're playing the game
    if(frogDialog.isTalking && gameState === "play"){
        //press enter to go to chat state
        if(event.key === "Enter"){
            gameState = "chat";
        }
    }
    //if game state is math or tutorial is teaching math
    else if( gameState === "math" || (gameState === "tutorial" && tutorialStage === 14)){
        //pressing enter confirms your answer and checks it
        if(event.key === "Enter"){
            checkAnswer();
        }
        //pressing backspace will delete what you have typed
        else if(event.key === "Backspace"){
            //if the last two characters are not = then delete
            if(UI.notificationText.substring(UI.notificationText.length -2, UI.notificationText.length) != "= "){
                //removes the last character of the string
                UI.notificationText = UI.notificationText.substring(0, UI.notificationText.length-1);
            }
            
        }
        //any other key will print in the notification text
        else{
            UI.notificationText += event.key;
        }
    }
    //if you're chatting with frog (gameplay and tutorial)
    else if(gameState === "chat" || tutorialStage === 16){
        //enter submits your answer
        if(event.key === "Enter"){
            //if doing the tutorial, you move on
            if(tutorialStage === 16){
                advanceTutorialStage();
            }   
            else{
                //game state changes to submitDialog
                gameState = "submitDialog"
            }
        }
            //backspace deletes what you've typed
        else if(event.key === "Backspace"){
            frogDialog.userDialog = frogDialog.userDialog.substring(0, frogDialog.userDialog.length -1);
        }
        else{
            //anything else will print in your speech bubble
            frogDialog.userDialog += event.key;
        }
    }
    //if your response has been sent to frog
    else if(gameState === "submitDialog"){
        //enter will exit chat mode
        if(event.key === "Enter"){
            //only get points if you say something to the frog
            if(frogDialog.userDialog != ""){
            UI.points.fun += 50;
            UI.points.fun = constrain(UI.points.fun, 0, 150);
            }
            //say nothing, lose points heheh
            else{
                UI.points.fun -= 20;
                UI.points.fun = constrain(UI.points.fun, 0, 150);
            }
            //reset user dialog
            frogDialog.userDialog = "";
            //Frog is no longer talking
            frogDialog.isTalking = false;
            //back to regular gameplay
            gameState = "play";   
        }
    }
    //During specific stages of the tutorial, Enter key triggers the next stage
    else if((tutorialStage === 15 && frogDialog.isTalking) || tutorialStage === 17){
        if(event.key === "Enter"){
            advanceTutorialStage();

        }
    }
}
/**
 * Draws the frog's cataracts
 */
function drawCataracts(){
    //draws a big rectangle over whole screen
    push();
    //yellow!
    let cataractsColour = color(cataracts.colour.r, cataracts.colour.g, cataracts.colour.b);
    //transparent so we can still see Frog
    cataractsColour.setAlpha(cataracts.alpha);
    fill(cataractsColour);
    noStroke();
    rect(0,0,width,height);
    pop();

    //after a certain time, the blur will appear!
    if(timerValue <= 20*3){
        //blurs the entire screen 
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

/**
 * Draws the health bar and icon (green one)
 */
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
    //will match the amount of points 
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
    //just a + sign
    rect(20, 25, 10, 30, 2);
    rect(10, 35, 30, 10, 2);
    pop();
    //colour
    push();
    noStroke();
    //green
    fill(UI.colour.health);
    //+ sign
    rect(20, 25, 10, 30, 2);
    rect(10, 35, 30, 10, 2);
    pop();
  
}

/**
 * Draws the wisdom meter and its icon (blue one)
 */
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
    //matches with the amount of wisdom points!
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
    //trying to draw a brain
    ellipse(width/3+18, 38, 36,25);
    ellipse(width/3+29, 44, 20,29);
    pop();
    //colour
    push();
    noStroke();
    fill(UI.colour.wisdom);
    //brain
    ellipse(width/3+18, 38, 36,25);
    ellipse(width/3+29, 44, 20,29);
    pop();
    
}

/**
 * Draws the fun/happiness meter and its icon (yellow bar)
 */
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
    //corresponds to ammount of fun points we have
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
    //yellow circle
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

/**
 * When eaten, different fly types have different effects
 * This calculates the effects and applies them
 */
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
       
        if(gameState === "tutorial"){
            UI.points.health = constrain(UI.points.health, 1, 150);
        }
        else{
            UI.points.health = constrain(UI.points.health, -1, 150);
        }
    //sets background to blue
   //this is a reset from the red if you get back pain
   //happens after half a second
    setTimeout(resetBg, 1000/2);
    }
    //displays the notification text in the center of the screen
      displayNotificationText();
}

/**
 * Displays the notification text in the middle of the screen
 * used by math and back pain
 */
function displayNotificationText(){
        push();
        textStyle(BOLD);
        textSize(32);
        text(UI.notificationText, 250, 200)
        pop();
}

/**
 * Resets the background to blue
 */
function resetBg(){
    backgroundColour = "#87ceeb";
    //avoids interfering with the math problem 
    //if back pain triggered right before math, it could cause problems and erase the maht problem completely
    if(gameState !== "math"){
    UI.notificationText = "";}
}

/**
 * Displays the frog's dialog
 */
function dialog(){
    //check if the frog should be saying anything
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
            //after 4 seconds, the dialog will be reset
            setTimeout(resetDialog, 4000);
        }
        //any other roll will result in frog staying silent
    }
}

/**
 * Frog stops talking
 */
function resetDialog(){
    frogDialog.isTalking = false;
}

/**
 * Draws Frog's speech bubble 
 */
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

/**
 * Chooses which dialog Frog will say
 */
function decideDialog(){
    //if frog wisdom is over half, it might say wise things
    if(UI.points.wisdom > 75){
        let coinflip = Math.floor(Math.random()*2);
        if(coinflip === 0){
            //generate random wise dialog
            let wiseDialogIndex = Math.floor(Math.random()*4);
            return frogDialog.wiseSayings[wiseDialogIndex];
        }
        //otherwise, frog just says filler dialog
    }
    //generate random dialog from filler
    let fillerDialogIndex = Math.floor(Math.random()*6);
    //generates random answer to the dialog
    //yes, the answer is decided before you even type anything
    frogDialog.answerIndex = Math.floor(Math.random()*4);
    return frogDialog.filler[fillerDialogIndex];
}

/**
 * Prints Frog's dialog in the speech bubble
 */
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

/**
 * Check if user is moving Frog
 */
function checkMovement(){
    //if mouse is still
    if(!mouseIsMoving()){
        //increase stillness counter
        stillnessCounter += 1;
    }
    else{
        //otherwsie, reset counter to 0
        stillnessCounter = 0;
    }
    //if stay still too long you start meditating:)
    if(stillnessCounter > 400){
        meditate();
    }
}

/**
 * Checks if the mouse is moving
 */
function mouseIsMoving(){
    //checks if mouse is moving
    if(movedX !== 0 || movedY !== 0){
        return true;
    }
    else{
        return false;
    }
}

/**
 * Frog closes eyes and meditates (wisdom increase)
 */
function meditate(){
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
    UI.points.wisdom = constrain(UI.points.wisdom, 0, 150);
}

//-------CHAT GAME STATE--------//

/**
 * Draws Frog's initial dialog in a bubble
 */
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

/**
 * Draws the user's response to Frog
 */
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
/**
 * Makes the background darker
 */
function fadeBackground(x,y){
    //draws a big rectangle over everything
    push();
    noStroke();
    //black rectangle
    let rectColor = color(0);
    //transparent rectangle
    rectColor.setAlpha(100);
    fill(rectColor);
    rect(x,y,width,height);
    pop();
}

/**
 * Displays Frog's response to your text
 */
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
    //randomly generated earlier
    text(frogDialog.responses[frogDialog.answerIndex],60,330, 200);
    pop();
}

//--------START SCREEN--------------//
/**
 * The starting page of the game
 */
function startScreen(){
     
    //set frog coords to bottom corner of screen
    frog.body.x = 100;
    frog.eyes.leftX = 100 -40;
    frog.eyes.rightX= 100 +40;
    drawFrog();
    moveTongue();


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

/**
 * Animates the title to glow and bob up and down
 */
function titleAnimation(){
    //alternates the glow's alpha/transparency
    if(title.glowAlpha > 230){
        title.glowChange = -2;
    }
    else if(title.glowAlpha < 180){
        title.glowChange = 1;
    }

    title.glowAlpha += title.glowChange;
    
    //bobs the title up and down
    title.y = title.offset + sin(title.angle) * title.scalar;
    title.angle += title.speedOfSine;
    //draws the glow of the title
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

/**
 * Displays the PLAY button
 */
function drawPlayButton(){
  
    //back shadow
    push();
    noStroke();
    fill(UI.colour.wisdom);
    //hover purposes
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
    //hover purposes
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

/**
 * Display the tutorial button
 */
function drawTutorialButton(){
    //back shadow
    push();
    noStroke();
    fill(UI.colour.wisdom);
    //hoverr
    if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
  	rect(218, 353, 209, 89, 20);
    }else{
  	rect(220, 355, 205, 85, 20);}
    pop();
    //yellow button
    push();
    noStroke();
    fill(UI.colour.fun);
    //hover
    if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
  	rect(218, 348, 209, 84, 20);
    }else{
  	rect(220, 350, 205, 80, 20);}
    pop();
    //text
    push();
    textSize(32);
    textFont(UI.font);
    //hoverr
    if(mouseX> 220 && mouseX<425 && mouseY>355 && mouseY <440){
  	fill(UI.colour.health);
    }else{
  	fill(0);
    } 
    text('TUTORIAL', 237, 402);
    pop();
}
//--------ENDGAME STUFF--------------//

/**
 * Screen displayed when you win/lose the game
 */
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
/**
 * Displays the RETRY BUTTOn
 */
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
    //wanted it to say "reincaranate" but that was too long so i just stuck with retry
    text('RETRY', 267, 302);
    pop();

    
}

/**
 * Resets all variables to their initial values
 * Hopefully didn't forget any...
 */
function gameReset(){
    //meters back to full
    UI.points.health = 150;
    UI.points.fun = 150;
    UI.points.wisdom = 150;
    //timer back at 60 seconds
    timerValue= 60*3;
    //placeholder text
    endGame.subtitle = "Oops."
    UI.notificationText = "";
    frogDialog.dialogToPrint = "hi"
    //no back pain yet
    clickCounter = 0;
    //no stillness
    stillnessCounter = 0;
    //reverse aging
    frog.body.size = 150;
    frog.wrinkles.alpha = 0;
    frog.body.fill.h= 120;
    frog.body.fill.s= 87;
    frog.body.fill.b= 71;
    //tutorial back at stage 0
    tutorialStage = 0;
    //Frog is quiet
    frogDialog.isTalking = false;
    //no cataracts yet
    cataracts.alpha = 0;
    cataracts.blur = 0;
    //no math to be seen
    mathProblemCalculated = false;
};



//-----------------------TUTORIAL RELATED THINGS HERE!!!!!!!!!!---------------//

/**
 * Controls the flow of the tutorial
 */
function drawTutorial(){
    //using a switch to control the tutorial's flow
    switch(tutorialStage){
        case 0:{
            //introduces the game's concept

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
            //explains the health meter

             //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything (except sliver at the top!)
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Achieving immortality is not easy…\n\nTo do so, you must achieve balance through...");

            drawTextBox(20, 70, 175, 100, "HEALTH! \n If the meter reaches 0, frog dies.");
            break;
        }  
        case 2:{
            //explains the wisdom meter
             //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything except sliver at top
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Achieving immortality is not easy…\n\nTo do so, you must achieve balance through...");

            drawTextBox(235, 70, 175, 100, "WISDOM! \n Frog becomes more insightful with higher wisdom.");
            
            break;
        }  
        case 3:{
            //exlpains happiness meter

                 //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything except top part
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Achieving immortality is not easy…\n\nTo do so, you must achieve balance through...");

            drawTextBox(450, 70, 175, 100, "HAPPINESS! \n Watch out for depression.");
            
            break;
        }
        case 4:{
            //hints at the game timer (still a bit of a mystery, that's on purpose)
            //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything except the meters
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Immortality will come with time (about 60 seconds) if you maintain balance of all three meters.");
            break;
        }
          case 5:{
            //introducing....
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
            //old age!

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
            //show meters decreasing and frog getting older
            //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();

            drawUI();

            //draw dark rectangle overtop everything except meters
            fadeBackground(0, 80);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("As time moves forward, frog will lose health, wisdom and happiness.");
            break;
        }
        case 8:{
            //explain flies
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

            //background will be dark except where the fly passes
            fadeBackground(0, -height+80);
            fadeBackground(0, 170);

            //eating flies
            drawTextBox(50, 230, 250, 60, "Eating flies will help replenish your meters");

            //next button
            drawNextButton();
            break;
        }

        case 9:{
            //explain frog movement YOU CANNOT CATCH FLIES AT THIS STAGE YET
            drawFrog();
            moveFrog();
            moveTongue();
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
            //explain tongue mechanics
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

            //dark except fly corridor
            fadeBackground(0, -height+80);
            fadeBackground(0, 170);

            //eating flies
            drawTextBox(50, 230, 245, 100, "When aligned with the fly, press the left mouse button to shoot out your tongue!");

            //next button
            drawNextButton();
            break;
        }
        case 11:{
            //Explain different fly colors

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
            //explain math fly

            drawFrog();
            moveFrog();

            moveTongue();
            checkTongueFlyOverlap();

            //math fly corridor
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
            //Explain math fly effects
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
            //explain math problems
          
            drawFrog();
            
            //math fly
            mathFly.appears = true;
           //moveMathFly();
            drawMathFly();

            drawUI();

            //calculates a math problem (just once, we don't need more than 1)
            if(!mathProblemCalculated){
                mathProblem();
                mathProblemCalculated = true;
            }
            
            displayNotificationText();

            drawTextBox(50, 360, 400, 100, 'When caught, you will need to type your answer using the keyboard, then press "enter" to confirm.')
            //to change cases, you will need to press enter
            break;
        }
        case 15:{
            //introduce dialog
            
            drawFrog();
            moveFrog();

             moveTongue();
            checkTongueFlyOverlap();

            //fly appears
            drawFly();
            moveFly();

            drawUI();

            //tutorial dialog
            frogDialog.isTalking = true;
            frogDialog.dialogToPrint = "Hello dear tutorial student!";
            dialog();
            //must press enter to move on
            drawTextBox(100, 250, 400, 80, 'Sometimes, Frog may speak to you. Press "enter" to respond.');
            break;
        }
        case 16:{
            //explain responding to frog
            fadeBackground(0,0);
            drawFrogBubble();
            drawUserBubble();

            drawTextBox(30, 220, 200, 100, 'Type your answer with the keyboard, then press "enter" to confirm.');
            //must press enter to move on
            break;
        }
        case 17:{
            //frog answers, explain how to exit chat mode
            fadeBackground(0,0);
            drawFrogBubble();
            drawUserBubble();

            submitDialog();
            //must press enter to move on
            drawTextBox(300, 360, 200, 100, 'Press "enter" again to exit the conversation.');
            break;
        }
        case 18:{
            //explain effects of chatting
            //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            drawFrog();
            moveTongue();
            drawUI();

            //draw dark rectangle overtop everything
            fadeBackground(0, 0);

            //next button
            drawNextButton();

            //initial text
            drawTextMiddle("Saying anything to Frog will increase happiness but saying nothing will decrease happiness. Don't ignore frog! ");
            
            break;
        }
        case 19:{
            //introduce meditation

            //randomly resetting the UI notification text because I don't know where else to do that
            UI.notificationText = "";
            //meditation here
            drawFrog();
            moveFrog();

            moveTongue();
            checkTongueFlyOverlap();

            //fly appears
            drawFly();
            moveFly();

            drawUI();
            checkMovement();

            drawTextMiddle("Another way to increase wisdom is to meditate. Try staying still without moving frog.")

            drawNextButton();
            break;

        }
         case 20:{
            //warn of meditation's dark side
            drawFrog();
            moveFrog();

             moveTongue();
            checkTongueFlyOverlap();

            //fly appears
            drawFly();
            moveFly();

            drawUI();

            drawTextMiddle("Careful not to meditate too long as your other meters will continue to drop.");

            checkMovement();
            drawNextButton();
            break;

        }
        case 21:{
            //explain back pain
            drawFrog();
            moveFrog();

             moveTongue();
            checkTongueFlyOverlap();

            //fly appears
            drawFly();
            moveFly();

            drawUI();

            drawTextBox(20,200,300, 100, "With old age also comes back pain. Try not to strain Frog too much or you might be met with sharp pain!");
            drawTextBox(200, 320, 200, 100, "Excessive clicking triggers back pain. Click the mouse very quickly to test it out.");

            backPain();
            checkMovement();
            drawNextButton();
            break;

        }
          case 22:{
            //explain depression
            drawFrog();
            moveFrog();

             moveTongue();
            checkTongueFlyOverlap();

            //fly appears
            drawFly();
            moveFly();

            //will be stucck at 20 for now
            UI.points.fun = 20;
            drawUI();

            drawTextMiddle("If Frog's happiness gets too low, their speed will decrease. Try to avoid depression by catching yellow flies or talking to frog!");
            backPain();
            checkMovement();
            depression();
            drawNextButton();
            break;

        }
        case 23:{
            //last stage, displays the buttons to either play or redo the tutorial
            //set frog coords to bottom corner of screen
            frog.body.x = 100;
            frog.eyes.leftX = 100 -40;
            frog.eyes.rightX= 100 +40;
            
            drawFrog();
            moveTongue();
           
            drawUI();

            drawTextBox(100, 100, 400, 50, "Are you ready to play?");
            drawPlayButton();
            drawTutorialButton();
            backPain();
            checkMovement();
            depression();
            break;

        }
    }
};

/**
 * Draws the next button for the tutorial
 */
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


//hover
if(mouseX > nextButton.box.x && mouseX < nextButton.box.x+nextButton.box.width && mouseY > nextButton.box.y && mouseY < nextButton.box.y + nextButton.box.height){

//green box
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
    //not hover/regulr mode
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

/**
 * Draws a nice white text box in the center of the screen
 */
function drawTextMiddle(write){

    //white box
    push();
    fill(255);
    noStroke();
    rect(100, 200, 450, 180, 10);
    pop();

    push();
    textSize(24);
    //takes the text we sent it
    text(write, 120, 230, 430);
            
    pop();
}


/**
 * Draws a small text box according to the numbers sent 
 */
function drawTextBox(x,y,w,h,write){

    //white
    push();
    fill(255);
    noStroke();
    rect(x,y,w,h,10);
    pop();

    //text is what we sent (write)
    push();
    textSize(18);
    text(write,x+10, y+10, w-5, h-5);
    pop();
}