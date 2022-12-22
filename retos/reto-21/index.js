function printTable(gifts) {
  gifts = gifts.map(x => [x.name, '' + x.quantity])
  gifts.unshift(["Gift", "Quantity"])

  let lengthGift = Math.max(...gifts.map(x => x[0].length))
  let lengthQuantity = Math.max(...gifts.map(x => x[1].length))

  gifts.splice(1, 0, ["-".repeat(lengthGift), "-".repeat(lengthQuantity)])

  let tables = gifts.reduce((str, x) => str +
    "| " + x[0].padEnd(lengthGift) +
    " | " + x[1].padEnd(lengthQuantity) +
    " |" + "\n", '')

  let top = "+".repeat(lengthGift + lengthQuantity + 7) + "\n"
  let bottom = "*".repeat(lengthGift + lengthQuantity + 7)

  return top + tables + bottom
}

module.exports = printTable