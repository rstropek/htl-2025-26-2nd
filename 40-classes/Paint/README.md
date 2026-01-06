# Paint - OOP Learning App

A simple drawing application designed for computer science students to practice Object-Oriented Programming (OOP) concepts with TypeScript. The app allows users to create circles and rectangles, select them, and remove them using an intuitive SVG-based interface.

## Project Description

This learning application demonstrates core OOP principles through a practical drawing tool:

- **Shape Creation**: Click and drag to create circles (center + radius) and rectangles (bounding box)
- **Temporary Preview**: Dashed border preview while creating shapes
- **Shape Selection**: Pointer tool selects shapes by clicking on them
- **Visual Feedback**: Selected shapes are highlighted with yellow outline
- **Tool Management**: Callback system notifies when tools change
- **Error Handling**: Proper SVG coordinate conversion and boundary checking

## Class Structure and Hierarchy

The application follows a clean OOP architecture with the following class hierarchy:

```
Shape (abstract base class)
├── Circle
└── Rect
```

### Key Classes

- **`Shape`** ([`src/Shape.ts`](src/Shape.ts)): Abstract base class defining the common interface for all shapes
  - ⚠️ **Abstract base classes**: Demonstrates how to create abstract classes that cannot be instantiated directly but provide a common interface for derived classes
  - Defines abstract methods: `containsPoint()`, `updatePosition()`, `hasZeroArea`, `element`
  - Provides concrete methods: `select()`, `deselect()`, `tempMode`, `remove()`

- **`Circle`** ([`src/Circle.ts`](src/Circle.ts)): Concrete implementation of a circle shape
  - Implements all abstract methods from `Shape`
  - Uses center point and radius to define the circle
  - Provides `containsPoint()` method for hit testing

- **`Rect`** ([`src/Rect.ts`](src/Rect.ts)): Concrete implementation of a rectangle shape
  - Implements all abstract methods from `Shape`
  - Uses position and size to define the rectangle
  - Provides `containsPoint()` method for hit testing

- **`ShapeManager`** ([`src/ShapeManager.ts`](src/ShapeManager.ts)): Manages shape creation and interaction
  - ⚠️ **Optional properties**: Uses `currentDrawingState?: DrawingState` to demonstrate optional properties in TypeScript
  - Handles mouse events for drawing and selecting shapes
  - Manages the collection of shapes and current tool

- **`ToolSelection`** ([`src/ToolSelection.ts`](src/ToolSelection.ts)): Tool management with callback support
  - ⚠️ **Type Aliases**: Uses `ToolChangeCallback` to create a reusable function type
  - ⚠️ **TypeScript Map**: Uses `Map<ToolType, HTMLButtonElement>` to associate tool types with UI buttons
  - ⚠️ **Callback pattern**: Implements a callback system to notify when tools change
  - Creates and manages tool buttons (Circle, Rectangle, Pointer)

### Supporting Types

- **`SharedTypes.ts`**: Contains shared type definitions
  - ⚠️ **Enums**: Defines `ToolType` enum for representing different tool types
  - Defines `Point` and `Size` type aliases for geometric calculations

## New Learning Concepts (⚠️)

This project introduces several important TypeScript and OOP concepts:

1. **Abstract Base Classes** ([`src/Shape.ts:3`](src/Shape.ts:3)): Learn how to create abstract classes that define interfaces for derived classes

2. **Optional Properties** ([`src/ShapeManager.ts:17`](src/ShapeManager.ts:17)): Understand how to use optional properties (`?`) for properties that may not always be available

3. **Type Aliases** ([`src/ToolSelection.ts:4`](src/ToolSelection.ts:4)): Learn how to create reusable function types for better code organization

4. **TypeScript Map** ([`src/ToolSelection.ts:18`](src/ToolSelection.ts:18)): Discover how to use Map collections for key-value pair storage

5. **Callback Pattern** ([`src/ToolSelection.ts:37`](src/ToolSelection.ts:37)): Understand how to implement callback functions for event notification

6. **Enums** ([`src/SharedTypes.ts:2`](src/SharedTypes.ts:2)): Learn how to use enumerations to organize related constant values

7. **Nested CSS Rules** ([`src/styles.css:28`](src/styles.css:28)): Learn how to use modern CSS nesting features to organize styles hierarchically

## CSS Styling and Visual Design

The application uses modern CSS features for styling:

- **Nested CSS Rules** ([`src/styles.css:28`](src/styles.css:28)): Demonstrates the use of nested CSS rules, a modern CSS feature that allows nesting selectors inside other selectors for better organization and readability
- **Visual Feedback**: Different styles for normal, temporary (dashed border), and selected (gold outline) states
- **Tool Styling**: Buttons with hover and selected states using nested CSS rules
- **SVG Styling**: Specific styles for circles (blue) and rectangles (red) with different stroke and fill properties
