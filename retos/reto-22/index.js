function checkStepNumbers(systemNames, stepNumbers) {
  return systemNames.reduce((curr, x, i) => {
    let check = stepNumbers[i] <=
      stepNumbers[
      i + 1 + systemNames.slice(i + 1).indexOf(systemNames[i])
      ]
    return curr + check
  }, 0) == systemNames.length
}

module.exports = checkStepNumbers