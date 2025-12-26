import './styles.css';
import { Shape, Rectangle, Square, Ellipse, Circle, Line } from './shapes';

const shapesList = document.getElementById('shapes-list') as HTMLUListElement;
const totalAreaElement = document.getElementById('total-area') as HTMLSpanElement;

// Array to maintain all shapes
const shapes: Shape[] = [];

// Function to generate random number between 1 and 100
function getRandomNumber(min: number = 1, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to build HTML list and calculate total area
function buildHtmlList(): void {
  // Clear existing list
  shapesList.innerHTML = '';

  // Calculate total area
  let totalArea = 0;

  // Iterate over shapes and add to list
  shapes.forEach((shape) => {
    const li = document.createElement('li');
    li.textContent = `${shape.description} with area: ${shape.calculateArea().toFixed(2)}`;
    shapesList.appendChild(li);
    totalArea += shape.calculateArea();
  });

  // Update total area display
  totalAreaElement.textContent = totalArea.toFixed(2);
}

// Add Rectangle
document.getElementById('add-rectangle')?.addEventListener('click', () => {
  const rectangle = new Rectangle(getRandomNumber(), getRandomNumber());
  shapes.push(rectangle);
  buildHtmlList();
});

// Add Square
document.getElementById('add-square')?.addEventListener('click', () => {
  const square = new Square(getRandomNumber());
  shapes.push(square);
  buildHtmlList();
});

// Add Circle
document.getElementById('add-circle')?.addEventListener('click', () => {
  const circle = new Circle(getRandomNumber());
  shapes.push(circle);
  buildHtmlList();
});

// Add Ellipse
document.getElementById('add-ellipse')?.addEventListener('click', () => {
  const ellipse = new Ellipse(getRandomNumber(), getRandomNumber());
  shapes.push(ellipse);
  buildHtmlList();
});

// Add Line
document.getElementById('add-line')?.addEventListener('click', () => {
  const line = new Line(getRandomNumber());
  shapes.push(line);
  buildHtmlList();
});
