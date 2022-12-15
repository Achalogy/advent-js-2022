const decorateTree = require('./index.js')

test('Test #1 - Retorna un array', () => {
  expect(
    Array.isArray(
      decorateTree('B P R P')
    )
  ).toStrictEqual(true)
})

test("Test #2 - decorateTree('B P R P')", () => {
  expect(
    decorateTree('B P R P')
  ).toStrictEqual([
    "R",
    "P B",
    "R B B",
    "B P R P"
  ])
})

test("Test #3 - decorateTree('B B')", () => {
  expect(
    decorateTree('B B')
  ).toStrictEqual([
    "B",
    "B B"
  ])
})

test("Test #4 - decorateTree('B B P R P R R')", () => {
  expect(
    decorateTree('B B P R P R R')
  ).toStrictEqual([
    "B",
    "R P",
    "B P P",
    "P R B R",
    "P P B B P",
    "B R B B B R",
    "B B P R P R R"
  ])
})

test("Test #5 - decorateTree('R R P R R')", () => {
  expect(
    decorateTree('R R P R R')
  ).toStrictEqual([
    "R",
    "R R",
    "P B P",
    "R B B R",
    "R R P R R"
  ])
})