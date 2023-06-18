import * as t from "io-ts";

export const Suit = {
    Spade: 'S',
    Hart: 'H',
    Diamond: 'D',
    Club: 'C',
    Joker: 'J'
} as const;
export type Suit = typeof Suit[keyof typeof Suit];

const ioTsCardSuit = t.union([
    t.literal(Suit.Spade), //Spade
    t.literal(Suit.Hart), //Hart
    t.literal(Suit.Diamond), //Diamond
    t.literal(Suit.Club), //Club
    t.literal(Suit.Joker) //
]);

export const CardNumber = {
    A: 'A',
    N2: '2',
    N3: '3',
    N4: '4',
    N5: '5',
    N6: '6',
    N7: '7',
    N8: '8',
    N9: '9',
    N10: '10',
    J: 'J',
    Q: 'Q',
    K: 'K'
} as const;
export type CardNumber = typeof CardNumber[keyof typeof CardNumber];

const ioTsCardValue = t.union([
    t.literal(CardNumber.A),
    t.literal(CardNumber.N2),
    t.literal(CardNumber.N3),
    t.literal(CardNumber.N4),
    t.literal(CardNumber.N5),
    t.literal(CardNumber.N6),
    t.literal(CardNumber.N7),
    t.literal(CardNumber.N8),
    t.literal(CardNumber.N9),
    t.literal(CardNumber.N10),
    t.literal(CardNumber.J),
    t.literal(CardNumber.Q),
    t.literal(CardNumber.K)
]);
const ioTsCard = t.type({
  suit: ioTsCardSuit,
  value: ioTsCardValue
});

type card = t.TypeOf<typeof ioTsCard>;
export class Card implements card {
    constructor(public suit:Suit, public value:CardNumber){}
}