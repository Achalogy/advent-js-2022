function checkJump(heights) {
  const left = heights.splice(0, heights.indexOf(Math.max(...heights)))
  const conditionLeft = left
    .slice(1)
    .every((l, i) => l >= left[i])
  const conditionRight = heights
    .slice(1)
    .every((h, i) => h <= heights[i])

  return conditionLeft && conditionRight && !!left.length && heights.length > 1
}

module.exports = checkJump