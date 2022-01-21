import { io } from 'socket.io-client'
import Peer from 'peerjs'

const socket = io("https://chatapp-lication.herokuapp.com", {
    ssl: true,
    debug: true
});

const peer = new Peer({
    host: "https://chatapp-lication.herokuapp.com",
    // port: 3001,
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