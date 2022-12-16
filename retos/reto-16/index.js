function fixLetter(letter) {
  let correction = letter
    .replace(/([,.?!])([^,.?!])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .replace(/([,.?!]{2,})/g, $1 => $1[0])
    .replace(/([.?!])(\s)([A-z])/g,
      (_, $1, $2, $3) => $1 + $2 + $3.toUpperCase()
    )
    .replace(/(santa claus)/gi, 'Santa Claus')
    .trim()
    .replace(/\s([,.?!])/g, '$1')
    .replace(/^([A-z])/g, $1 => $1.toUpperCase())
    .replace(/([^.?!])$/g, '$1.')

  return correction
}

module.exports = fixLetter