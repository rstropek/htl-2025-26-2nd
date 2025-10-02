# DOM Homework: SVG Bar Diagram Generator

## Overview

Create an interactive web page that generates a bar diagram from user input. This homework will help you practice SVG graphics with dynamic data visualization, including creating SVG elements programmatically, calculating percentages, and applying conditional styling based on threshold values.

## Requirements

### Functionality

Your bar diagram generator should:

1. Display a fixed-size SVG canvas with x and y axes
2. Show 12 segments on the x-axis representing months
3. Allow users to enter up to 12 numerical values (one per month)
4. Skip months where no value is entered
5. Accept an optional threshold value for conditional coloring
6. Generate bars that are scaled relative to the maximum value (100%)
7. Color bars green by default, or use red/green based on threshold
8. Clear previous bars before generating new ones

### User Interface Design

Create a simple, clean interface with the following layout:

```
+--------------------------------------------------+
|          SVG Bar Diagram Generator               |
+--------------------------------------------------+
|                                                  |
|  +--------------------------------------------+  |
|  |                                            |  |
|  |    [Y-axis] [12 segments with dividers]   |  |
|  |                                            |  |
|  |           SVG Canvas (1200 x 600)          |  |
|  |                                            |  |
|  +--------------------------------------------+  |
|                                                  |
|  Enter values for each month (leave empty):     |
|  Month 1: [  ]  Month 2: [  ]  ...              |
|  Month 11: [  ]  Month 12: [  ]                 |
|                                                  |
|  Optional threshold (bars above = red, below = green): |
|  Threshold: [  ]                                 |
|                                                  |
|       [ Generate Diagram ]                       |
+--------------------------------------------------+
```

### Technical Requirements

#### HTML Structure

- One SVG element with fixed dimensions (1200×600 pixels)
- 12 input fields (type="number") for monthly values
- One input field for threshold value (optional)
- One button for generating the diagram
- Appropriate descriptive text above input sections
- Simple layout without complex CSS

#### SVG Structure

- **Canvas size**: 1200×600 pixels (easy to remember)
- **Y-axis**: Vertical line, 500 pixels tall (easy to remember)
- **X-axis**: Horizontal line, 1000 pixels long (easy to remember)
- **Segments**: 12 segments of 100 pixels each (easy to remember)
- **Divider lines**: Small vertical lines at each segment boundary

#### TypeScript Implementation

Your TypeScript code must:

- Get references to all DOM elements using `getElementById()`
- Add event listener to the generate button
- Use `document.createElementNS()` to create SVG elements
- Initialize the SVG with axes and divider lines on page load
- Read values from all 12 input fields (handle empty fields)
- Read the optional threshold value
- Find the maximum value among all entered values
- Calculate bar heights as percentages of the maximum value
- Create rectangles (bars) for each non-empty month value
- Apply color logic:
  - If no threshold: all bars are green
  - If threshold exists: bars above threshold are red, below are green
- Remove all existing bars before generating new ones
- Use clear variable names and add code documentation

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

1. Find the maximum value from all entered values
2. For each value: `barHeight = (value / maxValue) × availableHeight`
3. This ensures the tallest bar uses the full available height

### Color Logic

```
IF threshold is not set:
    color = green
ELSE:
    IF value > threshold:
        color = red
    ELSE:
        color = green
```

## Testing Your Solution

Test your implementation with these scenarios:

1. **Basic test**: Enter values for all 12 months, no threshold
   - All bars should be green
   - The highest value should reach the top of the y-axis

2. **Partial data**: Enter values for only some months (e.g., 1, 3, 5, 7)
   - Only those months should show bars
   - Other positions should remain empty

3. **With threshold**: Enter values and set a threshold (e.g., 25)
   - Values above 25 should be red
   - Values at or below 25 should be green

4. **Regeneration**: Generate a diagram, then change values and regenerate
   - Old bars should disappear
   - New bars should appear with correct heights and colors

5. **Edge cases**: 
   - All values the same
   - Only one value entered
   - Very different values (e.g., 1 and 100)

## Bonus Challenges (Optional)

If you finish early, try implementing these additional features:

1. **Axis labels**: Add text labels for the axes and months
2. **Value display**: Show the actual value on top of each bar
3. **Animation**: Animate bars growing from zero to their final height
4. **Grid lines**: Add horizontal grid lines for easier value reading
