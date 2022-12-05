function distributeGifts(packOfGifts, reindeers) {
  let pesoMax = reindeers.join("").length * 2
  let pesoCaja = packOfGifts.join("").length
  return (pesoMax / pesoCaja) >> 0
}

module.exports = distributeGifts