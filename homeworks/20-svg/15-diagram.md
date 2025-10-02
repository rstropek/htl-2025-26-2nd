# DOM Homework: SVG Bar Diagram Generator

## Overview

Create an interactive web page that generates a bar diagram from user input. This homework will help you practice SVG graphics with dynamic data visualization, including creating SVG elements programmatically, calculating percentages, and applying conditional styling based on threshold values.

## Requirements

### Functionality

Your bar diagram generator should:

1. Display a fixed-size SVG canvas with x and y axes
2. Show 12 segments on the x-axis representing months
3. Allow users to enter up to 12 numerical values (one per month)
4. Treat empty input fields as 0 (zero) - no bar will be displayed for zero values
5. Accept a threshold value for conditional coloring (empty threshold field = 0)
6. Generate bars that are scaled relative to the maximum value (100%)
7. Color bars based on threshold: values above threshold = red, values at or below threshold = green
8. Clear the entire SVG and reinitialize before generating new bars

### User Interface Design

Create a simple, clean interface with approximately the following layout:

```
+-----------------------------------------------------+
|          SVG Bar Diagram Generator                  |
+-----------------------------------------------------+
|                                                     |
|  +--------------------------------------------+     |
|  |                                            |     |
|  |    [Y-axis] [12 segments with dividers]    |     |
|  |                                            |     |
|  |           SVG Canvas (1200 x 600)          |     |
|  |                                            |     |
|  +--------------------------------------------+     |
|                                                     |
|  Enter values for each month (empty = 0):           |
|  Month 1: [  ]                                      |
|  Month 2: [  ]                                      |
|  ...                                                |
|  Month 12: [  ]                                     |
|                                                     |
|  Threshold for color coding (empty = 0):            |
|  Threshold (above = red, below/equal = green): [  ] |
|                                                     |
|       [ Generate Diagram ]                          |
+-----------------------------------------------------+
```

### Technical Requirements

#### HTML Structure

- One SVG element with fixed dimensions (1200×600 pixels) without inline styles
- 12 input fields (type="number") for monthly values
- One input field for threshold value
- One button for generating the diagram
- Use h2 elements for section headings
- Use label elements to associate text with input fields
- Use br elements to separate input fields for better readability

#### SVG Structure

- **Canvas size**: 1200×600 pixels
- **Y-axis**: Vertical line, 500 pixels tall
- **X-axis**: Horizontal line, 1000 pixels long
- **Segments**: 12 segments of 100 pixels each
- **Divider lines**: Small vertical lines at each segment boundary

#### TypeScript Implementation

Your TypeScript code must:

- Get references to all DOM elements using `getElementById()`
- Add event listener to the generate button
- Use `document.createElementNS()` to create SVG elements
- Initialize the SVG with axes and divider lines on page load
- Use a loop to create divider lines
- Read values from all 12 input fields (empty fields are treated as 0)
- Read the threshold value (empty field is treated as 0)
- Find the maximum value
- Calculate bar heights as percentages of the maximum value
- Create rectangles (bars) for each non-zero month value using loops
- Apply color logic: values above threshold = red, values at or below threshold = green

#### Bar Properties

**For each bar:**

- Position: Based on the month index (segment position on x-axis)
- Width: Slightly smaller than segment width (add padding)
- Height: Calculated as percentage of maximum value × available height
- Color: Green or red based on threshold logic
- No gaps between regenerations

## Implementation Notes

### SVG Coordinate System

- SVG coordinates start at top-left (0,0)
- Y-axis grows downward, so bars must be positioned carefully
- Use clear, round numbers for all dimensions (multiples of 10 or 100)

### Scaling Algorithm

1. Find the maximum value from all entered values using a loop
2. If maximum is 0, don't draw any bars
3. For each non-zero value: `barHeight = (value / maxValue) × availableHeight`
4. This ensures the tallest bar uses the full available height
