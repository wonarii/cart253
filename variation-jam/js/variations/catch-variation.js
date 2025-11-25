/**
 * This file contains the code to run *only* the catch variation part of the program.
 * Note how it has its own draw, catchDraw(), and its own keyPressed, catchKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the catch variation starts
 */
function catchSetup() {

}

/**
 * This will be called every frame when the catch variation is active
 */
function catchDraw() {
    background(backgroundColour);
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