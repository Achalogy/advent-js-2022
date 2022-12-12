function selectSleigh(distance, sleighs) {
  let sleigh = sleighs.filter(x => (20 / x.consumption) >= distance).at(-1)
  return sleigh ? sleigh.name : null
}

module.exports = selectSleigh