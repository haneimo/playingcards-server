const server = require("ws").Server;
const s = new server({ port: 8090 });

const clients = new Set();

s.on("connection", ws => {
    clients.add(ws);

    ws.on("message", message => {
        console.log("Received: " + message);

        if (message == "hello") {
            ws.send("hello from server");
        }

        if (message == "here") {
            for (const client of clients) {
                if(ws !== client){
                    client.send("other send '"+ message + "'");
                }
            }
        }
    });
});