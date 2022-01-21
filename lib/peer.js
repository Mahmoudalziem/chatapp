import { ExpressPeerServer } from 'peer'

const peerServer = ExpressPeerServer(server, { debug: true, ssl: true });

peerServer.on('connection', peer => {
    console.log(peer.id)
})
app.use('/', peerServer);