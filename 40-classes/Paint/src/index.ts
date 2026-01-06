import './styles.css';
import { ToolSelection } from './ToolSelection';
import { ShapeManager } from './ShapeManager';
import { ToolType } from './SharedTypes';

let toolSelection: ToolSelection;
let shapeManager: ShapeManager;

try {
  shapeManager = new ShapeManager();
  toolSelection = new ToolSelection((tool: ToolType) => {
    shapeManager.tool = tool;
  });
} catch (error) {
  window.alert((error as Error).message);
  throw error;
}
