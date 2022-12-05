/* 
Este año los elfos han comprado una máquina que envuelve regalos. Pero… ¡no viene programada! Necesitamos crear un algoritmo que le ayude en la tarea.

A la máquina se le pasa un array con los regalos. Cada regalo es un string. Necesitamos que la máquina envuelva cada regalo en papel de regalo y lo coloque en un array de regalos envueltos.

El papel de regalo es el símbolo * y para envolver un regalo se coloca el símbolo * de forma que rodee totalmente al string por todos los lados. Por ejemplo:
*/

function wrapping (gifts) {
  if(!Array.isArray(gifts)) return;
  return gifts.map(gift => { // Por cada regalo en la lista (gift) va a hacer esto:
    // Ya que tiene que ser horizontal, vamos a necesitar 2 más de papel en las esquinas
    // String.repeat(n) - repite n veces un string
    const envoltorio_vertical = "*".repeat(gift.length + 2)
    return `${envoltorio_vertical}\n*${gift}*\n${envoltorio_vertical}`
  })
}

module.exports = wrapping;

/*
Como ves, el papel de regalo envuelve el string. Por arriba y por abajo, para no dejar ningún hueco, las esquinas también están cubiertas por el papel de regalo.

Nota: El carácter \n representa un salto de línea.

¡Ojo! Asegúrate que pones el número correcto de * para envolver completamente el string. Pero no demasiados. Sólo los necesarios para cubrir el string.

Ah, y no modifiques (mutes) el array original.
*/