import "./style.css";
import { AddCommand, type Command, SubtractCommand } from "./command";
import { UndoStack } from "./undoStack";

const history = new UndoStack<Command>();
let currentValue = 0;

const valueDisplay = document.getElementById("value-display") as HTMLSpanElement;
const deltaInput = document.getElementById("delta-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const subtractBtn = document.getElementById("subtract-btn") as HTMLButtonElement;
const undoBtn = document.getElementById("undo-btn") as HTMLButtonElement;
const errorMsg = document.getElementById("error-msg") as HTMLParagraphElement;

function render(): void {
  valueDisplay.textContent = String(currentValue);
  undoBtn.disabled = history.isEmpty();
}

function showError(message: string): void {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 3000);
}

function readDelta(): number | null {
  const raw = deltaInput.value.trim();
  const value = Number(raw);

  if (raw === "" || !Number.isInteger(value) || value <= 0) {
    showError("Please enter a positive integer.");
    return null;
  }

  return value;
}

function applyCommand(command: Command): void {
  currentValue = command.execute(currentValue);
  history.push(command);
  deltaInput.value = "";
  render();
}

addBtn.addEventListener("click", () => {
  const delta = readDelta();
  if (delta === null) {
    return;
  }
  applyCommand(new AddCommand(delta));
});

subtractBtn.addEventListener("click", () => {
  const delta = readDelta();
  if (delta === null) {
    return;
  }
  applyCommand(new SubtractCommand(delta));
});

undoBtn.addEventListener("click", () => {
  const command = history.pop();
  if (command === null) {
    return;
  }
  currentValue = command.undo(currentValue);
  render();
});

render();
