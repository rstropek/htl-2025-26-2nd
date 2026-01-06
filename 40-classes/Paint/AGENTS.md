# Paint - OOP Learning App

## Introduction

This is a learning app for computer science students who practise OOP with TypeScript. Do NOT use and additional frameworks beside what is already installed in package.json.

Whenever you make changes to the code, adjust AGENTS.md to reflect the current state of the project. Only add information that is relevant for understanding the code structure and design decisions. Do not document simple and obvious things in AGENTS.md.

## Tooling

Use bun for tooling and package management.

* `bun install` - Install dependencies
* `bun start` - Start development server
* `bun run build` - Build for production

Currently no unit tests.

Do not start the app yourself. Assume that `bun start` is continuously running with Hot Module Replacement (HMR).

## Project Content

* Implements a simple drawing app that supports circles and rectangles.
* Users can create shapes, select them, remove them.
* Shapes are drawn using SVG.
* App contains a tool selector (src/ToolSelection.ts)

## Class Structure

The application follows a clean OOP architecture with the following class hierarchy:

* `Shape` (abstract base class) - src/Shape.ts
  - `Circle` - src/Circle.ts
  - `Rect` - src/Rect.ts
* `ShapeManager` - src/ShapeManager.ts (manages shape creation and interaction)
* `ToolSelection` - src/ToolSelection.ts (tool management with callback support)

## Features Implemented

* **Shape Creation**: Click and drag to create circles (center + radius) and rectangles (bounding box)
* **Temporary Preview**: Dashed border preview while creating shapes
* **Shape Selection**: Pointer tool selects shapes by clicking on them
* **Visual Feedback**: Selected shapes are highlighted with yellow outline
* **Tool Management**: Callback system notifies when tools change
* **Error Handling**: Proper SVG coordinate conversion and boundary checking
