function dryNumber(dry, numbers) {
  return Array.from(Array(numbers).keys())
    .filter(x => `${x + 1}`.split("").includes(`${dry}`))
    .map(x => x + 1)
}

module.exports = dryNumber