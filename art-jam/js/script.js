/**
 * Ari and Soup
 * Arielle Wong
 * 
 * Interactive self portrait.
 * You can pick up the bowl of soup. When it is brought close
 * to my glasses, they fog up!
 * 
 * Controls:
 * -mouse to click on the bowl (pick up and put down)
 * -mouse tracking to move the bowl around (once it is picked up/clicked on)
 * 
 * Uses:
 * p5.js
 * https://p5js.org
 * 
 */

"use strict";


/**
 * Variables!!!
 */

//theses are for detection of soup near glasses
const collisionShapes={
    colour:"#ebd487ff",
    xLeft:220,
    xRight:420,
    y: 390,
    size: 160,
}

let canvasSize = 640;

let face={
    colour:"#d8ab75ff",
    featuresColour:"#573a16ff"
};

let glasses={
    frameColour:"#100a01ff",
    lenseColour: "#e7e1d6ff",
    lenseAlphaL: 100,
    lenseAlphaR: 100,
};

let hair={
    colour1:"#573a16ff",
    colour2:"#f4be2bff"
};

let soup={
    soupPickedUp : false,

    colourSoup:"#f39017ff",
    colourBowl:"#6097a6ff",
    colourSpoon:"#444b53ff",
    colourGlow:"#e7e1d6ff",
    bowlBack:{
        x:90,
        y:80,
        width:120,
        height:80
    },
    soupEllipse:{
        x:90,
        y:70,
        width: 110,
        height: 50
    },
    spoon:{
        x:0,
        y:0,
        width: 20,
        height: 70,
        roundedness: 5,
        rotation: 51,
        translationX:155,
        translationY:15, 
    },
    steam:{
         colour:"#e7e1d6ff",
         offsetY1: 1,
         offsetY2: 20,
         offsetY3: 30,
         offsetY4: 10,
         alpha1: 200,
         alpha2: 200,
         alpha3: 200,
         alpha4: 200,
    }
    
}

let soupZone={
    colour: "#ebd487ff",
    x:98,
    y:70,
    size:150,
    inZone:false,

}

//so the variable is accessible globally
let bowlSound;

//preloads the sound at the beginning of the program
function preload(){
    bowlSound = loadSound('assets/sounds/bowlSound.wav');
}

/**
 * Creates a square canvas
*/
function setup() {
    //640px x 640px canvas
    createCanvas(canvasSize, canvasSize);
}


/**
 * Draws the self portrait
*/
function draw() {
    background("#ebd487ff");
    
    noStroke();
    
    //Glasses Collision shape
    drawCollisionShape();

    //Draw hair (back of head)
    drawHair();
    //Draw face
    drawFace();
    //Draw eyes and mouth
    drawFeatures();
    //Draw glasses
    drawGlasses();
    //Draw bangs
    drawBangs();
    //Draw soup
    drawSoup();
    //draw steam
    drawSteam();
}
/**
 * Draws invisible circles where the glasses lenses are
 */
function drawCollisionShape(){
    push();
    fill(collisionShapes.colour);
    //left lense
    circle(collisionShapes.xLeft, collisionShapes.y, collisionShapes.size);
    //right lense
    circle(collisionShapes.xRight, collisionShapes.y, collisionShapes.size);
    pop();
}
/**
 * Draws the hair behind the head (the longer parts)
 */
function drawHair(){
    push();
    fill(hair.colour1);
    //left side
    triangle(180, 180, 80,540, 370, 500);
    //small top triangle (left)
    triangle(170, 200, 70, 400, 370, 300);
    //right side
    triangle(460, 180, 560,540, 300, 500);
    //small top triangle (right)
    triangle(470, 200, 570, 400, 300, 340);
    pop();

    //yellow bits
    push();
    fill(hair.colour2);
    //left
    triangle(100, 580, 300, 200, 340, 540);
    //right
    triangle(540, 580, 340, 200, 300, 540);
    pop();
}

/**
 * Draws the face (centered rounded square)
 */
function drawFace(){
    push();
    fill(face.colour);
    rect(canvasSize/4, canvasSize/4+10,320,320,60);
    pop();
}

/**
 * Draws eyes and mouth
 */
function drawFeatures(){
    push();
    fill(face.featuresColour);
    //left eye
    ellipse(220,400,80,40);
    //right eye
    ellipse(420,400,80,40);
    pop();
    
    //little smile
    push();
    stroke(face.featuresColour);
    noFill();
    strokeWeight(6);
    curve(280, 295, 294, 459, 350, 460, 380, 350);
    pop();
}

