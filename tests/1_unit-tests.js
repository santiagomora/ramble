const chai = require('chai');
const assert = chai.assert;
const {puzzlesAndSolutions} = require('../controllers/puzzle-strings.js')
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite(
  'UnitTests', 
  () => 
  {
    test(
      'Logic handles a valid puzzle string of 81 characters', 
      function(done)
      {
        const equalTest = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test; 
        test = solver.validate(equalTest)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'','Validation not working on valid puzzle')
        done()
      }
    );
    test(
      'Logic handles a puzzle string with invalid characters (not 1-9 or .)', 
      function(done)
      {
        const errorTest = '..9..5.1.d5.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        test = solver.validate(errorTest)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'Invalid characters in puzzle','Validation not working on invalid puzzle')
        done()
      }
    );
    test(
      'Logic handles a puzzle string that is not 81 characters in length', 
      function(done)
      {
        const shortTest = '12991923...2'
        const longTest = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..229'
        let test
        test = solver.validate(shortTest)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'Expected puzzle to be 81 characters long','Length validation not working on short puzzle')
        test = solver.validate(longTest)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'Expected puzzle to be 81 characters long','Invalid string length not detected','Length validation not working on long puzzle')
        done()
      }
    );
    test(
      'Logic handles a valid row placement', 
      function(done)
      {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test,place
        test = solver.validate(testPuzzle)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'')
        place = solver.checkRowPlacement(testPuzzle,0, 0, '3')
        assert.isString(place,'Solver placement does not return a string')
        assert.equal(place,'','Error on valid row placement')
        done()
      }
    );
    test(
      'Logic handles an invalid row placement', 
      function(done)
      {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test,place
        test = solver.validate(testPuzzle)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'')
        place = solver.checkRowPlacement(testPuzzle,0, 0, '9')
        assert.isString(place,'Solver placement does not return a string')
        assert.equal(place,'row','Invalid row placement not detected')
        done()
      }
    );
    test(
      'Logic handles a valid column placement', 
      function(done)
      {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test,place
        test = solver.validate(testPuzzle)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'')
        place = solver.checkColPlacement(testPuzzle,0, 0, '3')
        assert.isString(place,'Solver placement does not return a string')
        assert.equal(place,'','Error on valid column placement')
        done()
      }
    );
    test(
      'Logic handles an invalid column placement', 
      function(done)
      {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test,place
        test = solver.validate(testPuzzle)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'')
        place = solver.checkColPlacement(testPuzzle,0, 0, '1')
        assert.isString(place,'Solver placement does not return a string')
        assert.equal(place,'column','Invalid column placement not detected')
        done()
      }
    );
    test(
      'Logic handles a valid region (3x3 grid) placement', 
      function(done)
      {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test,place
        test = solver.validate(testPuzzle)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'')
        place = solver.checkRegionPlacement(testPuzzle,0, 0, '1')
        assert.isString(place,'Solver placement does not return a string')
        assert.equal(place,'','Error on valid region placement')
        done()
      }
    );
    test(
      'Logic handles an invalid region (3x3 grid) placement', 
      function(done)
      {
        const testPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test,place
        test = solver.validate(testPuzzle)
        assert.isString(test,'Solver validation does not return a string')
        assert.equal(test,'')
        place = solver.checkRegionPlacement(testPuzzle,0, 0, '4')
        assert.isString(place,'Solver placement does not return a string')
        assert.equal(place,'region','Invalid region placement not detected')
        done()
      }
    );
    test(
      'Valid puzzle strings pass the solver', 
      function(done)
      {
        let test
        const puzzle = puzzlesAndSolutions[0]
        //for(let puzzle of puzzlesAndSolutions)
        //{
          test = solver.solve(puzzle[0])
          assert.isString(test,'Solver validation does not return a string')
          assert.equal(test,puzzle[1],'Invalid puzzle string')
        //}
        done()
      }
    );
    test(
      'Invalid puzzle strings fail the solver', 
      function(done)
      {
        let invalidTestPuzzle = '111.123'
        let test
        test = solver.solve(invalidTestPuzzle)
        assert.isString(test,'Expected puzzle to be 81 characters long','Solver not detecting invalid length puzzles')
        invalidTestPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.e'
        test = solver.solve(invalidTestPuzzle,)
        assert.equal(test,'Invalid characters in puzzle','Solver not detecting invalid character puzzles')
        done()
      }
    );

    test(
      'Solver returns the expected solution for an incomplete puzzle', 
      function(done)
      {
        let invalidTestPuzzle = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test
        test = solver.solve(invalidTestPuzzle)
        assert.isString(test,'','Solver should return a string when solving a puzzle')
        assert.equal(test,'','Solver solved a puzzle without solution')
        done()
      }
    );
  }
);
