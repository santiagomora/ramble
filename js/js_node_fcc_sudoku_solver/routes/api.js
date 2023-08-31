'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const Sudoku = require('../sudoku/Sudoku.js');
const validator = require('./validator.js')


module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post(
      validator.verifyBody(['puzzle','coordinate','value'],{error:'Required field(s) missing'}),
      (req, res) => 
      {
        const {puzzle,coordinate,value} = req.body
        let error;
        if( (error = Sudoku.isValidString(puzzle))
            || (error =Sudoku.validateCoordinate(coordinate)
            || (error = Sudoku.validateValue(value)) ) )
        {
          return res.status(200).json({error})
        }
        const {col,row} = Sudoku.getCoordinates(coordinate) 
        const conflict = []
        if( error=solver.checkRowPlacement(puzzle,row,col,value))
        {
          conflict.push(error)
        }
        if(error=solver.checkColPlacement(puzzle,row,col,value))
        {
          conflict.push(error)
        }
        if(error=solver.checkRegionPlacement(puzzle,row,col,value))
        {
          conflict.push(error)
        }
        if(conflict.length>0)
        {
          return res.status(200).json({valid:false,conflict})
        }
        return res.status(200).json({valid:true})
      }
    );
    
  app.route('/api/solve')
    .post(
      validator.verifyBody(['puzzle'],{error:'Required field missing'}),
      (req, res) => 
      {
        const {puzzle} = req.body
        let error,solution
        if( error = Sudoku.isValidString(puzzle))
        {
          return res.status(200).json({error})
        }
        const sudoku = new Sudoku(puzzle)
        if( solution = sudoku.solve() )
        {
          return res.status(200).json({solution})
        }
        return res.status(200).json({error:'Puzzle cannot be solved'})
      }
    );
};
