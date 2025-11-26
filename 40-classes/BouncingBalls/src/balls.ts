/**
 * ABSTRACT BASE CLASS: Ball
 *
 * An abstract class is a class that CANNOT be instantiated directly.
 * It serves as a blueprint for other classes to inherit from.
 * In our example, the base class 'Ball' defines common properties and methods
 * for all ball types, but specific ball types (GummyBall, SteelBall, etc.)
 * extend this base class to provide their own unique behaviors.
 * Abstract classes can contain:
 *   - Abstract methods: methods without implementation that MUST be
 *     implemented by derived classes
 *   - Concrete methods: regular methods with implementation that derived
 *     classes can use or override
 */
export abstract class Ball {
  // PROTECTED PROPERTIES
  // The 'protected' keyword means these properties can be accessed:
  //   - Within this class
  //   - Within any class that extends (inherits from) this class
  // But NOT from outside code (unlike 'public')

  /** The HTML div element representing this ball in the DOM */
  protected element: HTMLDivElement;

  /**
   * Current X position (horizontal, from left edge) in pixels
   *
   * Note that our balls do not move horizontally in this simulation,
   * so 'x' is readonly after initialization. REMEMBER: It is good
   * practice to set properties as readonly if they should not change.
   */
  protected readonly x: number;

  /** Current Y position (vertical, from top edge) in pixels */
  protected y: number;

  /** Vertical velocity (pixels per frame), positive = down, negative = up */
  protected velocityY: number;

  /** The diameter of the ball in pixels */
  protected size: number;

  /** The current color of the ball (CSS color string) */
  protected color: string;

  /** Reference to the container box element */
  protected box: HTMLElement;

  // CONSTRUCTOR
  // The constructor is a special method called when creating a new instance.

  /**
   * Initializes a new Ball instance.
   * @param box DOM element container where the ball will bounce
   * @param x Initial horizontal position (pixels from left)
   * @param size Diameter of the ball in pixels
   * @param color CSS color string for the ball
   */
  constructor(box: HTMLElement, x: number, size: number, color: string) {
    // Store references and initial values
    this.box = box;
    this.x = x;
    this.size = size;
    this.color = color;

    // Start at top (y=0)
    this.y = 0;

    // Initialize velocity - start with no vertical velocity (gravity will add to it)
    this.velocityY = 0;

    // Create the DOM element for this ball
    this.element = document.createElement('div');
    this.element.className = 'ball';
    this.element.style.width = `${size}px`;
    this.element.style.height = `${size}px`;
    this.element.style.backgroundColor = color;

    // Add the ball to the box
    this.box.appendChild(this.element);

    // Set initial position
    this.updatePosition();
  }

  // ABSTRACT PROPERTY: bounciness
  // Abstract getters/properties MUST be implemented by derived classes.
  // This defines a contract: every Ball subclass MUST provide a bounciness
  // value. Different ball types will have different bounciness values:
  //   - Gummy ball: low bounciness (absorbs energy)
  //   - Steel ball: high bounciness (retains most energy)

  /** Bounciness factor of the ball (0 = no bounce, 1 = perfect bounce) */
  abstract get bounciness(): number;

  // PROTECTED METHOD: onReachedBottom

  /**
   * "Hook" method called when the ball hits the bottom of the box.
   *
   * This is a "hook" method that derived classes can OVERRIDE to add
   * custom behavior when the ball hits the bottom.
   * The 'protected' keyword means only this class and derived classes
   * can call this method.
   * @returns true if the ball is still "alive", false if it should be removed.
   *.         The base implementation returns true - derived classes can return false to die.
   */
  protected onReachedBottom(): boolean {
    // Default implementation: ball stays alive
    // Derived classes can override this to change color, shape, or return false to die
    return true;
  }

  /**
   * Update method called every animation frame to update the ball's state.
   *
   * This method is called every animation frame to update the ball's state.
   * It implements the core physics simulation:
   *   1. Apply gravity (increase downward velocity)
   *   2. Update position based on velocity
   *   3. Handle collisions with floor
   * @returns true if the ball is still "alive", false if it should be removed.
   */
  public update(): boolean {
    // PHYSICS CONSTANTS
    const gravity = 0.5; // Downward acceleration per frame

    // Minimum velocity threshold - below this, the ball is considered "at rest"
    // This prevents onReachedBottom from being called continuously when
    // the ball has nearly stopped bouncing
    const minVelocity = 0.5;

    // APPLY GRAVITY
    // Gravity constantly increases the downward velocity.
    // This simulates the acceleration due to gravity.
    this.velocityY += gravity;

    // UPDATE POSITION
    // Position changes by velocity each frame.
    // This is basic kinematics: position = position + velocity
    this.y += this.velocityY;

    // COLLISION DETECTION: Floor (Bottom)
    // Check if ball has hit the bottom of the box.
    // We need to account for the ball's size (its bottom edge, not center).
    const boxHeight = this.box.clientHeight;
    if (this.y + this.size > boxHeight) {
      // Snap the ball to the floor (prevent going through)
      this.y = boxHeight - this.size;

      // Only trigger bounce behavior if velocity is significant
      // This prevents continuous triggering when ball is at rest
      if (Math.abs(this.velocityY) > minVelocity) {
        // Reverse vertical velocity and apply bounciness factor.
        // POLYMORPHISM: 'this.bounciness' calls the getter defined
        // in the DERIVED class, not here. Each ball type bounces
        // differently based on its own bounciness value!
        this.velocityY = -this.velocityY * this.bounciness;

        // Call the onReachedBottom hook - derived classes can override this
        // POLYMORPHISM: If a derived class overrides onReachedBottom,
        // that version gets called, not the empty base version.
        // If it returns false, the ball is "dead" and should be removed.
        if (!this.onReachedBottom()) {
          return false;
        }
      } else {
        // Ball has come to rest - stop it completely
        this.velocityY = 0;
      }
    }

    // COLLISION DETECTION: Ceiling (Top)
    if (this.y < 0) {
      this.y = 0;
      this.velocityY = -this.velocityY * this.bounciness;
    }

    // Update the visual position of the ball element
    this.updatePosition();

    // Ball is still alive
    return true;
  }

