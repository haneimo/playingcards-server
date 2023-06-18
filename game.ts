import {Card, Suit, CardNumber} from './cards';
import {computerShuffle} from './shuffle';

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
    stockCount?:number 
};

// 1回1回ゲームオブジェクトは捨てる
// もし次のゲームに引き継ぐべき情報がある場合はconstructorで指定させる。
// 点計算周りどうしようかな・・・。
export class GameBase {
    protected stock:Card[] = []
    protected players = new Map<string, Player>();
    // カードセットは順序を持たないといけない
    constructor(users:User[]=[]) {
        this.generateCardStock()
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
            stockCount: this.stock.length,
            players: Array.from(this.players.values()) //idのマスキングはあとで。
        };
    }

    moveCard(from:Card[], to: Card[]){
        const c:Card | undefined = from.shift()
        if(c!=undefined){
            to.push(c);
        }
    }

    generateCardStock(){
        const c:Card[] = [Suit.Spade, Suit.Hart, Suit.Diamond, Suit.Club].map( (suit:Suit):Card[] => { 
            return Object.values(CardNumber).map( (num:CardNumber):Card => {
                return new Card(suit, num);
            })
        }).flat();

        const j:Card[] = [
            new Card(Suit.Joker, CardNumber.A),
            new Card(Suit.Joker, CardNumber.N2)
        ];
        
        this.stock = c.concat(j);
        this.stock = computerShuffle(this.stock);
    }
}