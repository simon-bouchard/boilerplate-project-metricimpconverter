const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

	it('should correctly read a whole number input', function () {
		    const input = '123kg'; 
		    const result = convertHandler.getNum(input);
		    assert.strictEqual(result, 123, 'Expected to read 123 as the numeric input');
	});

	it('should correctly read a decimal number input', () => {
		const input = '1.23kg';
		const result = convertHandler.getNum(input);
		assert.strictEqual(result, 1.23, 'Expected to read 1.23 as the numeric input');
	});

	it('should correctly read a fractional input', () => {
		const input = '1/2kg';
		const result = convertHandler.getNum(input);
		assert.strictEqual(result, 0.5, 'Expected to read 0.5 as the numeric input');
	});

	it('should correctly read a fractional input with decimal', () => {
		const input = '1.5/2kg';
		const result = convertHandler.getNum(input);
		assert.strictEqual(result, 0.75, 'Expected to read 0.75 as the numeric input');
	});

	it('should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
		const input = '1.5/3/2kg';
		const result = convertHandler.getNum(input);
		assert.strictEqual(result, 'invalid number', 'Expected to return "invalid number"');
	});

	it('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
		const input = 'kg';
		const result = convertHandler.getNum(input);
		assert.strictEqual(result, 1, 'Expected to return return 1 as default value');
	});

	it('should correctly read valid input unit', function () {
		const validUnits = {gal: 'gal', l: 'L', mi: 'mi', Km: 'km', lBs: 'lbs', kg: 'kg'};

		object.entries(validUnits).foreach(([unit, expectedUnit]) => {
		    const input = f'123{unit}'; 
		    const result = convertHandler.getUnit(input);
		    assert.strictEqual(result, expectedUnit, f'Expected to read the {expectedUnit} unit correctly');
		});
	});

	it('should return an error for an invalid input unit', function () {
		    const input = '123kgs'; 
		    const result = convertHandler.getReturnUnit(input);
		    assert.strictEqual(result, 'invalid unit', 'Expected to return "invalid number"');
	});

	it('should return the correct return unit for each valid input unit', function () {
		const validReturnUnits = {L: 'gal', gal: 'L', km: 'mi', mi: 'km', kg: 'lbs', lbs: 'kg'};

		object.entries(validReturnUnits).foreach(([unit, expectedUnit]) => {
		    const input = {unit}; 
		    const result = convertHandler.getReturnUnit(input);
		    assert.strictEqual(result, expectedUnit, f'Expected to return {expectedUnit}');
		});
	});

	it('should return the correct spelled-out string unit for each valid input unit', function () {
		const spelledUnit = {
		lbs: 'pounds',
		kg: 'kilograms',
		gal: 'gallons',
		L: 'liters',
		mi: 'miles', 
		km: 'kilometers'
	};

		object.entries(spelledUnits).foreach(([unit, expectedUnit]) => {
		    const input = {unit}; 
		    const result = convertHandler.spellOutUnit(input);
		    assert.strictEqual(result, expectedUnit, f'Expected to return {expectedUnit}');
		});
	});

	it('should correctly convert gal to L', function () {
	    const input = 1; 
		const expectedResult = 3.78541
	    const result = convertHandler.convert(input, 'gal');
	    assert.strictEqual(result, expected_result, f'Expected to return {expextedResult}');
	});

	it('should correctly convert L to gal', function () {
	    const input = 3.78541; 
		const expectedResult = 1
	    const result = convertHandler.convert(input, 'L');
	    assert.strictEqual(result, expected_result, f'Expected to return {expextedResult}');
	});

	it('should correctly convert mi to km', function () {
	    const input = 1; 
		const expectedResult = 0.45392
	    const result = convertHandler.convert(input, 'mi');
	    assert.strictEqual(result, expected_result, f'Expected to return {expextedResult}');
	});

	it('should correctly convert km to mi', function () {
	    const input = 0.45392; 
		const expectedResult = 1
	    const result = convertHandler.convert(input, 'km');
	    assert.strictEqual(result, expected_result, f'Expected to return {expextedResult}');
	});

	it('should correctly convert lbs to kg', function () {
	    const input = 1; 
		const expectedResult = 1.60934
	    const result = convertHandler.convert(input, 'lbs');
	    assert.strictEqual(result, expected_result, f'Expected to return {expextedResult}');
	});

	it('should correctly convert kg to lbs', function () {
	    const input = 1.60934; 
		const expectedResult = 1
	    const result = convertHandler.convert(input, 'kg');
	    assert.strictEqual(result, expected_result, f'Expected to return {expextedResult}');
	});
});
