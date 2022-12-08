function checkPart(part) {
  return [...part].reduce((x, _, z) => {
    let w = [...part].filter((_, y) => y != z)
    return x+= w.join("") == w.reverse().join("")
  }, 0) > 0
}

module.exports = checkPart