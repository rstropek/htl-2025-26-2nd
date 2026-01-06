import { ToolType } from './ToolType';

export abstract class Shape {
    protected svgElement: SVGGElement;
    protected isSelected: boolean = false;
    
    constructor(protected svgContainer: SVGSVGElement) {
        this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.svgElement.classList.add('shape');
        svgContainer.appendChild(this.svgElement);
    }
    
    public abstract containsPoint(x: number, y: number): boolean;
    public abstract updatePosition(startX: number, startY: number, endX: number, endY: number): void;
    
    public get element(): SVGGElement {
        return this.svgElement;
    }
    
    public select(): void {
        this.isSelected = true;
        this.svgElement.classList.add('selected');
    }
    
    public deselect(): void {
        this.isSelected = false;
        this.svgElement.classList.remove('selected');
    }
    
    public isSelectedShape(): boolean {
        return this.isSelected;
    }
    
    public setTempMode(isTemp: boolean): void {
        if (isTemp) {
            this.svgElement.classList.add('temp');
        } else {
            this.svgElement.classList.remove('temp');
        }
    }
    
    public remove(): void {
        this.svgContainer.removeChild(this.svgElement);
    }
    
    public abstract getType(): ToolType;
}