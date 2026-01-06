import { Shape } from './Shape';
import { ToolType } from './ToolType';
import { Circle } from './Circle';
import { Rect } from './Rect';

export class ShapeManager {
    private shapes: Shape[] = [];
    private currentTool: ToolType = ToolType.POINTER;
    private currentTempShape: Shape | null = null;
    private isDrawing: boolean = false;
    private startX: number = 0;
    private startY: number = 0;
    
    constructor(private svgContainer: SVGSVGElement) {
        this.setupEventListeners();
    }
    
    public setTool(tool: ToolType): void {
        this.currentTool = tool;
        
        // If switching to pointer tool, cancel any current drawing
        if (tool === ToolType.POINTER && this.currentTempShape) {
            this.cancelCurrentShape();
        }
    }
    
    public addShape(shape: Shape): void {
        this.shapes.push(shape);
    }
    
    public removeShape(shape: Shape): void {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
            shape.remove();
        }
    }
    
    public removeAllShapes(): void {
        this.shapes.forEach(shape => shape.remove());
        this.shapes = [];
    }
    
    public getShapes(): Shape[] {
        return [...this.shapes];
    }
    
    private setupEventListeners(): void {
        this.svgContainer.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.svgContainer.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.svgContainer.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.svgContainer.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
    
    private handleMouseDown(event: MouseEvent): void {
        if (this.currentTool === ToolType.POINTER) {
            this.handlePointerMouseDown(event);
        } else if (this.currentTool === ToolType.CIRCLE || this.currentTool === ToolType.RECT) {
            this.startDrawingShape(event);
        }
    }
    
    private handlePointerMouseDown(event: MouseEvent): void {
        // Deselect all shapes first
        this.shapes.forEach(shape => shape.deselect());
        
        const point = this.getSVGCoordinates(event);
        
        // Check if we clicked on any shape (from top to bottom)
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            if (shape && shape.containsPoint(point.x, point.y)) {
                shape.select();
                return;
            }
        }
    }
    
    private startDrawingShape(event: MouseEvent): void {
        const point = this.getSVGCoordinates(event);
        this.startX = point.x;
        this.startY = point.y;
        this.isDrawing = true;
        
        // Create temporary shape
        if (this.currentTool === ToolType.CIRCLE) {
            this.currentTempShape = new Circle(this.svgContainer);
        } else if (this.currentTool === ToolType.RECT) {
            this.currentTempShape = new Rect(this.svgContainer);
        }
        
        if (this.currentTempShape) {
            this.currentTempShape.setTempMode(true);
            this.currentTempShape.updatePosition(this.startX, this.startY, this.startX, this.startY);
        }
    }
    
    private handleMouseMove(event: MouseEvent): void {
        if (!this.isDrawing || !this.currentTempShape) return;
        
        const point = this.getSVGCoordinates(event);
        this.currentTempShape.updatePosition(this.startX, this.startY, point.x, point.y);
    }
    
    private handleMouseUp(event: MouseEvent): void {
        if (!this.isDrawing || !this.currentTempShape) return;
        
        const point = this.getSVGCoordinates(event);
        this.currentTempShape.updatePosition(this.startX, this.startY, point.x, point.y);
        this.currentTempShape.setTempMode(false);
        
        // Add to shapes array
        this.shapes.push(this.currentTempShape);
        
        // Reset drawing state
        this.currentTempShape = null;
        this.isDrawing = false;
    }
    
    private handleMouseLeave(_event: MouseEvent): void {
        if (this.isDrawing && this.currentTempShape) {
            this.cancelCurrentShape();
        }
    }
    
    private cancelCurrentShape(): void {
        if (this.currentTempShape) {
            this.currentTempShape.remove();
            this.currentTempShape = null;
        }
        this.isDrawing = false;
    }
    
    private getSVGCoordinates(event: MouseEvent): { x: number, y: number } {
        const svgPoint = this.svgContainer.createSVGPoint();
        svgPoint.x = event.clientX;
        svgPoint.y = event.clientY;
        
        // Convert to SVG coordinates
        const svgCoordinates = svgPoint.matrixTransform(this.svgContainer.getScreenCTM()?.inverse());
        
        return {
            x: svgCoordinates?.x || 0,
            y: svgCoordinates?.y || 0
        };
    }
}