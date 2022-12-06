function getMaxGifts(giftsCities, maxGifts, maxCities) {

  let combinations = [];
  combinations.push([], [giftsCities[0]]);
  giftsCities.splice(0, 1)

  giftsCities.map(x => {
    const _sub = combinations.map(subset => {
      let s = [...subset]
      if(s.length < maxCities) {
        s.push(x)
      }
      return s
    })
    combinations = [...combinations, ..._sub]
  })

  combinations.splice(0, 1)

  return Math.max(
    ...combinations.map(x => {
      let res = x.reduce((total, num) => total + num)
      return res > maxGifts ? 0 : res
    })
  )

}

/* Esta es una versión más compacta que se basa en las mismas cosas */

function getMaxGiftsOPTIMIZED (giftsCities, maxGifts, maxCities) { 
  return Math.max(...giftsCities
    .reduce((x, y) => x.concat(x.map(x => [y].concat(x))), [[]])
    .filter(x => x.length <= maxCities)
    .map(x => x.reduce((r, s) => r + s, 0))
    .filter(x => x <= maxGifts)) }

module.exports = getMaxGifts
