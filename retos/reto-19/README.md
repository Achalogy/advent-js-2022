El día se acerca y Papá Noel tiene el almacén de juguetes hecho un desastre. Ayúdale a ordenar los juguetes en el almacén para que pueda encontrarlos más fácilmente.

Para ello, nos dan dos arrays. El primero es un **array de juguetes**, y el segundo es un **array de números que indican la posición de cada juguete en el almacén**.

Lo único a tener en cuenta es que **las posiciones pueden no empezar en 0**, aunque siempre serán números consecutivos y de forma ascendente.

Tenemos que **devolver un array donde cada juguete esté en la posición que le corresponde.**

```js
const toys = ['ball', 'doll', 'car', 'puzzle']
const positions = [2, 3, 1, 0]

sortToys(toys, positions)
// ['puzzle', 'car', 'ball', 'doll']

const moreToys = ['pc', 'xbox', 'ps4', 'switch', 'nintendo']
const morePositions = [8, 6, 5, 7, 9]

sortToys(moreToys, morePositions)
// ['ps4', 'xbox', 'switch', 'pc', 'nintendo']
```

*A tener en cuenta*
 - Siempre habrá el mismo número de juguetes que de posiciones.
 - Ni los juguetes ni las posiciones se repiten.

# Solución Reto 19

## Análisis Reto 19

Ordenaremos los regalos segun el número que esta en la lista de posiciones, es decir:

```js
const moreToys = ['pc', 'xbox', 'ps4', 'switch', 'nintendo']
const morePositions = [8, 6, 5, 7, 9]
```

`ps4` esta en la misma posición que `5` en la lista de posiciones, así que al ser `5` el número más pequeño, `ps4` debera ir de primeras.

`switch` esta en la misma posición que el número `9`, este es el más grande de la lista, así que `switch` ira de ultimas.

## Ordenar 

Ordenaremos restando los números de la lista `positions`, así que iteraremos sobre la lista de jueguetes, pero tomaremos su index con el método `toys.indexOf()` y lo usaremos para tomar el número en su mismo index de la lista `positions`.

```js
function sortToys(toys, positions) {
  return toys.sort((a, b) => positions[toys.indexOf(a)] -
    positions[toys.indexOf(b)])
}
```

## Eso es todo no hay más jajajaja

```js
function sortToys(toys, positions) {
  return toys.sort((a, b) => positions[toys.indexOf(a)] -
    positions[toys.indexOf(b)])
}
```