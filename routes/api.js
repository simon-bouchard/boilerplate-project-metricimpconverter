'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const bodyParser = require('body-parser');

module.exports = function (app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
  
	let convertHandler = new ConvertHandler();

	app.get('/api/convert', (req, res) => {
		let input = req.query.input;

		let initNum = convertHandler.getNum(input);
		let initUnit = convertHandler.getUnit(input);
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		let returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

		if ((initNum == 'invalid number') && (returnUnit == 'invalid unit')) {
			return res.send('invalid number and unit');
		} else if (initNum == 'invalid number') {
			return res.send('invalid number');
		} else if (returnUnit == 'invalid unit') {
			return res.send('invalid unit');
		} else {
 
		res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: returnString});

		}
	});

};
