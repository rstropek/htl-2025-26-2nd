# First Steps with CSS

## Introduction

In this exercise you will practice using _Cascading Style Sheets_ (CSS) to format and style an HTML page. You will apply what you learned about selectors to target specific elements by ID, class, and tag name.

## Learning Goals

After completing this exercise you will be able to:

- Use CSS selectors (ID, class, tag name) to target HTML elements
- Apply text formatting (font, color, size)
- Work with margins, padding, and borders
- Style nested elements
- Use `div` elements for layout
- Understand the difference between classes and IDs in CSS

## Step 1: Setup Your Project

1. Copy the starter code
2. Open the project in VSCode
3. Run `npm install` to install dependencies

## Step 2: Create the HTML Structure

Open `index.html` and replace the content inside the `<body>` tag with the following (you **must keep the `<script>` tag**):

```html
<h1><span class="highlight">My Blog</span> about CSS</h1>

<p id="intro">
  This is the introduction paragraph. We will style this 
  specially to make it stand out from the rest of the text.
</p>

<h2>Introduction</h2>
<p>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
  sed diam nonumy eirmod tempor invidunt ut labore et dolore 
  magna aliquyam erat, sed diam voluptua. At vero eos et 
  accusam et justo duo dolores et ea rebum.</p>

<h2>Main Content</h2>
<p>
  Stet clita kasd gubergren, no sea takimata sanctus est 
  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
  consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
</p>

<h2>More Information</h2>
<p>
  Visit <a href="https://www.w3schools.com/css/">W3Schools CSS Tutorial</a>
  to learn more about CSS. Duis autem vel eum iriure dolor in hendrerit 
  in vulputate velit esse molestie consequat.
</p>

<h2>Conclusion</h2>
<p>
  Vel illum dolore eu feugiat nulla facilisis at vero eros et 
  accumsan et iusto odio dignissim qui blandit praesent luptatum 
  zzril delenit augue duis dolore te feugait nulla facilisi.
</p>
```

**Tip:** You can use a [Lorem Ipsum generator](http://www.loremipsum.de/) to create placeholder text if you want to add more paragraphs.

## Step 3: Create the CSS File

1. Create a new file `src/styles.css`
2. Import it in your `src/index.ts`:

```typescript
import "./styles.css";
```

## Step 4: Basic Element Styling

Add the following CSS rules to `styles.css` one by one. After each addition, run `npm run dev` and check the result in your browser.

### Style the body (all text)

```css
body {
  font-family: Arial, sans-serif;
}
```

This sets the font for the entire page.

### Style the main heading (h1)

```css
h1 {
  font-family: 'Arial Black', sans-serif;
  color: #1a1a1a;
  font-size: 3rem;
  background: #f2e6e6;
  line-height: 1.5;
  margin: 0 0 0 10px;
  padding: 20px;
}
```

**Experiment:** Try changing the `background` color to `#e6f2f2` (light blue) or `#e6f2e6` (light green). What happens?

**Modern CSS Note:** We use `rem` (root em) instead of `em` or `px` for font sizes. This is more accessible because it respects the user's browser font size preferences. Also, `line-height` without a unit (like `1.5`) is better than percentages or fixed values because it scales proportionally with the font size.

### Style all h2 headings

```css
h2 {
  color: #313131;
  font-size: 2rem;
  margin-top: 50px;
  border-bottom: 2px dotted red;
}
```

### Style all paragraphs

```css
p {
  color: #464646;
  line-height: 1.5;
  padding-top: 10px;
  padding-left: 60px;
}
```

**Experiment:** Change `line-height` to `2`. What happens to the spacing between lines?

## Step 5: Selecting by ID

Now we want to style the introduction paragraph differently from the others. We use an **ID selector** because there's only one intro paragraph.

Add this CSS rule:

```css
#intro {
  font-size: 1.2rem;
  padding-bottom: 10px;
  background: #c8c8c8;
  border-left: 25px solid #4c0000;
  margin-left: 10px;
  padding-left: 25px;
}
```

**Question:** Why do we use `#intro` instead of `.intro`? (Remember: `#` for IDs, `.` for classes)

## Step 6: Selecting by Class

We want to highlight specific words or phrases. Add this CSS rule:

```css
.highlight {
  color: #4c0000;
}
```

This will style the `<span class="highlight">` element in the `h1` tag.

**Try it:** Add `class="highlight"` to one or two words in different paragraphs and see how they get styled.

## Step 7: Styling Nested Elements

We want links inside paragraphs to look special. Add these rules:

```css
p a {
  color: #330000;
  text-decoration: none;
  border-bottom: 1px red dotted;
}

p a:visited {
  color: #b20000;
}
```

**Note:** 
- `p a` means "all `<a>` elements inside `<p>` elements"
- `:visited` is a _pseudo-class_ that targets links you've already clicked

**Experiment:** Click the link, then reload the page. Does the color change?

**Experiment:** Add `:hover` pseudo-class to make elements change when you move your mouse over them.

## Step 8: Working with div (Sidebar)

Now let's add a sidebar with additional information. Add this HTML **before** the first `<h2>` (Introduction):

```html
<div class="sidebar">
  Important Note: This is a practice exercise to learn 
  CSS selectors and styling. Feel free to experiment 
  with different colors, sizes, and layouts!
</div>
```

Then add this CSS:

```css
.sidebar {
  width: 200px;
  float: right;
  background: #b20000;
  padding: 25px;
  margin-left: 15px;
  margin-top: 50px;
  color: white;
  border-radius: 8px;
}
```

**What happens?** The sidebar floats to the right and the text wraps around it.

**Note:** We use `float` here for educational purposes to understand how elements can be positioned. In modern CSS, you might use Flexbox or Grid for layouts, but those are more advanced topics you'll learn later.

## Step 9: Experiment!

Now it's your turn. Try the following:

1. Change the color scheme: Pick your favorite colors and apply them to different elements
2. Add more classes: Create a class `warning` with red background and white text, then apply it to a paragraph
3. Style images: Add an `<img>` tag and style all images with a border and some margin
4. Try different fonts: Change `font-family` to `'Courier New'`, `'Georgia'`, or `'Verdana'`

## Step 10: Add TypeScript Interaction (Optional Challenge)

If you want to combine CSS with TypeScript, add this to your `src/index.ts`:

```typescript
// Select all h2 headings and add a click event
const headings = document.querySelectorAll("h2");

headings.forEach((h) => {
  const heading = h as HTMLHeadingElement;
  heading.addEventListener("click", () => {
    // Toggle between two background colors
    if (heading.style.backgroundColor === "yellow") {
      heading.style.backgroundColor = "";
    } else {
      heading.style.backgroundColor = "yellow";
    }
  });
});
```

This makes headings highlight when you click them!
