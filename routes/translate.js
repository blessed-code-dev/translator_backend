var express = require('express');
var router = express.Router();
var axios = require("axios").default;
var config = require("../config.json");

/* GET home page. */
router.post('/', function (req, res, next) {

	let translatedCount = 0;
	let sentCount = 0;
	let nodeLimit = config.nodeLimit;
	let apiKey = config.apiKey;
	let characterLimit = config.characterLimit;
	let characterCount = 0;
	let resBody = {};

	console.log('\n\n\nrequest accepted');
	console.log(req.body);


	for (let key in req.body) {
		if (req.body.hasOwnProperty(key) && (sentCount !== nodeLimit) && (characterCount <= characterLimit)) {
			sentCount++;
			characterCount += req.body[key].length;

			var options = {
				method: 'POST',
				url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
				params: {
					to: req.headers.to,
					'api-version': '3.0',
					profanityAction: 'NoAction',
					textType: 'plain'
				},
				headers: {
					'content-type': 'application/json',
					'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
					'x-rapidapi-key': apiKey
				},
				data: [{Text: req.body[key]}]
			};

			axios.request(options).then(function (response) {
				translatedCount++;

				console.log(response.data[0].translations[0].text);
				resBody[key] = response.data[0].translations[0].text;


				if ((translatedCount === sentCount) || Object.keys(req.body).length === translatedCount) {
					if (!res.headersSent) {
						console.log("Ответ:", characterCount, "символов", resBody);

						if (translatedCount === nodeLimit) {
							console.log('nodeLimit')
						} else if (Object.keys(req.body).length === translatedCount) {
							console.log('end of Obj')
						} else if (characterCount >= characterLimit) {
							console.log('chars limit')
						}
						res.json(resBody);
					}
				}

			}).catch(function (error) {
				console.error(error);
				if (!res.headersSent) {
					res.json(error);
				}
			});


		}
	}

});

module.exports = router;
