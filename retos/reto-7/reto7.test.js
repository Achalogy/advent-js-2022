const getGiftsToRefill = require('./index.js')

test('Test #1 - Retorna un array', () => {
  expect(
    Array.isArray(
      getGiftsToRefill(['bici', 'coche', 'bici', 'bici'], ['coche', 'bici', 'muñeca', 'coche'], ['bici', 'pc', 'pc'])
    )
  ).toStrictEqual(true)
})

test("Test #2 - getGiftsToRefill(['bici', 'coche', 'bici', 'bici'], ['coche', 'bici', 'muñeca', 'coche'], ['bici', 'pc', 'pc'])", () => {
  expect(
    getGiftsToRefill(['bici', 'coche', 'bici', 'bici'], ['coche', 'bici', 'muñeca', 'coche'], ['bici', 'pc', 'pc'])
  ).toStrictEqual([
    "muñeca",
    "pc"
  ])
})

test("Test #3 - getGiftsToRefill([], [], [])", () => {
  expect(
    getGiftsToRefill([], [], [])
  ).toStrictEqual([])
})

test("Test #4 - getGiftsToRefill(['a', 'a'], ['a', 'a'], ['a', 'a'])", () => {
  expect(
    getGiftsToRefill(['a', 'a'], ['a', 'a'], ['a', 'a'])
  ).toStrictEqual([])
})

test("Test #5 - getGiftsToRefill(['a', 'a'], ['b', 'b'], ['c', 'c'])", () => {
  expect(
    getGiftsToRefill(['a', 'a'], ['b', 'b'], ['c', 'c'])
  ).toStrictEqual([
    "a",
    "b",
    "c"
  ])
})

test("Test #6 - getGiftsToRefill(['a', 'b'], ['c', 'd'], ['e', 'f'])", () => {
  expect(
    getGiftsToRefill(['a', 'b'], ['c', 'd'], ['e', 'f'])
  ).toStrictEqual([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ])
})