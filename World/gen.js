//some libs
var random = require('random')
var fs = require('fs')
var nmb2hex = require('../Lib/nmb2hex')
// size of chunk: 8 x 8
//OVERWORLD

//reserve data for chunk generating
var y0 = [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01] // - 0y -- 7x 
var y1 = [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01] // - 1y -- 7x
var y2 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 2y -- 7x
var y3 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 3y -- 7x
var y4 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 4y -- 7x
var y5 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 5y -- 7x
var y6 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 6y -- 7x
var y7 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 7y -- 7x
var _00 = false //is chunk has low (true) or high (false) groud
var _01 = [random.bool(), random.bool(), random.bool(), random.bool(), random.bool(), random.bool(), random.bool(), random.bool()]
var _02 = 0
var _03 = "" //hex string
var _06 = 0 //chunks generated

var _04 = fs.existsSync("../WorldChunks/") // is ../WorldChunks/ folder exists
var _05 = fs.existsSync("../WorldChunks/info") // is ../WorldChunks/info file exists

//get info file if it exists

if(_05) _06 = parseInt(fs.readFileSync("../WorldChunks/info").toString('utf8'))

//randomize _00 variable
if(random.bool() == true) {
	_00 = true
	y1 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
}

//generate y2 (y1)
_01.forEach((a) => {
	if(_00) {
		if(a) y1[_02] = 0x01
		if(!a) y1[_02] = 0x00
	}
	if(!_00) {
		if(a) y2[_02] = 0x01
		if(!a) y2[_02] = 0x00
	}
	_02++
})

//convert byte array into file
y0.forEach((a) => _03 += nmb2hex.convert(a))
y1.forEach((a) => _03 += nmb2hex.convert(a))
y2.forEach((a) => _03 += nmb2hex.convert(a))
y3.forEach((a) => _03 += nmb2hex.convert(a))
y4.forEach((a) => _03 += nmb2hex.convert(a))
y5.forEach((a) => _03 += nmb2hex.convert(a))
y6.forEach((a) => _03 += nmb2hex.convert(a))
y7.forEach((a) => _03 += nmb2hex.convert(a))

//save overworld chunk
if(!_04 && !_05) {
	fs.mkdirSync("../WorldChunks")
	fs.writeFileSync("../WorldChunks/info", "0")
	_04 = true
	_05 = true
}
if(!_05) {
	fs.writeFileSync("../WorldChunks/info", "0")
	_05 = true
}

fs.writeFileSync("../WorldChunks/chunk_overworld_" + _06, new Buffer.from(_03, 'hex'))

//save info file
_06++
fs.writeFileSync("../WorldChunks/info", `${_06}`)
