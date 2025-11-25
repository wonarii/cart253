/**
 * This file contains the code to run *only* the catch variation part of the program.
 * Note how it has its own draw, catchDraw(), and its own keyPressed, catchKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */


let numberCaught = "";

const bowl = {
    x: 300,
    y: 410,
}



/**
 * This will be called just before the catch variation starts
 */
function catchSetup() {
    //sets up the random number for the game!
    theRandomNumber = Math.floor(Math.random()*100)+1; //generates a random number between 1 and 100.
    //for cheating purposes
    console.log(theRandomNumber);
    //empty array to store guesses
    guesses = [];

    //wizard will say the instructions
    wizardDialog = allMyData.catch.instructions;
}

/**
 * This will be called every frame when the catch variation is active
 */
function catchDraw() {
     background(backgroundColour);
     drawBowl();
    drawGuessBox();
    drawGuessButtonCatch();
    drawGuesses();
    drawWizardSpeech();
    drawWizard();
    //drawNumbers();
    moveBowl();
    
}


function drawGuessBox(){

    //title
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    fill(colours.yellow);
    textSize(20);
    text("Your Guess:", width - 70+uiOffset,height-160);
    pop();

    //your guess
    push();
    textFont(fonts.montserrat);
    textAlign(CENTER, CENTER);
    fill(colours.yellow);
    textSize(16);
    text(numberCaught, width - 70+uiOffset,height-125);
    pop();

   

}

function drawGuessButtonCatch(){
    //box
    push();
    noStroke();
     //hover purposes
    if(mouseX> width/8*6 && mouseX<width/8*6 + 110 && mouseY>height/5*4 && mouseY <height/5*4 +40){
    //on hover
     fill(colours.darkerYellow);
  	rect(width/8*6-2+uiOffset, height/5*4-2, 114 , 44, 7);
    }else{
        //regular button
    fill(colours.yellow);
  	rect(width/8 *6+uiOffset, height/5*4, 110 , 40, 5);
    } 
    pop();

    //text
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    if(mouseX> width/8*6 && mouseX<width/8*6 + 110 && mouseY>height/5*4 && mouseY <height/5*4 +40){
    //on hover
        fill(colours.white);
    }
    else{
        //regular button
        fill(colours.backgroundColour);
    }
    textSize(24);
    text("GUESS", width/8*6 + 55+uiOffset,height/5*4+20);
    pop(); 
}

function moveBowl(){
    bowl.x = mouseX;

}

function drawBowl(){
    
    //ellipse
    push();
    noStroke();
    fill(colours.darkerLilac);
    ellipse(bowl.x, bowl.y, 60, 50);
    pop();

    //box to cut ellipse
    push();
    fill(backgroundColour);
    noStroke();
    rect(bowl.x - 40, bowl.y-40, 80, 40)

    pop();
}

/**
 * This will be called whenever a key is pressed while the catch variation is active
 */
function catchKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the catch variation is active
 */
function catchMousePressed() {

}