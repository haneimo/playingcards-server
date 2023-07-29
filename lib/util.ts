import { Card } from "./Card"
import { Suit } from "./Suit";
import { CardNumber} from "./CardNumber";
import { computerShuffle } from "./shuffle";
import { CardList } from "./CardList";

export function generateCardSet():CardList {
    const c:Card[] = [Suit.Spade, Suit.Hart, Suit.Diamond, Suit.Club].map( (suit:Suit):Card[] => { 
        return Object.values(CardNumber).map( (num:CardNumber):Card => {
            return new Card(suit, num);
        })
    }).flat();

    const j:Card[] = [
        new Card(Suit.Joker, CardNumber.A),
        new Card(Suit.Joker, CardNumber.N2)
    ];
    
    return new CardList(c.concat(j));
}