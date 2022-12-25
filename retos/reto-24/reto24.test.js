const canExit = require('./index.js')

test("Test #1 - Returns boolean", () => {
  expect(
    typeof(
      canExit([
        [' ', ' ', 'W', ' ', 'S'],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', 'W', ' '],
        ['W', 'W', ' ', 'W', 'W'],
        [' ', ' ', ' ', ' ', 'E']
      ])
    )
  ).toStrictEqual("boolean")
})

test("Test #2", () => {
  expect(
    canExit([
      [' ', ' ', 'W', ' ', 'S'],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', 'W', ' '],
      ['W', 'W', ' ', 'W', 'W'],
      [' ', ' ', ' ', ' ', 'E']
    ])
  ).toStrictEqual(true)
})

test("Test #3", () => {
  expect(
    canExit([
      [' ', ' ', 'W', 'W', 'S'],
      [' ', ' ', ' ', 'W', ' '],
      [' ', ' ', ' ', 'W', ' '],
      ['W', 'W', ' ', 'W', 'W'],
      [' ', ' ', ' ', ' ', 'E']
    ])
  ).toStrictEqual(false)
})

test("Test #4", () => {
  expect(
    canExit([
      [' ', ' ', 'W', 'W', 'S'],
      [' ', ' ', ' ', 'W', ' '],
      [' ', ' ', ' ', 'W', ' '],
      ['W', 'W', ' ', ' ', 'W'],
      [' ', ' ', ' ', ' ', 'E']
    ])
  ).toStrictEqual(false)
})

test("Test #5", () => {
  expect(
    canExit([
      ['E', ' ', ' ', ' ', 'S']
    ])
  ).toStrictEqual(true)
})

test("Test #6", () => {
  expect(
    canExit([
      ['E', ' ', 'W', ' ', 'S']
    ])
  ).toStrictEqual(false)
})

test("Test #7", () => {
  expect(
    canExit([
      ['E', ' ', 'W', ' ', 'S']
    ])
  ).toStrictEqual(false)
})

test("Test #8", () => {
  expect(
    canExit([
      ['E', ' ', 'W', ' ', 'S'],
      [' ', ' ', ' ', ' ', ' '],
    ])
  ).toStrictEqual(true)
})

test("Test #9", () => {
  expect(
    canExit([
      ['E', ' ', 'W', ' ', 'S'],
      [' ', ' ', ' ', ' ', ' '],
      ['W', 'W', 'W', 'W', 'W'],
    ])
  ).toStrictEqual(true)
})

test("Test #10", () => {
  expect(
    canExit([
      ['E', ' ', 'W', ' ', 'S'],
      [' ', ' ', 'W', ' ', ' '],
      ['W', 'W', 'W', 'W', 'W'],
    ])
  ).toStrictEqual(false)
})

test("Test #11", () => {
  expect(
    canExit([
      ['E', 'S', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'W', 'W']
    ])
  ).toStrictEqual(true)
})