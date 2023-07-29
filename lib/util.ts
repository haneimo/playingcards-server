import { Card } from "./Card"
import { Suit } from "./Suit";
import { CardNumber} from "./CardNumber";
import { CardList } from "./CardList";

export function generateCardDeck(jockerCounrt: 0|1|2 = 0):CardList {
    const c:Card[] = [Suit.Spade, Suit.Hart, Suit.Diamond, Suit.Club].map( (suit:Suit):Card[] => { 
        return Object.values(CardNumber).map( (num:CardNumber):Card => {
            return new Card(suit, num);
        })
    }).flat();

    if( jockerCounrt == 1 ){
        c.push(new Card(Suit.Joker, CardNumber.A))
    } else if(jockerCounrt == 2 ) {
        c.push(new Card(Suit.Joker, CardNumber.A))
        c.push(new Card(Suit.Joker, CardNumber.N2))
    }
    return new CardList(c);
}