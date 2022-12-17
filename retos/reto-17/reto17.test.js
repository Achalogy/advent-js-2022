const carryGifts = require('./index.js')

test('Test #1 - Envia un Array', () => {
  expect(
    Array.isArray(
      carryGifts(['game', 'bike', 'book', 'toy'], 10)
    )
  ).toStrictEqual(true)
})

test("Test #2 - carryGifts(['game', 'bike', 'book', 'toy'], 10)", () => {
  expect(
    carryGifts(['game', 'bike', 'book', 'toy'], 10)
  ).toStrictEqual([
    "game bike",
    "book toy"
  ])
})

test("Test #3 - carryGifts(['game', 'bike', 'book', 'toy'], 7)", () => {
  expect(
    carryGifts(['game', 'bike', 'book', 'toy'], 7)
  ).toStrictEqual([
    "game",
    "bike",
    "book toy"
  ])
})

test("Test #4 - carryGifts(['game', 'bike', 'book', 'toy'], 4)", () => {
  expect(
    carryGifts(['game', 'bike', 'book', 'toy'], 4)
  ).toStrictEqual([
    "game",
    "bike",
    "book",
    "toy"
  ])
})

test("Test #5 - carryGifts(['toy', 'gamme', 'toy', 'bike'], 6)", () => {
  expect(
    carryGifts(['toy', 'gamme', 'toy', 'bike'], 6)
  ).toStrictEqual([
    "toy",
    "gamme",
    "toy",
    "bike"
  ])
})

test("Test #6 - carryGifts(['toy', 'toy', 'toy', 'toy'], 2)", () => {
  expect(
    carryGifts(['toy', 'toy', 'toy', 'toy'], 2)
  ).toStrictEqual([])
})

test("Test #7 - carryGifts(['toy', 'toy', 'disk', 'disk', 'toy', 'toy'], 7)", () => {
  expect(
    carryGifts(['toy', 'toy', 'disk', 'disk', 'toy', 'toy'], 7)
  ).toStrictEqual([
    "toy toy",
    "disk",
    "disk toy",
    "toy"
  ])
})