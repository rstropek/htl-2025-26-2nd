/**
 * Abstract base class for all items that can appear on a friendship bracelet.
 *
 * A bracelet is made up of different types of items (e.g. letter cubes, colored spacer beads).
 * Each item knows how to create its own HTML representation via the {@link render} method.
 *
 * Subclasses **must** implement {@link render} to return an `HTMLElement` that visually
 * represents the item. The returned element will be appended to the bracelet's
 * container in the DOM.
 */
export abstract class BraceletItem {
    /**
     * Creates and returns an `HTMLElement` that visually represents this bracelet item.
     *
     * Each call should produce a **new** element (do not cache/reuse elements),
     * because the bracelet re-renders by clearing its container and appending
     * fresh elements for every item.
     */
    abstract render(): HTMLElement;
}

export class LetterItem extends BraceletItem {
    constructor(public readonly letter: string) {
        super();
    }

    render(): HTMLElement {
        const cube = document.createElement("div");
        cube.className = "cube";
        cube.textContent = this.letter;
        return cube;
    }
}

export class SpacerItem extends BraceletItem {
    constructor(public readonly color: string) {
        super();
    }

    render(): HTMLElement {
        const bead = document.createElement("div");
        bead.className = "bead";
        bead.style.backgroundColor = this.color;
        return bead;
    }
}

export class Bracelet {
    private items: BraceletItem[] = [];
    private container: HTMLElement;
    private errorEl: HTMLElement;
    private mixedColorWarningShown: boolean = false;

    constructor(containerId: string, errorId: string) {
        this.container = document.getElementById(containerId)!;
        this.errorEl = document.getElementById(errorId)!;
        this.render();
    }

    addLetter(letter: string): void {
        if (!this.expectsLetter()) {
            this.showError("You need to add a spacer bead next!");
            return;
        }
        this.clearError();
        this.items.push(new LetterItem(letter));
        this.render();
    }

    addSpacer(color: string): void {
        if (this.expectsLetter()) {
            this.showError("You need to add a letter cube next!");
            return;
        }
        this.clearError();
        this.items.push(new SpacerItem(color));
        this.checkMixedColors();
        this.render();
    }

    undo(): void {
        this.clearError();
        this.items.pop();
        this.render();
    }

    private expectsLetter(): boolean {
        return this.items.length % 2 === 0;
    }

    private render(): void {
        this.container.innerHTML = "";
        for (const item of this.items) {
            this.container.appendChild(item.render());
        }
    }

    private showError(message: string): void {
        this.errorEl.textContent = message;
    }

    private clearError(): void {
        this.errorEl.textContent = "";
    }

    private checkMixedColors(): void {
        if (this.mixedColorWarningShown) { return; }

        const spacers = this.items.filter(item => item instanceof SpacerItem);
        if (spacers.length >= 2) {
            const colors = new Set(spacers.map(s => s.color));
            if (colors.size > 1) {
                this.showError("You are mixing spacer colors!");
                this.mixedColorWarningShown = true;
            }
        }
    }
}
