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
