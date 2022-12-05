const boxes = [
  { l: 1, w: 1, h: 1 },
  { l: 3, w: 3, h: 3 },
  { l: 2, w: 2, h: 2 }
]

function fitsInOneBox(boxes) {
  return boxes.sort((a, b) => {
    /* Ordena las cajas, sumando todos sus lados */
    return (a.l + a.w + a.h) - (b.l + b.w + b.h)
  }).every((box, i) => { // Itera en la lista y hace una comparación con todos los resultados, true false true true = false
    if( i === 0 ) return true; // Ignora la primer caja ya que no hay una caja en index -1
    const prev = boxes[i - 1] // Caja anterior y más grande si es valida la lista
    return box.l > prev.l && box.w > prev.w && box.h > prev.h // valida si la anterior caja es más grande
  })
}

console.log(
  fitsInOneBox(boxes)
)