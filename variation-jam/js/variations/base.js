/**
 * This is the base game for my variation jam. 
 * Vanilla version if you will.
 */

/**
 * This will be called just before the red variation starts
 */
function baseSetup() {

}

/**
 * This will be called every frame when the red variation is active
 */
function baseDraw() {
    background("red");
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