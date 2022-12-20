function howManyReindeers(reindeerTypes, gifts) {
  reindeerTypes = reindeerTypes
    .sort((a, b) => a.weightCapacity - b.weightCapacity)

  return gifts.map(city => {
    let list = {}
    let check = city.weight
    let reindeers = reindeerTypes.filter(x => x.weightCapacity < city.weight)
    while (check != 0) {
      reindeers.map(r => {
        if (check - r.weightCapacity >= 0) {
          list[r.type] ? list[r.type] += 1 : list[r.type] = 1
          check -= r.weightCapacity
        }
      })
    }
    return ({
      country: city.country,
      reindeers: reindeers.map(y => {
        return {
          type: y.type,
          num: list[y.type]
        }
      }).reverse()
    })
  })
}

module.exports = howManyReindeers