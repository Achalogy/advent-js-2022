# Reto 17

Estamos preparando los sacos para los regalos de Navidad pero cada saco tiene un **límite de peso.**

Nos dan un array con los nombres de los regalos y un número que es el peso máximo que puede llevar cada saco. El **peso de cada regalo es la longitud de su nombre.**

Escribe una función que agrupe los regalos en sacos y devuelva un array con los nombres de los regalos de cada saco. Para agrupar los regalos, se separan los nombres por espacios (el espacio no cuenta como peso).

**¡Pero ojo!** Cada saco puede llevar un máximo de peso, y si el peso de los regalos de un saco supera el peso máximo, se debe separar el último regalo del saco y ponerlo en el siguiente saco.

```js
carryGifts(['game', 'bike', 'book', 'toy'], 10)
// ['game bike', 'book toy']
// en cada saco se puede llevar 10kg
// el primer saco lleva 'game' y 'bike' que pesan 4kg y 4kg
// el segundo saco lleva 'book' y ' toy' que pesan 4kg y 3kg

carryGifts(['game', 'bike', 'book', 'toy'], 7)
// ['game', 'bike', 'book toy']
// en cada saco se puede llevar 7kg
// el primer saco sólo puede llevar 'game' que pesa 4kg
// el segundo saco sólo puede llevar 'bike' que pesa 4kg
// el tercer saco lleva 'book' y 'toy' que pesan 4kg y 3kg

carryGifts(['game', 'bike', 'book', 'toy'], 4)
// ['game', 'bike', 'book', 'toy']
// en cada saco se puede llevar 4kg
// cada saco sólo puede llevar un regalo

carryGifts(['toy', 'gamme', 'toy', 'bike'], 6)
// ['toy', 'gamme', 'toy', 'bike']
// en cada saco se puede llevar 6kg
// cada saco sólo puede llevar un regalo
// fíjate que no se puede llevar 'toy toy' en un saco
// porque no está uno al lado del otro
```

**Ten en cuenta:**

 - Los regalos siempre se agrupan por orden de aparición en el array.
 - No puedes cambiar el orden de los regalos en el array a la hora de agruparlos.
 - Se pueden agrupar todos los regalos en un solo saco.
 - Si no se puede agrupar ningún regalo en un saco, se devuelve un array vacío.

# Solución Reto 17

## Análisis del Reto 17

Debemos de ir llenando bolsas y si uno de los regalos no cabe, pasar a la siguiente bolsa, para esto tendremos que comprobar la longitud actual de la bolsa y la longitud del objeto que vamos a añadir, para luego revisar si la suma de estos es un peso que puede llevar la bolsa, de lo contrario generaremos otra bolsa.

## Comprobar si almenos cabe 1 regalo en la bolsa

Para esto usaremos un simple `.every()`, donde todos los regalos deben de tener un tamaño igual o menor al máximo de la bolsa.

```js
if (!gifts.every(gift => maxWeight >= gift.length)) {
    return []
  }
```

## Iterar sobre cada regalo

Lo primero será crear una lista donde pushearemos las bolsas completas:

```js
let carry = ['']
```

Con un string vacio dentro para comenzar.

Iteraremos sobre la lista de regalos y comprobaremos la longitud de la bolsa inmediatamente anterior, o en este caso la ultima de la lista `carry`

```js
gifts.forEach(gift => {
  const previousWeight = carry.at(-1).replace(/ /g, '')
})
```

Ya que nuestas bolsas son strings con espacios, los quitaremos usando regex. `.replace(/ /g, '')`

## Definir que harémos con la bolsa

Si al sumar el peso actual de la bolsa con el peso del regalo, el peso total es menor a `maxWeight` lo añadiremos a la bolsa. De lo contrario crearemos una nueva bolsa donde el primer regalo sea este.

```js
 if ((previousWeight + gift.length) <= maxWeight) {
    carry[carry.length - 1] += ' ' + gift
    carry[carry.length - 1] = carry[carry.length - 1].trim()
    return
  }
```

Si el peso es menor o igual al peso máximo, añadiremos el regalo al ultimo array de la lista `carry` y luego lo reemplazaremos con el mismo pero usando el método `.trim()` para eliminar posibles espacios antes o despues del string.

Y de lo contrario, si el peso es mayor, solo pushearemos el regalo a la lista, creando así una nueva bolsa.

```js
  if ((previousWeight + gift.length) <= maxWeight) {
    ...
  }
  carry.push(gift)
```

Y para finalizar solo tendremos que enviar la lista `carry`

## Código Completo

```js
function carryGifts(gifts, maxWeight) {
  if (!gifts.every(gift => maxWeight >= gift.length)) {
    return []
  }
  let carry = ['']
  gifts.forEach(gift => {
    const previousWeight = carry.at(-1).replace(/ /g, '').length
    if ((previousWeight + gift.length) <= maxWeight) {
      carry[carry.length - 1] += ' ' + gift
      carry[carry.length - 1] = carry[carry.length - 1]
      return
    }
    carry.push(gift)
  })
  return carry
}
```