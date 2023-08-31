const { floor } = require('mathjs');
const {SUDOKU_ROW_LENGTH} = require('./constants');
const {getPaddedArray,getPermutations,getCellGroups,transposeString} = require('./methods')

module.exports = class Sudoku
{
    constructor(sudokuString)
    {
        this.string = sudokuString;
        this.rows = this.getRows()
        this.columns = this.getColumns()
        this.cellGroups = this.getCellGroups()
    }

    static isValidString(puzzleString)
    {
      if(puzzleString.length!==81)
      {
        return 'Expected puzzle to be 81 characters long'
      }
      if(/[^\.\d]/gi.test(puzzleString))
      {
        return 'Invalid characters in puzzle'
      }
      return ''
    }

    static validateCoordinate( coord )
    {
      if(!/^[ABCDEFGHI]\d$/.test(coord.toUpperCase()))
      {
        return 'Invalid coordinate'
      } 
      return ''
    }

    static validateValue( value )
    {
      if(!/^\d$/.test(value))
      {
        return 'Invalid value'
      }
      return ''
    }

    static getCoordinates( coordinate )
    {
      const rowCoordinateMap = [
        'A','B','C','D','E','F','G','H','I'
      ]
      let [row,col] = coordinate.toUpperCase().split('');
      return {
        col:parseInt(col-1),
        row:rowCoordinateMap.indexOf(row)
      }
    }

    getRows()
    {
        return this.string
            .match(/(.{9})/gi)
            .map(e => e.split('')); 
    }

    getColumns()
    {
        return transposeString(this.string,SUDOKU_ROW_LENGTH)
            .match(/(.{9})/gi)
            .map(e => e.split(''))
    }

    getCellGroups()
    {
        return getCellGroups(this.getRows())
    }

    getEmptyPositions( rowMap )
    {
        let res = []
        for(let i=0;i<rowMap.length;i++)
        {
            if(rowMap[i]==='.')
            {
                res.push(i)
            }
        }
        return res
    }


    isNotValidAtColumn( colPosition,element )
    {
        const col = this.columns[colPosition]
        return col.indexOf(element)>=0
    }

    isNotValidAtRow( rowPosition,element )
    {
        const row = this.rows[rowPosition]
        return row.indexOf(element)>=0
    }

    isNotValidAtCellGroup( colPosition,rowPosition,element )
    {
        const cellGroupPosition = 3*floor(rowPosition/3)+floor(colPosition/3)
        const group = this.cellGroups[cellGroupPosition]
        return group.indexOf(element)>=0
    }

    buildRowFromPermutation(rowMap,permutation)
    {
        let permIndex = 0;
        return rowMap.map(
            e => 
            (
                (e==='.')
                    ? permutation[permIndex++]
                    : e
            )
        )
    }

    isValidPermutation( rowMap,rowPosition )
    {
        return (permutation) => 
        {
            const empty = this.getEmptyPositions(rowMap,permutation)
            for(let i=0;i<empty.length;i++)
            {
                if( this.isNotValidAtColumn(empty[i],permutation[i])
                    || this.isNotValidAtCellGroup(empty[i],rowPosition,permutation[i]) )
                {
                    return null
                }
            }
            return this.buildRowFromPermutation(rowMap,permutation)
        }
    }

    getAvailableValuesByRow( row )
    {
        return '123456789'.split('')
            .filter( e => row.indexOf(e)<0 )
    }

    generateValidRowPermutations()
    {
        let available,
            permutations = [],
            res = [];
        for(let i=0; i<this.rows.length;i++)
        {
            available = this.getAvailableValuesByRow(this.rows[i])
            if(available.length===0)
            {
                res.push([this.rows[i]]) ; continue; 
            }
            permutations = getPermutations(
                available.slice(1),
                available[0],
                available.length,
                this.isValidPermutation(this.rows[i],i)
            )
            res.push(permutations)
        }
        return res;
    }

    areElementsValid( elements )
    {
        const testElements = elements.map( e => e.join('') )
        let testReg; 
        for(let test of testElements)
        {
            for(let i=0;i<test.length;i++)
            {
                testReg = new RegExp(test[i],'g')
                if( (test.match(testReg)||[]).length>1 
                    && test[i] !== '.' )
                {
                    return false
                }
            }
        }
        return true; 
    }

    isValid()
    {
        return this.areElementsValid(this.rows)
            && this.areElementsValid(this.columns)
            && this.areElementsValid(this.cellGroups);
    }

    generateRowCandidatesCombinations(  targetArray,
                                        compareTo,
                                        stopAt,
                                        maxLen,
                                        isValidCandidate )
    {
        let res = [],aux;
        const permutate = (stopAt>1)
            ? this.generateRowCandidatesCombinations(
                targetArray.slice(1),
                targetArray[0],
                stopAt-1,
                maxLen,
                isValidCandidate
            ) 
            : []
        if(permutate.length===0)
        {
            return compareTo.map(e => [e])
        }
        for(let i=0;i<compareTo.length;i++)
        {
            generateCombinations:
            for(let j=0;j<permutate.length;j++)
            {
                aux = [compareTo[i],...permutate[j]]
                if(stopAt !== maxLen)
                {
                    res.push(aux)
                    continue generateCombinations
                }
                if(isValidCandidate(aux.flat()))
                {
                    res.push(aux)
                }
            }
        }
        return res
    }

    generateCandidateComboString(   candidateRows,
                                    candidatePositions,
                                    withPad = 0  )
    {
        const pad = withPad>0 
            ? getPaddedArray(withPad) 
            : []
        let candidateCombo = [],res ='';
        for(let j=0;j<candidateRows.length;j++)
        {
            candidateCombo.push(candidateRows[j][candidatePositions[j]])
        }
        res = pad.length>0 
            ? candidateCombo.concat(pad)
            : candidateCombo
        return res.map(e => e.join('')).join('')
    }

    isValidCandidate(   candidateRows,
                        withPad = 0  )
    {
        return (candidatePositions) => 
        {
            const candidateString = this.generateCandidateComboString(
                candidateRows,
                candidatePositions,
                withPad
            )
            if((new Sudoku(candidateString)).isValid())
            {
                return candidateString
            }
            return ''
        }
    }

    // optimizacion uso de memoria 
    getCandidatesByThree( candidateRows )
    {
        let candidatePositionsTrio,
           candidateCombinations,
           result = []; 
        const candidatesPositions = candidateRows.map(
            e => Array.from({length: e.length}, (v, i) => i)
        ) 
        for(let j=0;j<3;j++)
        {
            candidatePositionsTrio = candidatesPositions.slice(j*3,(j+1)*3)
            candidateCombinations = this.generateRowCandidatesCombinations(
                candidatePositionsTrio.slice(1),
                candidatePositionsTrio[0],
                candidatePositionsTrio.length,
                candidatePositionsTrio.length,
                this.isValidCandidate(candidateRows.slice(j*3,(j+1)*3),6)
            )
            result.push(candidateCombinations)
        }
        return result;
    }

    solve()
    {
        const candidateRows = this.generateValidRowPermutations()
        const candidateTrios = this.getCandidatesByThree(candidateRows)
        const solution = this.generateRowCandidatesCombinations(
            candidateTrios.slice(1),
            candidateTrios[0],
            candidateTrios.length,
            candidateTrios.length,
            this.isValidCandidate(candidateRows)
        )
        if(solution.length>0)
        {
            return this.isValidCandidate(candidateRows)(solution.flat(2))
        }
        return ''
    }

}