/**
 * Draws the glasses (frame and lenses)
 */
function drawGlasses(){

   //if user has the soup
    if(soup.soupPickedUp){
        //calculates the distance between the soup bowl (mouse)
        //and the glasses
        let soupNearGlassesL = dist(mouseX, mouseY, collisionShapes.xLeft, collisionShapes.y);
        let soupNearGlassesR = dist(mouseX, mouseY, collisionShapes.xRight, collisionShapes.y);
       
        //if soup bowl is near the left lense
        if(soupNearGlassesL < collisionShapes.size){
            //glasses get foggy
            glasses.lenseAlphaL += 1;
        }
        else{
            //glasses unfog
            glasses.lenseAlphaL -= 1;
        }
         //if soup bowl is near the right lense
        if(soupNearGlassesR < collisionShapes.size){
            //glasses get foggy
            glasses.lenseAlphaR += 1;
        }
        else{
            //glasses unfog
            glasses.lenseAlphaR -= 1;
        }
    }
    else{
        //if you don't have the soup bowl, glasses will unfog
        glasses.lenseAlphaR -= 1;
        glasses.lenseAlphaL -= 1;
    }
   
    //constraining the alpha to 100-1000
        glasses.lenseAlphaL=constrain(glasses.lenseAlphaL, 100, 1000);
        glasses.lenseAlphaR=constrain(glasses.lenseAlphaR, 100, 1000);

    //For the LEFT lense
    push();
    stroke(glasses.frameColour);
    strokeWeight(10);
    //lense transparency https://p5js.org/reference/p5.Color/setAlpha/
    //creating a color object
    let lenseColourL = color(231, 225, 214);
    lenseColourL.setAlpha(glasses.lenseAlphaL);
    fill(lenseColourL);
    //left lense
    rect(canvasSize/4-20, canvasSize/2+10, 160, 120, 20);
    pop();
    
    //For the RIGHT lense
    push();
    stroke(glasses.frameColour);
    strokeWeight(10);
    //lense transparency https://p5js.org/reference/p5.Color/setAlpha/
    //creating a color object
    let lenseColourR = color(231, 225, 214);
    lenseColourR.setAlpha(glasses.lenseAlphaR);
    fill(lenseColourR);
    //right lense
    rect(canvasSize/2+20, canvasSize/2+10, 160, 120, 20);
    //nose bar thing
    line(canvasSize/2-20, canvasSize/2+40 ,canvasSize/2+20, canvasSize/2+40);
    pop();
}

/**
 * Draws the bangs 
 */
function drawBangs(){
    push();
    fill(hair.colour1);
   //left
    triangle(180, 150, 100, 360, 400,160);
    //right
    triangle(460, 150, 540, 360, 200, 160);
    //left detail
    triangle(220, 180, 360, 180, 200, 340);
    pop();
}


/**
 * Draws the bowl of soup
 */
function drawSoup(){

    //if user has the soup, the soup will be drawn at the mouse position
    if(soup.soupPickedUp){
        //bowl
        soup.bowlBack.x = mouseX;
        soup.bowlBack.y = mouseY;
        //soup
        soup.soupEllipse.x = mouseX;
        soup.soupEllipse.y = mouseY-10;
        //spoon
        soup.spoon.translationX = mouseX+65;
        soup.spoon.translationY = mouseY-65;
    }
    else{
        //resets to the regular values
        soup.bowlBack.x = 90;
        soup.bowlBack.y = 80;
        
        soup.soupEllipse.x = 90;
        soup.soupEllipse.y = 70;

        soup.spoon.translationX = 155;
        soup.spoon.translationY = 15; 
    }

    //invisible background circle (solves all my problems)
    push();
    fill(soupZone.colour);
    circle(soupZone.x, soupZone.y, soupZone.size);
    pop();

    //if user hovers over the soup bowl, 
    //it glows
    let distanceMouseInvisCircle = dist(soupZone.x, soupZone.y, mouseX, mouseY);
    if(distanceMouseInvisCircle < soupZone.size/2){
        soupHover();
    }
    else{
        //we are not in the soup zone, so nothing happens
        soupZone.inZone=false;
    }


   //bowl back
    push();
    fill(soup.colourBowl);
    ellipse(soup.bowlBack.x, soup.bowlBack.y, soup.bowlBack.width, soup.bowlBack.height);
    pop();


    //soup in bowl
    push();
    fill(soup.colourSoup);
    stroke(soup.colourBowl);
    strokeWeight(5);
    ellipse(soup.soupEllipse.x, soup.soupEllipse.y, soup.soupEllipse.width, soup.soupEllipse.height);
    pop();

    //spoon
    push();
    fill(soup.colourSpoon);
    translate(soup.spoon.translationX, soup.spoon.translationY);
    rotate(soup.spoon.rotation);
    rect(soup.spoon.x, soup.spoon.y, soup.spoon.width, soup.spoon.height, soup.spoon.roundedness);
    pop();



}

