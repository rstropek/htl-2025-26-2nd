# Selectors Fundamentals

Welcome to the selectors module! In this part you will learn how to **find (select) objects in the DOM** so you can read or change them with TypeScript and style them with CSS.

## What are Selectors?

When a browser turns your HTML into the DOM tree you can pick out ("select") specific objects (nodes) to work with. A _selector_ is a short text pattern that describes which element(s) you want. We use the same selector syntax both:

1. In TypeScript with the methods `querySelector()` (first match) and `querySelectorAll()` (all matches)
2. In CSS to style elements

In this chapter we focus on the most common and simple selectors: by **ID**, **class**, and **tag name**. More powerful selectors (descendants, attributes, pseudo classes, etc.) come later.

## The DOM as an Object-Oriented (Inheritance) Tree

The DOM is not only a _tree of nodes_ in the page — it is also a _tree of TypeScript/JavaScript object types_.

Very simplified inheritance chain (there are more layers, but this is enough now):

```
Node
  └─ Element
       └─ HTMLElement
            ├─ HTMLParagraphElement (for <p>)
            ├─ HTMLHeadingElement (for <h1>, <h2>, ...)
            ├─ HTMLAnchorElement (for <a>)
            ├─ HTMLDivElement (for <div>)
            ├─ HTMLSpanElement (for <span>)
            └─ ... many more specific element classes
```

Why does this matter? Methods like `document.querySelector()` only know you _asked for_ an element. They **do not know** which exact tag will be returned. Therefore the return type is the general `Element | null` (meaning "an Element or null if not found").

However: once _you_ know (because of your HTML) that the element is, for example, a paragraph, you can _tell_ TypeScript the more specific type. This is called **type casting**.

Two ways to cast:

```typescript
const introPara = document.querySelector(
  "#intro"
) as HTMLParagraphElement | null; // Meaning: could be null because it might not exist

// Or do it in two steps for clarity:
const maybeIntro = document.querySelector("#intro"); // Element | null
if (maybeIntro) {
  const intro = maybeIntro as HTMLParagraphElement; // Now we say: treat it as a paragraph
  console.log(intro.textContent);
}

// If you are absolutely sure it exists AND that it is a paragraph, you can skip the null:
const surelyExistsPara = document.querySelector(
  "#intro"
) as HTMLParagraphElement; // ⚠️ risky if the selector is wrong
```

### Type Narrowing vs Casting

Sometimes TypeScript can _narrow_ the type for you without a cast, for example when you check `instanceof`:

```typescript
const el = document.querySelector("#intro"); // Element | null
if (el instanceof HTMLParagraphElement) {
  // Inside this block TypeScript now treats el as HTMLParagraphElement
  console.log(el.textContent);
}
```

Use casting (`as ...`) when you _know_ the specific type because you control the HTML. Use narrowing (`instanceof`) when you want to check at runtime.

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

## Selectors in TypeScript

### Selecting an Object by ID

Use `#` followed by the ID inside `querySelector()`. Because IDs are unique you either get `null` (not found) or one element.

```typescript
// Select the element with id="intro"
// Return type: Element | null
const introPara = document.querySelector("#intro");

if (introPara) {
  // null check first
  // Tell TypeScript this is a paragraph element
  const para = introPara as HTMLParagraphElement;
  console.log("Intro text:", para.textContent);
}
```

### Selecting Multiple Objects by Class

Use `.` followed by the class name. `querySelectorAll()` returns a _NodeList_ of all matching elements. You can loop over it with `forEach`.

```typescript
// Select all elements with class="text"
const textParagraphs = document.querySelectorAll(".text"); // NodeListOf<Element>

textParagraphs.forEach((p) => {
  // We *expect* <p> tags here, but could be something else with class="text"
  const para = p as HTMLParagraphElement; // cast for clarity
  console.log("Text paragraph:", para.textContent);
});
```

### Selecting Multiple Objects by Tag Name

Simply pass the tag name (for example `p`). Again you get all matches.

```typescript
// Select all paragraph elements
const allParagraphs = document.querySelectorAll("p"); // NodeListOf<HTMLParagraphElement> (TypeScript can infer!)

allParagraphs.forEach((p) => {
  // Here inference already knows p is HTMLParagraphElement
  console.log("Paragraph:", p.textContent);
});
```

### Selecting an Object by ID and Class Together

You can combine selectors. `#main-content.content` means: element with ID `main-content` **and** class `content`.

```typescript
// Element that has id="main-content" AND class="content"
const mainSection = document.querySelector("#main-content.content"); // Element | null

if (mainSection) {
  const section = mainSection as HTMLElement;
  console.log("Main section text (combined selector):", section.textContent);
}
```

