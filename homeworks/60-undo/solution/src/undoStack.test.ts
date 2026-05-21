import { beforeEach, describe, expect, it } from "vitest";
import { UndoStack } from "./undoStack";

describe("UndoStack", () => {
  let stack: UndoStack<string>;

  beforeEach(() => {
    stack = new UndoStack<string>();
  });

  describe("a fresh stack", () => {
    it("has no head", () => {
      expect(stack.head).toBeNull();
    });

    it("reports isEmpty() === true", () => {
      expect(stack.isEmpty()).toBe(true);
    });

    it("returns null on pop()", () => {
      expect(stack.pop()).toBeNull();
    });
  });

  describe("push", () => {
    it("makes the most recently pushed item the next to pop", () => {
      stack.push("a");
      stack.push("b");

      expect(stack.pop()).toBe("b");
    });

    it("preserves earlier items below the new top", () => {
      stack.push("a");
      stack.push("b");

      stack.pop();
      expect(stack.pop()).toBe("a");
    });

    it("makes the stack non-empty", () => {
      stack.push("a");

      expect(stack.isEmpty()).toBe(false);
    });
  });

  describe("pop", () => {
    beforeEach(() => {
      stack.push("a");
      stack.push("b");
      stack.push("c");
    });

    it("returns items in LIFO order", () => {
      expect(stack.pop()).toBe("c");
      expect(stack.pop()).toBe("b");
      expect(stack.pop()).toBe("a");
    });

    it("returns null once the stack is empty", () => {
      stack.pop();
      stack.pop();
      stack.pop();

      expect(stack.pop()).toBeNull();
    });

    it("leaves the stack empty after popping every item", () => {
      stack.pop();
      stack.pop();
      stack.pop();

      expect(stack.isEmpty()).toBe(true);
      expect(stack.head).toBeNull();
    });
  });

  describe("generics", () => {
    it("works with number items", () => {
      const numbers = new UndoStack<number>();
      numbers.push(1);
      numbers.push(2);

      expect(numbers.pop()).toBe(2);
      expect(numbers.pop()).toBe(1);
    });

    it("works with object items", () => {
      type Point = { x: number; y: number };
      const points = new UndoStack<Point>();
      points.push({ x: 1, y: 2 });
      points.push({ x: 3, y: 4 });

      expect(points.pop()).toEqual({ x: 3, y: 4 });
      expect(points.pop()).toEqual({ x: 1, y: 2 });
    });
  });

  describe("push/pop interleaved", () => {
    it("can be re-used after being emptied", () => {
      stack.push("a");
      stack.pop();

      stack.push("b");

      expect(stack.isEmpty()).toBe(false);
      expect(stack.pop()).toBe("b");
      expect(stack.isEmpty()).toBe(true);
    });

    it("handles pushes between pops", () => {
      stack.push("a");
      stack.push("b");
      expect(stack.pop()).toBe("b");

      stack.push("c");
      expect(stack.pop()).toBe("c");
      expect(stack.pop()).toBe("a");
      expect(stack.pop()).toBeNull();
    });
  });
});
