module.exports = (log = true, debug = true, path = "./") => {
	//some libs
	var random = require('random')
	var fs = require('fs')
	var nmb2hex = require('../Lib/nmb2hex')
	// size of chunk: 8 x 8
	//OVERWORLD

	//reserve data for chunk generating
	if(log) console.log("Chunk Generating: Step 1 \ 5")
	var y0 = [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01] // - 0y -- 7x 
	var y1 = [0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01] // - 1y -- 7x
	var y2 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 2y -- 7x
	var y3 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 3y -- 7x
	var y4 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 4y -- 7x
	var y5 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 5y -- 7x
	var y6 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 6y -- 7x
	var y7 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] // - 7y -- 7x
	var _00 = random.bool() //is chunk has low (true) or high (false) groud
	var _01 = [random.bool(), random.bool(), random.bool(), random.bool(), random.bool(), random.bool(), random.bool(), random.bool()]
	var _02 = 0
	var _03 = "" //hex string
	var _06 = 0 //chunks generated
	var _08 = 0 //chunk height

	var _04 = fs.existsSync(path + "WorldChunks/") // is ../WorldChunks/ folder exists
	var _05 = fs.existsSync(path + "WorldChunks/info") // is ../WorldChunks/info file exists
	var _07 = fs.existsSync(path + "WorldChunks/info2") // is ../WorldChunks/info2 file exists
	if(debug) console.log("[DEBUG] 04 = " + _04)
	if(debug) console.log("[DEBUG] 05 = " + _05)

	//get info file if it exists

	if(_05) _06 = parseInt(fs.readFileSync(path + "WorldChunks/info").toString('utf8'))
	if(_07) _08 = parseInt(fs.readFileSync(path + "WorldChunks/info2").toString('utf8'))

	//randomize _00 variable
	if(_00 == true) y1 = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

	//generate y2 (y1)
	if(log) console.log("Chunk Generating: Step 2 \ 5")
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
	if(log) console.log("Chunk Generating: Step 3 \ 5")
	y0.forEach((a) => _03 += nmb2hex.convert(a))
	y1.forEach((a) => _03 += nmb2hex.convert(a))
	y2.forEach((a) => _03 += nmb2hex.convert(a))
	y3.forEach((a) => _03 += nmb2hex.convert(a))
	y4.forEach((a) => _03 += nmb2hex.convert(a))
	y5.forEach((a) => _03 += nmb2hex.convert(a))
	y6.forEach((a) => _03 += nmb2hex.convert(a))
	y7.forEach((a) => _03 += nmb2hex.convert(a))

	//save overworld chunk
	if(log) console.log("Chunk Generating: Step 4 \ 5")
	if(!_04 && !_05) {
		fs.mkdirSync(path + "WorldChunks")
		fs.writeFileSync(path + "WorldChunks/info", "0")
		_04 = true
		_05 = true
	}
	if(!_05) {
		fs.writeFileSync(path + "WorldChunks/info", "0")
		_05 = true
	}
	if(!_07) {
		fs.writeFileSync(path + "WorldChunks/info2", "0")
		_07 = true
	}
	_06++
	_08++
	fs.writeFileSync(path + "WorldChunks/chunk_overworld_" + _06 + "_" + _08, new Buffer.from(_03, 'hex'))

	//save variables info fileы
	if(log) console.log("Chunk Generating: Step 5 \ 5")
	fs.writeFileSync(path + "WorldChunks/info", `${_06}`)
	fs.writeFileSync(path + "WorldChunks/info", `${_08}`)
}


