const getCompleted = require('./index.js')

test('Test #1 - Retorna un string', () => {
  expect(
    typeof (
      getCompleted('01:00:00', '03:00:00')
    )
  ).toBe('string')
})

test("Test #2 - getCompleted('01:00:00', '03:00:00')", () => {
  expect(
    getCompleted('01:00:00', '03:00:00')
  ).toBe('1/3')
})

test("Test #3 - getCompleted('02:00:00', '04:00:00')", () => {
  expect(
    getCompleted('02:00:00', '04:00:00')
  ).toBe('1/2')
})

test("Test #4 - getCompleted('01:00:00', '01:00:00')", () => {
  expect(
    getCompleted('01:00:00', '01:00:00')
  ).toBe('1/1')
})

test("Test #5 - getCompleted('00:10:00', '01:00:00')", () => {
  expect(
    getCompleted('00:10:00', '01:00:00')
  ).toBe('1/6')
})

test("Test #6 - getCompleted('01:10:10', '03:30:30')", () => {
  expect(
    getCompleted('01:10:10', '03:30:30')
  ).toBe('1/3')
})

test("Test #7 - getCompleted('02:20:20', '03:30:30')", () => {
  expect(
    getCompleted('02:20:20', '03:30:30')
  ).toBe('2/3')
})

test("Test #8, getCompleted('03:30:30', '05:50:50')", () => {
  expect(
    getCompleted('03:30:30', '05:50:50')
  ).toBe('3/5')
})