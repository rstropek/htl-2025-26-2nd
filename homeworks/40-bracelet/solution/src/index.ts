import './index.css';
import { Bracelet } from './Bracelet';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SYMBOLS = ["\u2665", "\u2605"]; // heart, star
const SPACER_COLORS = ["#f4a0a0", "#f4d4a0", "#a0d4a0", "#a0a0f4", "#d4a0f4", "#f4a0d4", "#a0f4f4", "#d4f4a0", "#f4c8a0"];

const bracelet = new Bracelet("bracelet", "error");
buildLetterGrid("letterGrid");
buildColorGrid("colorGrid");
document.getElementById("undoBtn")!.addEventListener("click", () => bracelet.undo());

function buildLetterGrid(parentId: string): void {
    const grid = document.getElementById(parentId)!;
    for (const ch of LETTERS) {
        const btn = document.createElement("button");
        btn.textContent = ch;
        btn.addEventListener("click", () => bracelet.addLetter(ch));
        grid.appendChild(btn);
    }
    for (const sym of SYMBOLS) {
        const btn = document.createElement("button");
        btn.textContent = sym;
        btn.addEventListener("click", () => bracelet.addLetter(sym));
        grid.appendChild(btn);
    }
}

function buildColorGrid(parentId: string): void {
    const row = document.getElementById(parentId)!;
    for (const color of SPACER_COLORS) {
        const btn = document.createElement("button");
        btn.style.backgroundColor = color;
        btn.addEventListener("click", () => bracelet.addSpacer(color));
        row.appendChild(btn);
    }
}
