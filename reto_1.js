function wrapping(gifts) {
  return gifts.map(gift => {
    const envoltorio_vertical = "*".repeat(gift.length + 2)
    return (
      envoltorio_vertical + "\n*" + gift + "*\n" + envoltorio_vertical
    )
  })
}

const gifts = ['book', 'game', 'socks']
const wrapped = wrapping(gifts)
console.log(wrapped)