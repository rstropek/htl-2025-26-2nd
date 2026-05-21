# Exercise: Counter with Multi-Level Undo

## Learning Goals

In this exercise you will combine three concepts you already know:

1. **Abstract base classes** — define a contract that concrete subclasses must implement.
2. **Generics** — write a data structure that works for *any* element type.
3. **Linked lists** — implement a small linked-list-based stack from scratch.

You will build a tiny web UI that lets the user add or subtract numbers from a running total, and provides a **multi-level undo** that can step back through the entire change history.

## What You Will Build

A single-page web app with three parts:

```
┌─────────────────────────────────────────┐
│                                         │
│          Current value:  7              │
│                                         │
│  ┌────────────┐  ┌──────┐  ┌─────────┐  │
│  │   Δ:  3    │  │ Add  │  │Subtract │  │
│  └────────────┘  └──────┘  └─────────┘  │
│                                         │
│              ┌─────────┐                │
│              │  Undo   │                │
│              └─────────┘                │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### Behavior

* The current value starts at **0**.
* The user enters a positive integer Δ in the input field and clicks either **Add** or **Subtract**.
  * **Add** increases the current value by Δ.
  * **Subtract** decreases the current value by Δ.
* Every operation is recorded in an **undo history**.
* Clicking **Undo** reverts the *most recent* operation that has not yet been undone.
  * Multiple clicks on **Undo** step further back through the history.
  * When the history is empty, the **Undo** button must be disabled or do nothing.

## Required Design

You must structure the code as follows. Naming may vary slightly, but the shape of the types is fixed.

### 1. Abstract Base Class `Command`

An abstract class that represents *any* reversible operation on a counter.

```ts
abstract class Command {
  abstract execute(currentValue: number): number;
  abstract undo(currentValue: number): number;
  abstract describe(): string;   // e.g. "+ 3" or "- 2", used for the history view
}
```

Each method takes the current counter value and returns the new value.

### 2. Concrete Commands

At least two concrete subclasses of `Command`:

* `AddCommand` — stores a positive `delta`. `execute` adds, `undo` subtracts.
* `SubtractCommand` — stores a positive `delta`. `execute` subtracts, `undo` adds.

> Yes, you *could* implement this with a single class and a signed delta. Don't. The point of the exercise is to practice the abstract-class pattern.

### 3. Generic Linked List `UndoStack<T>`

A generic singly-linked-list-based stack with exactly **two** public operations:

```ts
class UndoStack<T> {
  push(item: T): void;
  pop(): T | null;       // returns null when empty
  // You may add: isEmpty(), size(), and a way to iterate for display.
}
```

Internal requirements:

* Use your own `Node<T>` class (no `Array`, no built-in `Stack`, no `Array.push/pop`).
* The class must be **generic** in `T`. Even though the app only ever stores `Command` instances, the data structure itself must not mention `Command` anywhere.

### 4. Wiring It Together

* The app keeps one `UndoStack<Command>` instance.
* **Add** / **Subtract** click handler:
  1. Create the appropriate `Command` subclass instance.
  2. Call `execute(currentValue)` and store the new value.
  3. `push` the command onto the undo stack.
  4. Re-render the UI (value + history list).
* **Undo** click handler:
  1. `pop` the top command. If `null`, do nothing.
  2. Call `undo(currentValue)` on it and store the new value.
  3. Re-render.

## Stretch Goals (Optional)

* **Redo**: add a second `UndoStack<Command>` that receives commands when **Undo** is clicked, and is cleared whenever a *new* command is executed.
* **Reset command**: a third `Command` subclass `ResetCommand` that sets the value to 0 and remembers the previous value in order to undo itself.
