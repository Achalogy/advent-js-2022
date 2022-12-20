Estamos imprimiendo los códigos de barra para los envíos en la fábrica de Papá Noel. Usamos un sistema de estampación de números donde cada dígito se imprime con una tinta diferente. Es un sistema antiguo pero fiable. Sin embargo, a veces nos quedamos sin tinta de un dígito.

**Escribe una función** que **recibe el dígito del que no tenemos tinta** (un número que será del 0 al 9) y como segundo parámetro, **el número de códigos de barras que hay que imprimir** (empezamos desde 1 hasta este número que recibimos).

Nos debe **devolver un array con los números que incluyen el número que no tenemos tinta**. Veamos un ejemplo:

```js
dryNumber(1, 15) // [1, 10, 11, 12, 13, 14, 15]

// no tenemos tinta para el dígito 1
// tenemos que imprimir 15 códigos de barras del 1 al 15
// los códigos de barras que saldrán mal por falta de tinta son:
// 1, 10, 11, 12, 13, 14, 15

dryNumber(2, 20) // [2, 12, 20]

// no tenemos tinta para el dígito 2
// tenemos que imprimir 20 códigos de barras del 1 al 20
// los códigos de barras que saldrán mal por falta de tinta son:
// 2, 12, 20
```

**Ten en cuenta que:**

 - El número del que no tenemos tinta sólo puede ser del 0 al 9.
 - El número del que no tenemos tinta puede estar en cualquier posición del código de barras.
 - El número de códigos de barras que hay que imprimir puede ser muy grande.

# Solución Reto 18

## Análisis Reto 18

Debemos tomar todo número que contenga `dry` de una lista de números `numbers`, es decír que si tenemos que imprimir el número 10 y nuestro `dry=1`, no podremos ya que el 1 hace parte del número.

## Crear la lista de números

Ya que solo recibimos el ultimo número de la lista, es decir, una lista del 1 al `numbers`, por ejemplo.

```js
numbers = 10
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Así que usaremos `Array.from(Array(numbers).keys())` el cual creara un array a partir de la lista de llaves de una lista de tamaño `numbers`, las llaves o index en una lista van desde el 0. El único problema con esta lista es que va del 0 al `numbers-1`, es decir todos los números deberian ser 1 más arriba.

## Filtrar los que tengan el número dry

Recordemos que el ejercicio nos esta pidiendo los números que **NO SE PUEDEN IMPRIMIR**

```js
dryNumber(1, 15)

[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]

// De esta lista debemos retornar todos los que tengan el número 1.

// [1, 10, 11, 12, 13, 14, 15]

function dryNumber(dry, numbers) {
  return Array.from(Array(numbers).keys())
    .filter(x => `${x + 1}`.split("").includes(`${dry}`))
    .map(x => x + 1)
  }
```

Al separar el número con el método `.split()` podremos revisar si inluye el número `dry`, si es el caso, el método `.filter()` lo añadir a la lista. Por ultimo solo debemos mapear todos los números resultantes para sumarles 1.

## Código Completo

```js
function dryNumber(dry, numbers) {
  return Array.from(Array(numbers).keys())
    .filter(x => `${x + 1}`.split("").includes(`${dry}`))
    .map(x => x + 1)
}
```