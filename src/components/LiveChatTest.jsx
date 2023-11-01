import React, { Component } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import style from "../SCSS/pages/_chat.module.scss";

class LiveChatTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: '',
            name: sessionStorage.getItem("user_nick") || '',
        };
        this.stompClient = null;
    }

    componentDidMount() {
        this.initializeWebSocket();
    }

    initializeWebSocket = () => {
        const socket = new SockJS("http://localhost:8085/CodeBridge/websocket");
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
            this.stompClient.subscribe('/topic/public', (message) => {
                const messageData = JSON.parse(message.body);
                this.addMessage(messageData);
            });
        });
    };
    sendMessage = () => {
        try {
            const message = {
                name: this.state.name,
                content: this.state.message,
            };
            if (!this.stompClient || !this.stompClient.connected) {
                throw new Error('WebSocket connection is not established yet.');
            }
            this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
            this.setState({ message: '' });
        } catch (error) {
            console.error('An error occurred while sending the message:', error);
        }
    };

    addMessage = (message) => {
        this.setState((prevState) => ({
            messages: [...prevState.messages, message],
        }));
    };

    render() {
        return (

            <div className={style.wrap_container}>
                <div className={style.wrap_container_top}>
                    {/* <span>
                        {sessionStorage.getItem("memberId")}
                    </span> */}
                    {this.state.messages.map((message, index) => (
                        <div key={index} className={style.wrap_container_top_detail}>
                            <span>{message.name}({sessionStorage.getItem("user_name")})</span> 
                            <div>{message.content}</div>
                        </div>
                    ))}
                </div>
                <div className={style.wrap_container_bottom}>
                    <input
                        type="text"
                        placeholder="Message"
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })}
                    />
                    <button onClick={this.sendMessage}>Send</button>
                </div>
            </div>

        );
    }
}

export default LiveChatTest;
