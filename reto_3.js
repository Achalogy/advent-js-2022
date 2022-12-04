distributeGifts = (regalos, renos) => {
  let pesoMax = renos.join("").length * 2
  let pesoCaja = regalos.join("").length
  return ((pesoMax / pesoCaja) >> 0)
}