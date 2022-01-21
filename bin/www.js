import http from 'http'
import app from '../index'
import dotenv from 'dotenv'
import '../lib/monDB'
import { Server } from 'socket.io'
import { ExpressPeerServer } from 'peer'

dotenv.config();

const users = [];

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});

io.on('connection', socket => {

    socket.on('join-room', (data) => {

        const { room, username } = data;

        const userData = {
            userID: socket.id,
            createAt: Date.now(),
            text: `${username} joined ${room}`,
            ...data
        }

        !users.some((user) => user.userID === socket.id) && users.push(userData);

        socket.join(room);

        socket.to(room).emit('message', userData);

        console.log(users);
    });


    socket.on('chat', data => {

        socket.to(data.room).emit('message', data);
    });

    socket.on("disconnect", () => {

        users.filter((user) => user.userID !== socket.id);

        console.log(users);
    });

});

const peerServer = ExpressPeerServer(server, { debug: true, ssl: true });

peerServer.on('connection', (peer) => {

    console.log(peer.id);
});

app.use('/', peerServer);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`Server Start At ${PORT}`)
});