import { ToolType } from './SharedTypes';

/*
    ⚠️ Note something new: Type Aliases

    A type alias allows us to create a new name for a type.
    In this case, we create a type alias called ToolChangeCallback,
    which represents a function that takes a ToolType as an argument
    and returns void (does not return any value).
*/
type ToolChangeCallback = (tool: ToolType) => void;

export class ToolSelection {
  private currentToolValue: ToolType = ToolType.POINTER;


  /*
    ⚠️ Note something new: TypeScript Map

    A Map is a collection of key-value pairs, similar to a phone book.
    In a phone book, you have names (keys) associated with phone numbers (values).
    In this case, we use ToolType as the key (to identify each tool) and 
    HTMLButtonElement as the value (the button representing that tool).
    With this, we can easily find the HTML button for a specific tool type.
  */
  //                       +------------------------ Type of key
  //                       |         +-------------- Type of value
  //                       |         |
  //                       v         v
  private toolButtons: Map<ToolType, HTMLButtonElement> = new Map();

  public get currentTool(): ToolType {
    return this.currentToolValue;
  }

  /*
    ⚠️ Note something new: Callback pattern

    A callback is a function that is passed as an argument to another function
    and is intended to be called at a later time, usually when a specific event occurs.
    In this case, we accept a callback function in the constructor that will be called
    whenever the selected tool changes. This allows other parts of the application
    to react to tool changes.
  */
  public constructor(private toolChangeCallback: ToolChangeCallback, toolContainerId: string = 'tool-container') {
    // Create tool buttons
    const toolContainer = document.getElementById(toolContainerId) as HTMLDivElement | null;
    if (!toolContainer) {
      throw new Error(`Tool container with ID '${toolContainerId}' not found`);
    }

    // Create buttons for each tool
    const circleButton = this.createToolButton(ToolType.CIRCLE, 'Circle');
    const rectButton = this.createToolButton(ToolType.RECT, 'Rectangle');
    const pointerButton = this.createToolButton(ToolType.POINTER, 'Pointer');

    toolContainer.appendChild(circleButton);
    toolContainer.appendChild(rectButton);
    toolContainer.appendChild(pointerButton);

    // Set initial selection
    this.selectTool(ToolType.POINTER);
  }

  private createToolButton(toolType: ToolType, label: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = label;

    button.addEventListener('click', () => {
      this.selectTool(toolType);
    });

    this.toolButtons.set(toolType, button);
    return button;
  }

  public selectTool(toolType: ToolType): void {
    // Remove selection from all buttons
    this.toolButtons.forEach((button) => {
      button.classList.remove('selected');
    });

    // Set new selection
    this.currentToolValue = toolType;
    const selectedButton = this.toolButtons.get(toolType);
    if (selectedButton) {
      selectedButton.classList.add('selected');
    }

    // Call callback if set
    if (this.toolChangeCallback) {
      this.toolChangeCallback(toolType);
    }
  }
}
