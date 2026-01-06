import { Shape } from './Shape';
import { ToolType } from './ToolType';

export class Circle extends Shape {
    private circleElement: SVGCircleElement;
    
    constructor(svgContainer: SVGSVGElement) {
        super(svgContainer);
        this.circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circleElement.setAttribute('fill', 'blue');
        this.circleElement.setAttribute('fill-opacity', '0.5');
        this.circleElement.setAttribute('stroke', 'none');
        this.svgElement.appendChild(this.circleElement);
    }
    
    public containsPoint(x: number, y: number): boolean {
        const cx = parseFloat(this.circleElement.getAttribute('cx') || '0');
        const cy = parseFloat(this.circleElement.getAttribute('cy') || '0');
        const r = parseFloat(this.circleElement.getAttribute('r') || '0');
        
        const distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
        return distance <= r;
    }
    
    public updatePosition(startX: number, startY: number, endX: number, endY: number): void {
        // For circles: startX, startY is the center, endX, endY defines a point on circumference
        const centerX = startX;
        const centerY = startY;
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        this.circleElement.setAttribute('cx', centerX.toString());
        this.circleElement.setAttribute('cy', centerY.toString());
        this.circleElement.setAttribute('r', radius.toString());
    }
    
    public getType(): ToolType {
        return ToolType.CIRCLE;
    }
}