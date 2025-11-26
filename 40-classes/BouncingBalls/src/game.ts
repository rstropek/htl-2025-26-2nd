import { Ball, GummyBall, SteelBall, SuperBall, FragileBall } from './balls';

/**
 * GAME CONTROLLER CLASS: BouncingBallsGame
 *
 * This class manages the overall simulation:
 *   - Holds the collection of all balls
 *   - Runs the animation loop
 *   - Provides methods to add new balls
 *
 * This demonstrates COMPOSITION: a class that contains other objects.
 */
export class BouncingBallsGame {
  /** The container element where balls bounce */
  private box: HTMLElement;

  /**
   * Array to store all active balls.
   *
   * Note: We store Ball objects, but they can be ANY type that extends Ball.
   * This is POLYMORPHISM: we can treat different ball types uniformly.
   */
  private balls: Ball[] = [];

  /**
   * Creates a new BouncingBallsGame instance.
   *
   * @param boxId The DOM element ID of the container box
   */
  constructor(boxId: string) {
    const box = document.getElementById(boxId);
    if (!box) {
      throw new Error(`Element with id '${boxId}' not found`);
    }
    this.box = box;
  }

  private getRandomX(): number {
    return Math.random() * (this.box.clientWidth - 50);
  }

  /**
   * Adds a random type of ball at a random position.
   *
   * Creates a random type of ball at a random position.
   * Demonstrates using base class type to reference derived class instances.
   */
  public addRandomBall(): void {
    // Random position
    const x = this.getRandomX();
    const size = 30 + Math.random() * 30; // Size between 30-60 pixels

    // Randomly select a ball type
    // Note: We declare 'ball' as type 'Ball' (the base class),
    // but we assign it instances of DERIVED classes.
    // This is allowed because derived classes ARE base classes (IS-A relationship)
    let ball: Ball;
    const type = Math.floor(Math.random() * 4);

    switch (type) {
      case 0:
        ball = new GummyBall(this.box, x, size);
        break;
      case 1:
        ball = new SteelBall(this.box, x, size);
        break;
      case 2:
        ball = new SuperBall(this.box, x, size);
        break;
      case 3:
        ball = new FragileBall(this.box, x, size);
        break;
      default:
        ball = new GummyBall(this.box, x, size);
    }

    // Add to our collection
    // All ball types can be stored in Ball[] because they all extend Ball
    this.balls.push(ball);
  }

  /** Adds a gummy ball. Useful for testing specific behaviors. */
  public addGummyBall(): void {
    const x = this.getRandomX();
    const ball = new GummyBall(this.box, x, 40);
    this.balls.push(ball);
  }

  /** Adds a steel ball. Useful for testing specific behaviors. */
  public addSteelBall(): void {
    const x = this.getRandomX();
    const ball = new SteelBall(this.box, x, 35);
    this.balls.push(ball);
  }

  /** Adds a super ball. Useful for testing specific behaviors. */
  public addSuperBall(): void {
    const x = this.getRandomX();
    const ball = new SuperBall(this.box, x, 25);
    this.balls.push(ball);
  }

  /** Adds a fragile ball. Useful for testing specific behaviors. */
  public addFragileBall(): void {
    const x = this.getRandomX();
    const ball = new FragileBall(this.box, x, 45);
    this.balls.push(ball);
  }

  /**
   * The main animation loop. Called every frame (~60 times per second).
   *
   * Uses requestAnimationFrame for smooth, efficient animation.
   */
  private gameLoop = (): void => {
    // Update ALL balls and filter out "dead" ones
    // POLYMORPHISM in action: each ball.update() call might execute
    // different code depending on the actual type of the ball.
    // If update() returns false, the ball is "dead" and should be removed.
    const aliveBalls: Ball[] = [];
    for (const ball of this.balls) {
      const isAlive = ball.update();
      if (!isAlive) {
        // Ball is dead - remove it from the DOM
        ball.remove();
      } else {
        aliveBalls.push(ball);
      }
    }
    this.balls = aliveBalls;

    // Request the next frame
    // This creates a continuous loop that runs at the browser's refresh rate
    requestAnimationFrame(this.gameLoop);
  };

  /** Starts the animation loop. */
  public start(): void {
    requestAnimationFrame(this.gameLoop);
  }

  /** Removes all balls from the simulation. */
  public clear(): void {
    for (const ball of this.balls) {
      ball.remove();
    }
    this.balls = [];
  }
}
