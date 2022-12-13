function getFilesToBackup(lastBackup, changes) {

  let test = changes.filter(x => x[1] > lastBackup).map(x => x[0]).sort((a,b) => a-b)

  return(
    [... new Set(test)]
  )
}

getFilesToBackup(1546300800, [
  [1, 1546300800],
  [2, 1546300800],
  [1, 1546300900],
  [1, 1546301000],
  [3, 1546301100]
])

module.exports = getFilesToBackup