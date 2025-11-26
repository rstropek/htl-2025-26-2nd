import './styles.css';

type Player = "red" | "yellow";
type CellState = Player | "empty";

class ConnectFourGame {
    private boardElement: HTMLDivElement;
    private currentPlayer: Player = "red";
    private board: CellState[][] = [];
    private cellElements: HTMLDivElement[][] = [];

    constructor() {
        this.boardElement = document.getElementById("colored-rect") as HTMLDivElement;
        this.createColumnControls();
        this.createBoardCells();
        this.createEmptyBoard();
    }

    private createEmptyBoard(): void {
        for (let row = 0; row < 6; row++) {
            let r: CellState[] = [];
            for (let column = 0; column < 7; column++) {
                r.push("empty");
            }

            this.board.push(r);
        }
    }

    private createColumnControls(): void {
        for (let column = 0; column < 7; column++) {
            const control = document.createElement('div');
            control.className = 'column-control';
            control.textContent = '⬇';
            control.addEventListener('click', () => this.handleColumnClick(column));
            this.boardElement.appendChild(control);
        }
    }

    private findAvailableRow(column: number): number {
        for(let row = 5; row >= 0; row--) {
            if (this.board[row]![column] === 'empty') {
                return row;
            }
        }

        return -1;
    }

    private handleColumnClick(columnIndex: number): void {
        const targetRow = this.findAvailableRow(columnIndex);
        if (targetRow >= 0) {
            this.cellElements[targetRow]![columnIndex]!.classList.add("red");
            this.board[targetRow]![columnIndex] = "red";
        }
    }

    private createBoardCells(): void {
        // We create six rows and seven columns of white circles (divs)
        for (let row = 0; row < 6; row++) {
            const rowElements: HTMLDivElement[] = [];
            for (let column = 0; column < 7; column++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                this.boardElement.appendChild(cell);
                rowElements.push(cell);
            }

            this.cellElements.push(rowElements);
        }
    }

    private switchPlayer() {
        if (this.currentPlayer === "red") {
            this.currentPlayer = "yellow";
        } else {
            this.currentPlayer = "red";
        }
    }
}

const game = new ConnectFourGame();
