/**
 * UFO on a Dark Night
 * Pippin Barr
 * 
 * A UFO. On a dark night. It just sits there?
 */

"use strict";

// Our UFO
let ufo = {
    // Position
    x: 200,
    y: 375,
    // Dimensions
    width: 150,
    height: 50,
    // Fill colour (greyscale)
    fill: 255
};

// Shade to fill the sky (background)
let skyShade = 0;

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}

/**
 * Displays a UFO
*/
function draw() {
    //Sky shade goes up
    //sky gradually turns white
    skyShade = skyShade +1;
    // Display the sky
    background(skyShade);

    //The UFO goes up
    ufo.y = ufo.y-2;
    //UFO goes right
    ufo.x += 0.5;
    //UFO gradually becomes darker
    ufo.fill = ufo.fill * 0.999;
    //UFO dimensions get smaller
    ufo.width = ufo.width/1.005;
    ufo.height = ufo.height/1.005;

    // Draw the UFO based on its properties
    push();
    fill(ufo.fill);
    noStroke();
    ellipse(ufo.x, ufo.y, ufo.width, ufo.height);
    pop();
}