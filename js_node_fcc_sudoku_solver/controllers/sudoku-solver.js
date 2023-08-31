const Sudoku = require('../sudoku/Sudoku.js')
const { floor } = require('mathjs');

class SudokuSolver {

  validate(puzzleString) 
  {
    return Sudoku.isValidString(puzzleString)
  }

  checkRowPlacement(puzzleString, row, column, value) 
  {
    const sudoku = new Sudoku(puzzleString)
    if( ( sudoku.rows[row][column]===value
          &&sudoku.isValid() )
        || !sudoku.isNotValidAtRow(row,value) )
    {
      return '' 
    } 
    return 'row'
  }

  checkColPlacement(puzzleString, row, column, value) 
  {
    const sudoku = new Sudoku(puzzleString)
    if( ( sudoku.rows[row][column]===value 
          &&sudoku.isValid() )
          || !sudoku.isNotValidAtColumn(column,value) )
    {
      return '' 
    }
    return 'column'
  }

  checkRegionPlacement(puzzleString, row, column, value)
  {
    const sudoku = new Sudoku(puzzleString)
    if( ( sudoku.rows[row][column]===value 
          &&sudoku.isValid() )
          || !sudoku.isNotValidAtCellGroup(column,row,value) )
    {
      return ''
    }
    return 'region' 
  }

  solve(puzzleString) 
  {
    let validate
    if(validate = this.validate(puzzleString))
    {
      return validate
    }
    const sudoku = new Sudoku(puzzleString)
    return sudoku.solve()
  }
}

module.exports = SudokuSolver;

