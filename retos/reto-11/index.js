function getCompleted(part, total) {
  const MCD = (a, b) => {
    let c;
    while (b) {
      c = b
      b = a % b
      a = c
    }
    return a
  }

  part = part.split(":")
  total = total.split(":")

  let partRed = +part[0] * 3600 + +part[1] * 60 + +part[2]
  let totalRed = +total[0] * 3600 + +total[1] * 60 + +total[2]
  const MCDof = MCD(partRed, totalRed)

  const partEnd = partRed / MCDof
  const totalEnd = totalRed / MCDof

  return partEnd + "/" + totalEnd
}

module.exports = getCompleted