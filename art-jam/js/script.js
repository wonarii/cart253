/**
 * Ari and Soup
 * Arielle Wong
 * 
 * Self portrait
 * 
 */

"use strict";


/**
 * Variables!!!
 */

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
    }
    
}

let soupZone={
    colour: "#ebd487ff",
    x:98,
    y:70,
    size:150,
    inZone:false,

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
    //draw neck
 //   drawNeck();
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

// function drawNeck(){
//     push();
//     fill(face.colour);
//     rect(260, 400,120,180,10);
//     pop();
// }

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

    //calculates the distance between the soup bowl (mouse)
    //and the glasses
    //const soupNearGlasses = ()
    //if soup bowl is near the glasses
    if(soup.soupPickedUp){

    }

    push();
    stroke(glasses.frameColour);
    strokeWeight(10);
    
    //lense transparency https://p5js.org/reference/p5.Color/setAlpha/
    //creating a color object
    let lenseColour = color(231, 225, 214);
    lenseColour.setAlpha(100);
    fill(lenseColour);
    

    //left lense
    rect(canvasSize/4-20, canvasSize/2+10, 160, 120, 20);
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

    if(soup.soupPickedUp){
        soup.bowlBack.x = mouseX;
        soup.bowlBack.y = mouseY;
        
        soup.soupEllipse.x = mouseX;
        soup.soupEllipse.y = mouseY-10;

        soup.spoon.translationX = mouseX+65;
        soup.spoon.translationY = mouseY-65;
    }
    else{
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

    soupZone.inZone = true;

}

/**
 * Reacts to user clickss
 */
function mouseClicked(){
    //if user clicks on the soup bowl
    //the soup bowl should follow the mouse
    if(soupZone.inZone){
        soup.soupPickedUp = !soup.soupPickedUp;
;
 
    }
    
}