/**
 * Steam floats over the soup bowl
 */
function drawSteam(){
    //steam movement and colour
    moveSteam();

    //makes a colour object
    let steamColour1 = color(231, 225, 214);
    //sets the alpha of the colour object
    steamColour1.setAlpha(soup.steam.alpha1);
    //first steam bubble
    push();
    fill(steamColour1);
    ellipse(soup.bowlBack.x, soup.bowlBack.y - soup.steam.offsetY1, 20, 10);
    pop();

    //SECOND steam bubble
    let steamColour2 = color(231, 225, 214);
    steamColour2.setAlpha(soup.steam.alpha2);
    push();
    fill(steamColour2);
    ellipse(soup.bowlBack.x + 60, soup.bowlBack.y - soup.steam.offsetY2, 30, 10);
    pop();

    //THIRD steam bubble
    let steamColour3 = color(231, 225, 214);
    steamColour3.setAlpha(soup.steam.alpha3);
    push();
    fill(steamColour3);
   ellipse(soup.bowlBack.x -20, soup.bowlBack.y - soup.steam.offsetY3, 40, 10);
    pop();

    //FOURTH steam bubble
     let steamColour4 = color(231, 225, 214);
    steamColour4.setAlpha(soup.steam.alpha4);
    push();
    fill(steamColour4);
    ellipse(soup.bowlBack.x -10, soup.bowlBack.y - soup.steam.offsetY4, 25, 10);
    pop();
}
/**
 * Moves the steam up and makes it fade 
 */

function moveSteam(){
    //resets to the original position and alpha steam 1
    if(soup.steam.offsetY1 === 80){
        soup.steam.offsetY1 = 1;
        soup.steam.alpha1 = 200;
    }

     //resets to the original position and alpha steam 2
    if(soup.steam.offsetY2 === 80){
        soup.steam.offsetY2 = 1;
        soup.steam.alpha2 = 200;
    }

     //resets to the original position and alpha steam 3
    if(soup.steam.offsetY3 === 90){
        soup.steam.offsetY3 = 1;
        soup.steam.alpha3 = 200;
    }

    //resets to the original position and alpha steam 4
    if(soup.steam.offsetY4 === 70){
        soup.steam.offsetY4 = 1;
        soup.steam.alpha4 = 200;
    }


    //increases the offset with time
    soup.steam.offsetY1 += 1;
    soup.steam.offsetY2 += 1;
    soup.steam.offsetY3 += 1;
    soup.steam.offsetY4 += 1;
    //decreases the alpha (will slowly fade away)
    soup.steam.alpha1 -=4;
    soup.steam.alpha2 -=2;
    soup.steam.alpha3 -=3;
    soup.steam.alpha4 -=1;
}
/**
 * Adds a white outline to the bowl of soup
 */
function soupHover(){

    //just redraws the soup bowl behind but with a white stroke
    //back
    push();
    fill(soup.colourGlow);
    stroke(soup.colourGlow);
    strokeWeight(20);
    ellipse(90, 80, 120, 80);
    pop();

     //spoon
    push();
    fill(soup.colourGlow);
    stroke(soup.colourGlow);
    strokeWeight(20);
    rotate(51);
    rect(120, -90, 20,70, 5);
    pop();

    //toggle to help the rest of the program know about the soup zone status
    soupZone.inZone = true;

}

/**
 * Reacts to user clickss
 */
function mouseClicked(){
    //if user clicks on the soup bowl
    //the soup bowl should follow the mouse
    if(soupZone.inZone){
        //toggles the pick ups
        soup.soupPickedUp = !soup.soupPickedUp;
        //plays bowl sound effect
        bowlSound.play();
    }
    
}

