function printTable(gifts) {
  gifts = gifts.map(x => [x.name, '' + x.quantity])
  gifts.unshift(["Gift", "Quantity"])

  let [lengthGift, lengthQuantity] = [
    Math.max(...gifts.map(x => x[0].length)),
    Math.max(...gifts.map(x => x[1].length))
  ]

  gifts.splice(1, 0, ["-".repeat(lengthGift), "-".repeat(lengthQuantity)])

  let tables = gifts.map(x => {
    let name = x[0] + " ".repeat(lengthGift - x[0].length)
    let quantity = x[1] + " ".repeat(lengthQuantity - x[1].length)
    return "| " + name + " | " + quantity + " |" + "\n"
  }).join("")

  let top = "+".repeat(lengthGift + lengthQuantity + 7) + "\n"
  let bottom = top.replace(/\+/g, "*").trim()

  return top + tables + bottom
}

module.exports = printTable