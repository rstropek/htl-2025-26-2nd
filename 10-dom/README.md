# Browser DOM Fundamentals

Welcome to the Browser DOM (Document Object Model) course! This course will teach you how to interact with web pages using TypeScript.

## What is the DOM?

The DOM (Document Object Model) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.

Think of the DOM as a tree structure where each HTML element is a node:

```
                    document
                        |
                     <html>
                    /       \
               <head>        <body>
              /      \    /      \   \
         <title>   <meta> <h1>   <p>  <button>
                            |     |      |
                         "Hello" "Text" "Click me"
```

## DOM Tree Visualization

Here's how the DOM represents a simple HTML page:

**HTML Source:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a paragraph</p>
    <button id="myButton">Click me</button>
    <div id="container">
        <p>Item 1</p>
        <p>Item 2</p>
    </div>
</body>
</html>
```

**DOM Tree Structure:**
```
document
│
└─ html
   ├─ head
   │  ├─ title: "My Page"
   │  └─ meta (charset="utf-8")
   │
   └─ body
      ├─ h1: "Welcome"
      ├─ p: "This is a paragraph"
      ├─ button#myButton: "Click me"
      └─ div#container
         ├─ p: "Item 1"
         └─ p: "Item 2"
```

Each box represents a "node" in the DOM tree. JavaScript/TypeScript can navigate this tree and modify any node.

## How the DOM Works

When a web browser loads an HTML page, it creates a DOM tree. Each HTML element becomes a "node" in this tree. JavaScript (and TypeScript) can then:

- Find elements in the tree
- Change element content
- Change element attributes
- Add new elements
- Remove elements
- React to events (like clicks)

## Basic DOM Interaction with TypeScript

### Getting a Reference to a Button and Adding a Click Handler

First, let's see how to find a button in the DOM and add a click event listener:

```typescript
// HTML: <button id="myButton">Click me!</button>

// Get a referenc e to the button element
const button = document.getElementById('myButton') as HTMLButtonElement;

// Add a click event listener
button.addEventListener('click', () => {
    console.log('Button was clicked!');
});
```

**Explanation:**
- `document.getElementById()` finds an element by its ID attribute
- We cast it to `HTMLButtonElement` to tell TypeScript what type of element it is
- `addEventListener()` attaches a function that runs when the specified event occurs
- The arrow function `() => { ... }` is the code that runs when clicked

### Click Counter - Changing DOM Content

Let's create a click counter that updates the page when clicked:

```typescript
// HTML: 
// <button id="counterButton">Click me!</button>
// <p id="counter">Clicks: 0</p>

// Get references to elements
const button = document.getElementById('counterButton') as HTMLButtonElement;
const counterDisplay = document.getElementById('counter') as HTMLParagraphElement;

// Keep track of click count
let clickCount = 0;

// Add click handler that updates the counter
button.addEventListener('click', () => {
    clickCount = clickCount + 1;
    counterDisplay.textContent = `Clicks: ${clickCount}`;
});
```

**Explanation:**
- We store the click count in a variable `clickCount`
- `textContent` property changes the text inside an element
- Template strings (`${clickCount}`) let us insert variables into strings

### Changing Element Styles

You can also change how elements look:

```typescript
// HTML: <div id="colorBox">I can change colors!</div>

const colorBox = document.getElementById('colorBox') as HTMLDivElement;
const changeColorButton = document.getElementById('changeColor') as HTMLButtonElement;

changeColorButton.addEventListener('click', () => {
    // Change background color
    colorBox.style.backgroundColor = 'lightblue';
    colorBox.style.color = 'darkblue';
    colorBox.style.padding = '20px';
});
```

### Creating New Elements Dynamically

Sometimes you want to add new elements to the page:

```typescript
// HTML: <div id="container"></div>

const container = document.getElementById('container') as HTMLDivElement;
const addItemButton = document.getElementById('addItem') as HTMLButtonElement;

let itemCount = 0;

addItemButton.addEventListener('click', () => {
    itemCount = itemCount + 1;
    
    // Create a new paragraph element
    const newItem = document.createElement('p');
    newItem.textContent = `Item number ${itemCount}`;
    
    // Add it to the container
    container.appendChild(newItem);
});
```

**Explanation:**
- `document.createElement()` creates a new HTML element
- `appendChild()` adds the new element as a child of the container

### Working with Input Fields

Let's see how to get text from input fields:

```typescript
// HTML: 
// <input type="text" id="nameInput" placeholder="Enter your name">
// <button id="greetButton">Greet me!</button>
// <p id="greeting"></p>

