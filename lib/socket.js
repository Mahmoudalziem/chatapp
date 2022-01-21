import { Server } from 'socket.io'

const io = new Server(sever, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});

io.on('connection', socket => {
    console.log(socket.id)
})