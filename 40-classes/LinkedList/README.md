# Linked Lists – Playlist Exercise

## What is a linked list?

An array stores elements in one contiguous block of memory. You can jump directly to any element by index, but inserting or deleting in the middle requires shifting everything around.

A **linked list** works differently. Each element lives in its own little box called a **node**. Every node holds:

- the **data** (in our case, a song)
- a **pointer** to the next node (or `null` if it is the last one)

```
head
 │
 ▼
┌──────────────┬──────┐     ┌──────────────┬──────┐     ┌──────────────┬──────┐
│ Bohemian R.  │  ●───┼────▶│ Billie Jean  │  ●───┼────▶│ Smells Like  │ null │
└──────────────┴──────┘     └──────────────┴──────┘     └──────────────┴──────┘
```

The list itself only remembers one thing: where the **head** (first node) is. To reach any other node, you follow the chain of `next` pointers one step at a time.

## Key concepts

| Concept       | What it means                                                  |
| ------------- | -------------------------------------------------------------- |
| **Node**      | A box containing data + a `next` pointer                       |
| **Head**      | Pointer to the first node; `null` means the list is empty      |
| **Traversal** | Starting at `head` and following `next` until you reach `null` |
| **Insertion** | Rewiring `next` pointers so the new node fits into the chain   |
| **Deletion**  | Making the node _before_ the target skip over it               |

## Linked list vs. array

|                           | Array                 | Linked list                             |
| ------------------------- | --------------------- | --------------------------------------- |
| Access by index           | O(1) — direct         | O(n) — must traverse                    |
| Insert / delete at start  | O(n) — shift elements | O(1) — rewire one pointer               |
| Insert / delete in middle | O(n)                  | O(n) traverse + O(1) rewire             |
| Memory                    | Contiguous block      | Scattered nodes, extra pointer per node |
