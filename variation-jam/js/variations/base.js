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
}

//specifically the current bg colour
let backgroundColour = "#36243eff";

//will control the shake
let uiOffset = 0;

//input field
let input;

//array of previous guesses
let guesses;

//preload
//runs before anything else
//loads my fonts so they're ready to use!
function preload(){
    fonts.bagel = loadFont("./assets/BagelFatOne-Regular.ttf");
    fonts.montserrat = loadFont("./assets/Montserrat-VariableFont_wght.ttf");
}





/**
 * This will be called just before the red variation starts
 */
function baseSetup() {
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
}

/**
 * This will be called every frame when the base variation is called
 */
function baseDraw() {
    background(backgroundColour);
    drawQuestionMark();
    drawGuessButton();
    drawGuesses();

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
    text("GUESS", width/2+uiOffset,height/5*3+20);
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
    textStyle(BOLD);
    fill(colours.white);
    textSize(18);
    textWrap(WORD);
    text(guesses, width/7*6+uiOffset, height/7 +40, 10, height - 100);

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
    guesses.push(input.value());
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