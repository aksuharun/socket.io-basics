import express from 'express'
import { createServer } from 'node:http';
import { Server } from 'socket.io'

//To get file path
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'pug')

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) =>{
	res.render(join(__dirname, "index.pug"))
})

// Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');
	
	socket.on('message:', (msg) => {
		io.emit('message', msg)
	})
	
	socket.on('disconnect', ()=>{
		console.log('a user disconnected')
	})
})


server.listen(3000,()=>{
	console.log("Server is listening")
})