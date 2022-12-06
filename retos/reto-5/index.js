function getMaxGifts(giftsCities, maxGifts, maxCities) {

  let combinaciones = [];
  combinaciones.push([], [giftsCities[0]]);
  giftsCities.shift()

  giftsCities.map(x => {
    const newList = combinaciones.map(combinacion => {
      let _combinacion = [...combinacion]
      if(_combinacion.length < maxCities) {
        _combinacion.push(x)
      }
      return _combinacion
    })
    combinaciones = combinaciones.concat(newList)
  })

  combinaciones.shift()

  return Math.max(
    ...combinaciones.map(x => {
      let sum = x.reduce((total, num) => total + num)
      return sum > maxGifts ? 0 : sum
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
