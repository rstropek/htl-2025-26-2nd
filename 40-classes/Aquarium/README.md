# Aquarium - TypeScript Classes Learning Project

This project implements an aquarium simulation to demonstrate object-oriented programming concepts in TypeScript.

## Key Learning Concepts

### TypeScript Fundamentals

**Abstract Classes**: Using `abstract class Fish` to define a base class that cannot be instantiated directly. It handles common properties like position, speed, and the DOM element. Intermediate abstract classes like `HorizontalCheckingFish` and `BoundsCheckingFish` add specific behaviors.

**Inheritance**: The `extends` keyword creates derived classes (`HorizontalFish`, `CrissCrossFish`, `SinusFish`) that inherit properties and methods from the base classes while adding their own unique movement patterns.

**Polymorphism**: The `FishManager` treats all fish uniformly through the base `Fish` class interface, calling `update()`, `handleOutOfBounds()`, and `draw()` on each frame.

**Access Modifiers**: Use of `protected` for properties accessible in derived classes (like `x`, `y`, `speedX`), `private` for internal details, and `readonly` for immutable properties.

**Abstract Methods**: Using `abstract update(): void` to enforce that all concrete fish classes must define their own movement logic.

### DOM Manipulation

**Image Loading**: Handling asynchronous image loading using `onload` to ensure dimensions (`naturalWidth`, `naturalHeight`) are available before drawing.

**Transformations**: Using `transform: scaleX(-1)` to mirror the fish image based on its movement direction (`speedX`).

**Absolute Positioning**: Using `position: absolute` to place fish at exact coordinates within the aquarium container.

### Animation Techniques

**requestAnimationFrame**: Using the browser's `requestAnimationFrame` API to create smooth animations.

**Game Loop Pattern**: The `FishManager` class implements a continuous update loop that processes all fish each frame.

### Movement Logic

**Bounds Checking**: Implementing different strategies for handling screen boundaries (e.g., bouncing off walls) in `HorizontalCheckingFish` and `BoundsCheckingFish`.

**Movement Patterns**:

- **HorizontalFish**: Moves left and right.
- **CrissCrossFish**: Moves in both X and Y directions, bouncing off all walls.
- **SinusFish**: Moves horizontally while oscillating vertically using a sine wave.

## Class Diagram

[![](https://mermaid.ink/img/pako:eNq1VF1v2jAU_SuR-xLWBJVBClioD2ObOmlVpW0PZcseLvElsZrYzHZEW8Z_n5PwEUZQYdL8EMfn3G-fZEkiyZBQEqWg9XsOsYIsFI5dJeJ85DpxlhVSrNEIptooiMzNzQ71McUMhaHO7be7z58yiPFDhexsLp6oI_JsiqqGPTdgeo7IHo4RkwZiwZlJGvAEeZyYBmIGERfxl4qdSpkiiB19mUpgyBqYC_iVg-J5VjV60ONlJIWdTh4ZqdyNredoFdmHAWUe1vvE7mWb633SqgXJ5wwMuq03NYwpWLh1oxjNO5kLpt2WU73UyAQES_E-N_eztdHCc5K1-yoU9Ru-lYq_SGEgHScYPdq5nHbnZyWpDP5jgl0XfwffjrPRb6y41mMltT7P7ysX-YGLPwWNDQL1Dc_wED5fLa1TyysquwNhv0O1V-DM4qhpyf_4WSP-Rdj1aoCxIqZbJDihynJyo9--f0R-ldURaZZ-h4p63WdfJJV9gzJL231hvB57K4hdg5sLkJYuzsQjseKMUDtI9EiGKoPiSMobColJ7NRDQu0rA_UYklCsrM8cxHcps42bknmcEDqDVNtTNd_1j3uLKhQM1di2ZggdliEIXZInQjtBv93r9TvDwaATvO0Ena5Hngkd9Nrdfm8YXAfd7qB3fdVfeeSlTHrVHliivlZ_AIPp6lM?type=png)](https://mermaid.live/edit#pako:eNq1VF1v2jAU_SuR-xLWBJVBClioD2ObOmlVpW0PZcseLvElsZrYzHZEW8Z_n5PwEUZQYdL8EMfn3G-fZEkiyZBQEqWg9XsOsYIsFI5dJeJ85DpxlhVSrNEIptooiMzNzQ71McUMhaHO7be7z58yiPFDhexsLp6oI_JsiqqGPTdgeo7IHo4RkwZiwZlJGvAEeZyYBmIGERfxl4qdSpkiiB19mUpgyBqYC_iVg-J5VjV60ONlJIWdTh4ZqdyNredoFdmHAWUe1vvE7mWb633SqgXJ5wwMuq03NYwpWLh1oxjNO5kLpt2WU73UyAQES_E-N_eztdHCc5K1-yoU9Ru-lYq_SGEgHScYPdq5nHbnZyWpDP5jgl0XfwffjrPRb6y41mMltT7P7ysX-YGLPwWNDQL1Dc_wED5fLa1TyysquwNhv0O1V-DM4qhpyf_4WSP-Rdj1aoCxIqZbJDihynJyo9--f0R-ldURaZZ-h4p63WdfJJV9gzJL231hvB57K4hdg5sLkJYuzsQjseKMUDtI9EiGKoPiSMobColJ7NRDQu0rA_UYklCsrM8cxHcps42bknmcEDqDVNtTNd_1j3uLKhQM1di2ZggdliEIXZInQjtBv93r9TvDwaATvO0Ena5Hngkd9Nrdfm8YXAfd7qB3fdVfeeSlTHrVHliivlZ_AIPp6lM)
