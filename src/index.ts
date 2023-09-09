import './styles.scss';

interface Ship {
    length: number;
    hitNum: number;
    sunk: boolean;
}
  
class Ship {
    constructor(length: number) {
        this.length = length
        this.hitNum = 0
        this.sunk = false
    }

    hit(): void {
        this.hitNum++
    }

    isSunk(): boolean {
        const status = this.hitNum === this.length ? true : false
        this.sunk = status
        return status
    }
}
  
