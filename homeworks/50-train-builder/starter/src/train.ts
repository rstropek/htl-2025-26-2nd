/**
 * Describes where in the train a part is allowed to be placed.
 *
 * - `MustBeFirst` — this part may only be added when the train is empty (e.g. a locomotive).
 * - `MustBeLast`  — once this part is added, nothing can be appended after it (e.g. a caboose).
 * - `None`        — no positional restriction; the part can be placed anywhere after the locomotive.
 */
export enum PartRestriction {
    MustBeFirst,
    MustBeLast,
    None,
}

/**
 * Abstract base class for every part that can be added to a train.
 *
 * Every concrete wagon class (Locomotive, PassengerWagon, CargoWagon, …) must extend
 * this class and implement (or override) the three members below.
 *
 * The `Train` class works exclusively with `TrainPart` references, so all logic
 * that the train needs must be accessible through this base class.
 */
export abstract class TrainPart {
    /**
     * Positional restriction for this part.
     *
     * The `Train` class reads this value to enforce ordering rules without
     * needing to know the concrete type of the part.
     *
     * Each subclass must declare this as a `readonly` property and initialise
     * it with the appropriate `PartRestriction` member.
     */
    abstract readonly restriction: PartRestriction;

    /**
     * The maximum cargo weight this part contributes, in tons.
     *
     * The default implementation returns `0`, which is correct for every part
     * that carries no cargo (locomotive, passenger wagon, dining wagon, caboose).
     *
     * **Override this getter in `CargoWagon`** to return the actual maximum
     * weight so that the heavy-cargo warning can be computed without
     * `instanceof` checks.
     */
    get cargoWeightTons(): number { return 0; }

    /**
     * Creates and returns the `HTMLElement` that visually represents this part.
     *
     * The returned element will be appended directly to the train preview
     * container by `Train.render()`.  Use `document.createElement` to build
     * the element, set an appropriate CSS class, and populate it with the
     * part's data (title, detail value, …).
     */
    abstract render(): HTMLElement;
}
