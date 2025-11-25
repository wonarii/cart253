/**
 * This is the base game for my variation jam. 
 * Vanilla version if you will.
 */

let theRandomNumber;

//all my fonts
const fonts = {
    bagel: undefined,
    montserrat: undefined,
}

//all my colors
const colours = {
    backgroundColour : "#36243eff",
    white: "#fff9e1ff",
    yellow: "#fdca32ff",
    darkerYellow: "#d48318ff",
    red:"#932424ff",
    purple:"#95148eff",
    lilac:"#c174d1ff",
    darkerLilac:"#a44eb5ff",
}

//specifically the current bg colour
let backgroundColour = "#36243eff";

//will control the shake
let uiOffset = 0;

//input field
let input;

//array of previous guesses
let guesses;

//current thing the wizard is saying
//default is set to the instructions!
let wizardDialog;

const wizard = {
    mouth:{
        x1:90,
        y1:350,
        x2:110,
        y2:340,
        x3:115,
        y3:360
    },
    happyMouth:{
        x1:90,
        y1:350,
        x2:110,
        y2:340,
        x3:115,
        y3:360
    },
    sadMouth:{
         x1:90,
        y1:365,
        x2:100,
        y2:340,
        x3:115,
        y3:360
    }
}

/**
 * This will be called just before the red variation starts
 */
function baseSetup() {
    //PROBLEMATIC fonts
    // Wait for the fonts to load
    // fonts.bagel = await loadFont("./assets/BagelFatOne-Regular.ttf");
    // fonts.montserrat = await loadFont("./assets/Montserrat-VariableFont_wght.ttf");

    //input is created here otherwise it draws a new field every frame;-;
    //issue now is that the input will not move when screen is resized
    //let's just hope no one changes the window size while playing...
    //https://p5js.org/reference/p5/input/
    input = createInput('');
    //https://www.w3schools.com/howto/howto_js_get_current_window.asp
    input.position(window.innerWidth/2-90, window.innerHeight/2-30);

    //sets up the random number for the game!
    theRandomNumber = Math.floor(Math.random()*100)+1; //generates a random number between 1 and 100.
    //for cheating purposes
    console.log(theRandomNumber);
    //empty array to store guesses
    guesses = [];

    //wizard will say the instructions
    wizardDialog = allMyData.base.instructions;
}

/**
 * This will be called every frame when the base variation is called
 */
function baseDraw() {
    background(backgroundColour);
    drawQuestionMark();
    drawGuessButton();
    drawGuesses();
    drawWizardSpeech();
    drawWizard();

}



function drawQuestionMark(){
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    fill(colours.yellow);
    textSize(72);
    text("?", width/2+uiOffset,height/4);
    pop();
}


function drawGuessButton(){

    //box
    push();
     //hover purposes
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*3 && mouseY <height/5*3 +50){
    //on hover
     fill(colours.darkerYellow);
  	rect(width/2.7-2+uiOffset, height/5*3-2, 134 , 54, 7);
    }else{
        //regular button
    fill(colours.yellow);
  	rect(width/2.7+uiOffset, height/5*3, 130 , 50, 5);
    } 
    pop();

    //text
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*3 && mouseY <height/5*3 +50){
    //on hover
        fill(colours.white);
    }
    else{
        //regular button
        fill(colours.backgroundColour);
    }
    textSize(24);
    text("GUESS", width/2+uiOffset,height/5*3+25);
    pop();

    
}

function drawGuesses(){
    //header
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    fill(colours.white);
    textSize(18);
    text("GUESSES", width/7*6+uiOffset,height/7);
    pop();

    //line under
    push();
    noFill();
    stroke(colours.white);
    strokeWeight(3);
    line(width/7*6 - 50 + uiOffset, height/7+20, width/7*6 + 50 + uiOffset, height/7+20);
    pop();

    //all the guesses
    push();
    textFont(fonts.montserrat);
    fill(colours.white);
    textSize(18);
    textWeight(500);
    textWrap(WORD);
    text(guesses, width/7*6-40+uiOffset, height/7 +40, 90, height - 150);
    pop();
}

function drawWizard(){

    //body
    push();
    noStroke();
    fill(colours.purple);
    ellipse(90 + uiOffset, 500, 140, 300);
    pop();

    //body cut
    push();
    noStroke();
    fill(backgroundColour);
    rect(0 + uiOffset,445, 300, 500);
    pop();

    //hat
    push();
    noStroke();
    fill(colours.purple);
    //hat point
    triangle(30 + uiOffset, 360, 135 + uiOffset, 280, 20 + uiOffset, 220);
    //hat brim
    translate(80+ uiOffset, 310);
    rotate(2.6);
    ellipse(0, 0, 170, 70);
    pop();
    
    //ear L
    push();
    noStroke();
    fill(colours.lilac);
    translate(80+ uiOffset, 340);
    rotate(2.6);
    //using rects to get rounded corners
    rect(0,0, 40, 40, 5);
    pop();

     //ear R
    push();
    noStroke();
    fill(colours.darkerLilac);
    translate(120+ uiOffset, 300);
    rotate(2.4);
    //using rects to get rounded corners
    rect(0,0, 40, 40, 5);
    pop();

    //head
    push();
    noStroke();
    fill(colours.lilac);
    circle(90+ uiOffset, 340, 100);
    pop();

    //eyes
    push();
    noStroke();
    fill(colours.white);
    ellipse(70+ uiOffset, 340, 34, 44);
    ellipse(120+ uiOffset, 320, 30, 40);
    pop();

    //pupils
    push();
    noStroke();
    fill(colours.backgroundColour);
    ellipse(70+ uiOffset, 340, 28, 38);
    ellipse(120+ uiOffset, 320, 24, 34);
    pop();

    //mouth
     push();
    noStroke();
    fill(colours.backgroundColour);
    //happy
    triangle(wizard.mouth.x1+ uiOffset, wizard.mouth.y1, wizard.mouth.x2+ uiOffset,wizard.mouth.y2, wizard.mouth.x3+ uiOffset, wizard.mouth.y3);
    //upset
    //triangle(90, 365, 100, 340, 115, 360);
    pop();


}


