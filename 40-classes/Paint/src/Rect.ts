import { Shape } from './Shape';
import { Point, Size } from './SharedTypes';

export class Rect extends Shape {
  private rectElement: SVGRectElement;
  private position: Point = { x: 0, y: 0 };
  private size: Size = { width: 0, height: 0 };

  constructor(svgContainer: SVGSVGElement) {
    super(svgContainer);
    this.rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svgContainer.appendChild(this.rectElement);
  }

  public containsPoint(p: Point): boolean {
    return p.x >= this.position.x && p.x <= this.position.x + this.size.width && p.y >= this.position.y && p.y <= this.position.y + this.size.height;
  }

  public updatePosition(p1: Point, p2: Point): void {
    this.position = { x: Math.min(p1.x, p2.x), y: Math.min(p1.y, p2.y) };
    this.size = { width: Math.abs(p2.x - p1.x), height: Math.abs(p2.y - p1.y) };

    this.rectElement.setAttribute('x', `${this.position.x}`);
    this.rectElement.setAttribute('y', `${this.position.y}`);
    this.rectElement.setAttribute('width', `${this.size.width}`);
    this.rectElement.setAttribute('height', `${this.size.height}`);
  }

  public get element(): SVGElement {
    return this.rectElement;
  }

  public get hasZeroArea(): boolean {
    return this.size.width === 0 || this.size.height === 0;
  }
}
