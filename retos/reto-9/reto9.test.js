const countTime = require('./index.js')

test('Test #1 - Return a number', () => {
  expect(
    typeof (countTime([0, 1, 1, 0, 1]))
  ).toBe("number")
})

test('Test #2 - countTime([0, 1, 1, 0, 1])', () => {
  expect(
    countTime([0, 1, 1, 0, 1])
  ).toBe(7)
})

test('Test #3 - countTime([0, 0, 0, 1])', () => {
  expect(
    countTime([0, 0, 0, 1])
  ).toBe(21)
})

test('Test #4 - countTime([0, 0, 1, 0, 0])', () => {
  expect(
    countTime([0, 0, 1, 0, 0])
  ).toBe(28)
})

test('Test #5 - countTime([1, 0, 0, 1, 0, 0])', () => {
  expect(
    countTime([1, 0, 0, 1, 0, 0])
  ).toBe(14)
})

test('Test #6 - countTime([1, 1, 0, 0, 0, 0])', () => {
  expect(
    countTime([1, 1, 0, 0, 0, 0])
  ).toBe(28)
})

test('Test #7 - countTime([1, 1, 1])', () => {
  expect(
    countTime([1, 1, 1])
  ).toBe(0)
})