# Reto 4

Santa Claus necesita hacer una revisión de sus cajas de regalos para asegurarse de que puede empaquetarlas todas en su trineo. Cuenta con una serie de **cajas de diferentes tamaños, que se caracterizan por su longitud, anchura y altura**.

Tu tarea es escribir **una función** que, **dada una lista de cajas con sus tamaños**, determine si es posible **empaquetar todas las cajas en una sola, de manera que cada caja contenga a otra** (que a su vez contenga a otra, y así sucesivamente).

Cada caja representa sus medidas con un objeto. Por ejemplo: `{l: 2, w: 3, h: 2}`. Esto significa que la caja tiene una longitud de 2, una anchura de 3 y una altura de 2.

Una caja entra en otra caja si todos los lados de la primera son menores a los lados de la segunda. **Los elfos nos han dicho que las cajas no se pueden rotar**, así que no se puede poner una caja de 2x3x2 en una caja de 3x2x2. Veamos unos ejemplos:

```js
fitsInOneBox([
  { l: 1, w: 1, h: 1 },
  { l: 2, w: 2, h: 2 }
]) // true
```

En el ejemplo anterior, la caja más pequeña entra en la caja más grande. Por lo tanto, es posible empaquetar todas las cajas en una sola. Ahora veamos un caso que no:

```js
const boxes = [
  { l: 1, w: 1, h: 1 },
  { l: 2, w: 2, h: 2 },
  { l: 3, w: 1, h: 3 }
]

fitsInOneBox(boxes) // false
```

En el ejemplo anterior, la caja más pequeña entra en la caja del medio, pero la caja del medio no entra en la caja más grande. Por lo tanto, no es posible empaquetar todas las cajas en una sola.

Ten en cuenta que las cajas pueden no venir en orden:

```js
const boxes = [
  { l: 1, w: 1, h: 1 },
  { l: 3, w: 3, h: 3 },
  { l: 2, w: 2, h: 2 }
]

fitsInOneBox(boxes) // true
```

En el ejemplo anterior, la primer caja cabe en la tercera, y la tercera en la segunda. Por lo tanto, es posible empaquetar todas las cajas en una sola.

## Cosas a tener en cuenta:

 - Las cajas no se pueden rotar ya que los elfos nos han dicho que la máquina no está preparada.
 - Las cajas pueden venir desordenadas de tamaño.
 - Las cajas no son siempre cuadradas, pueden ser rectangulares.

# Solución al Reto 4

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/8HLJUp9zvTs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Ver Video](https://youtu.be/8HLJUp9zvTs)
</div>

## Análisis

Debemos organizar las cajas en orden ascendente según su tamaño (de menor a mayor), luego podremos comprobar sus tamaños para confirmar que cada una cabe en la siguiente. 

## ¿Qué vamos a usar? 

Al ser este un reto de nivel medio, usaremos funciones más complejas, entre ellas [sort](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) y [every](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/every).

Necesitaremos distinguir entre > y <, además de conocer como funcionan las listas.

### Ordenar las cajas de menor a mayor

> El método sort() ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado. La ordenación no es necesariamente estable. El modo de ordenación por defecto responde a la posición del valor del string de acuerdo a su valor Unicode. (MDN web docs)

En el método `sort(compareFuncion)` se nos pedirá una función de comparación, la cual nos permitirá ordenar de menor a mayor los elementos de una lista.

Esta función deberá retornar un número (en strings comparará los valores ASCII de las letras), por tanto:

 - Si retorna menor a 0, el valor `a` se situará antes que `b`, es decir, viene primero
 - Si retorna 0 se deja en el mismo lugar, pero ordenados con respecto a los demás elementos.
 - Si retorna mayor a 0, el valor `a` se situará después que `b`, es decir, viene después.

Por tanto, haremos lo siguiente: 

```js
boxes.sort((a, b) => {
  /* Ordena las cajas, sumando todos sus lados */
  return (a.l + a.w + a.h) - (b.l + b.w + b.h)
})
```

Sumaremos todos los lados de a y todos los lados de b, para luego restarlos, si cambiamos de lugar b y a, estos se ordenarán de mayor a menor.

### Confirmar si todos los elementos del array cumplen con la condición

La condición es que la caja anterior sea más pequeña, ya que tenemos las cajas ordenadas de menor a mayor será algo así:

```js
[ 
  { l: 1, w: 1, h: 1 }, 
  { l: 2, w: 2, h: 2 }, 
  { l: 3, w: 1, h: 3 } 
]
```

Si tomamos la caja en index 1, es decir `{ l: 2, w: 2, h: 2 }`, comprobaremos la caja anterior, es decir `{ l: 1, w: 1, h: 1 }`, se cumplirá la condición si `l, w y h` son mayores en la caja que está en index más alto.

```js
{ l: 2, w: 2, h: 2 } Caja index 1
     
{ l: 1, w: 1, h: 1 } Caja index 0
```

Por tanto, retornara `true` si `l, w y h` de la caja en index 1 es mayor que `l, w y h` de la caja en index 0.

Para esto usaremos el método `.every(callback(element, i))`.

```js
function fitsInOneBox(boxes) {
  return boxes.sort((a, b) => {
    return (a.l + a.w + a.h) - (b.l + b.w + b.h)
  }).every((box, i) => {
    if( i === 0 ) return true;
    const prev = boxes[i - 1]
  })
}
```

Ya que la caja 1 siempre será la más grande, no debemos comprobar nada, puesto que no hay una caja en un index menor. 

Saltamos directamente a la caja en `index = 1` y definimos la variable `prev = boxes[i-1]`, no olvidemos que en este tipo de funciones tenemos como primera propiedad el elemento y como segunda propiedad su posición en la lista (index).

Ya con las dos cajas que compararemos definidas: Caja en index 1: `box` y caja en index 0: `prev`

```js
box.l > prev.l && // Si l en la caja en index 1 es máyor a l en la caja en index 0 dara true
box.w > prev.w && // Si w en la caja en index 1 es máyor a w en la caja en index 0 dara true
box.h > prev.h // Si h en la caja en index 1 es máyor a h en la caja en index 0 dara true
```

`&&` funciona de tal forma que si tenemos `condicion1 && condicion2` dará como resultado `true` solo si las dos condiciones son `true`, es decir que si tenemos `true` y `false` retornará false.

Retornamos este valor y el reto estaría resuelto.

```js
function fitsInOneBox(boxes) {
  return boxes.sort((a, b) => {
    return (a.l + a.w + a.h) - (b.l + b.w + b.h)
  }).every((box, i) => {
    if( i === 0 ) return true;
    const prev = boxes[i - 1]
    return box.l > prev.l && box.w > prev.w && box.h > prev.h
  })
}
```