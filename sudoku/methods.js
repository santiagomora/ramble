const {range,sum, row} = require('mathjs')
const {SUDOKU_ROW_LENGTH,SUDOKU_CEL_LENGTH} = require('./constants')

function swap(arr,p1,p2)
{
    let aux; 
    aux = arr[p2]
    arr[p2] = arr[p1]
    arr[p1] = aux
    return arr
}

function transposeString( str,rowLen )
{
    let res = str.split(''), 
        swapDistance = 0,
        i = 0,
        skipColumn =0;
    const mainDiagLen = rowLen+1
    while(i<=(-1+rowLen**2))
    {
        if(i%rowLen===0&&i>0)
        {
            skipColumn++
            i=skipColumn*mainDiagLen
            swapDistance=0
        }
        swap(res,i,i+swapDistance)
        swapDistance+=(rowLen-1)
        i++
    }
    return res.join('');
}

function getPermutations(   targetArray,
                            compareTo,
                            maxTargetLen,
                            isValidPermutation  )
{
    let k=0, aux, res = [];
    const tarLen = targetArray.length;
    const permutate = (targetArray.length>1)
        ? getPermutations(targetArray,targetArray.shift(),maxTargetLen) 
        : [targetArray]
    let validPermutation;
    while(k<permutate.length)
    {
        generatePermutation:
        for(let j=0; j<=permutate[k].length; j++)
        {
            aux = [...permutate[k]]
            aux.splice(j,0,compareTo)
            if(tarLen!==maxTargetLen-1)
            {
                res.push(aux); continue generatePermutation;
            }
            if(validPermutation = isValidPermutation(aux))
            {
                res.push(validPermutation)
            }
        }
        k++
    }
    return res
}

function getCellGroups( sudokuRows )
{
    let cellGroups = [],cellAux = [[],[],[]]
    for(let i=0; i<sudokuRows.length; i++)
    {
        cellAux = [
            cellAux[0].concat(sudokuRows[i].slice(0,3)),
            cellAux[1].concat(sudokuRows[i].slice(3,6)),
            cellAux[2].concat(sudokuRows[i].slice(6,9))
        ]
        if((i+1)%3===0)
        {
            cellGroups = cellGroups.concat(cellAux)
            cellAux = [[],[],[]]
        }
    }
    return cellGroups
}

function getPaddedArray( length )
{
    let res = [],pad = '.........'.split('')
    for(let j=0;j<length;j++)
    {
        res.push(pad)
    }
    return res
}

module.exports = {getPermutations,getCellGroups,getPaddedArray,transposeString,swap}