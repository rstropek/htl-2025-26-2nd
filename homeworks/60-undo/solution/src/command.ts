export abstract class Command {
  abstract execute(currentValue: number): number;
  abstract undo(currentValue: number): number;
}

export class AddCommand extends Command {
  delta: number;

  constructor(delta: number) {
    super();
    this.delta = delta;
  }

  execute(currentValue: number): number {
    return currentValue + this.delta;
  }

  undo(currentValue: number): number {
    return currentValue - this.delta;
  }
}

export class SubtractCommand extends Command {
  delta: number;

  constructor(delta: number) {
    super();
    this.delta = delta;
  }

  execute(currentValue: number): number {
    return currentValue - this.delta;
  }

  undo(currentValue: number): number {
    return currentValue + this.delta;
  }
}
