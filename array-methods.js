var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(function(element) {
  return element.amount > 100000;
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;
let allBankAccounts = dataset.bankBalances;

allBankAccounts.forEach(function(element) {
  return (sumOfBankBalances += parseInt(element.amount));
});

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;

allBankAccounts.reduce(function(prev, curr) {
  if (
    curr.state === "WI" ||
    curr.state === "IL" ||
    curr.state === "OH" ||
    curr.state === "WY" ||
    curr.state === "GA" ||
    curr.state === "DE"
  ) {
    return (sumOfInterests += Math.round(parseInt(curr.amount) * 0.189));
  }
});

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
// dont forget reduce(functionName[, THIS VALUE IS THE INITIAL STATE OF acc])
var stateSums = allBankAccounts.reduce(function(acc, curr) {
  if (acc[curr.state]) {
    // if the state is already in the object
    acc[curr.state] += parseInt(curr.amount);
  } else {
    // if the state isn't already in the object
    acc[curr.state] = parseInt(curr.amount);
  }
  return acc;
}, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var sumOfHighInterests = Object.entries(stateSums).reduce(function(acc, curr) {
  let interestValue = Math.round(parseInt(curr[1]) * 0.189);
  if (!["WI", "IL", "OH", "WY", "GA", "DE"].includes(curr[0])) {
    // check if current state is one of these
    if (interestValue > 50000) {
      acc += interestValue;
    }
  }
  return acc;
}, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = Object.entries(stateSums).reduce(function(acc, curr) {
  if (curr[1] < 1000000) {
    acc.push(curr[0]);
  }
  return acc;
}, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = Object.entries(stateSums)
  .reduce(moreRich, [])
  .reduce(total, 0);

function moreRich(acc, curr) {
  if (curr[1] > 1000000) {
    acc.push(curr[1]); // push the total
  }
  return acc;
}

function total(acc, curr) {
  return acc + curr;
}
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = Object.entries(stateSums).every(topDollarCheck);

function topDollarCheck(element) {
  if (!["WI", "IL", "OH", "WY", "GA", "DE"].includes(element[0])) {
    return element[1] > 2550000;
  }
}
/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = Object.entries(stateSums).some(topDollarCheck); // can run the same test but for "some" method

module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
