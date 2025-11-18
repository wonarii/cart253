/**
 * This is the base game for my variation jam. 
 * Vanilla version if you will.
 */


const fonts = {
    bagel: undefined,
    montserrat: undefined,
}

const colours = {
    backgroundColour : "#36243eff",
    yellow: "#fdca32ff",
}

let input;

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
    input = createInput('');
    //https://www.w3schools.com/howto/howto_js_get_current_window.asp
    input.position(window.innerWidth/2-90, window.innerHeight/2-30);
}

/**
 * This will be called every frame when the base variation is called
 */
function baseDraw() {
    background(colours.backgroundColour);
    drawQuestionMark();
    drawInputField();
    drawGuessButton();
    // drawGuesses();

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

}

function drawQuestionMark(){
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    fill(colours.yellow);
    textSize(72);
    text("?", width/2,height/4);
    pop();
}

//https://p5js.org/reference/p5/input/
function drawInputField(){
    
}

function drawGuessButton(){

    //box
    push();
    fill(colours.yellow);
    rect(width/2.7, height/5*3, 130 , 50, 5);
    pop();

    //text
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    fill(colours.backgroundColour);
    textSize(24);
    text("GUESS", width/2,height/5*3+20);
    pop();
}