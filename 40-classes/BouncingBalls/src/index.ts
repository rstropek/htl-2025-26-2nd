import './styles.css';
import { BouncingBallsGame } from './game';

// INITIALIZATION CODE
// This code runs when the module loads and sets up the game.

// Create the game instance
const game = new BouncingBallsGame('box');

// Start the animation loop
game.start();

// Set up button event handlers
document.getElementById('addRandom')?.addEventListener('click', () => {
  game.addRandomBall();
});

document.getElementById('addGummy')?.addEventListener('click', () => {
  game.addGummyBall();
});

document.getElementById('addSteel')?.addEventListener('click', () => {
  game.addSteelBall();
});

document.getElementById('addSuper')?.addEventListener('click', () => {
  game.addSuperBall();
});

document.getElementById('addFragile')?.addEventListener('click', () => {
  game.addFragileBall();
});

document.getElementById('clear')?.addEventListener('click', () => {
  game.clear();
});

// Add a few initial balls to demonstrate
game.addRandomBall();
game.addRandomBall();
game.addRandomBall();
