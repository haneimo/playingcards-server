import Websocket, { RawData } from "ws";
import * as t from "io-ts";
import { GameBase, GameInfomation }  from './game';

const clientSendMessage = t.intersection([
    t.type({
        command: t.union([t.literal("show"),t.literal("start"),t.literal("reset")]),
    }),
    t.partial({
        detail: t.string,
    })
]);
type ClientSendMessage = t.TypeOf<typeof clientSendMessage>;

class ServerSendMessage {
    constructor(
        public status: "success"|"failed",
        public message?: string,
        public result?: GameInfomation
    ) {}   
}

let game = new GameBase()

const websocketServer = new Websocket.Server({ port: 8090 });

websocketServer.on("connection", client => {
    client.on("message", (input:RawData) => {
        console.log("Received: " + input);

        let messages:ClientSendMessage;
        let receiveJson = {};
        try {
            receiveJson = JSON.parse(input.toString())
        }catch(error){
            const msg1 = "JSON形式ではないメッセージが送信されました"
            console.log(msg1);
            const ans1 = JSON.stringify(new ServerSendMessage("failed", msg1));
            console.log(ans1);
            client.send(ans1);
            return;
        }
        if(!clientSendMessage.is(receiveJson)){
            const msg2 = "clientSendMessage形式ではないメッセージが送信されました";
            console.log(msg2);
            const ans2 = JSON.stringify(new ServerSendMessage("failed", msg2));
    
            console.log(ans2);
            client.send(ans2);
            return;
        }else{
            messages = receiveJson as ClientSendMessage  
        }
        if (messages.command == "show") {
            client.send(
                JSON.stringify(
                    new ServerSendMessage(
                        "success", 
                        "コマンドが認識されました",
                        game.showGameInfomation()
                    )
                )
            );
        } else if(messages.command == "reset"){
            //Gameをリセットする
            game = new GameBase();
            client.send(
                JSON.stringify(
                    new ServerSendMessage(
                        "success",
                        "ゲームをリセットしました",
                        game.showGameInfomation()
                    )
                )
            );            
        }
    });
});
