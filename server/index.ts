import Websocket, { RawData } from "ws";
import { PlayingCardServer, ServerSendMessage } from "./lib/PlayingCardServer";


//users=anna:SecletKey,banana:SecletKey,cherry:SecletKey,
const ws = new Websocket.Server({ port: 8090 });

function messagePutter(message:ServerSendMessage){
    for( const client of ws.clients){
        client.send(JSON.stringify(message))
    }
}

const playingCardServer = new PlayingCardServer(messagePutter)

ws.on("connection", client => {
    
    client.on("message", (input:RawData) => {
        playingCardServer.processMessage(input);
    });

    

});
