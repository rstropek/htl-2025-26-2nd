# Selectors Fundamentals

Welcome to the selectors module! In this part you will learn how to **find (select) objects in the DOM** so you can read or change them with TypeScript and style them with CSS.

## What are Selectors?

When a browser turns your HTML into the DOM tree you can pick out ("select") specific objects (nodes) to work with. A _selector_ is a short text pattern that describes which element(s) you want. We use the same selector syntax both:

1. In TypeScript with the methods `querySelector()` (first match) and `querySelectorAll()` (all matches)
2. In CSS to style elements

In this chapter we focus on the most common and simple selectors: by **ID**, **class**, and **tag name**. More powerful selectors (descendants, attributes, pseudo classes, etc.) come later.

## HTML Example

We will use this HTML snippet for all examples below.

```html
<p id="intro">This is an introduction paragraph.</p>
<h2 class="chapter-title">Chapter Title</h2>
<section id="main-content" class="content">
  <p class="text highlight">This is a highlighted text.</p>
  <p class="text">This is a regular text.</p>
</section>
<p>This is a text <span class="highlight">with a highlighted span</span>.</p>
<p>This is a <a href="https://orf.at">link to orf.at</a>.</p>
```

Think of each tag as a node in the DOM. IDs are unique (only one element has a given ID). Classes can repeat (many elements can share the same class name). Tag names are just the element names like `p`, `section`, `span`, `a`.

## Selectors in CSS

Let's first explore selectors in CSS. CSS uses selectors to target elements and apply styles. You write a selector, then define the style rules for all elements that match it.

### Referencing a CSS File in a Vite + TypeScript Project

1. Create a CSS file (e.g. `styles.css`) in `src`.
2. Import it in your TypeScript entry file (e.g. `index.ts`):

```typescript
import "./styles.css";
```

### Changing Text Color by ID

Use `#intro` to target the element with ID `intro` and set its text color.

```css
#intro {
  color: blue;
}
```

### Changing Background Color by Class

Use `.highlight` to style every element that has the `highlight` class.

```css
.highlight {
  background-color: yellow;
}
```

Try it: change the color of `#intro` and the background of all `.highlight` elements.

### Styling External Links by Tag Name

If you want to style _all_ links you can use the `a` selector:

```css
a {
  text-decoration: none; /* remove underline */
  color: green;
}
```

## Selectors in TypeScript

In TypeScript, you use the same selector strings you just used in CSS, but instead of styling you read or change element properties.

### Selecting an Object by ID

Use `#` followed by the ID inside `querySelector()`. Because IDs are unique you either get `null` (not found) or one element.

```typescript
// Select the element with id="intro" and tell TypeScript it's a paragraph
const introPara = document.querySelector("#intro") as HTMLParagraphElement | null;

if (introPara) {
  // null check first - always do this!
  console.log("Intro text:", introPara.textContent);
}
```

**Try it yourself:** Select `#intro`, change its text to "Hello!".

### Selecting Multiple Objects by Class

Use `.` followed by the class name. `querySelectorAll()` returns a _NodeList_ of all matching elements. You can loop over it with `forEach`.

```typescript
// Select all elements with class="text"
const textParagraphs = document.querySelectorAll(".text"); // NodeListOf<Element>

// Loop through each element using forEach
textParagraphs.forEach((p) => {
  const para = p as HTMLParagraphElement; // Tell TypeScript it's a paragraph
  console.log("Text paragraph:", para.textContent);
});
```

**Try it yourself:** Count how many `.text` elements exist and log the number using `textParagraphs.length`.

### Selecting Multiple Objects by Tag Name

Simply pass the tag name (for example `p`). Again you get all matches.

```typescript
// Select all paragraph elements
const allParagraphs = document.querySelectorAll("p"); // NodeListOf<Element>

allParagraphs.forEach((p) => {
  const para = p as HTMLParagraphElement;
  console.log("Paragraph:", para.textContent);
});
```

