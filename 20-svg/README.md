# SVG Fundamentals with TypeScript

Welcome to the SVG (Scalable Vector Graphics) course! This course will teach you how to create, manipulate, and interact with SVG graphics using TypeScript.

## What is SVG?

SVG (Scalable Vector Graphics) is a vector graphics format that uses XML markup to define two-dimensional graphics. Unlike bitmap images (like JPG or PNG), SVG graphics are made of descriptions of shapes, which means they can be scaled to any size without losing quality.

Think of SVG as a drawing canvas where each shape is an element that can be styled, animated, and made interactive:

```
                    <svg>
                      |
            ┌─────────┼─────────┐
            |         |         |
        <circle>   <rect>    <path>
            |         |         |
       "A circle" "A box"  "A line"
```

## SVG Structure Visualization

Here's how SVG represents graphics in a structured way:

**SVG Source:**
```xml
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="30" fill="red" />
    <rect x="100" y="20" width="60" height="40" fill="blue" />
    <line x1="180" y1="30" x2="250" y2="80" stroke="green" stroke-width="3" />
    <text x="20" y="120" font-family="Arial" font-size="16">Hello SVG!</text>
</svg>
```

**SVG Element Tree:**
```
svg (canvas: 300×200)
├─ circle (center: 50,50, radius: 30, red)
├─ rect (position: 100,20, size: 60×40, blue)  
├─ line (from: 180,30 to: 250,80, green, thick)
└─ text (at: 20,120, "Hello SVG!")
```

Each SVG element is like a drawing instruction that the browser renders as part of the complete graphic.

## How SVG Works

SVG elements work similar to HTML elements - they:
- Can be styled with CSS
- Can be manipulated with JavaScript/TypeScript
- Can respond to events (clicks, hover, etc.)
- Are part of the DOM tree
- Can be created, modified, and removed dynamically

The key difference is that SVG elements represent graphics primitives (circles, rectangles, paths) rather than document structure.

## Basic SVG Interaction with TypeScript

### Creating an SVG Canvas and Adding Simple Shapes

First, let's see how to add shapes to an existing SVG canvas:

```html
<!-- HTML: SVG canvas already in the page -->
<svg id="mySvg" width="400" height="300" style="border: 1px solid #ccc;"></svg>
```

```typescript
// Get reference to the existing SVG canvas
const svg = document.getElementById('mySvg') as SVGSVGElement;

// Create a circle
const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttribute('cx', '50');    // center x
circle.setAttribute('cy', '50');    // center y
circle.setAttribute('r', '30');     // radius
circle.setAttribute('fill', 'red');

// Add circle to SVG
svg.appendChild(circle);
```

**Explanation:**
- The SVG canvas is already defined in HTML with dimensions and styling
- `createElementNS()` is used for SVG elements (different from regular HTML elements)
- SVG uses attributes like `cx`, `cy`, `r` to define shape properties
- All SVG coordinates start from top-left (0,0)

### Styling SVG Elements with CSS Classes

Instead of setting styles directly with attributes, you can use CSS classes for better maintainability:

```html
<!-- HTML: SVG canvas with CSS styles -->
<style>
.my-circle {
    fill: lightblue;
    stroke: darkblue;
    stroke-width: 3;
    opacity: 0.8;
}

.my-circle:hover {
    fill: orange;
    stroke: red;
}
</style>

<svg id="styledSvg" width="400" height="300" style="border: 1px solid #ccc;"></svg>
```

```typescript
// Get reference to the SVG canvas
const svg = document.getElementById('styledSvg') as SVGSVGElement;

// Create a circle with CSS class
const styledCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
styledCircle.setAttribute('cx', '150');
styledCircle.setAttribute('cy', '100');
styledCircle.setAttribute('r', '50');
styledCircle.setAttribute('class', 'my-circle'); // Apply CSS class

// Add circle to SVG
svg.appendChild(styledCircle);
```

**Explanation:**
- CSS classes allow you to separate styling from TypeScript logic
- You can use CSS pseudo-selectors like `:hover` for interactive effects
- `stroke` creates an outline, `stroke-width` controls thickness
- CSS styling is more flexible and maintainable than inline attributes

### Interactive Circle - Click to Change Color

Let's make SVG elements interactive:

```typescript
// HTML: <svg id="mySvg" width="400" height="300"></svg>

const svg = document.getElementById('mySvg') as SVGSVGElement;

// Create an interactive circle
const interactiveCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
interactiveCircle.setAttribute('cx', '100');
interactiveCircle.setAttribute('cy', '100');
interactiveCircle.setAttribute('r', '40');
interactiveCircle.setAttribute('fill', 'blue');
interactiveCircle.style.cursor = 'pointer';

// Array of colors to cycle through
const colors = ['blue', 'red', 'green', 'orange', 'purple'];
let colorIndex = 0;

// Add click handler
interactiveCircle.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length;
    interactiveCircle.setAttribute('fill', colors[colorIndex]);
});

svg.appendChild(interactiveCircle);
```

