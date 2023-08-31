function ConvertHandler() {

  const unitReg = /^(kg|km|gal|mi|lbs|l)$/i
  const valueReg = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)$/i
  const splitReg = /(?=\W*[a-zA-Z]\W*).*$/i
  const ROUND = 100000;

  const conversions = {
    gal:  {to:'l',conv:3.78541},    //gal
    mi: {to:'km',conv:1.60934},   //mi
    lbs: {to:'kg',conv:0.453592}  //lbs
  };

  const conversionNames = {
    km:{short:'km',long:'kilometers'},
    gal:{short:'gal',long:'gallons'},
    kg:{short:'kg',long:'kilograms'},
    l:{short:'L',long:'liters'},
    lbs:{short:'lbs',long:'pounds'},
    mi:{short:'mi',long:'miles'}
  };

  ( function (conv) {
    for( const univ in conversions )
    {
        mainUnit = conv[univ]
        conv[mainUnit.to] = {
            to:univ,
            conv:1/mainUnit.conv
        }
    }
  } )(conversions)

  const validate = function(value,
                            unit)
  {
    const numberTest = valueReg.test(value)
    const unitTest = unitReg.test(unit)
    if(!unitTest&&!numberTest){
      return "invalid number and unit";
    }
    if(!numberTest){
      return "invalid number";
    }
    if(!unitTest){
      return "invalid unit";
    }
    return null;
  }

  const processInput = function(input){
    const evalInput = input||""
    const sliceIndex = evalInput.search(splitReg);
    const [value,unit] = [evalInput.substr(0,sliceIndex)||"1",
                          evalInput.substr(sliceIndex)];
    const evaluation = validate(value,unit);
    return evaluation 
      ? {msg:evaluation} 
      : {value:eval(value),unit:unit.toLowerCase()}
  }

  function getReponseObj( initNum,
                          initUnit,
                          returnNum,
                          returnUnit )
  {
    const inames = conversionNames[initUnit.toLowerCase()] 
    const rnames = conversionNames[returnUnit.toLowerCase()] 
    return {initNum,
            initUnit:inames.short,
            returnNum,
            returnUnit:rnames.short,
            string:`${initNum} ${inames.long} converts to ${returnNum} ${rnames.long}` }
  }

  this.getNum = function(input) {
    const res = processInput(input);
    return res.msg ? res.msg : res.value
  };
  
  this.getUnit = function(input) {
    const res = processInput(input);
    return res.msg ? res.msg : conversionNames[res.unit.toLowerCase()].short
  };
  
  this.getReturnUnit = function(initUnit) {
    return conversions[initUnit.toLowerCase()].to
  };

  this.spellOutUnit = function(unit) {
    const testUnit = unit.toLowerCase();
    if(conversionNames[testUnit]){
      return conversionNames[testUnit].long
    }
    return 'invalid unit';
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return getResponseObj(initNum,initUnit,returnNum,returnUnit).string
  };

  this.convert = function(value,unit){
    const mainUnit = conversions[unit.toLowerCase()]
    return getReponseObj( value,
                          unit,
                          Math.round(value*mainUnit.conv*ROUND)/ROUND,
                          mainUnit.to )
  }

  this.listenRequest = ( req,
                         res ) => {
    const {msg,value,unit} = processInput(req.query.input||"")
    if(msg){
      return res.status(200).json(msg);
    }
    return res.status(200).json(this.convert(value,unit))
  }
}

module.exports = ConvertHandler;
