import { BOARD_SIZE, Gameboard } from "./gameboard";

class Player {
    name: string;
    shots: number[][]
    

    constructor(name: string) {
        this.name = name,
        this.shots = []
    }

    attack(row: number, column: number, gameboard: Gameboard): boolean {
        if (this.isAlreadyShot(row, column)) return false

        this.shots.push([row, column])
        gameboard.receiveAttack(row, column)
        return true
    }

    isAlreadyShot(row: number, column: number): boolean {
        for (let i = 0; i < this.shots.length; i++) {
            if (
                this.shots[i][0] === row && this.shots[i][1] === column
            ) {
                return true
            }
        }
        return false
    }

    makeRandomPlay(gameboard: Gameboard) {
        let row = Math.floor(Math.random() * BOARD_SIZE)
        let column = Math.floor(Math.random() * BOARD_SIZE)

        this.attack(row, column, gameboard)
    }

}

export { Player }