const checkPart = require('./index.js')

test("Test #1 - Retorna un booleano", () => {
  expect(
    typeof (checkPart('uwu'))
  ).toBe('boolean')
})

test("Test #2 - checkPart('uwu')", () => {
  expect(
    checkPart('uwu')
  ).toBe(true)
})

test("Test #3 - checkPart('midu')", () => {
  expect(
    checkPart('midu')
  ).toBe(false)
})

test("Test #4 - checkPart('lolol')", () => {
  expect(
    checkPart('lolol')
  ).toBe(true)
})

test("Test #5 - checkPart('yolooloy')", () => {
  expect(
    checkPart("yolooloy")
  ).toBe(true)
})

test("Test #6 - checkPart('zzzoonzzz')", () => {
  expect(
    checkPart("zzzoonzzz")
  ).toBe(true)
})