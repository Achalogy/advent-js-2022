function wrapping(gifts) {
  let regalos_envueltos = []

  gifts.map(gift => {
    const envoltorio_vertical = "*".repeat((gift.split("")).length + 2)

    regalos_envueltos.push(
      envoltorio_vertical + "\n*" + gift + "*\n" + envoltorio_vertical
    )
  })

  return regalos_envueltos
}


const gifts = ['book', 'game', 'socks']
const wrapped = wrapping(gifts)
console.log(wrapped)