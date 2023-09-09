import { Ship } from "./ship"

const BOARD_SIZE = 20

class Gameboard {

    board: Ship[][]
    missed: boolean[][]

    constructor() {
        this.board = []
        this.missed = []
    }

    init(): void {
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board[i] = []
            this.missed[i] = []
            for (let j = 0; j < BOARD_SIZE; j++) {
                this.board[i][j] = null
                this.missed[i][j] = false
            }
        }
    }

    setShip(ship: Ship, row: number, column: number, isVertical: boolean): boolean {
        if (!this.isPlaceAllowed(ship, row, column, isVertical)) return false

        if (isVertical) {
            for (let i = 0; i < ship.length; i++) {
                this.board[row + i][column] = ship
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                this.board[row][column + i] = ship
            }
        }
        return true
    }

    isPlaceAllowed(ship: Ship, row: number, column: number, isVertical: boolean): boolean {

        // CASE 1: [row][column] out of the board
        if (row > BOARD_SIZE - 1 ||
            row < 0 ||
            column > BOARD_SIZE - 1 ||
            column < 0) return false

        // CASE 2: ship can't fit entirely on the board
        if (isVertical) {
            if (row + ship.length < 0 || row + ship.length > BOARD_SIZE - 1) return false
        } else {
            if (column + ship.length < 0 || column + ship.length > BOARD_SIZE - 1) return false
        }

        // CASE 3: spot on the board not available
        if (isVertical) {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row + i][column] != null) return false
                else return true
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row][column + i] != null) return false
                else return true
            }
        }

    }

    receiveAttack(row: number, column: number): boolean {
        if (row < 0 || column < 0 || row >= BOARD_SIZE || column >= BOARD_SIZE) return false

        if (this.board[row][column]) {
            let index = 0

            // CASE 1: vertical ship
            if (row > 0 && this.board[row - 1][column] || this.board[row + 1][column]) {
                // Check the cell above when the ship is vertical
                let i = 1;
                while (row - i >= 0 && this.board[row - i][column]) {
                index++;
                i++;
                }

            }
            // CASE 2: horizontal ship
            else if (this.board[row][column - 1] || this.board[row][column + 1]) {
                // Check the cell on the left when the ship is horizontal
                let i = 1;
                while (column - i >= 0 && this.board[row][column - i]) {
                index++;
                i++;
                }
            }
            this.board[row][column].hit(index)
            return true
        } else {
            this.missed[row][column] = true
        }     
    }

    isGameover(): boolean {
        let isBoardEmpty = true
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (this.board[i][j]) {
                    isBoardEmpty = false
                    if (!this.board[i][j].isSunk()) return false
                }
            }
        }
        return isBoardEmpty ? false : true
    }
}

export { Gameboard }