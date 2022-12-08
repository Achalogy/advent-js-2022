function checkPart(part) {
  return [...part].some((x, i, arr) => {
    let w = arr.filter((_, y) => y != i)
    return w.join("") == w.reverse().join("")
  })
}

function checkPartOptimized(part) {
  let arr = [...part].slice(1);
  let rev = [...part].reverse();
  let x = arr.join("") == arr.reverse().join("");
  let y = [...part].reduce((x, y, i) => x + (rev[i] != y), 0);
  return x || y <= 2;
}

module.exports = checkPart