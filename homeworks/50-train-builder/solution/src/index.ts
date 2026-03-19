import './index.css';
import { Train } from './train';

const PART_OPTIONS = [
    { label: 'Add locomotive (2400 kW)', onClick: (train: Train) => train.addLocomotive(2400) },
    { label: 'Add passenger wagon (48 seats)', onClick: (train: Train) => train.addPassengerWagon(48) },
    { label: 'Add cargo wagon (35 t)', onClick: (train: Train) => train.addCargoWagon(35) },
    { label: 'Add dining wagon (8 tables)', onClick: (train: Train) => train.addDiningWagon(8) },
    { label: 'Add caboose (2 crew)', onClick: (train: Train) => train.addCaboose(2) }
];

const train = new Train('train', 'message');
buildPartGrid('partGrid');
document.getElementById('undoBtn')!.addEventListener('click', () => train.undo());

function buildPartGrid(parentId: string): void {
    const grid = document.getElementById(parentId)!;

    for (const option of PART_OPTIONS) {
        const button = document.createElement('button');
        button.textContent = option.label;
        button.addEventListener('click', () => option.onClick(train));
        grid.appendChild(button);
    }
}
