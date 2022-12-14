function getOptimalPath(path) {
  const res = path.reduceRight((previous, current) => {
    return current.map((val, index) => {
      return val + Math.min(previous[index], previous[index + 1])
    })
  })
  return res[0]
}

module.exports = getOptimalPath