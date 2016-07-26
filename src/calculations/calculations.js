'use strict'; // eslint-disable-line strict
const monthsInAYear = 12;

const getName = (first, last) => {
  return `${first} ${last}`;
};

const round = (numberToRound) => {
  return Math.round(numberToRound);
};

const getGrossIncome = (salary) => {
  return round(salary / monthsInAYear);
};

const getYearlyTax = (salary, taxBand, taxRate, flatTax) => {
  const taxableIncome = salary - taxBand;
  const taxOnHigherBand = taxableIncome * taxRate;
  return flatTax + taxOnHigherBand;
};

const getIncomeTaxInfo = (salary) => {
  const taxRates = [{
    band: 0,
    rate: 0,
    flatTax: 0,
  }, {
    band: 18200,
    rate: 0.19,
    flatTax: 0,
  }, {
    band: 37000,
    rate: 0.325,
    flatTax: 3572,
  }, {
    band: 80000,
    rate: 0.37,
    flatTax: 17547,
  }, {
    band: 180000,
    rate: 0.45,
    flatTax: 54547,
  }];
  const lowestTaxRate = taxRates[0];

  return taxRates.reduce((previousValue, currentValue) => {
    let taxRateToUse = previousValue;
    if (salary > currentValue.band) {
      taxRateToUse = currentValue;
    }
    return taxRateToUse;
  }, lowestTaxRate);
};

const getIncomeTax = (salary) => {
  const taxInfo = getIncomeTaxInfo(salary);
  return round(getYearlyTax(salary, taxInfo.band, taxInfo.rate, taxInfo.flatTax) / monthsInAYear);
};

const getNetIncome = (monthlyGrossIncome, monthyIncomeTax) => {
  return round(monthlyGrossIncome - monthyIncomeTax);
};

const convertSuperRate = (superRate) => {
  const regularExpressionToCaptureSuperRate = /^(\d)+/i;
  const found = superRate.match(regularExpressionToCaptureSuperRate);
  if (found === null) {
    throw new Error(`${superRate} is not a valid format for a super rate - exiting program`);
  } else if (found[0] > 50) {
    throw new Error(`${superRate} is too high for a super rate - exiting program`);
  }
  return found[0];
};

const getSuperAnnuation = (salary, superRate) => {
  return round(salary * (convertSuperRate(superRate) / 100));
};

const monthlyPayslip = (firstName, lastName, salary, superRate, startDate) => {
  if (salary < 0) {
    throw new Error(`Salary can't be negative. It is set at: ${salary} - exiting program`);
  }
  const name = getName(firstName, lastName);
  const grossIncome = getGrossIncome(salary);
  const incomeTax = getIncomeTax(salary);
  const netIncome = getNetIncome(grossIncome, incomeTax);
  const superAnnuation = getSuperAnnuation(grossIncome, superRate);

  return `${name},${startDate},${grossIncome},${incomeTax},${netIncome},${superAnnuation}`;
};

module.exports = {
  getName,
  round,
  getGrossIncome,
  getYearlyTax,
  getIncomeTaxInfo,
  getIncomeTax,
  getNetIncome,
  getSuperAnnuation,
  monthlyPayslip,
};