function drawWizardSpeech(){
    
    //speech bubble
    push();
    fill(colours.white);
    noStroke();
    rect(20+ uiOffset,30,150,170, 20);
    pop();

    //speechbubble tail
     push();
    fill(colours.white);
    noStroke();
    triangle(100+ uiOffset, 190, 130+ uiOffset, 190, 100+ uiOffset, 220);
    pop();
    //text
    push();
    fill(colours.backgroundColour);
    noStroke();
    textFont(fonts.montserrat);
    textSize(14);
    textAlign(LEFT, CENTER);
    text(wizardDialog, 32+ uiOffset, 42, 140, 160);
    pop();

}
/**
 * This will be called whenever a key is pressed while the red variation is active
 */
function baseKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the red variation is active
 */
function baseMousePressed() {
    //checks if user clicked on the guess button
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*3 && mouseY <height/5*3 +50){
    //verifies the user's guess
        verifyGuess();
    }


}

function verifyGuess(){
    if(input.value() == theRandomNumber){
        //correct guess
        console.log("yay!");
        state = "winBase";
        winBaseSetup();
    }
    else{
        //incorrect guess
        incorrectGuess();
    }
}

function incorrectGuess(){
    //add incorrect guess to the array of guesses
    guesses.push(" "+input.value());

  //change wizard dialog
    if(!Number.isInteger(int(guesses[guesses.length -1]))){
        wizardDialog = allMyData.base.notANumber;
        //change to sad 
        wizard.mouth.x1 = wizard.sadMouth.x1;
        wizard.mouth.y1 = wizard.sadMouth.y1;
        wizard.mouth.x2 = wizard.sadMouth.x2;
        wizard.mouth.y2 = wizard.sadMouth.y2;
        wizard.mouth.x3 = wizard.sadMouth.x3;
        wizard.mouth.y3 = wizard.sadMouth.y3;
    }
    else if(guesses[guesses.length -1] < 1 || guesses[guesses.length -1] > 100 ){
        wizardDialog = allMyData.base.invalid;
              //change to sad 
        wizard.mouth.x1 = wizard.sadMouth.x1;
        wizard.mouth.y1 = wizard.sadMouth.y1;
        wizard.mouth.x2 = wizard.sadMouth.x2;
        wizard.mouth.y2 = wizard.sadMouth.y2;
        wizard.mouth.x3 = wizard.sadMouth.x3;
        wizard.mouth.y3 = wizard.sadMouth.y3;
    }
    else if(guesses[guesses.length -1]  > theRandomNumber){
        wizardDialog = allMyData.base.tooHigh + guesses[guesses.length -1] + ".";
              //change to happy
        wizard.mouth.x1 = wizard.happyMouth.x1;
        wizard.mouth.y1 = wizard.happyMouth.y1;
        wizard.mouth.x2 = wizard.happyMouth.x2;
        wizard.mouth.y2 = wizard.happyMouth.y2;
        wizard.mouth.x3 = wizard.happyMouth.x3;
        wizard.mouth.y3 = wizard.happyMouth.y3;
    }
    else{
        wizardDialog = allMyData.base.tooLow + guesses[guesses.length -1]  + ".";
        //change to happy
        wizard.mouth.x1 = wizard.happyMouth.x1;
        wizard.mouth.y1 = wizard.happyMouth.y1;
        wizard.mouth.x2 = wizard.happyMouth.x2;
        wizard.mouth.y2 = wizard.happyMouth.y2;
        wizard.mouth.x3 = wizard.happyMouth.x3;
        wizard.mouth.y3 = wizard.happyMouth.y3;
    }


    //reset the input field
    input.value("");
    //screen flashes red
    backgroundColour = colours.red;
    //resets the screen to regular colour after .2 seconds
    setTimeout(resetBackground, 200);
    //little shaky shake
    setTimeout(shakeScreenR, 1);
    setTimeout(shakeScreenL, 25);
    setTimeout(shakeScreenR, 50);
    setTimeout(shakeScreenL, 75);
    setTimeout(shakeScreenR, 100);
    setTimeout(shakeScreenL, 125);
    setTimeout(shakeScreenR, 150);
    setTimeout(shakeScreenL, 175);

  
}

function resetBackground(){
    backgroundColour = colours.backgroundColour;
    uiOffset = 0;
}

function shakeScreenR(){
    uiOffset = 3;
}

function shakeScreenL(){
    uiOffset = -3;
}