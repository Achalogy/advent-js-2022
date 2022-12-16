function decorateTree(base) {

  const dict = {
    "PP": "P",
    "BB": "B",
    "RR": "R",
    "BP": "R",
    "PB": "R",
    "BR": "P",
    "RB": "P",
    "PR": "B",
    "RP": "B"
  }

  base = base.split(" ")
  let list = new Array(base.length).fill(base)
  return list.reduce((total, x) =>
    total.concat(
      [new Array(total.at(-1).length - 1).fill("-").map((_, i) => {
        return dict[total.at(-1).slice(i, i + 2).join("")]
      })]
    ), [base]
  ).slice(0, base.length).map(x => x.join(" ")).reverse()
}

module.exports = decorateTree