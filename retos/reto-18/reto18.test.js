const dryNumber = require('./index.js')

test("Test #1 - Retorna un array", () => {
  expect(
    Array.isArray(
      dryNumber(1, 15)
    )
  ).toStrictEqual(true)
})

test("Test #2 - dryNumber(1, 15)", () => {
  expect(
    dryNumber(1, 15)
  ).toStrictEqual([
    1,
    10,
    11,
    12,
    13,
    14,
    15
  ])
})

test("Test #3 - dryNumber(2, 20)", () => {
  expect(
    dryNumber(2, 20)
  ).toStrictEqual([
    2,
    12,
    20
  ])
})

test("Test #4 - dryNumber(3, 33)", () => {
  expect(
    dryNumber(3, 33)
  ).toStrictEqual([
    3,
    13,
    23,
    30,
    31,
    32,
    33
  ])
})

test("Test #5 - dryNumber(4, 45)", () => {
  expect(
    dryNumber(4, 45)
  ).toStrictEqual([
    4,
    14,
    24,
    34,
    40,
    41,
    42,
    43,
    44,
    45
    ]
  )
})

test("Test #6 - dryNumber(5, 55)", () => {
  expect(
    dryNumber(5, 55)
  ).toStrictEqual([
    5,
    15,
    25,
    35,
    45,
    50,
    51,
    52,
    53,
    54,
    55
  ])
})

test("Test #7 - dryNumber(9, 8)", () => {
  expect(
    dryNumber(9, 8)
  ).toStrictEqual([])
})