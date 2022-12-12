function selectSleigh(distance, sleighs) {
  let list = sleighs.filter(x => (20 / x.consumption) >= distance).at(-1)
  return list == null ? null : list.name
}

module.exports = selectSleigh