import { Shape } from './Shape';
import { ToolType } from './ToolType';

export class Rect extends Shape {
    private rectElement: SVGRectElement;
    
    constructor(svgContainer: SVGSVGElement) {
        super(svgContainer);
        this.rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.rectElement.setAttribute('fill', 'red');
        this.rectElement.setAttribute('fill-opacity', '0.5');
        this.rectElement.setAttribute('stroke', 'none');
        this.svgElement.appendChild(this.rectElement);
    }
    
    public containsPoint(x: number, y: number): boolean {
        const rectX = parseFloat(this.rectElement.getAttribute('x') || '0');
        const rectY = parseFloat(this.rectElement.getAttribute('y') || '0');
        const width = parseFloat(this.rectElement.getAttribute('width') || '0');
        const height = parseFloat(this.rectElement.getAttribute('height') || '0');
        
        return x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height;
    }
    
    public updatePosition(startX: number, startY: number, endX: number, endY: number): void {
        // Calculate position and dimensions
        const x = Math.min(startX, endX);
        const y = Math.min(startY, endY);
        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);
        
        this.rectElement.setAttribute('x', x.toString());
        this.rectElement.setAttribute('y', y.toString());
        this.rectElement.setAttribute('width', width.toString());
        this.rectElement.setAttribute('height', height.toString());
    }
    
    public getType(): ToolType {
        return ToolType.RECT;
    }
}