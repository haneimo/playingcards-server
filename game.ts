import { Card} from './lib/Card';
import { CardList } from './lib/CardList';
import { CardNumber } from './lib/CardNumber';
import { Suit } from './lib/Suit';
import {computerShuffle} from './lib/shuffle';
import { generateCardDeck } from './lib/util';

export type User = {
    id:string, //一意に特定できるのであれば任意の数字
    name:string 
};

type Player = User & {
    hands:Card[],
    handCount?:number
};

export type GameInfomation = {
    players:Player[],
    stock:Card[], 
};

export class GameBase {
    protected stock:CardList;
    protected players = new Map<string, Player>();
    // カードセットは順序を持たないといけない
    constructor(users:User[]=[]) {
        this.stock = generateCardDeck()
        for(const user of users){
            this.players.set(
                user.id, 
                Object.assign(user,{ hands:[]})
            );
        }
    }

    // 現時点の場/手札の情報を表示する
    // 第一引数でユーザーを指定するとユーザーに開示すべき情報のみ表示
    // OPENを指定するとすべてのカードを見れる。
    // 山札のような情報でも次の順序まで見られる。
    showGameInfomation(userId?: number):GameInfomation{
        return {
            stock: this.stock,
            players: Array.from(this.players.values()) //idのマスキングはあとで。
        };
    }

    moveCard(from:Card[], to: Card[]){
        const c:Card | undefined = from.shift()
        if(c!=undefined){
            to.push(c);
        }
    }

}