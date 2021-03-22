module.exports = (options) => {	
	//libs
	var wsocket = require('ws')
	var wss = new wsocket.Server({port: options.port})
	console.log("Server started!")
	wss.on('connection', async (ws) => {
		console.log("New connection.")
		ws.on('message', async (msg) => {
			console.log("New message from connection: \"" + msg + "\"")
		})
	})
}
