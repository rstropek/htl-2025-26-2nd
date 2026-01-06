import { Point } from './SharedTypes';

// ⚠️ Repeat: Abstract base classes (discuss with teacher or research using AI assistant)

export abstract class Shape {
  constructor(protected svgContainer: SVGSVGElement) {}

  public abstract containsPoint(p: Point): boolean;
  public abstract updatePosition(start: Point, end: Point): void;
  public abstract get hasZeroArea(): boolean;
  public abstract get element(): SVGElement;

  public select(): void {
    this.element.classList.add('selected');
  }

  public deselect(): void {
    this.element.classList.remove('selected');
  }

  public set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.element.classList.add('temp');
    } else {
      this.element.classList.remove('temp');
    }
  }

  public remove(): void {
    this.svgContainer.removeChild(this.element);
  }
}
