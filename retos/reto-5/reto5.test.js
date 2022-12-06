const getMaxGifts = require('./index.js')

test("Test #1 - Retorna un numero", () => {
  expect(
    typeof (getMaxGifts([12, 3, 11, 5, 7], 20, 3))
  ).toStrictEqual('number')
})

test("Test #2 - getMaxGifts([12, 3, 11, 5, 7], 20, 3)", () => {
  expect(
    getMaxGifts([12, 3, 11, 5, 7], 20, 3)
  ).toBe(20)
})

test("Test #3 - getMaxGifts([50], 15, 1)", () => {
  expect(
    getMaxGifts([50], 15, 1)
  ).toBe(0)
})

test("Test #4 - getMaxGifts([50], 100, 1)", () => {
  expect(
    getMaxGifts([50], 100, 1)
  ).toBe(50)
})

test("Test #5 - getMaxGifts([50, 70], 100, 1)", () => {
  expect(
    getMaxGifts([50, 70], 100, 1)
  ).toBe(70)
})

test("Test #6 - getMaxGifts([50, 70, 30], 100, 2)", () => {
  expect(
    getMaxGifts([50, 70, 30], 100, 2)
  ).toBe(100)
})

test("Test #7 - getMaxGifts([50, 70, 30], 100, 3)", () => {
  expect(
    getMaxGifts([50, 70, 30], 100, 3)
  ).toBe(100)
})

test("Test #8 - getMaxGifts([50, 10, 40, 1000, 500, 200], 199, 4)", () => {
  expect(
    getMaxGifts([50, 10, 40, 1000, 500, 200], 199, 4)
  ).toBe(100)
})

test("Test #9 - getMaxGifts([50, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 1000, 1000)", () => {
  expect(
    getMaxGifts([50, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 1000, 1000)
  ).toBe(115)
})