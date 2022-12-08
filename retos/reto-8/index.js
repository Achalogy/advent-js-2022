function checkPart(part) {
  return [...part].reduce((x, _, z) => {
    let w = [...part].filter((_, y) => y != z)
    return x+= w.join("") == w.reverse().join("")
  }, 0) > 0
}

function checkPartOptimized(part) {
  return [...part].some((_, i, x) => {
    const tr = x.filter((_, k) => i != k);
    return tr.join("") == tr.reverse().join("");
  });
}

module.exports = checkPart