import {Card} from "./Card";
import {Suit} from "./Suit";
import { CardNumber } from "./CardNumber";
import { hasUncaughtExceptionCaptureCallback } from "process";

export class CardList {
    public cards:Array<Card>

    constructor(cards:Array<Card> = []) {
        this.cards = cards;
    }

    public pick(targetCard:Card): CardInCardList {
        return new CardInCardList(targetCard, this)
    }

    public send(targetCardList:CardList, card:Card){
        //不整合をなくすためカードが存在する場合にのみ処理を実行
        const targerCard = this.cards.find(x=>x=card);

        if(card === undefined){
            throw new Error("カードが存在せず移動ができませんでした");
        }else{
            this.cards = this.cards.filter(x=>x==targerCard);
            targetCardList.cards = targetCardList.cards.concat(targerCard);    
        }       
    }

}

class CardInCardList extends Card {
    pearentCardList:CardList 

    constructor(card:Card, cardList:CardList){
        super(card.suit, card.value)
        this.pearentCardList = cardList
    }


}