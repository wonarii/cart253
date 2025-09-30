/**
 * The Only Move Is Not To Play
 * Pippin Barr, Arielle Wong and Lanna Check
 *
 * A game where your score increases so long as you do nothing.
 */

"use strict";

// Current score
let score = 0;

// Is the game over?
let gameOver = false;




/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);

  //keypress  only listens to letters and space
//window.addEventListener("keypress", lose);
//keydown listens to all keyboard buttons
//when the user presses a key, they will lose
window.addEventListener("keydown", lose);

//when user changes the internet settings
window.addEventListener("offline", lose);
window.addEventListener("online", lose);

//when user switches tabs
window.addEventListener("visibilitychange", lose);

//when mouse is moved
window.addEventListener("mousemove", lose);

//when mouse is clicked
window.addEventListener("mousedown", lose);
//when mouse wheel
window.addEventListener("wheel", lose);

}

/**
 * Update the score and display the UI
 */
function draw() {
  background("#87ceeb");
  
  // Only increase the score if the game is not over
  if (!gameOver) {
    // Score increases relatively slowly
    score += 0.05;
  }
  displayUI();

  
}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
  if (gameOver) {
    push();
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("You lose!", width/2, height/3);
    pop();
  }
  displayScore();
}

/**
 * Display the score
 */
function displayScore() {
  push();
  textSize(48);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(floor(score), width/2, height/2);
  pop();
}

/**
 * Lose
 */
function lose(){
    gameOver = true;
}

// /**
//  * Mouse clicked
//  */
// function mousePressed(){
//     lose();
// }

// /**
//  * Mouse scroll
//  */
// function mouseWheel(){
//     lose();
// }

// /**
//  * Mouse moved
//  */
// function mouseMoved(){
//     lose();
// }
