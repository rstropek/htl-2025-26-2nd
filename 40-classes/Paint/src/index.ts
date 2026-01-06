import './styles.css';
import { ToolSelection } from './ToolSelection';
import { ShapeManager } from './ShapeManager';
import { ToolType } from './ToolType';

// Initialize the tool selection
const toolSelection = new ToolSelection();

// Get the SVG container
const svgContainerElement = document.getElementById('drawing-canvas');
if (!svgContainerElement || !(svgContainerElement instanceof SVGSVGElement)) {
  throw new Error('SVG container not found');
}
const svgContainer = svgContainerElement;

// Initialize shape manager
const shapeManager = new ShapeManager(svgContainer);

// Set up tool change callback
toolSelection.toolChangeCallback = (tool: ToolType) => {
  shapeManager.setTool(tool);
};

try {
  toolSelection.initialize('tool-container');
} catch (error) {
  window.alert((error as Error).message);
  // stop further execution
  throw error;
}

// You can access the current tool like this:
console.log('Current tool:', toolSelection.currentTool);
