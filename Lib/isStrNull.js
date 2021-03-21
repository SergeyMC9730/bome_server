module.exports = (str) => {
	// get string
	var a = "" + str
	// is string equals to "null", "undefined" or "NaN"
	if(a === "undefined" || a === "null" || a === "NaN") {
		return true
	} else return false
}
