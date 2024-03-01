import express from 'express'
import { createServer } from 'node:http';
import { Server } from 'socket.io'

//To get file path
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express()
const server = createServer(app)
const io = new Server(server, {
	connectionStateRecovery: {}
})

const port = 3000

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'pug')

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) =>{
	res.render(join(__dirname, "index.pug"))
})



io.on('connection', (socket) => {
	socket.emit('system-message', 'A user connected!')

	socket.on('chat-message:', (msg) => {
		io.emit('chat-message', msg)
	})
	
	socket.on('system-message', (msg) => {
		io.emit('system-message', msg)
	})
	
	socket.on('disconnecting', () => {
		io.emit('system-message', 'A user disconnected!')
	})
})


server.listen(3000,()=>{
	console.log("Server is listening on http://localhost:" + port)
})