//libs
var random = require('random')
var isStrNuOrN = require("./Lib/isStrNull")
var fs = require('fs')
var cfl = require('./Lib/cfl')
var chunkgen = require('./World/gen')
var startsocket = require('./Socket/startsocket')
//get some data from user's arguments
var options = {
	port: parseInt(process.argv[2]),
	world: process.argv[3],
	maxplayers: parseInt(process.argv[4])
}
//fix arguments
if(options.maxplayers == 0 || options.maxplayers < 0) options.maxplayers = 1
if(options.maxplayers > 8) options.maxplayers = 8
if(isStrNuOrN(options.maxplayers)) options.maxplayers = random.int(1, 8)

if(isStrNuOrN(options.world)) {
	if(fs.existsSync("WorldChunks/info")) options.world = "current"
	if(!fs.existsSync("WorldChunks/info")) options.world = "new"
}
if(options.world !== "current" && options.world !== "new") {
	if(fs.existsSync("WorldChunks/info")) options.world = "current"
	if(!fs.existsSync("WorldChunks/info")) options.world = "new"
}

//throw error if world is not exists 
if(options.world === "current" && !fs.existsSync("./WorldChunks/")) throw new Error("World is not found")
if(options.world === "new" && fs.existsSync("./WorldChunks") && fs.existsSync("./WorldChunks/info") && fs.existsSync("./WorldChunks/info2")) throw new Error("World is found but cannot create new folder \"WorldChunks\" because this folder is already exists!")

if(options.port < 0) options.port = random.int(8033, 65535)
if(options.port > 65535) options.port = random.int(8033, 65535)
if(isStrNuOrN(options.port)) options.port = random.int(8033, 65535)

//start server
console.log(`Server options:\n Port: ${options.port}\n World: ${cfl(options.world)}\n Max player count: ${options.maxplayers}`)
console.log(`Starting server...`)

if(options.world === "new") chunkgen(true, false, "./")
startsocket(options)
