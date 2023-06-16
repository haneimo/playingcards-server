import {Card, Suit, CardNumber} from './cards';
class GameBase {
    // カードセットは順序を持たないといけない
    constructor(protected cardMountain:Card[]){}
    generateSet(){
        const c:Card[] = [Suit.Spade, Suit.Hart, Suit.Diamond, Suit.Club].map( (suit:Suit):Card[] => { 
            return Object.values(CardNumber).map( (num:CardNumber):Card => {
                return new Card(suit, num);
            })
        }).flat();

        const j:Card[] = [
            new Card(Suit.Joker, CardNumber.A),
            new Card(Suit.Joker, CardNumber.N2)
        ];
        
        this.cardMountain = c.concat(j);
        console.debug(this.cardMountain.join('\n'));
    }
}