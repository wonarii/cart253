/**
 * Movement variables
 * 
 * Author: Arielle Wong and Pippin
 * 
 * p5.js
 */

"use strict";

//bird variables
let bird = {
    x:120,
    y:480,
    size:50,
    //velocity
    velocity: {
        x: 0,
        y: 0,
    },
    minVelocity: {
      //minimum speed of bird (can go backwards)
      x: -3,
      y: -2  
    },
    // maximum velocity (not too fast)
    maxVelocity: {
        x: 3,
        y: 2
    },
    //will be added to the velocity every frame
    acceleration:{
        x:0.025,
        y:-0.05
    }
};

/**
 * Creates a canvas
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * Draws a bird moving across a black background
*/
function draw() {
    background(0);

    //Change the bird's velocity by adding the acceleration
    bird.velocity.x = bird.velocity.x + bird.acceleration.x;
    bird.velocity.y = bird.velocity.y + bird.acceleration.y;
   
    //constrain the bird's velocity
    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);
    
    //Move the bird
    bird.x = bird.x+bird.velocity.x;
    bird.y = bird.y+ bird.velocity.y;

    //Draw the bird
    ellipse(bird.x,bird.y, bird.size);
}