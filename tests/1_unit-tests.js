const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test( 'convertHandler should correctly read a whole number.',
        function(){
          const testInput = '1mi'; 
          const expectedResult = 1;
          assert.strictEqual( convertHandler.getNum(testInput),
                              expectedResult )
        } )
  test( 'convertHandler should correctly read a decimal number input.',
        function(){
          const testInput = '0.6mi';
          const expectedResult = 0.6;
          
          assert.strictEqual( convertHandler.getNum(testInput),
                              expectedResult );
        } )
  test( 'convertHandler should correctly read a fractional input.',
        function(){
          const testInput = '1/2mi';
          const expectedResult = 0.5;
          
          assert.strictEqual( convertHandler.getNum(testInput),
                              expectedResult );
          
        } )
  test( 'convertHandler should correctly read a fractional input with a decimal.',
        function(){
          const tests = [{input:'1.5/2mi',expected:0.75},
                         {input:'1/2.5mi',expected:0.4}]
          for(let test of tests){
            assert.strictEqual( convertHandler.getNum(test.input),
                                test.expected );
          }
        } )
  test( 'convertHandler should correctly return an error on a double-fraction.',
        function(){
          const tests = [{input:'1.5//2mi',expected:"invalid number"},
                          {input:'1/2/3mi',expected:"invalid number"}]
          for(let test of tests){
            assert.strictEqual( convertHandler.getNum(test.input),
                                test.expected );
          }
        } )
  test( 'convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.',
        function(){
          const tests = ['gal','mi','l','kg','km','lbs'];
          const expected = 1;
          for(let test of tests){
            assert.strictEqual( convertHandler.getNum(test),
                                expected );
          }
        } )
  test( 'convertHandler should correctly read each valid input unit.',
        function(){
          const tests = [ {input:'gal',expected:'gal'},
                          {input:'l',expected:'L'},
                          {input:'kg',expected:'kg'},
                          {input:'km',expected:'km'},
                          {input:'lbs',expected:'lbs'},
                          {input:'mi',expected:'mi'} ]
          for(let test of tests){
            assert.strictEqual( convertHandler.getUnit(test.input),
                                test.expected );
            assert.strictEqual( convertHandler.getUnit(test.input.toUpperCase()),
                                test.expected );
          }
        } )
  test( 'convertHandler should correctly return an error for an invalid input unit.',
        function(){
          const tests = [ {input:'gals',expected:'invalid unit'},
                          {input:'Min',expected:'invalid unit'},
                          {input:'lbr',expected:'invalid unit'} ]
          for(let test of tests){
            assert.strictEqual( convertHandler.getUnit(test.input),
                                test.expected );
          }
        } )
  test( 'convertHandler should return the correct return unit for each valid input unit.',
        function(){
          const tests = [ {input:'gal',expected:'gal'},
                          {input:'l',expected:'L'},
                          {input:'kg',expected:'kg'},
                          {input:'km',expected:'km'},
                          {input:'lbs',expected:'lbs'},
                          {input:'mi',expected:'mi'} ]
          for(let test of tests){
            assert.strictEqual( convertHandler.getUnit(test.input),
                                test.expected );
            assert.strictEqual( convertHandler.getUnit(test.input.toUpperCase()),
                                test.expected );
          }
        } )
  test( 'convertHandler should correctly return the spelled-out string unit for each valid input unit.',
        function(){
          const tests = [ {input:'gal',expected:'gallons'},
                          {input:'l',expected:'liters'},
                          {input:'kg',expected:'kilograms'},
                          {input:'km',expected:'kilometers'},
                          {input:'lbs',expected:'pounds'},
                          {input:'mi',expected:'miles'} ]
          for(let test of tests){
            assert.strictEqual( convertHandler.spellOutUnit(test.input),
                                test.expected );
          }
        })
  test( 'convertHandler should correctly convert gal to L.',
        function(){
          const tests = [ { input:'gal',
                            expected:{number: 3.78541,
                                      unit: 'L'} },
                          { input:'l',
                            expected:{number:0.26417,
                                      unit:'gal'} },
                          { input:'kg',
                            expected:{number: 2.20462,
                                      unit:'lbs'} },
                          { input:'km',
                            expected:{number:0.62137,
                                      unit:'mi'} },
                          { input:'lbs',
                            expected:{number:0.45359,
                                      unit:'kg'} } ,
                          { input:'mi',
                            expected:{number:1.60934,
                                      unit:'km'} } ]
          for(let test of tests){
            let conversion = convertHandler.convert(1,test.input)
            assert.strictEqual( conversion.returnNum,
                                test.expected.number );
            assert.strictEqual( conversion.returnUnit,
                                test.expected.unit );
          }
        })
  test( 'convertHandler should correctly convert L to gal.',
        function(){
          let num,unit
          const tests = [ { input:'1/2l',
                            expected:{number: 0.13209,
                                      unit: 'gal'} },
                          { input:'10L',
                            expected:{number:2.64172,
                                      unit:'gal'} },
                          { input:'2.5/3.3l',
                            expected:{number:0.20013,
                                      unit:'gal'} },
                          { input:'1/2.5l',
                            expected:{number:0.10567,
                                      unit:'gal'} },
                          { input:'2.6/3l',
                            expected:{number:0.22895,
                                      unit:'gal'} } ]

          const errorReturned = (res) => res === 'invalid number'  
                                          || res === 'invalid unit'
                                          || res === 'invalid number and unit'
          for(let test of tests){
            num = convertHandler.getNum(test.input)
            unit = convertHandler.getUnit(test.input)
            if(errorReturned(num)||errorReturned(unit)){
              return assert.fail('error when reading test input');
            }
            let conversion = convertHandler.convert(num,unit)
            assert.strictEqual( conversion.returnNum,
                                test.expected.number );
            assert.strictEqual( conversion.returnUnit,
                                test.expected.unit );
          }
        })
  test( 'convertHandler should correctly convert km to mi.',
        function(){
          let num,unit
          const tests = [ { input:'1/2km',
                            expected:{number:0.31069,
                                      unit: 'mi'} },
                          { input:'10km',
                            expected:{number:6.21373,
                                      unit:'mi'} },
                          { input:'2.5/3.3km',
                            expected:{number:0.47074,
                                      unit:'mi'} },
                          { input:'1/2.5km',
                            expected:{number:0.24855,
                                      unit:'mi'} },
                          { input:'2.6/3km',
                            expected:{number:0.53852,
                                      unit:'mi'} } ]

          const errorReturned = (res) => res === 'invalid number'  
                                          || res === 'invalid unit'
                                          || res === 'invalid number and unit'
          for(let test of tests){
            num = convertHandler.getNum(test.input)
            unit = convertHandler.getUnit(test.input)
            if(errorReturned(num)||errorReturned(unit)){
              return assert.fail('error when reading test input');
            }
            let conversion = convertHandler.convert(num,unit)
            assert.strictEqual( conversion.returnNum,
                                test.expected.number );
            assert.strictEqual( conversion.returnUnit,
                                test.expected.unit );
          }
        })
  test( 'convertHandler should correctly convert mi to km.',
        function(){
          let num,unit
          const tests = [ { input:'1/2mi',
                            expected:{number:0.80467,
                                      unit: 'km'} },
                          { input:'10mi',
                            expected:{number:16.0934,
                                      unit:'km'} },
                          { input:'2.5/3.3mi',
                            expected:{number:1.2192,
                                      unit:'km'} },
                          { input:'1/2.5mi',
                            expected:{number:0.64374,
                                      unit:'km'} },
                          { input:'2.6/3mi',
                            expected:{number:1.39476,
                                      unit:'km'} } ]

          const errorReturned = (res) => res === 'invalid number'  
                                          || res === 'invalid unit'
                                          || res === 'invalid number and unit'
          for(let test of tests){
            num = convertHandler.getNum(test.input)
            unit = convertHandler.getUnit(test.input)
            if(errorReturned(num)||errorReturned(unit)){
              return assert.fail('error when reading test input');
            }
            let conversion = convertHandler.convert(num,unit)
            assert.strictEqual( conversion.returnNum,
                                test.expected.number );
            assert.strictEqual( conversion.returnUnit,
                                test.expected.unit );
          }
        })
  test( 'convertHandler should correctly convert lbs to kg.',
        function(){
          let num,unit
          const tests = [ { input:'1/2lbs',
                            expected:{number:0.2268,
                                      unit: 'kg'} },
                          { input:'10lbs',
                            expected:{number:4.53592,
                                      unit:'kg'} },
                          { input:'2.5/3.3lbs',
                            expected:{number:0.34363,
                                      unit:'kg'} },
                          { input:'1/2.5lbs',
                            expected:{number:0.18144,
                                      unit:'kg'} },
                          { input:'2.6/3lbs',
                            expected:{number:0.39311,
                                      unit:'kg'} } ]

          const errorReturned = (res) => res === 'invalid number'  
                                          || res === 'invalid unit'
                                          || res === 'invalid number and unit'
          for(let test of tests){
            num = convertHandler.getNum(test.input)
            unit = convertHandler.getUnit(test.input)
            if(errorReturned(num)||errorReturned(unit)){
              return assert.fail('error when reading test input');
            }
            let conversion = convertHandler.convert(num,unit)
            assert.strictEqual( conversion.returnNum,
                                test.expected.number );
            assert.strictEqual( conversion.returnUnit,
                                test.expected.unit );
          }
        })
  test( 'convertHandler should correctly convert kg to lbs.',
        function(){
          let num,unit
          const tests = [ { input:'1/2kg',
                            expected:{number:1.10231,
                                      unit: 'lbs'} },
                          { input:'10kg',
                            expected:{number:22.04624,
                                      unit:'lbs'} },
                          { input:'2.5/3.3kg',
                            expected:{number:1.67017,
                                      unit:'lbs'} },
                          { input:'1/2.5kg',
                            expected:{number:0.88185,
                                      unit:'lbs'} },
                          { input:'2.6/3kg',
                            expected:{number:1.91067,
                                      unit:'lbs'} } ]

          const errorReturned = (res) => res === 'invalid number'  
                                          || res === 'invalid unit'
                                          || res === 'invalid number and unit'
          for(let test of tests){
            num = convertHandler.getNum(test.input)
            unit = convertHandler.getUnit(test.input)
            if(errorReturned(num)||errorReturned(unit)){
              return assert.fail('error when reading test input');
            }
            let conversion = convertHandler.convert(num,unit)
            assert.strictEqual( conversion.returnNum,
                                test.expected.number );
            assert.strictEqual( conversion.returnUnit,
                                test.expected.unit );
          }
        })    
});