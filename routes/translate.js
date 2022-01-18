var express = require('express');
var router = express.Router();
var axios = require("axios").default;

/* GET home page. */
router.post('/', function (req, res, next) {


	console.log('connected')
	console.log(req.headers)
	console.log(req.body)


	for (let key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			console.log(req.body[key] = ''.padEnd(req.body[key].length, "22222 "))
		}
	}

	setTimeout(()=>{res.json(req.body)},500)
	// var options = {
	// 	method: 'POST',
	// 	url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
	// 	params: {
	// 		to: 'de',
	// 		'api-version': '3.0',
	// 		profanityAction: 'NoAction',
	// 		textType: 'plain'
	// 	},
	// 	headers: {
	// 		'content-type': 'application/json',
	// 		'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
	// 		'x-rapidapi-key': '82dcf3c090msh3e66c3682cd737cp1c7693jsne9a780818f99'
	// 	},
	// 	data: [{Text: 'I would really like to drive your car around the block a few times.'}]
	// };
	//
	// axios.request(options).then(function (response) {
	// 	console.log(response.data[0].translations);
	// }).catch(function (error) {
	// 	console.error(error);
	// });


});

module.exports = router;
