// Abstract base class Shape
abstract class Shape {
    abstract get description(): string;
    
    calculateArea(): number {
        return 0; // Default area is 0
    }
}

// Rectangle class
class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }
    
    get description(): string {
        return `Rectangle (width: ${this.width}, height: ${this.height})`;
    }
    
    calculateArea(): number {
        return this.width * this.height;
    }
}

// Square class (derived from Rectangle)
class Square extends Rectangle {
    constructor(private side: number) {
        super(side, side); // Square has equal width and height
    }
    
    get description(): string {
        return `Square (side: ${this.side})`;
    }
}

// Ellipse class
class Ellipse extends Shape {
    constructor(private radiusX: number, private radiusY: number) {
        super();
    }
    
    get description(): string {
        return `Ellipse (radiusX: ${this.radiusX}, radiusY: ${this.radiusY})`;
    }
    
    calculateArea(): number {
        return Math.PI * this.radiusX * this.radiusY;
    }
}

// Circle class (derived from Ellipse)
class Circle extends Ellipse {
    constructor(private radius: number) {
        super(radius, radius); // Circle has equal radiusX and radiusY
    }
    
    get description(): string {
        return `Circle (radius: ${this.radius})`;
    }
}

// Line class
class Line extends Shape {
    constructor(private length: number) {
        super();
    }
    
    get description(): string {
        return `Line (length: ${this.length})`;
    }
    
    // Line has area 0, so we use the default implementation from Shape
}

export { Shape, Rectangle, Square, Ellipse, Circle, Line };