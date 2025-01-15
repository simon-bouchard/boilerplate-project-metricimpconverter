function ConvertHandler() {
  
  this.getNum = function (input) {
  const regex = /^(\d+(\.\d+)?)?(\/\d+(\.\d+)?)?[a-zA-Z]+$/;

  const match = input.match(regex);

  if (!match) return 'invalid number'; // No match, return "invalid number"

  const num1 = match[1] ? parseFloat(match[1]) : 1;
  const fraction = match[3]; 

  let result;

  if (!fraction) {
    result = num1;
  } else {
    const num2 = parseFloat(fraction.slice(1)); // Remove the "/" before parsing
    if (num2 === 0) {
      return 'invalid number'; // Avoid division by zero
    }
    result = num1 / num2;
  }

  return (Number(result.toFixed(5)));
};

  
  this.getUnit = function(input) {

	const regex = new RegExp('[a-zA-Z]+$')
	
    let result = input.match(regex)[0];	
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
	  
	const map = {
		l: 'gal',
		gal: 'L',
		lbs: 'kg',
		kg: 'lbs',
		mi: 'km',
		km: 'mi'
	}

    let result;
    
    return map[initUnit.toLowerCase()] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {

	const map = {
		lbs: 'pounds',
		kg: 'kilograms',
		gal: 'gallons',
		L: 'liters',
		mi: 'miles', 
		km: 'kilometers'
	}
	  
    let result = map[unit]
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

	const map = {
		gal: initNum * galToL,
		L: initNum / galToL,
		lbs: initNum * lbsToKg,
		kg: initNum / lbsToKg,
		mi: initNum * miToKm,
		km: initNum / miToKm,
	}

	let result = map[initUnit]

    return (Number(result.toFixed(5)));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
	initUnit = this.spellOutUnit(initUnit);
	returnUnit = this.spellOutUnit(returnUnit);

    let result = initNum + " " + initUnit + " converts to " + returnNum + " " + returnUnit;
	   
    return result;
  };
  
}

module.exports = ConvertHandler;
