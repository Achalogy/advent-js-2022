function wrapping (gifts) {
  return gifts.map(gift => { // Por cada regalo en la lista (gift) va a hacer esto:
    // Ya que tiene que ser horizontal, vamos a necesitar 2 más de papel en las esquinas
    // String.repeat(n) - repite n veces un string
    const papel = "*".repeat(gift.length + 2)
    return `${papel}\n*${gift}*\n${papel}`
  })
}

module.exports = wrapping;