  /**
   * Updates the DOM element's position to match the ball's x,y coordinates.
   *
   * 'private' means this can ONLY be called from within this class,
   * not from derived classes or outside code.
   */
  private updatePosition(): void {
    // Note that we must add "px" to left and top. Just
    // setting numbers won't work!
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  /** Removes the ball from the DOM. Called when cleaning up. */
  public remove(): void {
    this.element.remove();
  }
}

/**
 * DERIVED CLASS: GummyBall
 *
 * A gummy ball has LOW bounciness - it absorbs energy when bouncing.
 * The 'extends' keyword means this class INHERITS from Ball.
 * It gets all of Ball's properties and methods, and can add its own
 * or OVERRIDE inherited ones.
 *
 * Special behavior: Changes color with each bounce and displays a "squish" animation.
 */
export class GummyBall extends Ball {
  /** Counter for how many times this ball has hit the bottom */
  private bounceCount: number = 0;

  /** Array of colors to cycle through when bouncing */
  private readonly colors: string[] = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];

  /**
   * Creates a new GummyBall instance.
   *
   * GummyBall uses a default color from its color palette.
   * This shows how derived classes can customize construction behavior.
   * @param box DOM element container where the ball will bounce
   * @param x Initial horizontal position (pixels from left)
   * @param size Diameter of the ball in pixels
   */
  constructor(box: HTMLElement, x: number, size: number) {
    // Call parent constructor with first color from our palette
    super(box, x, size, '#ff6b6b');
  }

  /**
   * Bounciness factor of the gummy ball.
   *
   * IMPLEMENTING THE ABSTRACT PROPERTY:
   * Since Ball declares 'bounciness' as abstract, we MUST implement it.
   * Gummy balls have low bounciness (0.6 = loses 40% energy each bounce).
   * The 'get' keyword creates a "getter" - you access it like a property:
   *   ball.bounciness  (NOT ball.bounciness())
   */
  get bounciness(): number {
    return 0.6; // Low bounciness - absorbs energy
  }

  /**
   * Called when the gummy ball hits the bottom.
   *
   * OVERRIDING A PROTECTED METHOD:
   * We override the base class's onReachedBottom to add custom behavior.
   * When a gummy ball hits the bottom, it changes color!
   * The 'protected' keyword keeps this method accessible only within
   * the class hierarchy (this class and any that extend it).
   * @returns true because gummy balls never die from bouncing.
   */
  protected onReachedBottom(): boolean {
    this.bounceCount++;

    // Cycle through colors based on bounce count
    const colorIndex = this.bounceCount % this.colors.length;
    const newColor = this.colors[colorIndex];
    if (newColor) {
      this.color = newColor;
      this.element.style.backgroundColor = this.color;
    }

    // Add a brief "squish" effect by temporarily changing the shape
    this.element.style.transform = 'scaleX(1.3) scaleY(0.7)';

    // Reset the shape after a short delay
    setTimeout(() => {
      this.element.style.transform = 'scaleX(1) scaleY(1)';
    }, 100);

    // Gummy balls always stay alive
    return true;
  }
}

/**
 * DERIVED CLASS: SteelBall
 *
 * A steel ball has HIGH bounciness - it retains most of its energy.
 * Steel balls also have a metallic appearance and create a "flash"
 * effect when they hit the bottom.
 *
 * Special behavior: Creates a bright flash animation on impact.
 */
export class SteelBall extends Ball {
  /**
   * Creates a new SteelBall instance.
   *
   * CONSTRUCTOR WITH ADDITIONAL SETUP:
   * When a derived class has a constructor, it MUST call the parent
   * constructor using 'super()'. This ensures the base class is
   * properly initialized before adding derived class functionality.
   * @param box DOM element container where the ball will bounce
   * @param x Initial horizontal position (pixels from left)
   * @param size Diameter of the ball in pixels
   */
  constructor(box: HTMLElement, x: number, size: number) {
    // Call the parent (Ball) constructor first
    // 'super' refers to the parent class
    super(box, x, size, '#c0c0c0'); // Silver/steel color

    this.element.style.background = '#c0c0c0';
  }

