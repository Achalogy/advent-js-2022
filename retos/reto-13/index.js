function getFilesToBackup(lastBackup, changes) {

  let filtered = changes.filter(x => x[1] > lastBackup)
  let ids = filtered.map(x => x[0])
  let sorted = ids.sort((a, b) => a - b)
  let flated = [...new Set(sorted)]

  return flated
}

module.exports = getFilesToBackup