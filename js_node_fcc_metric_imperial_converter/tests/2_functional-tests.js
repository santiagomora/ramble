const chaiHttp = require('chai-http');
const chai = require('chai');
let { assert,
      expect } = chai;

const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', 
      function() {
        test( "Convert a valid input such as 10L: GET request to /api/convert.", 
              async function(){
                const input = "10L"
                await chai.request(server)
                          .get('/api/convert')
                          .query({input})
                          .then((res) => {
                                  const expected = {"initNum":10,
                                                    "initUnit":"L",
                                                    "returnNum":2.64172,
                                                    "returnUnit":"gal",
                                                    "string":"10 liters converts to 2.64172 gallons"}
                                  expect(res).to.be.json
                                  expect(res).to.have.status(200);
                                  assert.deepEqual(res.body,expected) })
                          .catch((err) => {
                                  assert.fail(err);
                                  throw err; }) })
        
        test( "Convert an invalid input such as 32g: GET request to /api/convert.",
              async function(){
                const input = "32g"
                await chai.request(server)
                          .get('/api/convert')
                          .query({input})
                          .then((res) => {
                                  const expected = "invalid unit"
                                  expect(res).to.be.json
                                  expect(res).to.have.status(200);
                                  assert.equal(res.body,expected) })
                          .catch((err) => {
                                  assert.fail(err);
                                  throw err; }) })

        test( "Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.",
              async function(){
                const input = "3/7.2/4kg"
                await chai.request(server)
                          .get('/api/convert')
                          .query({input})
                          .then((res) => {
                                  const expected = "invalid number"
                                  expect(res).to.be.json
                                  expect(res).to.have.status(200);
                                  assert.equal(res.body,expected) })
                          .catch((err) => {
                                  assert.fail(err);
                                  throw err; }) })

        test( "Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.", 
              async function(){
                const input = "33/7.2/4kilomegagram"
                await chai.request(server)
                          .get('/api/convert')
                          .query({input})
                          .then((res) => {
                                  const expected = "invalid number and unit"
                                  expect(res).to.be.json
                                  expect(res).to.have.status(200);
                                  assert.equal(res.body,expected) })
                          .catch((err) => {
                                  assert.fail(err);
                                  throw err; }) })

        test( "Convert with no number such as kg: GET request to /api/convert.", 
              async function(){
                const input = "kg"
                await chai.request(server)
                          .get('/api/convert')
                          .query({input})
                          .then((res) => {
                                  const expected = {"initNum":1,
                                                    "initUnit":"kg",
                                                    "returnNum":2.20462,
                                                    "returnUnit":"lbs",
                                                    "string":"1 kilograms converts to 2.20462 pounds"}
                                  expect(res).to.be.json
                                  expect(res).to.have.status(200);
                                  assert.deepEqual(res.body,expected) })
                          .catch((err) => {
                                  assert.fail(err);
                                  throw err; })
                          .finally(() => {
                                    /*requester.close();*/ }) }) });