### Application Example: Add target to All Links

We want **all** links (`<a>`) on the page to open in a new tab.

```typescript
// Select all anchor (link) elements
const links = document.querySelectorAll("a"); // NodeListOf<HTMLAnchorElement>

// Add target="_blank" to every link using for..of (simple and readable)
for (const link of links) {
  link.target = "_blank";
}
```

**Explanation:**

- `querySelectorAll('a')` returns a NodeList of all `<a>` elements
- `for..of` loops directly over each element (clean syntax, no index needed)
- `link.target = "_blank"` makes the browser open the link in a new tab
- Shown alternatives: `forEach` and classic indexed `for`

## Selectors in CSS

CSS uses the _same selector syntax_ but instead of reading or changing text content you define _rules_ (styles) that apply to all elements matching the selector.

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

### Application Example: Styling External Links

If you want to style _all_ links you can use the `a` selector:

```css
a {
  text-decoration: none; /* remove underline */
  color: green;
}
```

## Summary of Basic Selector Forms

| Selector    | Matches                         | Example                 |
| ----------- | ------------------------------- | ----------------------- |
| `#id`       | Element with given ID           | `#intro`                |
| `.class`    | All elements with that class    | `.highlight`            |
| `tag`       | All elements with that tag name | `p`                     |
| `#id.class` | Element that has BOTH           | `#main-content.content` |

## Good Practices

1. **One unique ID per page**: do not reuse the same ID.
2. **Use classes for styling** and repeated patterns. IDs are more for unique hooks (e.g. attaching events like `click` to a specific element).
3. **Check for null** after using `querySelector()` before accessing properties.
4. **Cast thoughtfully**: Only cast when you are sure about the element type; prefer natural inference when possible.
5. **Keep selectors simple**. Only add complexity when needed.
6. **Separate structure, style, logic**: HTML for structure, CSS for styling, TypeScript for behavior.

## Advanced: `NodeList` vs. Array

⚠️ **This chapter contains advanced content that is not required for this course.** It has been added for those who want to go deeper.

When you use `querySelectorAll()`, it returns a `NodeList`, not a regular JavaScript `Array`. While they look similar and share some methods, there are important differences you should understand.

### What is a NodeList?

A `NodeList` is a collection of DOM nodes returned by methods like `querySelectorAll()`. It's **array-like** but not a true array.

```typescript
const paragraphs = document.querySelectorAll("p"); // NodeListOf<HTMLParagraphElement>
console.log(paragraphs.length); // ✅ Works - has length property
console.log(paragraphs[0]); // ✅ Works - can access by index
```

### What Works on NodeList

`NodeList` supports these common operations:

```typescript
const items = document.querySelectorAll(".item");

// ✅ forEach - works on NodeList
items.forEach((item) => {
  console.log(item.textContent);
});

// ✅ for..of - works on NodeList
for (const item of items) {
  console.log(item.textContent);
}

// ✅ Classic for loop - works on NodeList
for (let i = 0; i < items.length; i++) {
  console.log(items[i].textContent);
}

// ✅ Index access - works on NodeList
const firstItem = items[0];

// ✅ length property - works on NodeList
console.log("Total items:", items.length);
```

### What Does NOT Work on NodeList

Many useful array methods are **missing** from `NodeList`:

```typescript
const items = document.querySelectorAll(".item");

// ❌ map - does NOT work on NodeList
// const texts = items.map(item => item.textContent); // ERROR!

// ❌ filter - does NOT work on NodeList
// const visible = items.filter(item => item.style.display !== 'none'); // ERROR!

// ❌ reduce - does NOT work on NodeList
// const total = items.reduce((sum, item) => sum + 1, 0); // ERROR!

// ❌ find - does NOT work on NodeList
// const first = items.find(item => item.classList.contains('active')); // ERROR!

// ❌ some/every - do NOT work on NodeList
// const hasActive = items.some(item => item.classList.contains('active')); // ERROR!
```

### Converting NodeList to Array

If you need array methods, convert the `NodeList` to a real array first:

```typescript
const items = document.querySelectorAll(".item");

// Method 1: Array.from() (most readable)
const itemsArray = Array.from(items);

// Method 2: Spread operator (modern and concise)
const itemsArray2 = [...items];

// Now you can use all array methods:
const texts = itemsArray.map((item) => item.textContent);
const visible = itemsArray.filter((item) => item.style.display !== "none");
const hasActive = itemsArray.some((item) => item.classList.contains("active"));
```

### Key Takeaway

`NodeList` is great for simple loops (all we need in this course), but if you need powerful array methods, convert it first with `Array.from()` or the spread operator `[...]`.
