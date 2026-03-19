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

abstract class Wagon extends TrainPart {

    constructor(
        protected readonly title: string,
        protected readonly detail: string,
        private readonly cssClass: string,
        public readonly restriction: PartRestriction
    ) {
        super();
    }

    render(): HTMLElement {
        const wagon = document.createElement("div");
        wagon.className = `part ${this.cssClass}`;

        const title = document.createElement("div");
        title.className = "part-title";
        title.textContent = this.title;

        const detail = document.createElement("div");
        detail.className = "part-detail";
        detail.textContent = this.detail;

        wagon.append(title, detail);
        return wagon;
    }
}

export class Locomotive extends Wagon {
    constructor(public readonly powerKw: number) {
        super("Locomotive", `${powerKw} kW`, "locomotive", PartRestriction.MustBeFirst);
    }
}

export class PassengerWagon extends Wagon {
    constructor(public readonly seats: number) {
        super("Passenger", `${seats} seats`, "passenger", PartRestriction.None);
    }
}

export class CargoWagon extends Wagon {
    constructor(public readonly maxWeightTons: number) {
        super("Cargo", `${maxWeightTons} t max`, "cargo", PartRestriction.None);
    }

    override get cargoWeightTons(): number { return this.maxWeightTons; }
}

export class DiningWagon extends Wagon {
    constructor(public readonly tables: number) {
        super("Dining", `${tables} tables`, "dining", PartRestriction.None);
    }
}

export class Caboose extends Wagon {
    constructor(public readonly crew: number) {
        super("Caboose", `${crew} crew`, "caboose", PartRestriction.MustBeLast);
    }
}

export class Train {
    private parts: TrainPart[] = [];
    private container: HTMLElement;
    private messageEl: HTMLElement;
    private heavyCargoWarningShown: boolean = false;

    constructor(containerId: string, messageId: string) {
        this.container = document.getElementById(containerId)!;
        this.messageEl = document.getElementById(messageId)!;
        this.render();
    }

    addLocomotive(powerKw: number): void {
        if (this.parts.length > 0) {
            this.showMessage("A train can only have one locomotive!");
            return;
        }

        this.clearMessage();
        this.parts.push(new Locomotive(powerKw));
        this.render();
    }

    addPassengerWagon(seats: number): void {
        if (!this.canAddRegularPart()) { return; }
        this.clearMessage();
        this.parts.push(new PassengerWagon(seats));
        this.render();
    }

    addCargoWagon(maxWeightTons: number): void {
        if (!this.canAddRegularPart()) { return; }
        this.clearMessage();
        this.parts.push(new CargoWagon(maxWeightTons));
        this.checkHeavyCargo();
        this.render();
    }

    addDiningWagon(tables: number): void {
        if (!this.canAddRegularPart()) { return; }
        this.clearMessage();
        this.parts.push(new DiningWagon(tables));
        this.render();
    }

    addCaboose(crew: number): void {
        if (!this.canAddRegularPart()) { return; }
        this.clearMessage();
        this.parts.push(new Caboose(crew));
        this.render();
    }

    undo(): void {
        this.clearMessage();
        this.parts.pop();
        this.render();
    }

    private canAddRegularPart(): boolean {
        if (this.parts.length === 0) {
            this.showMessage("You need to place a locomotive first!");
            return false;
        }

        const lastPart = this.parts[this.parts.length - 1]!;
        if (lastPart.restriction === PartRestriction.MustBeLast) {
            this.showMessage("The caboose must stay at the end of the train!");
            return false;
        }

        return true;
    }

    private checkHeavyCargo(): void {
        if (this.heavyCargoWarningShown) { return; }

        const totalCargoWeight = this.parts
            .reduce((sum, part) => sum + part.cargoWeightTons, 0);

        if (totalCargoWeight > 100) {
            this.showMessage("Warning: this train is carrying a lot of cargo!");
            this.heavyCargoWarningShown = true;
        }
    }

    private render(): void {
        this.container.innerHTML = "";
        for (const part of this.parts) {
            this.container.appendChild(part.render());
        }
    }

    private showMessage(message: string): void {
        this.messageEl.textContent = message;
    }

    private clearMessage(): void {
        this.messageEl.textContent = "";
    }
}
