import {describe, expect, test} from '@jest/globals';
import { Ship } from '../src/components/ship';
import { Gameboard } from '../src/components/gameboard'
import { Player } from '../src/components/player'

describe('Gameboard test', () => {
    let player: Player
    let gameboard: Gameboard
    let ship: Ship 

    beforeEach(() => {
        gameboard = new Gameboard()
        gameboard.init()
        player = new Player('Player 1')
        ship = new Ship(3)
    })

    test('Create a new player', () => {
        expect(player).toEqual({name: 'Player 1', shots: []})
    })

    test('Attack gameboard', () => {
        gameboard.setShip(ship, 1, 1, false)
        player.attack(1, 1, gameboard)
        player.attack(1, 2, gameboard)
        player.attack(1, 3, gameboard)
        expect(gameboard.isGameover()).toBe(true)
    })

    test('Prevent attack on the same spot', () => {
        gameboard.setShip(ship, 1, 1, false)
        player.attack(1, 1, gameboard)
        expect(player.isAlreadyShot(1, 1)).toBe(true)
    })

    test('Make random play', () => {
        player.makeRandomPlay(gameboard)
        player.makeRandomPlay(gameboard)
        expect(player.shots.length).toBe(2)
    })

})