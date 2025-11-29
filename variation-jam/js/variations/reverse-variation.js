/**
 * This file contains the code to run *only* the reverse variation part of the program.
 * Note how it has its own draw, reverseDraw(), and its own keyPressed, reverseKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

let reverseGameState = "start";

//counts amount of times you said no
let noCount = 0;

/**
 * This will be called just before the reverse variation starts
 */
function reverseSetup() {
    //setup the game state
    reverseGameState = "start";
    //setup the noCount
    noCount = 0;
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
    if(reverseGameState == "submitted"){
        drawYesNo();
    }
    else if(reverseGameState == "start"){
    drawSubmitButton();
    }
    
    drawQuestionMark();
    
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


function drawYesNo(){

    //YES BUTTON
    //box
    push();
     //hover purposes
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*3 && mouseY <height/5*3 +50){
    //on hover
     fill(colours.darkerGreen);
  	rect(width/2.7-2+uiOffset, height/5*3-2, 134 , 54, 7);
    }else{
        //regular button
    fill(colours.green);
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
    text("YES", width/2+uiOffset,height/5*3+25);
    pop();

    //NO BUTTON
     //box
    push();
     //hover purposes
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*4- 20 && mouseY <height/5*4 +30){
    //on hover
     fill(colours.red);
  	rect(width/2.7-2+uiOffset, height/5*4-22, 134 , 54, 7);
    }else{
        //regular button
    fill(colours.lighterRed);
  	rect(width/2.7+uiOffset, height/5*4- 20, 130 , 50, 5);
    } 
    pop();

    //text
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*4- 20 && mouseY <height/5*4 +30){
    //on hover
        fill(colours.white);
    }
    else{
        //regular button
        fill(colours.backgroundColour);
    }
    textSize(24);
    text("NO", width/2+uiOffset,height/5*4+5);
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
    if(reverseGameState == "start"){
 //checks if user clicked on the submit button
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*3 && mouseY <height/5*3 +50){
    sounds.buttonClick.play();
        //the wizard will now guess your number
        guessNumber();
    }
    }   
    else{
//no button
    if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*4- 20 && mouseY <height/5*4 +30){
        sounds.buttonClick.play();
        chooseNo();
    }
    //YES button
    else if(mouseX> width/2.7 && mouseX<width/2.7 + 130 && mouseY>height/5*3 && mouseY <height/5*3 +50){
        sounds.win.play();
        wizardWin();
    }
    }
 }

function guessNumber(){
    let yourGuess = input.value();
    //check if its a number
    if(!Number.isInteger(int(yourGuess))){
        //not a  number
         wizardDialog = allMyData.reverse.notANumber;
    }
    else if(yourGuess > 100 || yourGuess < 1){
        //number out of bounds
        wizardDialog = allMyData.reverse.outOfBounds;
    }
    else{
        wizardDialog = allMyData.reverse.guess + yourGuess + "?";
    //give user option to say yes/no
    //future plans for later
        reverseGameState = "submitted";    
    }
}

function chooseNo(){
    noCount += 1;
    //sets the wizard dialog according to the number of times you chose no
    switch(noCount){
    case 1: {
    wizardDialog = allMyData.reverse.choseNo;
    break;
    }
    case 2:{
    wizardDialog = allMyData.reverse.no2Times;
    break;
    }
    case 3:{
    wizardDialog = allMyData.reverse.no3Times;
    break;
    }
    case 4:{
        wizardDialog = allMyData.reverse.no4Times;
        //wizard wins anyways
        setTimeout(wizardWin, 2000);
        reverseGameState = "win";
        input.value("");
        break;
    }
    }
    if(reverseGameState == "submitted"){
        //swtiches back to the submit state
     reverseGameState = "start";
    //reset input value to empty
    input.value("");
    }
    
}


//the wizard won!
function wizardWin(){
    winner = 'Sumi';
     state = "winBase";
    winBaseSetup();

}

