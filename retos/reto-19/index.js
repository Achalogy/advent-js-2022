function sortToys(toys, positions) {
  return toys.sort((a, b) => positions[toys.indexOf(a)] -
    positions[toys.indexOf(b)])
}

module.exports = sortToys