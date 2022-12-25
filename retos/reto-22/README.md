# Reto 22

Verifica que todas las secuencias independientes de sistemas de iluminación navideña estén en orden estrictamente creciente. Tenemos dos arrays: `systemNames` y `stepNumbers`.

`systemNames` contiene los nombres de los sistemas de iluminación navideña, y `stepNumbers` contiene los números de paso de cada sistema.

Debemos verificar que los `stepNumbers` de cada sistema estén en orden estrictamente creciente. Si esto es cierto, devuelve `true`; de lo contrario, devuelve `false`.

Por ejemplo:

```js
const systemNames = ["tree_1", "tree_2", "house", "tree_1", "tree_2", "house"]
const stepNumbers = [1, 33, 10, 2, 44, 20]

checkStepNumbers(systemNames, stepNumbers) // => true

// tree_1 tiene los pasos: [1, 2]
// tree_2 tiene los pasos: [33, 44]
// house tiene los pasos: [10, 20]

// true: Los pasos de cada sistema están en orden estrictamente creciente

checkStepNumbers(["tree_1", "tree_1", "house"], [2, 1, 10]) // => false

// tree_1 tiene los pasos: [2, 1]
// house tiene los pasos: [10]

// false: tree_1 tiene los pasos de forma decreciente
```

**Ten en cuenta que:**

- La posición del nombre del sistema en systemNames y el número de pasos en `stepNumbers` corresponden al mismo sistema.
- Los pasos en `stepNumbers` pueden repetirse para diferentes sistemas.

# Solución Reto 22

## Análisis Reto 22

Debemos relacionar dos listas:

```js
["tree_1", "tree_1", "house"]
[   2,        1,       10   ]
```

Por tanto, podríamos decir que `tree_1` se relaciona con los números `2 y 1` y `house` solo con el número `10`.  

De esta relación por cada una de las palabras, confirmaremos si van en orden de menor a mayor, es decir que en nuestro ejemplo **NO SE CUMPLIRÍA**, ya que tenemos que en `tree_1` va `2 y 1` de mayor a menor.

Un ejemplo en donde si se cumple podría ser, por ejemplo:

```js
["tree_1", "tree_1", "house"]
[   1,        2,       10   ]
```

## Como lo vamos a solucionar?

Haciendo uso del método `.every()` comprobaremos por cada uno de los elementos de la lista, si el siguiente con su propio nombre, es decir, si iteramos y nuestro elemento es `tree_1`, miraremos si el **siguiente** con el mismo nombre, o sea `tree_1` es menor.

Ejemplo: 

```js
["tree_1", "tree_2", "house", "tree_1", "tree_2"]
[   1,        33,       10,       2,       44,  ]
```

### Iteración 1

* Elemento `tree_1`
* Index `0`

El index `0` de ambas listas es `tree_1` y `1`, así que comprobaremos que `1` es menor o igual a la siguiente aparición de `tree_1`

* Elemento `tree_1` (Segunda Aparición)
* Index `3`

```js
1 < 2
```

Por ahora la condición se cumple.

### Iteración 2

* Elemento `tree_2`
* Index `1`

El index `1` de ambas listas es `tree_2` y `33`, así que comprobaremos que `33` es menor o igual a la siguiente aparición de `tree_2`

* Elemento `tree_2` (Segunda Aparición)
* Index `4`

```js
33 <= 44
```

Ahora por último un ejemplo donde solo está una vez el elemento, o también cuando llegamos a la última aparición:

### Iteración 3

Acá tenemos el caso de que estemos en la última aparición del elemento, lo que tendremos que hacer es comprobar que esta es la última y sumarle 1 si es el caso.

* Elemento `house`
* Index `2`

El index `2` de ambas listas es `house` y `10`, así que, nuestra condición, al no encontrar una aparición más adelante del elemento, nos dará `-1`, que como más adelante veremos nos retornara nuevamente `house` en el index `2`

* Elemento `house` (Traído por la condición)
* Index `2`

```js
10 < 10
```

`10` no es menor a `10`, así que sumaremos `1`.

```js
10 < 11
```

## Aplicación al Código

Primero iteraremos sobre la lista de nombres, recordemos que tendremos una condición así que con el método `.every()` comprobaremos que se cumpla siempre.

```js
systemNames.every((e, i) => ...)
```

## Condición

Lo primero que haremos será encontrar con qué número se relaciona, así que aprovechando que tenemos el `index`, lo usaremos para tomar el valor que está en la misma posición de las dos listas:

```js
stepNumbers[i]
```

Y lo compararemos con la siguiente aparición del nombre, o en tal caso, compararemos el mismo número.

Cortaremos la lista en el index siguiente a nuestro valor, es decir que si estamos en nuestra primer iteración:

```js
["tree_1", "tree_2", "house", "tree_1", "tree_2"]

// e = tree_1
// i = 0
```

Cortaremos desde `tree_2`

```js
systemNames.slice(i + 1) // ["tree_2", "house", "tree_1", "tree_2"]
```

Ahora en esa lista buscaremos si está nuevamente el elemento:

```js
systemNames.slice(i + 1).indexOf(e)
```

Si no está nos retornara `-1`

Ya que necesitamos el `index` de la lista real y no la que está cortada, sumaremos nuevamente el `index` al valor que nos retorna el método `.indexOf()` y además también debemos sumar `1` porque recordemos que en nuestro slice sumamos `1` al `index`.

```js
stepNumbers[i + 1 + systemNames.slice(i + 1).indexOf(e)]
```

## Sumar 1 si es el mismo que estamos comparando

Si restamos el index de la última aparición del elemento, con el elemento que nos da la iteración de la lista original y este nos da `0`, convirtiéndolo a `boolean` se transformara a `false`, con el operador `!` lo convertimos a `true`, y lo sumamos a nuestro valor.

En el caso de que no sea la última aparición del elemento en la lista, el `Boolean(...)` nos dará `true` y con el operador `!` se convertirá en `false` y lo sumaremos al valor, es decir, sumaremos `0`

```js
return systemNames.every((e, i) => 
  stepNumbers[i] <= stepNumbers[...] + !Boolean(systemNames.lastIndexOf(e) - i)
)
```

## Código Completo

```js
function checkStepNumbers(systemNames, stepNumbers) {
  return systemNames.every((e, i) => stepNumbers[i] <= stepNumbers[
    i + systemNames.slice(i + 1).indexOf(e) + 1
  ])
}
```