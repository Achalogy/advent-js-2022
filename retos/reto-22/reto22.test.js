const checkStepNumbers = require('./index.js')

test("Test #1 - Retorna un Booleano", () => {
  expect(
    typeof(
      checkStepNumbers(
        ["tree_1", "tree_2", "house", "tree_1", "tree_2", "house"],
        [1, 33, 10, 2, 44, 20]
      )
    )
  ).toStrictEqual("boolean")
})

test("Test #2", () => {
  expect(
    checkStepNumbers(
      ["tree_1", "tree_2", "house", "tree_1", "tree_2", "house"],
      [1, 33, 10, 2, 44, 20]
    )
  ).toStrictEqual(true)
})

test("Test #3", () => {
  expect(
    checkStepNumbers(["tree_1", "tree_1", "house"], [2, 1, 10])
  ).toStrictEqual(false)
})

test("Test #4", () => {
  expect(
    checkStepNumbers(["tree_1", "tree_1", "house"], [1, 2, 10])
  ).toStrictEqual(true)
})

test("Test #5", () => {
  expect(
    checkStepNumbers(["house", "house", "tree_1", "tree_1", "house", "tree_2", "tree_2", "tree_3"], [5, 2, 1, 2, 3, 4, 5, 6])
  ).toStrictEqual(false)
})

test("Custom Test", () => {
  expect(
    checkStepNumbers(["tree_1", "tree_2", "house", "tree_1", "tree_2", "house"], [1, 33, 10, 2, 33, 20])
  ).toStrictEqual(false)
})