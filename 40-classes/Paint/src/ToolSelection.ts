import { ToolType } from "./ToolType";

export class ToolSelection {
    private currentToolValue: ToolType = ToolType.POINTER;
    private toolButtons: Map<ToolType, HTMLButtonElement> = new Map();
    private toolChangeCallbackValue: ((tool: ToolType) => void) | null = null;
    
    public get currentTool(): ToolType {
        return this.currentToolValue;
    }
    
    public initialize(toolContainerId: string = "tool-container"): void {
        // Create tool buttons
        const toolContainer = document.getElementById(toolContainerId);
        if (!toolContainer) {
            throw new Error(`Tool container with ID '${toolContainerId}' not found`);
        }
        
        // Create buttons for each tool
        const circleButton = this.createToolButton(ToolType.CIRCLE, "Circle");
        const rectButton = this.createToolButton(ToolType.RECT, "Rectangle");
        const pointerButton = this.createToolButton(ToolType.POINTER, "Pointer");
        
        toolContainer.appendChild(circleButton);
        toolContainer.appendChild(rectButton);
        toolContainer.appendChild(pointerButton);
        
        // Set initial selection
        this.selectTool(ToolType.POINTER);
    }
    
    private createToolButton(toolType: ToolType, label: string): HTMLButtonElement {
        const button = document.createElement("button");
        button.textContent = label;
        button.className = "tool-button";
        
        button.addEventListener("click", () => {
            this.selectTool(toolType);
        });
        
        this.toolButtons.set(toolType, button);
        return button;
    }
    
    public selectTool(toolType: ToolType): void {
        // Remove selection from all buttons
        this.toolButtons.forEach((button) => {
            button.classList.remove("selected");
        });
        
        // Set new selection
        this.currentToolValue = toolType;
        const selectedButton = this.toolButtons.get(toolType);
        if (selectedButton) {
            selectedButton.classList.add("selected");
        }
        
        // Call callback if set
        if (this.toolChangeCallbackValue) {
            this.toolChangeCallbackValue(toolType);
        }
    }
    
    public set toolChangeCallback(callback: (tool: ToolType) => void) {
        this.toolChangeCallbackValue = callback;
    }
}
