# DOM Homework: Simple Calculator

## Overview

Create a simple web-based calculator using HTML, CSS, and TypeScript. This homework will help you practice the DOM manipulation concepts you've learned, including working with input fields, select elements, event handling, and dynamic content updates.

## Requirements

### Functionality
Your calculator should:
1. Accept two numeric values from the user
2. Allow the user to select an operation (+, -, *, /)
3. Calculate and display the result when the "Calculate" button is clicked
4. Handle the edge case of division by zero with a meaningful error message
5. Clear previous results when new calculations are performed

### User Interface Design

Create a simple, clean interface with the following layout:

```
+----------------------------------+
|        Simple Calculator         |
+----------------------------------+
| First Number:  [____________]    |
|                                  |
| Operation:     [+  v]  (dropdown)|
|                                  |
| Second Number: [____________]    |
|                                  |
|         [   Calculate   ]        |
|                                  |
| Result: ___________________      |
+----------------------------------+
```

### Technical Requirements

#### HTML Structure
- Two input fields for numbers (use `type="number"`)
- One select element (combobox) with the four operations
- One button for calculation
- One element to display the result (paragraph or div)
- Appropriate labels for all input elements

#### TypeScript Implementation
Your TypeScript code must:
- Get references to all DOM elements using `getElementById()`
- Add an event listener to the calculate button
- Retrieve values from input fields and the select element
- Perform the selected mathematical operation
- Display the result in the designated area
- Handle division by zero with a user-friendly error message

#### Error Handling
- Check for empty input fields
- Validate that inputs are valid numbers (read about [`parseInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt))
- Display "Error: Cannot divide by zero!" when attempting to divide by zero
- Show appropriate messages for invalid inputs

## Bonus Challenges (Optional)

If you finish early, try implementing these additional features:
1. **Clear button**: Add a button to clear all inputs and results
2. **History**: Display a list of previous calculations
5. **Additional operations**: Add power (^) or modulo (%) operations