const nameInput = document.getElementById('nameInput') as HTMLInputElement;
const greetButton = document.getElementById('greetButton') as HTMLButtonElement;
const greeting = document.getElementById('greeting') as HTMLParagraphElement;

greetButton.addEventListener('click', () => {
    const name = nameInput.value; // Get the text from the input
    
    if (name.length > 0) {
        greeting.textContent = `Hello, ${name}! Nice to meet you!`;
    } else {
        greeting.textContent = 'Please enter your name first.';
    }
});
```

### Working with Comboboxes (Select Elements)

Comboboxes allow users to choose from a predefined list of options:

```typescript
// HTML: 
// <select id="colorSelect">
//     <option value="">Choose a color...</option>
//     <option value="red">Red</option>
//     <option value="green">Green</option>
//     <option value="blue">Blue</option>
//     <option value="yellow">Yellow</option>
// </select>
// <button id="applyColorButton">Apply Color</button>
// <div id="colorDisplay">Select a color to see it here!</div>

const colorSelect = document.getElementById('colorSelect') as HTMLSelectElement;
const applyColorButton = document.getElementById('applyColorButton') as HTMLButtonElement;
const colorDisplay = document.getElementById('colorDisplay') as HTMLDivElement;

applyColorButton.addEventListener('click', () => {
    const selectedColor = colorSelect.value; // Get the selected value
    
    if (selectedColor) {
        colorDisplay.style.backgroundColor = selectedColor;
        colorDisplay.style.color = 'white';
        colorDisplay.style.padding = '20px';
        colorDisplay.textContent = `You selected: ${selectedColor}`;
    } else {
        colorDisplay.textContent = 'Please select a color first.';
        colorDisplay.style.backgroundColor = 'transparent';
        colorDisplay.style.color = 'black';
    }
});

// You can also listen for changes immediately when user selects
colorSelect.addEventListener('change', () => {
    console.log(`User selected: ${colorSelect.value}`);
});
```

**Explanation:**
- `<select>` creates the dropdown/combobox
- Each `<option>` represents a choice with a `value` attribute
- `selectElement.value` gets the currently selected option's value
- The 'change' event fires immediately when the user makes a selection

## Key DOM Methods and Properties

Here are the most important DOM methods and properties you'll use:

### Finding Elements
- `document.getElementById('id')` - Find element by ID
- `document.querySelector('.class')` - Find first element by CSS selector
- `document.querySelectorAll('tag')` - Find all elements by CSS selector

### Changing Content
- `element.textContent` - Change text content
- `element.value` - Get/set input field values

### Changing Appearance
- `element.style.property` - Change CSS styles
- `element.classList.add('class')` - Add CSS class
- `element.classList.remove('class')` - Remove CSS class

### Creating and Modifying Structure
- `document.createElement('tag')` - Create new element
- `parent.appendChild(child)` - Add child element
- `parent.removeChild(child)` - Remove child element

### Event Handling
- `element.addEventListener('event', function)` - Listen for events
- Common events: 'click', 'input', 'change', 'mouseover', 'keydown'

## Good Practices

1. **Always check if elements exist** before using them:
   ```typescript
   const button = document.getElementById('myButton');
   if (button) {
       button.addEventListener('click', () => { /* ... */ });
   }
   ```

2. **Use type casting** to help TypeScript understand element types:
   ```typescript
   const input = document.getElementById('myInput') as HTMLInputElement;
   ```

3. **Separate concerns**: Keep your HTML structure, CSS styling, and TypeScript logic separate (separate files).

4. **Use meaningful IDs and classes** for your HTML elements.

## Exercises

1. Watch/read [https://developer.chrome.com/docs/devtools/dom](https://developer.chrome.com/docs/devtools/dom)
   * Questions? Something unclear? Bring it to class!
2. Build a simple web page that includes **all the examples above**:
   - A button that logs clicks
   - A click counter
   - A color-changing box
   - A dynamic item list
   - An input field with a greeting message
