import { Shape } from './Shape';
import { Point } from './SharedTypes';

export class Circle extends Shape {
  private circleElement: SVGCircleElement;
  private center: Point = { x: 0, y: 0 };
  private radius = 0;

  private distance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  constructor(svgContainer: SVGSVGElement) {
    super(svgContainer);
    this.circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    svgContainer.appendChild(this.circleElement);
  }

  public containsPoint(p: Point): boolean {
    const distance = this.distance(p, this.center);
    return distance <= this.radius;
  }

  public updatePosition(p1: Point, p2: Point): void {
    // p1 is the center, p2 defines a point on circumference
    this.center = p1;
    this.radius = this.distance(p1, p2);

    this.circleElement.setAttribute('cx', `${this.center.x}`);
    this.circleElement.setAttribute('cy', `${this.center.y}`);
    this.circleElement.setAttribute('r', `${this.radius}`);
  }

  public get element(): SVGElement {
    return this.circleElement;
  }

  public get hasZeroArea(): boolean {
    return this.radius === 0;
  }
}
