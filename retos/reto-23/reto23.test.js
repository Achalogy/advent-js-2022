const executeCommands = require('./index.js')

test("Test #1 - Returns an array", () => {
  expect(
    Array.isArray(
      executeCommands([
        'MOV 5,V00',
        'MOV 10,V01',
        'DEC V00',
        'ADD V00,V01',
      ])
    )
  ).toStrictEqual(true)
})

test("Test #2", () => {
  expect(
    executeCommands([
      'MOV 5,V00',
      'MOV 10,V01',
      'DEC V00',
      'ADD V00,V01',
    ])
  ).toStrictEqual([
    14,
    10,
    0,
    0,
    0,
    0,
    0,
    0
  ])
})

test("Test #3", () => {
  expect(
    executeCommands([
      'MOV 255,V00',
      'INC V00',
      'DEC V01',
      'DEC V01'
    ])
  ).toStrictEqual([
    0,
    254,
    0,
    0,
    0,
    0,
    0,
    0
  ])
})

test("Test #4", () => {
  expect(
    executeCommands([
      'MOV 10,V00',
      'DEC V00',
      'INC V01',
      'JMP 1',
      'INC V06'
    ])
  ).toStrictEqual([
    0,
    10,
    0,
    0,
    0,
    0,
    1,
    0
  ])
})

test("Test #5", () => {
  expect(
    executeCommands([
      'MOV 10,V00',
      'MOV V00,V01',
      'MOV V01,V02',
      'MOV V02,V03',
      'MOV V03,V04'
    ])
  ).toStrictEqual([
    10,
    10,
    10,
    10,
    10,
    0,
    0,
    0
  ])
})