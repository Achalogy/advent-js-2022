function carryGifts(gifts, maxWeight) {
  if (!gifts.every(gift => maxWeight >= gift.length)) {
    return []
  }
  let carry = ['']
  gifts.forEach(gift => {
    const previousWeight = carry.at(-1).replace(/ /g, '').length
    if ((previousWeight + gift.length) <= maxWeight) {
      carry[carry.length - 1] += ' ' + gift
      carry[carry.length - 1] = carry[carry.length - 1]
      return
    }
    carry.push(gift)
  })
  return carry
}

module.exports = carryGifts