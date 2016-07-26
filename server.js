'use strict'; // eslint-disable-line strict
const readlineSync = require('readline-sync');
const calculations = require('./src/calculations/calculations');

try {
  const firstName = readlineSync.question(`Please enter in the first name: `);
  const lastName = readlineSync.question(`Please enter in the last name: `);
  const salary = readlineSync.question(`Please enter in the annual salary for ${firstName} ${lastName}. This must be a positive integer: `);
  const superRate = readlineSync.question(`Please enter in the super rate for ${firstName} ${lastName}. This must be between 0% to 50% inclusive: `);
  const date = readlineSync.question(`Please enter in the payment start date: `);
  console.log(calculations.monthlyPayslip(firstName, lastName, salary, superRate, date));
} catch (err) {
  console.log(err.message);
}