**Try it yourself:** Select all `<a>` elements and underline them by setting `style.textDecoration = "underline"`.

### Selecting an Object by ID and Class Together

You can combine selectors. `#main-content.content` means: element with ID `main-content` **and** class `content`.

```typescript
// Element that has id="main-content" AND class="content"
const mainSection = document.querySelector("#main-content.content") as HTMLElement | null;

if (mainSection) {
  console.log("Main section text (combined selector):", mainSection.textContent);
}
```

**Important distinction:**
- `#main-content.content` (no space) → Selects the element that has **both** `id="main-content"` **and** `class="content"`
- `#main-content .content` (with space) → Selects elements with `class="content"` **inside** the element with `id="main-content"`

Think of the space as meaning "inside" or "descendant of".

### Add target to All Links

We want **all** links (`<a>`) on the page to open in a new tab.

```typescript
// Select all anchor (link) elements
const links = document.querySelectorAll("a"); // NodeListOf<Element>

// Add target="_blank" to every link
for (const link of links) {
  const anchor = link as HTMLAnchorElement;
  anchor.target = "_blank";
}
```

**Explanation:**

- `querySelectorAll('a')` returns a NodeList of all `<a>` elements
- `for..of` loops directly over each element (clean syntax)
- `link.target = "_blank"` makes the browser open the link in a new tab
  
**Pro tip (optional):** Also set `anchor.rel = "noopener noreferrer"` for security when opening external links.

## Understanding Types in TypeScript

When you select an element with `querySelector()`, TypeScript doesn't know what specific HTML element you found. It only knows you got back `Element | null` (meaning "an Element or null if not found").

However, if you know what type of element it is (because you wrote the HTML), you can tell TypeScript using a **type assertion**:

```typescript
// Select the element and tell TypeScript it's a paragraph
const introPara = document.querySelector("#intro") as HTMLParagraphElement | null;

if (introPara) {
  // Now we can safely use paragraph-specific properties
  console.log(introPara.textContent);
}
```

**Important:** Always check for `null` before using the element, because the selector might not find anything.

**Tip:** You can find more information about types in MDN:

* [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element)
* [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
* [`HTMLParagraphElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement)

Note that `HTMLElement` is a special form of `Element`. `HTMLParagraphElement` is a special form of `HTMLElement`. This hierarchical relationship is called _Inheritance_.

## Summary of Basic Selector Forms

| Selector    | Matches                         | Example                 |
| ----------- | ------------------------------- | ----------------------- |
| `#id`       | Element with given ID           | `#intro`                |
| `.class`    | All elements with that class    | `.highlight`            |
| `tag`       | All elements with that tag name | `p`                     |
| `#id.class` | Element that has BOTH           | `#main-content.content` |

## Good Practices

1. **One unique ID per page**: Never reuse the same ID on multiple elements.
2. **Use classes for styling**: IDs have higher CSS specificity and make overrides harder. Use classes for styling; keep IDs for unique JavaScript hooks.
3. **Always check for null**: After using `querySelector()`, check if the element exists before using it.
4. **Use type assertions**: Tell TypeScript what element type you have using `as HTMLParagraphElement` (or whatever element type you're selecting).
5. **Keep selectors simple**: Only add complexity when needed.
6. **Separate concerns**: HTML for structure, CSS for styling, TypeScript for behavior.

## Quick fixes when things go wrong

- **"Cannot read properties of null"**: Your selector matched nothing. Check the ID/class in HTML, or add a null check (`if (el) { ... }`).
- **TypeScript error on properties** (e.g., `textContent`): Tell TypeScript what element you have with a type assertion (`as HTMLParagraphElement`).

## Want to Learn More?

For those interested in going deeper, check out [Advanced: NodeList vs. Array](advanced_NodeList.md) to understand the differences between `NodeList` and regular JavaScript arrays, and when to convert between them.
