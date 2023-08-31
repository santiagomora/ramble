const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzles = require('../controllers/puzzle-strings.js').puzzlesAndSolutions
chai.use(chaiHttp);

suite('Functional Tests', 
  () => 
  {
    test(
      'Solve a puzzle with valid puzzle string: POST request to /api/solve',
      (done) => 
      {
        const testPuzzle = 0
        const puzzle = puzzles[testPuzzle][0]
        chai.request(server)
          .post('/api/solve')
          .send({puzzle})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{solution:puzzles[testPuzzle][1]},'Solution error')
              done()
            }
          );
      }
    )
    test(
      'Solve a puzzle with missing puzzle string: POST request to /api/solve',
      (done) => 
      {
        const testPuzzle = 1
        const puzzle = puzzles[testPuzzle][0]
        chai.request(server)
          .post('/api/solve')
          .send({})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Required field missing'},'Solution error')
              done()
            }
          );
      }
    )
    test(
      'Solve a puzzle with invalid characters: POST request to /api/solve',
      (done) => 
      {
        const testPuzzle = 2
        const puzzle = puzzles[testPuzzle][0].replace('.','t')
        chai.request(server)
          .post('/api/solve')
          .send({puzzle})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Invalid characters in puzzle'},'Solution error')
              done()
            }
          );
      }
    )
    test(
      'Solve a puzzle with incorrect length: POST request to /api/solve',
      (done) => 
      {
        const testPuzzle = 3
        const puzzle = puzzles[testPuzzle][0].replace('.','')
        chai.request(server)
          .post('/api/solve')
          .send({puzzle})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Expected puzzle to be 81 characters long'},'Solution error')
              done()
            }
          );
      }
    )
    test(
      'Solve a puzzle that cannot be solved: POST request to /api/solve',
      (done) => 
      {
        const puzzle = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        chai.request(server)
          .post('/api/solve')
          .send({puzzle})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Puzzle cannot be solved'},'Solution error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with all fields: POST request to /api/check',
      (done) => 
      {
        const testPuzzle = 3
        const puzzle = puzzles[testPuzzle][0]
        const coordinate = 'a1'
        const value = '3' 
        chai.request(server)
          .post('/api/check')
          .send({puzzle,coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{valid:true},'Placement error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with single placement conflict: POST request to /api/check',
      (done) => 
      {
        const testPuzzle = 3
        const puzzle = puzzles[testPuzzle][0]
        const coordinate = 'a2'
        const value = '6' 
        chai.request(server)
          .post('/api/check')
          .send({puzzle,coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{valid:false,conflict:['column']},'Placement error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with multiple placement conflicts: POST request to /api/check',
      (done) => 
      {
        const testPuzzle = 4
        const puzzle = puzzles[testPuzzle][0]
        const coordinate = 'a3'
        const value = '9' 
        chai.request(server)
          .post('/api/check')
          .send({puzzle,coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{valid:false,conflict:['column','region']},'Placement error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with all placement conflicts: POST request to /api/check',
      (done) => 
      {
        const testPuzzle = 0
        const puzzle = puzzles[testPuzzle][0]
        const coordinate = 'a2'
        const value = '2' 
        chai.request(server)
          .post('/api/check')
          .send({puzzle,coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{valid:false,conflict:['row','column','region']},'Placement error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with missing required fields: POST request to /api/check',
      (done) => 
      { 
        const testPuzzle = 0
        const puzzle = puzzles[testPuzzle][0]
        const coordinate = 'a2'
        const value = '2' 
        chai.request(server)
          .post('/api/check')
          .send({coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Required field(s) missing'},'Placement error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with invalid characters: POST request to /api/check',
      (done) => 
      {
        const testPuzzle = 0
        const puzzle = puzzles[testPuzzle][0].replace('.','t')
        const coordinate = 't2'
        const value = '2' 
        chai.request(server)
          .post('/api/check')
          .send({puzzle,coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Invalid characters in puzzle'},'Placement error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with incorrect length: POST request to /api/check',
      (done) => 
      {
        const testPuzzle = 0
        const puzzle = puzzles[testPuzzle][0].replace('.','')
        const coordinate = 't2'
        const value = '2' 
        chai.request(server)
          .post('/api/check')
          .send({puzzle,coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Expected puzzle to be 81 characters long'},'Placement error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with invalid placement coordinate: POST request to /api/check',
      (done) => 
      {
        const testPuzzle = 0
        const puzzle = puzzles[testPuzzle][0]
        const coordinate = 't2'
        const value = '2' 
        chai.request(server)
          .post('/api/check')
          .send({puzzle,coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Invalid coordinate'},'Placement error')
              done()
            }
          );
      }
    )
    test(
      'Check a puzzle placement with invalid placement value: POST request to /api/check',
      (done) => 
      {
        const testPuzzle = 0
        const puzzle = puzzles[testPuzzle][0]
        const coordinate = 'a2'
        const value = 'p' 
        chai.request(server)
          .post('/api/check')
          .send({puzzle,coordinate,value})
          .end(
            function(err, res)
            {
              assert.equal(res.status, 200,'Server error');
              assert.deepEqual(res.body,{error:'Invalid value'},'Placement error')
              done()
            }
          );
      }
    )
  }
);

