const getOptimalPath = require('./index.js')

test('Test #1 - Retorna un número', () => {
  expect(
    typeof(
      getOptimalPath([[0], [7, 4], [2, 4, 6]])
    )
  ).toBe('number')
})

test('Test #2 - getOptimalPath([[0], [7, 4], [2, 4, 6]])', () => {
  expect(
    getOptimalPath([[0], [7, 4], [2, 4, 6]])
  ).toBe(8)
})

test('Test #3 - getOptimalPath([[0], [2, 3]])', () => {
  expect(
    getOptimalPath([[0], [2, 3]])
  ).toBe(2)
})

test('Test #4 - getOptimalPath([[0], [3, 4], [9, 8, 1]])', () => {
  expect(
    getOptimalPath([[0], [3, 4], [9, 8, 1]])
  ).toBe(5)
})

test('Test #5 - getOptimalPath([[1], [1, 5], [7, 5, 8], [9, 4, 1, 3]])', () => {
  expect(
    getOptimalPath([[1], [1, 5], [7, 5, 8], [9, 4, 1, 3]])
  ).toBe(8)
})

test('Test #6 - getOptimalPath([[1], [1, 5], [7, 5, 8], [9, 4, 1, 3], [-1, -1, -1, -1, -1]])', () => {
  expect(
    getOptimalPath([[1], [1, 5], [7, 5, 8], [9, 4, 1, 3], [-1, -1, -1, -1, -1]])
  ).toBe(7)
})