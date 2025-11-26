# Bouncing Balls - TypeScript Classes Learning Project

This project implements a bouncing balls simulation to demonstrate object-oriented programming concepts in TypeScript.

## Key Learning Concepts

### TypeScript Fundamentals

**Abstract Classes**: Using `abstract class Ball` to define a base class that cannot be instantiated directly but serves as a blueprint for derived classes. Abstract classes can contain both implemented methods and abstract members that must be implemented by subclasses.

**Inheritance**: The `extends` keyword creates derived classes (`GummyBall`, `SteelBall`, `SuperBall`, `FragileBall`) that inherit properties and methods from the base `Ball` class while adding their own unique behaviors.

**Polymorphism**: Different ball types override the `bounciness` getter and `onReachedBottom()` method to provide type-specific behavior. The game loop treats all balls uniformly through the base class interface.

**Access Modifiers**: Use of `protected` for properties accessible in derived classes, `private` for internal implementation details, and `readonly` for constants that shouldn't change after initialization.

**Abstract Properties**: Using `abstract get bounciness(): number` to enforce that all derived classes must provide their own bounciness value.

### DOM Manipulation

**Element References**: Storing HTML element references in class properties for efficient access throughout the application lifecycle.

**Dynamic Element Creation**: Programmatically creating ball elements using `createElement` and `appendChild`, with dynamic styling for size, color, and effects.

**Event Handling**: Attaching click event listeners to buttons using arrow functions and optional chaining (`?.addEventListener`).

**Inline Style Manipulation**: Dynamically updating element styles (`style.left`, `style.top`, `style.transform`, `style.boxShadow`) to animate balls and create visual effects.

### Animation Techniques

**requestAnimationFrame**: Using the browser's `requestAnimationFrame` API to create smooth, efficient animations that sync with the display refresh rate.

**Game Loop Pattern**: Implementing a continuous update loop that processes all game objects each frame.

**Object Lifecycle Management**: Using boolean return values from `update()` to signal when objects should be removed, with `Array.filter()` to clean up dead balls.

### CSS Layout

**Absolute Positioning**: Using `position: absolute` within a `position: relative` container to place balls at exact pixel coordinates.

**Flexbox**: Centering content and creating flexible button layouts with `display: flex`, `flex-direction`, `align-items`, and `justify-content`.

**Visual Effects**: Creating circular shapes with `border-radius: 50%`, metallic appearances with `radial-gradient`, and glow effects with `box-shadow`.

### Physics Simulation

**Gravity**: Applying constant downward acceleration to velocity each frame (`velocityY += gravity`).

**Collision Detection**: Checking if ball position exceeds container boundaries and snapping to edges.

**Bounce Mechanics**: Reversing velocity and applying a bounciness factor on collision (`velocityY = -velocityY * bounciness`).

**Velocity Thresholds**: Using minimum velocity checks to determine when a ball has come to rest and prevent continuous event triggering.

