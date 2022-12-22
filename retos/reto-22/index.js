function checkStepNumbers(systemNames, stepNumbers) {
  return systemNames.every((e, i) => stepNumbers[i] <= stepNumbers[
    i + systemNames.slice(i + 1).indexOf(e) + 1
  ])
}

module.exports = checkStepNumbers