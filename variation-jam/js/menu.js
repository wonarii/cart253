/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuText = `
(B) Base Game
(C) Catch variation
(R) Reverse variation`

/**
 * Display the main menu
 */
function menuDraw() {

    background(backgroundColour);

drawWizard();


    push();
    fill(255);
    textSize(30);
    textFont(fonts.montserrat);
    textAlign(CENTER, CENTER);
    text(menuText, width / 2, height / 3);
    pop();
}

/**
 * Listen to the keyboard
 */
function menuKeyPressed(event) {

    sounds.buttonClick.play();
    switch (event.keyCode) {
        case 66:
            state = "base";
            baseSetup();
            break;

        case 67://c
            state = "catch-variation";
            catchSetup();
            break;

        case 82://R
            state = "reverse-variation";
            reverseSetup();
            break;
    }
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {

}