import * as t from "io-ts";

export const Suit = {
    Spade: 'S',
    Hart: 'H',
    Diamond: 'D',
    Club: 'C',
    Joker: 'J'
} as const;
export type Suit = typeof Suit[keyof typeof Suit];



