import {describe, expect, test} from '@jest/globals';
import { Ship } from '../src/components/ship';

describe('Ship test', () => {
    let ship: Ship

    beforeEach(() => {
        ship = new Ship(3)
    })

    test('Create a new ship', () => {
        expect(ship).toEqual({length: 3, hits: [0, 0, 0]})
    })

    test('Receive two hits', () => {
        ship.hit(0)
        ship.hit(1)
        expect(ship.hits).toEqual([1, 1, 0])
    })

    test('Sink ship', () => {
        for (let i = 0; i < 3; i++) ship.hit(i)
        expect(ship.isSunk()).toBe(true)
    })

    test('Prevent to be hit too many times', () => {
        for (let i = 0; i < 4; i++) ship.hit(i)
        expect(ship.hits.filter((el) => el === 1).length).toBe(3)
    })
})