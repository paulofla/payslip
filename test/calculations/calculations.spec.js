'use strict'; // eslint-disable-line strict
const chai = require('chai');
const expect = chai.expect;
const calculations = require('../../src/calculations/calculations');

describe('Calculations', () => {
  describe('getName', () => {
    it('should be David Rudd', () => {
      expect(calculations.getName('David', 'Rudd')).to.equal('David Rudd');
    });
    it('should be Ryan Chen', () => {
      expect(calculations.getName('Ryan', 'Chen')).to.equal('Ryan Chen');
    });
    it('should be Paul O\'Flaherty', () => {
      expect(calculations.getName('Paul', 'O\'Flaherty')).to.equal('Paul O\'Flaherty');
    });
  });

  describe('round', () => {
    it('should be 5,004.16666667 Rounded Down to 5004', () => {
      expect(calculations.round(5004.16666667)).to.equal(5004);
    });
    it('should be 0.1 Rounded Down to 0', () => {
      expect(calculations.round(0.1)).to.equal(0);
    });
    it('should be 99.99 Rounded Up to 100', () => {
      expect(calculations.round(99.99)).to.equal(100);
    });
    it('should be 99.5 Rounded Up to 100', () => {
      expect(calculations.round(99.5)).to.equal(100);
    });
    it('should be 99.499999999999 Rounded Up to 100', () => {
      expect(calculations.round(99.499999999999)).to.equal(99);
    });
    it('should be -99.5 Rounded Up to -99', () => {
      expect(calculations.round(-99.5)).to.equal(-99);
    });
    it('should be -99.500000001 Rounded Up to -100', () => {
      expect(calculations.round(-99.500000001)).to.equal(-100);
    });
    it('should be 0', () => {
      expect(calculations.round(0)).to.equal(0);
    });
  });

  describe('getPayPeriod', () => {
    it('should be 1', () => {
      expect(calculations.getPayPeriod('01 March – 31 March')).to.equal(1);
    });
    it('should be 12', () => {
      expect(calculations.getPayPeriod('01 January – 31 December')).to.equal(12);
    });
    it('should be an exception thrown as invalid pay period', () => {
      try {
        calculations.getPayPeriod('01 December – 31 March');
        expect(true).to.equal(false);
      } catch (err) {
        expect(err.message).to.equal('01 December – 31 March is not a valid pay period - exiting program');
      }
    });
  });

  describe('getMonths', () => {
    it('should be March, March', () => {
      const months = calculations.getMonths('01 March – 31 March');
      expect(months.length).to.equal(2);
      expect(months[0]).to.equal('March');
      expect(months[1]).to.equal('March');
    });
    it('should be January, December', () => {
      const months = calculations.getMonths('01 January – 31 December');
      expect(months.length).to.equal(2);
      expect(months[0]).to.equal('January');
      expect(months[1]).to.equal('December');
    });
    it('should be December, March', () => {
      const months = calculations.getMonths('01 December – 31 March');
      expect(months.length).to.equal(2);
      expect(months[0]).to.equal('December');
      expect(months[1]).to.equal('March');
    });
    it('should be First, SECOND', () => {
      const months = calculations.getMonths('01 First – 31 SECOND');
      expect(months.length).to.equal(2);
      expect(months[0]).to.equal('First');
      expect(months[1]).to.equal('SECOND');
    });
    it('should be an exception for OneWord', () => {
      try {
        calculations.getMonths('OneWord');
        expect(true).to.equal(false);
      } catch (err) {
        expect(err.message).to.equal('OneWord is not a valid format for a pay period - exiting program');
      }
    });
    it('should be an exception for empty string', () => {
      try {
        calculations.getMonths('');
        expect(true).to.equal(false);
      } catch (err) {
        expect(err.message).to.equal(' is not a valid format for a pay period - exiting program');
      }
    });
  });

  describe('getDigitOfMonth', () => {
    it('should be 0 for January', () => {
      expect(calculations.getDigitOfMonth('January')).to.equal(0);
    });
    it('should be 0 for JANUARY', () => {
      expect(calculations.getDigitOfMonth('JANUARY')).to.equal(0);
    });
    it('should be 11 for december', () => {
      expect(calculations.getDigitOfMonth('december')).to.equal(11);
    });
    it('should be 11 for decemBER', () => {
      expect(calculations.getDigitOfMonth('decemBER')).to.equal(11);
    });
    it('should be 11 for DECEMBER', () => {
      expect(calculations.getDigitOfMonth('DECEMBER')).to.equal(11);
    });
    it('should be an exception for NOTHING', () => {
      try {
        calculations.getDigitOfMonth('NOTHING');
        expect(true).to.equal(false);
      } catch (err) {
        expect(err.message).to.equal('NOTHING is not a valid month - exiting program');
      }
    });
  });

  describe('getGrossIncome', () => {
    it('should be 5004', () => {
      expect(calculations.getGrossIncome(60050)).to.equal(5004);
    });
    it('should be 10000', () => {
      expect(calculations.getGrossIncome(120000)).to.equal(10000);
    });
  });

  describe('getYearlyTax', () => {
    it('should be 11063.25 from 60050, 37000, 0.325, 3572', () => {
      expect(calculations.getYearlyTax(60050, 37000, 0.325, 3572)).to.equal(11063.25);
    });
    it('should be 32347 from 120000, 80000, 0.37, 17547', () => {
      expect(calculations.getYearlyTax(120000, 80000, 0.37, 17547)).to.equal(32347);
    });
  });

  describe('getIncomeTaxInfo', () => {
    it('should be -> band: 0, rate:0, flatTax: 0', () => {
      const result = calculations.getIncomeTaxInfo(5000);
      expect(result.band).to.equal(0);
      expect(result.rate).to.equal(0);
      expect(result.flatTax).to.equal(0);
    });
    it('should be -> band: 18200, rate: 0.19, flatTax: 0', () => {
      const result = calculations.getIncomeTaxInfo(20000);
      expect(result.band).to.equal(18200);
      expect(result.rate).to.equal(0.19);
      expect(result.flatTax).to.equal(0);
    });
    it('should be -> band: 37000, rate: 0.325, flatTax: 3572', () => {
      const result = calculations.getIncomeTaxInfo(60050);
      expect(result.band).to.equal(37000);
      expect(result.rate).to.equal(0.325);
      expect(result.flatTax).to.equal(3572);
    });
    it('should be -> band: 80000, rate: 0.37, flatTax: 17547', () => {
      const result = calculations.getIncomeTaxInfo(120000);
      expect(result.band).to.equal(80000);
      expect(result.rate).to.equal(0.37);
      expect(result.flatTax).to.equal(17547);
    });
    it('should be -> band: 180000, rate: 0.45, flatTax: 54547', () => {
      const result = calculations.getIncomeTaxInfo(200000);
      expect(result.band).to.equal(180000);
      expect(result.rate).to.equal(0.45);
      expect(result.flatTax).to.equal(54547);
    });
  });

  describe('getIncomeTax', () => {
    it('should be 922', () => {
      expect(calculations.getIncomeTax(60050)).to.equal(922);
    });
    it('should be 2696', () => {
      expect(calculations.getIncomeTax(120000)).to.equal(2696);
    });
  });

  describe('getNetIncome', () => {
    it('should be 4082', () => {
      expect(calculations.getNetIncome(5004, 922)).to.equal(4082);
    });
    it('should be 7304', () => {
      expect(calculations.getNetIncome(10000, 2696)).to.equal(7304);
    });
  });

  describe('getSuperAnnuation', () => {
    it('should be 450', () => {
      expect(calculations.getSuperAnnuation(5004, '9%')).to.equal(450);
    });
    it('should be 1000', () => {
      expect(calculations.getSuperAnnuation(10000, '10%')).to.equal(1000);
    });
    it('should throw an error when invalid super format', () => {
      try {
        calculations.getSuperAnnuation(10000, '%');
        expect(true).to.equal(false);
      } catch (err) {
        expect(err.message).to.equal('% is not a valid format for a super rate - exiting program');
      }
    });
  });

  describe('monthlyPayslip', () => {
    it('should be Ryan Chen,01 March – 31 March,10000,2696,7304,1000', () => {
      expect(calculations.monthlyPayslip('Ryan', 'Chen', 120000, '10%', '01 March – 31 March')).to.equal('Ryan Chen,01 March – 31 March,10000,2696,7304,1000');
    });
    it('should be David Rudd,01 March – 31 March,5004,922,4082,450', () => {
      expect(calculations.monthlyPayslip('David', 'Rudd', 60050, '9%', '01 March – 31 March')).to.equal('David Rudd,01 March – 31 March,5004,922,4082,450');
    });
  });
});
