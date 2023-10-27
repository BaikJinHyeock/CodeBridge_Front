import React from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios'


const LiveChat = () => {

    const socket = new W3CWebSocket('ws://localhost:8085/CodeBridge/websocket');

    socket.onopen = () => {
        console.log('WebSocket 연결 성공');
    };

    socket.onmessage = (event) => {
        const message = event.data;
        console.log('받은 메시지:', message);
    };

    axios.get('http://localhost:8085/CodeBridge/member/your-endpoint')
        .then(response => {
            console.log('성공?', response.data);
        })
        .catch(error => {
            console.error(error);
        });




    return (
        <div>



        </div>
    )
}

export default LiveChat