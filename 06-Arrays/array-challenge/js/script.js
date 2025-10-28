/**
 * Boingo
 * Arielle Wong and Lanna Check
 *
 * A ball that bounces around on the canvas
 */

let balls = []; // empty array

/**
 * Create the canvas and the ball
 */
function setup() {
  // Create the canvas
  createCanvas(400, 400);
 
}

/**
 * Creates a random ball
 */
function createBall() {
  // Create a ball object with appropriate properties
  const newBall = {
    // Position and dimensions
    x: mouseX,
    y: mouseY,
    size: 20,
    // Colour
    fill: ["#e81717ff","#f9c814ff", "#a4f422ff","#9b2990ff"],
    fillIndex: round(random(0,3)),
    // Movement
    velocity: {
      x: pmouseX - mouseX,
      y: pmouseY - mouseY,
    }
  };
  console.log(newBall.fillIndex);
  
  return newBall;
}

/**
 * Moves and draws the ball
 */
function draw() {
  background("#87ceeb");
  
  for(let ball of balls){
    moveBall(ball);
    bounceBall(ball);
    drawBall(ball);
  }
  
}

/**
 * Moves the ball according to its velocity
 */
function moveBall(ball) {
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;
}

/**
 * Bounces the ball off the walls
 */
function bounceBall(ball) {
  // Check if the ball has reached the left or right
  const bounceX = (ball.x > width || ball.x < 0);
  // Check if the ball has reached the top or bottom
  const bounceY = (ball.y > height || ball.y < 0);
  
  // Handle bouncing horizontally
  if (bounceX) {
    ball.velocity.x *= -1;
  }
  // Handle bouncing vertically
  if (bounceY) {
    ball.velocity.y *= -1;
  }
}

/**
 * Draw the ball on the canvas
 */
function drawBall(ball) {
  push();
  noStroke();
  fill(ball.fill[ball.fillIndex]);
  ellipse(ball.x, ball.y, ball.size);
  pop();
}

function mousePressed(){
    balls.push(createBall());
}