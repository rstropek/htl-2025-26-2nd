export class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class UndoStack<T> {
  head: Node<T> | null = null;

  push(item: T): void {
    const newNode = new Node<T>(item);
    newNode.next = this.head;
    this.head = newNode;
  }

  pop(): T | null {
    if (this.head === null) {
      return null;
    }

    const data = this.head.data;
    this.head = this.head.next;
    return data;
  }

  isEmpty(): boolean {
    return this.head === null;
  }
}
