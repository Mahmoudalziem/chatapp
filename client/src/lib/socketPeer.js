import { io } from 'socket.io-client'
import Peer from 'peerjs'

const socket = io("ws://127.0.0.1:3001", {
    ssl: true,
    debug: true
});

const peer = new Peer({
    host: "localhost",
    port: 3001,
    path: "/"
});


const iniSocket = () => {
    return (
        socket.on('connect', () => {

            console.log(socket.id)

        })
    )
};

const iniPeer = () => {

    return (peer.on('open', id => {

        console.log(id);

    }))
};

export { socket, peer, iniSocket, iniPeer };