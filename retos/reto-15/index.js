function decorateTree(base) {
  base = base.split(" ")
  let list = new Array(base.length - 1).fill(base)
  return list.reduce((total, x) =>
    total.concat(
      [new Array(total.at(-1).length - 1).fill("-").map((_, i) => {
        let slice = total.at(-1).slice(i, i + 2)
        let res = ['B', 'P', 'R'].filter(el =>
          !slice.includes(el)
        )
        return res.length == 2 ? slice[0] : res
      }).flat()]
    )
    , [base]).slice(0, base.length).map(x => x.join(" ")).reverse()
}

module.exports = decorateTree