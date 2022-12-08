function checkPart(part) {
  return [...part].reduce((x, _, z) => {
    let w = [...part].filter((_, y) => y != z)
    return x+= w.join("") == w.reverse().join("")
  }, 0) > 0
}

function checkPartOptimized(part) {
  let arr = [...part].slice(1);
  let rev = [...part].reverse();
  let x = arr.join("") == arr.reverse().join("");
  let y = [...part].reduce((x, y, i) => x + (rev[i] != y), 0);
  return x || y <= 2;
}

module.exports = checkPart