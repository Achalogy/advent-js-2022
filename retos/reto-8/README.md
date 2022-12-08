## Disclaimer

La función optimizada se encuentra explicada en [este documento](https://github.com/Achalogy/advent-js-2022/blob/main/retos/reto-8/OPTIMIZED.md).

# Reto 8

Se han estropeado algunos trineos eléctricos y los elfos están buscando piezas de repuesto para arreglarlos, pero no tienen claro si las piezas que tienen sirven.

Las piezas de repuesto son cadenas de texto y el mecánico Elfon Masc ha dicho que una pieza de repuesto es válida **si la pieza puede ser un palíndromo después de eliminar, como máximo, un carácter.**

> Un palíndromo es una palabra o frase que se lee igual de izquierda a derecha que de derecha a izquierda.

Nuestra función debe devolver un booleano que indique si la pieza de repuesto es válida o no con esa regla:

```js
checkPart("uwu") // true
// "uwu" es un palíndromo sin eliminar ningún carácter

checkPart("miidim") // true
// "miidim" puede ser un palíndromo después de eliminar la primera "i"
// ya que "midim" es un palíndromo

checkPart("midu") // false
// "midu" no puede ser un palíndromo después de eliminar un carácter
```

# Solución al reto 6

## Análisis

Debemos comprobar si eliminando una de las letras **o ninguna**, esta palabra es un palíndromo, por lo tanto, debemos revisar la palabra completa y eliminando una letra.

## ¿Qué vamos a usar? 

Usaremos los métodos `.some()` y `.filter()`, además de reversar arrays.

## Método Some

El método `.some()` funciona de tal manera que tú retornas una condición y si un elemento del array la cumple, retornará true. El único caso en que retornara false es cuando nunca se cumple.

### Aplicación de Some

Tenemos, por ejemplo, la palabra `miidim`, la cual al eliminar una de las i, se convertiría en palíndromo:

```js

[...part] // ["m", "i", "i", "d", "i", "m"]

[...part].some((x, i, arr) => {
  // x = Elemento del array
  // i = Index del elemento del array
  // arr = Array

  return condicion

})

```

## Eliminar una de las letras

Ya que tenemos la palabra separada en un array, vamos a eliminar letra por letra y luego sort comprobara si alguna de estas es correcta:

```js
// i = Index del elemento del array

let w = arr.filter((_, y) => y != i)

```

Esto nos dará la misma lista `arr` pero sin una de las letras. El filter está siguiendo la condición de que si el index `y` del array es igual al index `i` (la letra que queremos eliminar) retornara `false`.

En iteraciones del `some`, la variable `w` será igual a:

```js
["i", "i", "d", "i", "m"] // false
["m", "i", "d", "i", "m"] // true
["m", "i", "d", "i", "m"] // true
["m", "i", "i", "i", "m"] // true
["m", "i", "i", "d", "m"] // false
["m", "i", "i", "d", "i"] // false
```

Como vemos, hay 3 casos en los que se cumple que la palabra sea palíndromo al eliminar un máximo de una letra.

### Comprobar que es un palíndromo

Para comprobar, uniremos el array con el método `.join()` y lo compararemos con el mismo array pero invertido.

```js
  return w.join("") == w.reverse().join("")
```

## Código completo
```js
function checkPart(part) {
  return [...part].some((x, i, arr) => {
    let w = arr.filter((_, y) => y != i)
    return w.join("") == w.reverse().join("")
  })
}
```