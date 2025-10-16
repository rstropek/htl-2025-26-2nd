# Advanced: `NodeList` vs. Array

⚠️ **This chapter contains advanced content that is not required for this course.** It has been added for those who want to go deeper.

When you use `querySelectorAll()`, it returns a `NodeList`, not a regular JavaScript `Array`. While they look similar and share some methods, there are important differences you should understand.

## What is a NodeList?

A `NodeList` is a collection of DOM nodes returned by methods like `querySelectorAll()`. It's **array-like** but not a true array.

```typescript
const paragraphs = document.querySelectorAll("p"); // NodeListOf<Element>
console.log(paragraphs.length); // ✅ Works - has length property
console.log(paragraphs[0]); // ✅ Works - can access by index
```

Note: The `NodeList` returned by `querySelectorAll()` is static (it does not update automatically when the DOM changes).

## What Works on NodeList

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

## What Does NOT Work on NodeList

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

## Converting NodeList to Array

If you need array methods, convert the `NodeList` to a real array first:

```typescript
const items = document.querySelectorAll(".item");

// Method 1: Array.from() (most readable)
const itemsArray = Array.from(items);

// Method 2: Spread operator (modern and concise)
const itemsArray2 = [...items];

// Now you can use all array methods:
const texts = itemsArray.map((item) => item.textContent);
const visible = itemsArray.filter((item) => {
  const el = item as HTMLElement;
  return el.style.display !== "none";
});
const hasActive = itemsArray.some((item) => item.classList.contains("active"));
```

## Key Takeaway

`NodeList` is great for simple loops (all we need in this course), but if you need powerful array methods, convert it first with `Array.from()` or the spread operator `[...]`.

