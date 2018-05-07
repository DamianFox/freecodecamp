var moment = require('moment');

// GET timestamp
module.exports.getTime = function(req, res) {
	var query = req.params.query;
	console.log(query);
	var unix = null;
    var naturalDate = null;

	if(+query >= 0){
		unix = +query;
		naturalDate = unixToNatural(unix);
	}

	if(isNaN(+query) && moment(query, "MMMM D, YYYY").isValid()){
		unix = naturalToUnix(query);
        naturalDate = unixToNatural(unix);
	}

	resObj = {
		"unix": unix, 
		"natural": naturalDate
	};

	res
		.status(200)
		.json(resObj);
};

function unixToNatural(num){
	return moment.unix(num).format("MMMM DD, YYYY");
}

function naturalToUnix(date) {
	return moment(date, "MMMM D, YYYY").format("X");
}