import { Card} from './Card';
import { CardList } from './CardList';
import { CardNumber } from './CardNumber';
import { Suit } from './Suit';
import {computerShuffle} from './shuffle';
import { generateCardDeck } from './util';

type PLAYER = "PLAYER"
type GAME_MASTER = "GAME_MASTER"
type OBSERVER = "OBSERVER"
type ALL_SEEING_OBSERVER = "ALL_SEEING_OBSERVER"
type UserRoll = PLAYER | GAME_MASTER | OBSERVER | ALL_SEEING_OBSERVER

export type User = {
    id:string, //一意に特定できるのであれば任意の数字
    name:string 
    roll:UserRoll
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
    constructor(playerIds) {
        this.stock = generateCardDeck()
        for(const user of users){
            this.players.set(
                user.id, 
                Object.assign(user,{ hands:[]})
            );
        }
    }

    // userを登録する
    entryUser(id, name, roll):void {

    }

    // ゲームをリセットするためのコマンド
    reset():void {

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