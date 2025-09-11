# DOM Homework: SVG Shape Generator

## Overview

Create an interactive web page that allows users to dynamically add SVG shapes with random properties. This homework will help you practice DOM manipulation concepts with SVG graphics, including element creation, event handling, and dynamic content generation.

## Requirements

### Functionality

Your shape generator should:

1. Allow the user to select between "Circle" and "Rectangle" from a dropdown
2. Add a randomly positioned and sized shape when the "Add Shape" button is clicked
3. Generate shapes with random colors from a predefined palette
4. Optional: Ensure all shapes stay within the SVG canvas boundaries
5. Optional: Include a "Clear All" button to remove all shapes

### User Interface Design

Create a simple, clean interface with the following layout:

```
+----------------------------------+
|       SVG Shape Generator        |
+----------------------------------+
| Shape Type: [Circle    v]        |
|                                  |
|        [  Add Shape  ]           |
|        [  Clear All  ]           |
|                                  |
| +------------------------------+ |
| |                              | |
| |        SVG Canvas            | |
| |       (600 x 400)            | |
| |                              | |
| +------------------------------+ |
+----------------------------------+
```

### Technical Requirements

#### HTML Structure

- One select element with options for "Circle" and "Rectangle"
- One button for adding shapes
- One SVG canvas (600×400 pixels minimum) with a visible border
- Optional: One "Clear All" button
- Appropriate labels for all interface elements

#### TypeScript Implementation

Your TypeScript code must:

- Get references to all DOM elements using `getElementById()`
- Add event listeners to buttons
- Use `document.createElementNS()` to create SVG elements
- Generate random properties for each shape (position, size, color)
- Optional: Ensure shapes don't exceed SVG boundaries
- Append new shapes to the SVG canvas

#### Shape Properties

**For Circles:**

- Random center position (within canvas bounds considering radius)
- Random radius between 10-50 pixels
- Random color from a predefined palette

**For Rectangles:**

- Random position (within canvas bounds considering dimensions)
- Random width between 20-100 pixels
- Random height between 20-80 pixels
- Random color from a predefined palette

## Bonus Challenges (Optional)

If you finish early, try implementing these additional features:
1. **Click to Remove**: Make shapes clickable to remove them individually
2. **Shape Counter**: Display how many shapes are currently on the canvas
3. **Additional Shapes**: Add support for ellipses or triangles