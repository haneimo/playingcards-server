curl --include \
     --no-buffer \
     --header "Connection: Upgrade" \
     --header "Upgrade: websocket" \
     --header "Host: http://localhost:8090" \
     --header "Origin: http://localhost:8090" \
     --header "Sec-WebSocket-Key: SGVsbG8sIHdvcmxkIQ==" \
     --header "Sec-WebSocket-Version: 13" \
     http://localhost:8090/


curl -i -N -H "Connection: keep-alive, Upgrade" \
           -H "Upgrade: websocket" \
           -H "Sec-WebSocket-Version: 13" \
           -H "Sec-WebSocket-Extensions: deflate-stream" \
           -H "Sec-WebSocket-Key: WIY4slX50bnnSF1GaedKhg==" \
           -H "Host: localhost:8090" \
           -H "Origin:http://localhost:8090" \
           http://localhost:8090