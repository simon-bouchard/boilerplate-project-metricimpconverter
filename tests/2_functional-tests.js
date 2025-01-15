const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

	test('10L GET', (done) => { 
		const expectedResponse = {initNum: 10,initUnit:"L",returnNum:2.64172,returnUnit:"gal",string:"10 liters converts to 2.64172 gallons"} 
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=10L')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200')
				assert.deepEqual(res.body, expectedResponse, `Response should be ${expectedResponse}`)
				done()
			});
		})

	test('32g GET', (done) => { 
		const expectedResponse = 'invalid unit' 
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=32g')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200')
				assert.deepEqual(res.text, expectedResponse, `Response should be ${expectedResponse}`)
				done()
			});
		})

	test('3/7.2/4kg GET', (done) => { 
		const expectedResponse = 'invalid number' 
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=3/7.2/4kg')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200')
				assert.deepEqual(res.text, expectedResponse, `Response should be ${expectedResponse}`)
				done()
			});
		})

	test('3/7.2/4kgg GET', (done) => { 
		const expectedResponse = 'invalid number and unit' 
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=3/7.2/4kgg')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200')
				assert.deepEqual(res.text, expectedResponse, `Response should be ${expectedResponse}`)
				done()
			});
		})

	test('L GET', (done) => { 
		const expectedResponse = {initNum: 1,initUnit:"L",returnNum:0.26417,returnUnit:"gal",string:"1 liters converts to 0.26417 gallons"} 
		chai
			.request(server)
			.keepOpen()
			.get('/api/convert?input=L')
			.end((err, res) => {
				assert.equal(res.status, 200, 'Response status should be 200')
				assert.deepEqual(res.body, expectedResponse, `Response should be ${expectedResponse}`)
				done()
			});
		})
});
