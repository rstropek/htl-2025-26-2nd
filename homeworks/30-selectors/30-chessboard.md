# Styling a Chessboard with CSS

## Introduction

In this exercise you will practice using CSS selectors to style a chessboard. You will work with a pre-built HTML structure and add CSS classes and styling to create a beautiful, realistic chessboard.

## Step 1: Setup Your Project

1. Copy the starter code to a new folder (e.g., `chessboard`)
2. Open the project in VSCode
3. Run `npm install` to install dependencies

## Step 2: Create the HTML Structure

Open `index.html` and replace the content inside the `<body>` tag with the following chessboard structure (you **must keep the `<script>` tag**):

```html
<div id="chessboard">
  <div class="board-row">
    <div class="row-label">8</div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
  </div>
  
  <div class="board-row">
    <div class="row-label">7</div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
  </div>
  
  <div class="board-row">
    <div class="row-label">6</div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
  </div>
  
  <div class="board-row">
    <div class="row-label">5</div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
  </div>
  
  <div class="board-row">
    <div class="row-label">4</div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
  </div>
  
  <div class="board-row">
    <div class="row-label">3</div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
  </div>
  
  <div class="board-row">
    <div class="row-label">2</div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
  </div>
  
  <div class="board-row">
    <div class="row-label">1</div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
    <div class="square dark"></div>
    <div class="square light"></div>
  </div>
  
  <div class="column-labels">
    <div class="column-label"></div>
    <div class="column-label">A</div>
    <div class="column-label">B</div>
    <div class="column-label">C</div>
    <div class="column-label">D</div>
    <div class="column-label">E</div>
    <div class="column-label">F</div>
    <div class="column-label">G</div>
    <div class="column-label">H</div>
  </div>
</div>
```

**Note:** The HTML structure is complete. Your task is to add CSS to make it look like a real chessboard. Notice how each row alternates between starting with a light or dark square - this is how a real chessboard works!

## Step 3: Style the Chessboard

Now it is your time! Have fun styling the chessboard.
