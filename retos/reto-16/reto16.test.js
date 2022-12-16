const fixLetter = require('./index.js')

test('Test #1 - Retorna un String', () => {
  expect(
    typeof(
      fixLetter("test")
    )
  ).toBe('string')
})

test('Test #2 - fixLetter(` hello,  how are you??     do you know if santa claus exists?  i really hope he does!  bye  `)', () => {
  expect(
    fixLetter(` hello,how are you??     do you know if santa claus exists?  i really hope he does!  bye  `)
  ).toBe("Hello, how are you? Do you know if Santa Claus exists? I really hope he does! Bye.")
})

test(`Test #3 - fixLetter("  Hi Santa claus. I'm a girl from Barcelona , Spain . please, send me a bike.  Is it possible?")`, () => {
  expect(
    fixLetter("  Hi Santa claus. I'm a girl from Barcelona , Spain . please, send me a bike.  Is it possible?")
  ).toBe("Hi Santa Claus. I'm a girl from Barcelona, Spain. Please, send me a bike. Is it possible?")
})

test(`Test #4 - fixLetter("  hi    santa    claus ")`, () => {
  expect(
    fixLetter("  hi    santa    claus ")
  ).toBe("Hi Santa Claus.")
})

test(`Test #5 - fixLetter("  hi    santa    claus . santa claus is the best  ")`, () => {
  expect(
    fixLetter("  hi    santa    claus . santa claus is the best  ")
  ).toBe("Hi Santa Claus. Santa Claus is the best.")
})

test(`Test #6 - fixLetter("  hi    santa    claus ??")`, () => {
  expect(
    fixLetter("  hi    santa    claus . are you there???")
  ).toBe("Hi Santa Claus. Are you there?")
})

test(`Test #7 - fixLetter("Hey santa Claus .  I want a bike.   I want a videogame! ")`, () => {
  expect(
    fixLetter("Hey santa Claus .  I want a bike.   I want a videogame! ")
  ).toBe("Hey Santa Claus. I want a bike. I want a videogame!")
})