/**
 * This file is for when you win the base game!
 */

/**
 * This will be called just before the winBase variation starts
 */
function winBaseSetup() {
    //i need to get rid of the input
    input.remove();
}

/**
 * This will be called every frame when the winBase variation is active
 */
function winBaseDraw() {
    background(colours.backgroundColour);
    drawCongrats();
    drawPlayAgainButton();
    drawMainMenuButton();
}

function drawCongrats(){
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    fill(colours.yellow);
    textSize(72);
    text("You win!", width/2,height/4);
    pop();
}

function drawPlayAgainButton(){
    //box
    push();
     //hover purposes
    if(mouseX> width/3 && mouseX<width/3 + 170 && mouseY>height/2 && mouseY <height/2 +50){
    //on hover
     fill(colours.darkerYellow);
  	rect(width/3-2, height/2-2, 174 , 54, 7);
    }else{
        //regular button
    fill(colours.yellow);
  	rect(width/3, height/2, 170 , 50, 5);
    } 
    pop();

    //text
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    if(mouseX> width/3 && mouseX<width/3 + 170 && mouseY>height/2 && mouseY <height/2 +50){
    //on hover
        fill(colours.white);
    }
    else{
        //regular button
        fill(colours.backgroundColour);
    }
    textSize(24);
    text("PLAY AGAIN", width/2,height/2+20);
    pop();

}

function drawMainMenuButton(){
//box
    push();
     //hover purposes
    if(mouseX> width/3 && mouseX<width/3 + 170 && mouseY>height/7*4.5 && mouseY <height/7*4.5 +50){
    //on hover
     fill(colours.darkerYellow);
  	rect(width/3-2, height/7*4.5-2, 174 , 54, 7);
    }else{
        //regular button
    fill(colours.yellow);
  	rect(width/3, height/7*4.5, 170 , 50, 5);
    } 
    pop();

    //text
    push();
    textFont(fonts.bagel);
    textAlign(CENTER, CENTER);
    if(mouseX> width/3 && mouseX<width/3 + 170 && mouseY>height/7*4.5 && mouseY <height/7*4.5 +50){
    //on hover
        fill(colours.white);
    }
    else{
        //regular button
        fill(colours.backgroundColour);
    }
    textSize(24);
    text("MAIN MENU", width/2,height/7*4.5+20);
    pop();

}


/**
 * This will be called whenever a key is pressed while the winBase variation is active
 */
function winBaseKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the winBase variation is active
 */
function winBaseMousePressed() {

}