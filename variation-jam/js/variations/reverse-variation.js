/**
 * This file contains the code to run *only* the reverse variation part of the program.
 * Note how it has its own draw, reverseDraw(), and its own keyPressed, reverseKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the reverse variation starts
 */
function reverseSetup() {
    //sets up the input for the user just like in base game
    input = createInput('');
    //https://www.w3schools.com/howto/howto_js_get_current_window.asp
    input.position(window.innerWidth/2-90, window.innerHeight/2-30);

     //wizard will say the instructions
    wizardDialog = allMyData.reverse.instructions;
}

/**
 * This will be called every frame when the reverse variation is active
 */
function reverseDraw() {
    background(backgroundColour);
    drawQuestionMark();
    drawSubmitButton();
    drawWizardSpeech();
    drawWizard();
}

//same as guess button in base gameexcept for the label
function drawSubmitButton(){

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
    text("SUBMIT", width/2+uiOffset,height/5*3+25);
    pop();

}
/**
 * This will be called whenever a key is pressed while the reverse variation is active
 */
function reverseKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the reverse variation is active
 */
function reverseMousePressed() {
 //checks if user clicked on the submit button
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*3 && mouseY <height/5*3 +50){
    //the wizard will now guess your number
        guessNumber();
    }
}

function guessNumber(){
    let yourGuess = input.value();
    wizardDialog = allMyData.reverse.guess + yourGuess + "?";
    //give user option to say yes/no
}