  /**
   * Bounciness factor of the steel ball.
   *
   * IMPLEMENTING THE ABSTRACT PROPERTY:
   * Steel balls have high bounciness (0.9 = loses only 10% energy).
   */
  get bounciness(): number {
    return 0.9; // High bounciness - retains most energy
  }

  /**
   * Called when the steel ball hits the bottom.
   *
   * OVERRIDING onReachedBottom:
   * Steel balls create a brief bright flash when they hit the bottom,
   * simulating a spark or impact effect.
   * @returns true because steel balls never die from bouncing.
   */
  protected onReachedBottom(): boolean {
    // Create a flash effect by briefly changing the color
    this.element.style.background = '#ffff00';

    // Reset to normal metallic look after a short delay
    setTimeout(() => {
      this.element.style.background = '#808080';
    }, 50);

    // Steel balls always stay alive
    return true;
  }
}

/**
 * DERIVED CLASS: SuperBall
 *
 * A super ball has MAXIMUM bounciness - it bounces higher than it started!
 * (This is unrealistic physics, but fun for demonstration)
 * Super balls also grow slightly with each bounce until they reach max size.
 * However, they "explode" (die) if their velocity exceeds a maximum threshold.
 *
 * Special behavior: Grows with each bounce and glows. Dies when velocity gets too high.
 */
export class SuperBall extends Ball {
  /** The maximum size this ball can grow to */
  private maxSize: number;

  /** The amount to grow with each bounce */
  private growthRate: number = 2;

  /** Maximum velocity before the ball "explodes" and dies */
  private readonly maxVelocity: number = 25;

  /**
   * Creates a new SuperBall instance.
   * @param box DOM element container where the ball will bounce
   * @param x Initial horizontal position (pixels from left)
   * @param size Diameter of the ball in pixels
   */
  constructor(box: HTMLElement, x: number, size: number) {
    super(box, x, size, '#00ff00'); // Bright green

    this.maxSize = size * 2; // Can grow up to double its initial size
  }

  /**
   * Bounciness factor of the super ball.
   *
   * IMPLEMENTING THE ABSTRACT PROPERTY:
   * Super balls have unrealistic bounciness > 1 (gains energy!)
   * This is for fun/demonstration - not realistic physics.
   */
  get bounciness(): number {
    return 1.05; // More than 1 - gains energy (unrealistic but fun!)
  }

  /**
   * Called when the super ball hits the bottom.
   *
   * OVERRIDING onReachedBottom:
   * Super balls grow slightly with each bounce.
   * @returns false (dies) if velocity exceeds maximum threshold, otherwise true.
   */
  protected onReachedBottom(): boolean {
    // Check if velocity is too high - ball "explodes"
    if (Math.abs(this.velocityY) >= this.maxVelocity) {
      // Ball has too much energy and explodes!
      return false;
    }

    // Grow the ball if it hasn't reached max size
    if (this.size < this.maxSize) {
      this.size += this.growthRate;
      this.element.style.width = `${this.size}px`;
      this.element.style.height = `${this.size}px`;
    }

    // Ball is still alive
    return true;
  }
}

/**
 * DERIVED CLASS: FragileBall
 *
 * A fragile ball has almost NO bounciness and "cracks" when it hits
 * the bottom. After 3 bounces, it "breaks" and is removed from the game.
 *
 * Special behavior: Shows progressive cracking with each bounce, dies after 3 hits.
 */
export class FragileBall extends Ball {
  /** Counter for how many times this ball has hit the bottom */
  private hitCount: number = 0;

  /**
   * Creates a new FragileBall instance.
   * @param box DOM element container where the ball will bounce
   * @param x Initial horizontal position (pixels from left)
   * @param size Diameter of the ball in pixels
   */
  constructor(box: HTMLElement, x: number, size: number) {
    super(box, x, size, '#e8d5b7'); // Ceramic/eggshell color

    // Add a smooth, ceramic-like appearance
    this.element.style.background = '#c4a77d';
  }

  /**
   * Bounciness factor of the fragile ball.
   *
   * IMPLEMENTING THE ABSTRACT PROPERTY:
   * Fragile balls have very low bounciness.
   */
  get bounciness(): number {
    return 0.3; // Very low bounciness
  }

  /**
   * Called when the fragile ball hits the bottom.
   *
   * OVERRIDING onReachedBottom:
   * Fragile balls crack progressively and eventually break.
   * @returns false (dies) after the third hit, otherwise true.
   */
  protected onReachedBottom(): boolean {
    this.hitCount++;

    // Add visual "cracks" based on hit count
    if (this.hitCount === 1) {
      this.element.style.background = '#c48c7dff';
      this.element.style.border = '2px solid #8b5d55ff';
      return true; // Still alive
    } else if (this.hitCount === 2) {
      // Second hit: more cracks
      this.element.style.background = '#c94e4eff';
      this.element.style.border = '2px dashed #6b3535ff';
      return true; // Still alive
    } else {
      // Third hit: break apart - ball dies!
      return false;
    }
  }
}
