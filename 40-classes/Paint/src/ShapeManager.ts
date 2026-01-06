import { Shape } from './Shape';
import { Point, ToolType } from './SharedTypes';
import { Circle } from './Circle';
import { Rect } from './Rect';

type DrawingState = {
  currentTempShape: Shape;
  start: Point;
};

export class ShapeManager {
  private svgContainer: SVGSVGElement;
  private shapes: Shape[] = [];
  private currentTool: ToolType = ToolType.POINTER;

  /*
    ⚠️ Note something new: Optional properties

    An optional property in TypeScript is a property that may or may not be present on an object.
    We denote optional properties by adding a question mark (?) after the property name.
    In this case, the currentDrawingState property may either hold a DrawingState object
    or be undefined (not set). This is useful for scenarios where a value might not always be available.
    In our case, currentDrawingState is only defined when the user is actively drawing a shape.
  */
  private currentDrawingState?: DrawingState | undefined = undefined;

  constructor(svgContainerId: string = 'drawing-canvas') {
    const container = document.getElementById(svgContainerId) as SVGSVGElement | null;
    if (!container) {
      throw new Error(`Element with id "${svgContainerId}" not found or is not an SVG element.`);
    }
    this.svgContainer = container;

    this.svgContainer.addEventListener('mousedown', (event) => this.handleMouseDown(event));
    this.svgContainer.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    this.svgContainer.addEventListener('mouseup', () => this.handleMouseUp());
    this.svgContainer.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  public set tool(tool: ToolType) {
    this.currentTool = tool;
  }

  private handleMouseDown(event: MouseEvent): void {
    if (this.currentTool === ToolType.POINTER) {
      this.handlePointerMouseDown(event);
    } else {
      this.startDrawingShape(event);
    }
  }

  private handlePointerMouseDown(event: MouseEvent): void {
    // Deselect all shapes first
    this.shapes.forEach((shape) => shape.deselect());

    const point = this.getSVGCoordinates(event);

    // Check if we clicked on any shape (from top to bottom)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      if (shape && shape.containsPoint(point)) {
        shape.select();
        return;
      }
    }
  }

  private startDrawingShape(event: MouseEvent): void {
    const start = this.getSVGCoordinates(event);

    let currentTempShape: Shape;
    if (this.currentTool === ToolType.CIRCLE) {
      currentTempShape = new Circle(this.svgContainer);
    } else {
      currentTempShape = new Rect(this.svgContainer);
    }
    currentTempShape.tempMode = true;
    currentTempShape.updatePosition(start, start);

    this.currentDrawingState = { currentTempShape, start };
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!this.currentDrawingState) {
      return;
    }

    const point = this.getSVGCoordinates(event);
    this.currentDrawingState.currentTempShape.updatePosition(this.currentDrawingState.start, point);
  }

  private handleMouseUp(): void {
    if (!this.currentDrawingState) {
      return;
    }

    if (!this.currentDrawingState.currentTempShape.hasZeroArea) {
      const shape = this.currentDrawingState.currentTempShape;
      shape.tempMode = false;
      this.shapes.push(shape);
    } else {
      this.currentDrawingState.currentTempShape.remove();
    }

    this.currentDrawingState = undefined;
  }

  private handleMouseLeave(): void {
    if (this.currentDrawingState) {
      this.currentDrawingState.currentTempShape.remove();
      this.currentDrawingState = undefined;
    }
  }

  private getSVGCoordinates(event: MouseEvent): Point {
    // This method converts mouse event coordinates to SVG coordinates
    // (position relative to the SVG's left/top, taking viewBox into account)
    // ⚠️ This method is a little bit tricky due to SVG coordinate systems.
    // Don't worry about the details for now. Just use it as a template
    // whenever you need to convert mouse event coordinates to SVG coordinates.
    // If you want to fully understand it, use your favorite AI assistant
    // to explain.

    // Mouse events give us screen coordinates (pixels from window edge)
    // But we need SVG coordinates (units from viewBox origin)
    const svgPoint = this.svgContainer.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;

    // Transform: screen space → SVG user space
    const transformed = svgPoint.matrixTransform(this.svgContainer.getScreenCTM()?.inverse());

    return {
      x: transformed?.x || 0,
      y: transformed?.y || 0,
    };
  }
}
