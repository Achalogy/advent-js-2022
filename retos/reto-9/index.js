function countTime(leds) {
  let arr = leds.join("").split("1")
  arr[0] += arr.pop()
  return Math.max(...arr.map((led) => led.length)) * 7
}

module.exports = countTime