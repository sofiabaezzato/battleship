class Ship {
  length: number;
  hits: number[];

  constructor(length: number) {
      this.length = length
      this.hits = Array(length).fill(0)
  }

  hit(index: number): void {
    if (this.hits[index] === 0) {
        this.hits[index] = 1
    } else return
  }

  isSunk(): boolean {
      return this.hits.filter((el) => el === 1).length === this.length
  }
}

export { Ship }