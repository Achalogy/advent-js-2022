# Reto 7

En los almacenes de Papá Noel están haciendo inventario. Hay tres almacenes (que se representa cada uno como un Array). En cada almacén hay regalos.

Nos han pedido que escribamos un programa que nos diga qué regalos hay que comprar para reponer en nuestros almacénes ahora que se acerca la Navidad.. **Un regalo se tiene que reponer cuando sólo hay stock en uno de los tres almacénes.**

Por ejemplo, si tenemos los siguientes almacenes:

```js
const a1 = ['bici', 'coche', 'bici', 'bici']
const a2 = ['coche', 'bici', 'muñeca', 'coche']
const a3 = ['bici', 'pc', 'pc']

/* El almacén a1 tiene "bici" y "coche".
El almacén a2 tiene "coche", "bici" y "muñeca".
El almacén a3 tiene "bici" y "pc".

El regalo "muñeca" y "pc" sólo están en los almacenes a2 y a3 respectivamente.
*/

const gifts = getGiftsToRefill(a1, a2, a3) // ['muñeca', 'pc']
```

Como ves, los almacénes pueden tener el mismo regalo repetido varias veces. Pero, por más existencias que haya en un almacén, si no tenemos en los otros dos, debemos reponerlo para tener mejor distribución.

**📝 Summary**

 - Crea una función getGiftsToRefill que reciba tres Array como parámetros.
 - La función debe devolver un Array con los regalos que hay que reponer.
 - Un regalo se debe reponer cuando sólo hay stock en uno de los tres almacénes.
 - Si no hay ningún regalo que reponer, la función debe devolver un Array vacío.
 - Si hay más de un regalo que reponer, la función debe devolver un Array con todos los regalos que hay que reponer.

# Solución al reto 7

## Análisis

Debemos obtener una lista sin repeticiones de todos los regalos y luego comprobar si este es parte de una lista o más de una. Si es parte lo añadiremos al array que retornaremos.

## ¿Qué vamos a usar? 

En este reto usaremos `Set` para eliminar los elementos repetidos de un array y el método `.filter()` para validar que el regalo solo existe en una de las listas.

## Conseguir la lista de elementos sin repetir

Lo primero que haremos será conseguir una lista en la que solo se muestre 1 vez cada regalo, es decir:

```js
const a1 = ['bici', 'coche', 'bici', 'bici']
const a2 = ['coche', 'bici', 'muñeca', 'coche']
const a3 = ['bici', 'pc', 'pc']

['bici', 'coche', 'muñeca', 'pc'] // Debemos llegar a esta lista
```

Para esto podemos usar `Set`, el cual según la [mdn web docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set) "Los objetos Set son colecciones de valores" y este tiene una propiedad muy interesante: "Un valor en un Set solo puede ocurrir una vez; es único en la colección del Set."

Por tanto, iniciaremos creando una sola lista:

```js
[...a1, ...a2, ...a3]
```

Y lo convertiremos a un `Set`:

```js
new Set([...a1, ...a2, ...a3]) // Set(4) { 'bici', 'coche', 'muñeca', 'pc' }
```

El problema es que este no es un array, en consecuencia no podemos filtrarlo, así que lo convertiremos en uno:

```js
[...new Set([...a1, ...a2, ...a3])] // [ 'bici', 'coche', 'muñeca', 'pc' ] 
```

## Filtrar los regalos que cumplan la condición

La condición que los regalos deben cumplir es que solo estén en uno de los array. En JavaScript podemos sumar booleanos, siendo `true = 1` y `false = 0`, así que haciendo uso del método `.includes()` podemos comprobarlo de esta forma:

```js
  .filter(gift => 
    a1.includes(gift) + 
    a2.includes(gift) + 
    a3.includes(gift) 
    === 1
  )
```

Filter nos devolverá una lista en la que solo estén los elementos que cumplan la condición `.filter(x => condicion)`

## Código Completo

```js
function getGiftsToRefill(a1, a2, a3) {
  return [
    ...new Set([...a1, ...a2, ...a3])]
      .filter(gift => 
        a1.includes(gift) + 
        a2.includes(gift) + 
        a3.includes(gift) 
        === 1
    )
}

```