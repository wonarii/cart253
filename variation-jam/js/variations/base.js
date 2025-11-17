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

}

/**
 * This will be called every frame when the base variation is called
 */
function baseDraw() {
    background(colours.backgroundColour);
    drawQuestionMark();
    // drawInputField();
    // drawGuessButton();
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