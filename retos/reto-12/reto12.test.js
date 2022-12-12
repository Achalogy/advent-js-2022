const selectSleigh = require('./index.js')

test('Test #1 - Retorna un String', () => {
  expect(
    typeof (
      selectSleigh(1, [
        { name: 'pheralb', consumption: 0.3 },
        { name: 'TMChein', consumption: 0.5 }
      ])
    )
  ).toBe('string')
})

test("Test #2 - selectSleigh(1, [ { name: 'pheralb', consumption: 0.3 }, { name: 'TMChein', consumption: 0.5 } ])", () => {
  expect(
    selectSleigh(1, [
      { name: 'pheralb', consumption: 0.3 },
      { name: 'TMChein', consumption: 0.5 }
    ])
  ).toBe('TMChein')
})

test("Test #3 - selectSleigh(10, [ { name: 'Pedrosillano', consumption: 1 }, { name: 'SamarJaffal', consumption: 5 } ])", () => {
  expect(
    selectSleigh(10, [
      { name: 'Pedrosillano', consumption: 1 },
      { name: 'SamarJaffal', consumption: 5 }
    ])
  ).toBe('Pedrosillano')
})

test("Test #4 - selectSleigh(10, [ { name: 'Pedrosillano', consumption: 1 }, { name: 'SamarJaffal', consumption: 2 }, { name: 'marcospage', consumption: 3 } ])", () => {
  expect(
    selectSleigh(10, [
      { name: 'Pedrosillano', consumption: 1 },
      { name: 'SamarJaffal', consumption: 2 },
      { name: 'marcospage', consumption: 3 }
    ])
  ).toBe('SamarJaffal')
})

test("Test #5 - selectSleigh(50, [ { name: 'Pedrosillano', consumption: 1 }, { name: 'SamarJaffal', consumption: 2 }, { name: 'marcospage', consumption: 3 } ])", () => {
  expect(
    selectSleigh(50, [
      { name: 'Pedrosillano', consumption: 1 },
      { name: 'SamarJaffal', consumption: 2 },
      { name: 'marcospage', consumption: 3 }
    ])
  ).toStrictEqual(null)
})