**Explanation:**
- SVG elements can have event listeners just like HTML elements
- We change colors by modifying the `fill` attribute
- The modulo operator `%` helps cycle through the color array

### Drawing with Mouse - Creating Shapes Dynamically

Let's create a simple drawing application:

```typescript
// HTML: 
// <svg id="drawingSvg" width="500" height="400" style="border: 1px solid #000;"></svg>
// <button id="clearButton">Clear Drawing</button>

const drawingSvg = document.getElementById('drawingSvg') as SVGSVGElement;
const clearButton = document.getElementById('clearButton') as HTMLButtonElement;

let isDrawing = false;

// Mouse down - start drawing
drawingSvg.addEventListener('mousedown', (event) => {
    isDrawing = true;
    
    // Get mouse position relative to SVG
    const rect = drawingSvg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create a circle at mouse position
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x.toString());
    dot.setAttribute('cy', y.toString());
    dot.setAttribute('r', '3');
    dot.setAttribute('fill', 'black');
    
    drawingSvg.appendChild(dot);
});

// Mouse move - continue drawing
drawingSvg.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;
    
    const rect = drawingSvg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x.toString());
    dot.setAttribute('cy', y.toString());
    dot.setAttribute('r', '2');
    dot.setAttribute('fill', 'black');
    
    drawingSvg.appendChild(dot);
});

// Mouse up - stop drawing
drawingSvg.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Clear button
clearButton.addEventListener('click', () => {
    // Remove all circles (drawing dots)
    const circles = drawingSvg.querySelectorAll('circle');
    circles.forEach(circle => circle.remove());
});
```

### Animated Graphics - Moving Shapes

Let's create animated SVG elements:

```typescript
// HTML: <svg id="animationSvg" width="600" height="200"></svg>

const animationSvg = document.getElementById('animationSvg') as SVGSVGElement;

// Create a moving circle
const movingCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
movingCircle.setAttribute('cy', '100');  // Fixed y position
movingCircle.setAttribute('r', '20');
movingCircle.setAttribute('fill', 'blue');

animationSvg.appendChild(movingCircle);

// Animation variables
let position = 0;
let direction = 1; // 1 for right, -1 for left
const speed = 2;
const maxWidth = 580; // SVG width minus circle radius

// Animation loop
function animate() {
    // Update position
    position += speed * direction;
    
    // Bounce off edges
    if (position >= maxWidth || position <= 0) {
        direction *= -1;
    }
    
    // Update circle position
    movingCircle.setAttribute('cx', position.toString());
    
    // Continue animation
    requestAnimationFrame(animate);
}

// Start animation
animate();
```

## Key SVG Elements and Properties

Here are the most important SVG elements and properties you'll use:

### Basic Shapes
- `<circle cx="50" cy="50" r="30" />` - Circle (center x, center y, radius)
- `<rect x="10" y="10" width="50" height="30" />` - Rectangle
- `<line x1="0" y1="0" x2="100" y2="100" />` - Line
- `<ellipse cx="50" cy="50" rx="40" ry="20" />` - Ellipse

### Styling Properties
- `fill="color"` - Fill color
- `stroke="color"` - Outline color
- `stroke-width="3"` - Outline thickness
- `opacity="0.5"` - Transparency

### Text
- `<text x="10" y="50" font-family="Arial" font-size="16">Hello</text>`

### Advanced Shapes
- `<path d="M 10 10 L 100 100" />` - Custom paths
- `<polygon points="10,10 50,50 10,90" />` - Multi-point shapes

### Creating SVG Elements in TypeScript
- `document.createElementNS('http://www.w3.org/2000/svg', 'circle')` - Create SVG elements
- `element.setAttribute('cx', '50')` - Set attributes
- `element.getAttribute('fill')` - Get attributes

## Good Practices

1. **Always use the SVG namespace** when creating elements:
   ```typescript
   const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
   ```

2. **Use meaningful groups** to organize complex graphics:
   ```typescript
   const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
   group.setAttribute('id', 'chart-bars');
   ```

3. **Use CSS classes** for styling when possible:
   ```typescript
   circle.setAttribute('class', 'interactive-shape');
   ```

## Exercises

1. Read [https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) up to chapter _Basic Shapes_.
   * Questions? Something unclear? Bring it to class!
2. Build a simple web page that includes **all the examples above**:
   - A basic SVG canvas with shapes
   - An interactive color-changing circle
   - A simple drawing area
   - An animated moving shape
