import Websocket, { RawData } from "ws";
import * as t from "io-ts";

const clientSendMessage = t.intersection([
    t.type({
        command: t.union([t.literal("show"),t.literal("pick")]),
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
        public detail?: any
    ) {}    
}


const s = new Websocket.Server({ port: 8090 });

s.on("connection", ws => {
    ws.on("message", (input:RawData) => {
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
            ws.send(ans1);
            return;
        }
        if(!clientSendMessage.is(receiveJson)){
            const msg2 = "clientSendMessage形式ではないメッセージが送信されました";
            console.log(msg2);
            const ans2 = JSON.stringify(new ServerSendMessage("failed", msg2));
            console.log(ans2);
            ws.send(ans2);
            return;
        }else{
            messages = receiveJson as ClientSendMessage  
        }

        if (messages.command == "show") {
            for(const client of s.clients){
                client.send("hello from server");
            }
        }
        ws.send(JSON.stringify(new ServerSendMessage("success", "コマンドが認識されました")));
    });
});