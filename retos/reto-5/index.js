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
  return Math.max(
    ...giftsCities
      .sort((x, y) => y - x)
      .reduce(
        (result, _, i) => (
          i && giftsCities.unshift(giftsCities.pop()),
          (i = giftsCities
            .slice(0, maxCities)
            .reduce((acc, curr) => (acc += curr), 0)),
          i <= maxGifts && result.push(i),
          i - giftsCities[maxCities - 1] <= maxGifts &&
          result.push(i - giftsCities[maxCities - 1]),
          result
        ),
        []
      ),
    0
  );
}

module.exports = getMaxGifts
