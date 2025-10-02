/**
 * SVG Bar Diagram Generator
 * 
 * This application creates a bar diagram based on user input for 12 monthly values.
 * The bars are scaled relative to the maximum value and colored based on an optional threshold.
 */

// Constants for SVG dimensions and layout
const AXIS_LENGTH = 1000;  // Length of both axes (easy to remember)
const SEGMENT_WIDTH = 100;  // Width of each month segment (easy to remember)
const Y_AXIS_HEIGHT = 500;  // Height available for bars (easy to remember)
const X_AXIS_Y_POSITION = 550;  // Y position of x-axis
const Y_AXIS_X_POSITION = 100;  // X position of y-axis

// Get references to DOM elements
const svgElement = document.getElementById("diagram");
if (!svgElement) {
    throw new Error("SVG element not found");
}
const svg = svgElement as unknown as SVGSVGElement;
const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;

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
 * @returns Array of values (null for empty fields)
 */
function getMonthlyValues(): (number | null)[] {
    const values: (number | null)[] = [];
    for (let i = 1; i <= 12; i++) {
        const input = document.getElementById(`month${i}`) as HTMLInputElement;
        const value = input.value.trim();
        values.push(value === '' ? null : parseFloat(value));
    }
    return values;
}

/**
 * Get the threshold value from input field
 * @returns Threshold value or null if not set
 */
function getThreshold(): number | null {
    const input = document.getElementById("threshold") as HTMLInputElement;
    const value = input.value.trim();
    return value === '' ? null : parseFloat(value);
}

/**
 * Remove all existing bars from the diagram
 */
function clearBars(): void {
    const bars = svg.querySelectorAll('rect[data-bar]');
    bars.forEach(bar => bar.remove());
}

/**
 * Generate and display the bar diagram
 */
function generateDiagram(): void {
    // Clear any existing bars
    clearBars();

    // Get input values
    const values = getMonthlyValues();
    const threshold = getThreshold();

    // Find the maximum value for percentage calculation
    const validValues = values.filter(v => v !== null) as number[];
    if (validValues.length === 0) {
        return; // No values to display
    }
    const maxValue = Math.max(...validValues);

    // Create bars for each month
    values.forEach((value, index) => {
        if (value === null) {
            return; // Skip empty months
        }

        // Calculate bar height as percentage of max value
        const heightPercentage = value / maxValue;
        const barHeight = heightPercentage * Y_AXIS_HEIGHT;

        // Calculate bar position
        const barX = Y_AXIS_X_POSITION + (index * SEGMENT_WIDTH) + 10; // 10px padding
        const barY = X_AXIS_Y_POSITION - barHeight;
        const barWidth = SEGMENT_WIDTH - 20; // 20px total padding (10px on each side)

        // Determine bar color based on threshold
        let barColor = 'green';
        if (threshold !== null) {
            barColor = value > threshold ? 'red' : 'green';
        }

        // Create the bar
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', barX.toString());
        bar.setAttribute('y', barY.toString());
        bar.setAttribute('width', barWidth.toString());
        bar.setAttribute('height', barHeight.toString());
        bar.setAttribute('fill', barColor);
        bar.setAttribute('data-bar', 'true'); // Mark as a bar for easy removal
        
        svg.appendChild(bar);
    });
}

// Initialize the diagram with axes
initializeDiagram();

// Add event listener to generate button
generateBtn.addEventListener('click', generateDiagram);
