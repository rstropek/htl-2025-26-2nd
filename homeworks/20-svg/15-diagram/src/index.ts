/**
 * SVG Bar Diagram Generator
 * 
 * This application creates a bar diagram based on user input for 12 monthly values.
 * The bars are scaled relative to the maximum value and colored based on an optional threshold.
 */

// Constants for SVG dimensions and layout
const AXIS_LENGTH = 1000;       // Length of both axes
const SEGMENT_WIDTH = 100;      // Width of each month segment
const Y_AXIS_HEIGHT = 500;      // Height available for bars
const X_AXIS_Y_POSITION = 550;  // Y position of x-axis
const Y_AXIS_X_POSITION = 100;  // X position of y-axis

// Get references to DOM elements
const svg = document.getElementById("diagram")! as unknown as SVGSVGElement;
const generateBtn = document.getElementById("generateBtn")! as HTMLButtonElement;

/**
 * Initialize the SVG with axes and divider lines
 */
function initializeDiagram(): void {
    // Create y-axis (vertical line)
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', Y_AXIS_X_POSITION.toString());
    yAxis.setAttribute('y1', (X_AXIS_Y_POSITION - Y_AXIS_HEIGHT).toString());
    yAxis.setAttribute('x2', Y_AXIS_X_POSITION.toString());
    yAxis.setAttribute('y2', X_AXIS_Y_POSITION.toString());
    yAxis.setAttribute('stroke', 'black');
    yAxis.setAttribute('stroke-width', '2');
    svg.appendChild(yAxis);

    // Create x-axis (horizontal line)
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', Y_AXIS_X_POSITION.toString());
    xAxis.setAttribute('y1', X_AXIS_Y_POSITION.toString());
    xAxis.setAttribute('x2', (Y_AXIS_X_POSITION + AXIS_LENGTH).toString());
    xAxis.setAttribute('y2', X_AXIS_Y_POSITION.toString());
    xAxis.setAttribute('stroke', 'black');
    xAxis.setAttribute('stroke-width', '2');
    svg.appendChild(xAxis);

    // Create 12 divider lines on x-axis for the 12 months
    // Using a loop here is much easier than manually creating 12 divider lines in HTML
    // The loop automatically calculates the position of each divider
    for (let i = 1; i <= 12; i++) {
        const divider = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const xPosition = Y_AXIS_X_POSITION + (i * SEGMENT_WIDTH);
        divider.setAttribute('x1', xPosition.toString());
        divider.setAttribute('y1', X_AXIS_Y_POSITION.toString());
        divider.setAttribute('x2', xPosition.toString());
        divider.setAttribute('y2', (X_AXIS_Y_POSITION + 10).toString());
        divider.setAttribute('stroke', 'black');
        divider.setAttribute('stroke-width', '1');
        svg.appendChild(divider);
    }
}

/**
 * Get all monthly values from input fields
 * @returns Array of values (0 for empty fields)
 */
function getMonthlyValues(): number[] {
    const values: number[] = [];
    for (let i = 1; i <= 12; i++) {
        // Note how we are building the element ID using the loop index
        // This is much easier than manually getting each input field by its ID
        // The loop automatically constructs the correct ID for each month
        const input = document.getElementById(`month${i}`)! as HTMLInputElement;
        const value = input.value.trim();
        values.push(value === '' ? 0 : parseFloat(value));
    }
    return values;
}

/**
 * Get the threshold value from input field
 * @returns Threshold value (0 if not set)
 */
function getThreshold(): number {
    const input = document.getElementById("threshold")! as HTMLInputElement;
    const value = input.value.trim();
    return value === '' ? 0 : parseFloat(value);
}

/**
 * Remove all existing elements from the diagram
 * This clears the entire SVG, including axes and bars
 * The axes will be re-added when we reinitialize
 */
function clearDiagram(): void {
    // Remove all children from SVG using a loop
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

/**
 * Generate and display the bar diagram
 */
function generateDiagram(): void {
    // Clear the entire SVG and reinitialize with axes
    clearDiagram();
    initializeDiagram();

    // Get input values
    const values = getMonthlyValues();
    const threshold = getThreshold();

    // Find the maximum value for percentage calculation using a loop
    let maxValue = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i]! > maxValue) {
            maxValue = values[i]!;
        }
    }

    // If all values are 0, don't draw any bars
    if (maxValue === 0) {
        return;
    }

    // Create bars for each month using a loop
    for (let i = 0; i < values.length; i++) {
        const value = values[i]!;
        
        // Skip months with value 0
        if (value === 0) {
            continue;
        }

        // Calculate bar height as percentage of max value
        const heightPercentage = value / maxValue;
        const barHeight = heightPercentage * Y_AXIS_HEIGHT;

        // Calculate bar position
        const barX = Y_AXIS_X_POSITION + (i * SEGMENT_WIDTH) + 10; // 10px padding
        const barY = X_AXIS_Y_POSITION - barHeight;
        const barWidth = SEGMENT_WIDTH - 20; // 20px total padding (10px on each side)

        // Determine bar color based on threshold
        const barColor = value > threshold ? 'red' : 'green';

        // Create the bar
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', barX.toString());
        bar.setAttribute('y', barY.toString());
        bar.setAttribute('width', barWidth.toString());
        bar.setAttribute('height', barHeight.toString());
        bar.setAttribute('fill', barColor);
        
        svg.appendChild(bar);
    }
}

// Initialize the diagram with axes
initializeDiagram();

// Add event listener to generate button
generateBtn.addEventListener('click', generateDiagram);
