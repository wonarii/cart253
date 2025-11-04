
/**
 * Lines
 * Arielle Wong and Lanna Check
 * 
 * A series of lines across the canvas
 */

"use strict";




/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {

    //gradient background
    //let firstColour = color(255, 253 , 115);
   // let secondColour = color(247, 154, 70);

    //let gradientShade;
    //let amount = 0;
let H = 0;
   let y=0;

    // for(let x = 0; x <= width; x ++ ){
    //     y = 30 * sin(x * 0.1) + 50;
    //     amount = map(x, y, width, 0, 1);
    //     gradientShade = lerpColor(firstColour, secondColour, amount);
    //     push();
    //     stroke(gradientShade);
    //     strokeWeight(3);
    //     line(x, y, x, height-y);
    //     pop();

    // }

       for(let x = 0; x <= width; x ++ ){
        y = 30 * sin(x * 0.1) + 50;
     //H = map(x, 0, width, 0, 255);
     H = 100 * sin(x * 0.025) + 200;
        push();
        colorMode(HSB);
        stroke(H, 70, 100);
        strokeWeight(3);
        line(x, y, x, height-y);
        pop();

    }

    let x = 0;
    let shade = 0;
    
    //vertical lines
    while(x <= width){
    push();
    stroke(shade);
    strokeWeight(x*0.05);
    line(x, 0, x, height);
    pop();
    x += 50;
    shade += 25;
    }
   
    y= 0;
    shade = 0;

    //horizontal lines
    while(y <= height){
        push();
        stroke(shade);
        line(0, y, width, y);
        pop();
         y += 50;
        shade += 25;
    }

}