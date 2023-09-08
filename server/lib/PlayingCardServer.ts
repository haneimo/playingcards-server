import * as t from "io-ts";
import { GameBase } from "./GameBase";

const clientSendMessage = t.intersection([
    t.type({
        command: t.union([t.literal("show"),t.literal("start"),t.literal("reset")]),
    }),
    t.partial({
        detail: t.string,
    })
]);
type ClientSendMessage = t.TypeOf<typeof clientSendMessage>;

export class ServerSendMessage {
    constructor(
        public status: "success"|"failed",
        public message?: string,
    ) {}   
}

export class PlayingCardServer{
    private putMessage:(ServerSendMessage:ServerSendMessage)=>void
    private game:GameBase

    constructor(messagePutter :(ServerSendMessage:ServerSendMessage)=>void){
        this.putMessage = messagePutter
    }

    processMessage(nonCheckMessage:any){
        this.processMessageCheckAfter(this.convertMessage(nonCheckMessage))
    }

    convertMessage(input:any):ClientSendMessage {
        let messages:ClientSendMessage;
        let receiveJson = {};

        try {
            receiveJson = JSON.parse(input.toString())
        }catch(error){
            const msg1 = "JSON形式ではないメッセージが送信されました"
            this.putMessage(new ServerSendMessage("failed", msg1));
            throw Error(msg1);
        }

        if(!clientSendMessage.is(receiveJson)){
            const msg2 = "clientSendMessage形式ではないメッセージが送信されました";
            this.putMessage(new ServerSendMessage("failed", msg2))
            throw Error(msg2);
        }

        return receiveJson as ClientSendMessage;
    }

    processMessageCheckAfter(messages:ClientSendMessage){
        if (messages.command == "show") {
            this.putMessage(
                    new ServerSendMessage(
                        "success", 
                        "コマンドが認識されました",
                    )
                );
            
        } else if(messages.command == "reset"){
            //Gameをリセットする
            this.game.reset()
            this.putMessage(                
                    new ServerSendMessage(
                        "success",
                        "ゲームをリセットしました",
                        //game.showGameInfomation()
                    )
                );            
        }
    }
}

