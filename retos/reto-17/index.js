function carryGifts(gifts, maxWeight) {
  const bags = []

  const lastAcc = gifts.reduce((acc, gift) => {
    const accLength = acc.replaceAll(" ", "").length
    const giftLength = gift.replaceAll(" ", "").length

    if (accLength + giftLength <= maxWeight)
      return `${acc} ${gift}`
    else if (giftLength <= maxWeight) bags.push(acc)
    return gift
  })
  if (lastAcc.replaceAll(" ", "").length <= maxWeight) bags.push(lastAcc)

  return bags
}

module.exports = carryGifts