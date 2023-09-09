import {describe, expect, test} from '@jest/globals';
import { Ship } from '../src/components/ship';
import { Gameboard } from '../src/components/gameboard'


describe('Gameboard test', () => {
    let gameboard: Gameboard
    let ship: Ship 
    
    
    beforeEach(() => {
        gameboard = new Gameboard()
        gameboard.init()
        ship = new Ship(3)
    })

    test('Place a new ship on the board', () => {
        expect(gameboard.setShip(ship, 1, 2, false)).toBe(true)
    })
    
    test('Try to place a new ship outside the board', () => {
        expect(gameboard.setShip(ship, 21, 23, true)).toBe(false)
    })

    test('Try to place a new ship which doesn\'t fit entirely on the board', () => {
        expect(gameboard.setShip(ship, 19, 18, false)).toBe(false)
    })

    test('Try to place a new ship on a spot not available', () => {
        let ship1: Ship
        ship1 = new Ship(3)
        gameboard.setShip(ship, 1, 2, false)
        expect(gameboard.setShip(ship1, 1, 3, true)).toBe(false)
    })

    test('Record missed attack', () => {
        gameboard.setShip(ship, 1, 2, false)
        gameboard.receiveAttack(0, 3)
        expect(gameboard.missed[0][3]).toBe(true)
    })

    test('Send the hit attack on the right ship index', () => {
        gameboard.setShip(ship, 1, 1, true)
        gameboard.receiveAttack(3, 1)
        gameboard.receiveAttack(1, 1)
        expect(gameboard.board[3][1].hits).toEqual([1, 0, 1])
    })

    test('Tells if game is over', () => {
        expect(gameboard.isGameover()).toBe(false)
    
        gameboard.setShip(ship, 1, 1, true)
        expect(gameboard.isGameover()).toBe(false)
        gameboard.receiveAttack(1, 1)
        gameboard.receiveAttack(2, 1)
        gameboard.receiveAttack(3, 1)
    
        gameboard.setShip(new Ship(3), 5, 5, false)
        gameboard.receiveAttack(5, 5)
        gameboard.receiveAttack(5, 6)
        gameboard.receiveAttack(5, 7)
        expect(gameboard.isGameover()).toBe(true)
    })


    
})