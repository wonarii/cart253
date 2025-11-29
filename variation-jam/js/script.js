/**
 * Menu system for the number guessing game
 * Arielle Wong and Pippin Barr
 * 
 */

"use strict";

let state = "menu";


let allMyData;

const sounds = {
    music:"",
    buttonClick:"",
    win:"",
    incorrect:"",
    catch:"",
}

let bgMusic;
/**
 * Create the canvas
*/
async function setup() {
    createCanvas(500, 500);
    fonts.bagel = await loadFont("./assets/BagelFatOne-Regular.ttf");
    fonts.montserrat = await loadFont("./assets/Montserrat-VariableFont_wght.ttf");
    allMyData = await loadJSON("./assets/data/numberGame.json");

    //sounds
    sounds.music = createAudio("./assets/sounds/793383__sadiquecat__5.wav");
    sounds.win = createAudio("./assets/sounds/Glitter.wav");
    sounds.incorrect = createAudio("./assets/sounds/327737__distillerystudio__error_02.wav");
    sounds.buttonClick = createAudio("./assets/sounds/62980__radian__chime-0005.wav");
    sounds.catch = createAudio("./assets/sounds/catchTrimmed.wav");
    
}


/**
 * Display the menu or the current variation
*/
function draw() {
    //play music!
    sounds.music.loop();

    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "base":
            baseDraw();
            break
        case "catch-variation":
            catchDraw();
            break;
        case "reverse-variation":
            reverseDraw();
            break;
        case "winBase":
            winBaseDraw();
            break;
    }
}

/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "base":
            baseMousePressed();
            break
        case "catch-variation":
            catchMousePressed();
            break;
        case "reverse-variation":
            reverseMousePressed();
            break;
        case "winBase":
            winBaseMousePressed();
            break;
    }
}

/**
 * Listen for keypressed and call the function for it in the
 * current state
 */
function keyPressed(event) {
    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "base":
            baseKeyPressed(event);
            break
        case "catch-variation":
            catchKeyPressed(event);
            break;
        case "reverse-variation":
            reverseKeyPressed(event);
            break;
        case "winBase":
            winBaseKeyPressed(event);
            break;
    }
}