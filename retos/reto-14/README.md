# Reto 14

Santa Claus está construyendo pirámides de hielo en el Polo Norte para entrenar a sus renos.

Cada reno comienza en la cima de la pirámide y debe elegir el camino óptimo hacia abajo para recorrerlo **en el menor tiempo posible**. Cada nivel tiene un número que determina el tiempo que necesita para llegar ahí.

Al llegar a una posición, el reno **solo puede deslizarse hacia abajo y en diagonal hacia la izquierda o la derecha**. Visualmente, la pirámide se ve así:

```js
    0
   / \
  7   4
 / \ / \
2   4   6
```

En código la representamos así:

```js
[
  [0],
  [7, 4],
  [2, 4, 6]
]
```

Santa Claus necesita un programa que le dice cuál es el tiempo mínimo que puede tomar cada reno para deslizarse por la pirámide usando el camino más óptimo.

En el ejemplo anterior, el camino más óptimo es `0 -> 4 -> 4`, que toma un total de `0 + 4 + 4 = 8` unidades de tiempo. El resultado sería: `8`.

¿Por qué no es `6`? No es `0 -> 4 -> 2` porque al bajar a la posición del `4` ya no puede diagonalmente llegar a la posición del `2`. Así que el camino más corto posible es `8`. Más ejemplos:

```js
getOptimalPath([[0], [2, 3]]) // 2
// 0 -> 2

getOptimalPath([[0], [3, 4], [9, 8, 1]]) // 5
// 0 -> 4 -> 1

getOptimalPath([[1], [1, 5], [7, 5, 8], [9, 4, 1, 3]]) // 8
// 1 -> 1 -> 5 -> 1
```

**A tener en cuenta:**

 - Ten en cuenta que sólo puedes bajar en diagonal y hacia abajo desde cualquier posición.
 - La primera posición de la pirámide puede ser diferente a 0.
 - Las pirámides pueden tener hasta 10 niveles.
 - Los números en las pirámides pueden ser negativos.

## Análisis Reto 14

Iteraremos la lista de derecha a izquierda, es decir desde el nivel con más números hasta el que solo tiene 1.

```js
//  9 8 1  | 1
//   3 4   | 2
//    0    | 3 - Último nivel
```

Para solucionar el reto encontraremos el número más pequeño entre cada par por cada número en nivel superior y lo sumaremos al mismo, repetiremos hasta llegar al ultimo nivel.


## Reversar la lista y usar reduce

Podríamos utilizar `reverse()` para revertir la lista e implementar nuestra solución con `reduce()`, pero para esto existe el método `.reduceRight()` que funciona de la misma forma que el método `.reduce()` solo que este revisara la lista de derecha a izquierda.

```js
path.reduceRight((previous, current) => {
}
```

En nuestra primer iteración tendriamos que:

```js
previous = [9, 8, 1]
current = [3, 4]
```

## Camino más pequeño

Ahora debemos encontrar el número más pequeño que esta en previous, para esto usaremos el método `.map()` sobre la lista `current`, ya que por ejemplo no podemos ir del `1` al `3`:

```js
//  9 8 1
//   3 4
//    0
```

Así que por cada elemento en la lista `current` revisaremos dos elementos en la lista `previous`, estos serian los que esten en el mismo index y el index superior:

```js
//  9 8 1
//   3 4

3 - 9 y 8
4 - 8 y 1

```

Y si revisamos, el número **3** esta en `index 0`, por lo tanto revisaremos el número **9 y 8** que estan en `index 0` e `index 1` respecticamente. Mismo caso con el número **4**, este esta en el `index 1`**(9 y 8)**, así que revisaremos el `index 1` y el `index 2`**(8 y 1)**.

Sobre estos dos números obtendremos el menor de ellos con `Math.min()` luego lo sumaremos al número de current, es decir al 3 y al 4.

```js
3 + 8 = 11
4 + 1 = 5
```

Ahora nuestros parametros del método `reduceRight()` serían:

```js
previous = [11, 5]
current = [0]
```

Así que, nuestro código revisará cual es el menor de los dos y lo sumara a nuestro único elemento en la lista `current`. Nuestra respuesta sería el número 5.

## Implementación al Código

Volvamos a nuestra primer iteración:

```js
previous = [9, 8, 1]
current = [3, 4]
```

```js
current.map((val, index) => {
  /*
  2 Elementos en current así que:

  Iteración 1:
    val = 3
    index = 0

  Iteración 2:
    val = 4
    index = 1

  */
}
```

Ahora nuestros dos números a comparar serían `previous[index]` y `previous[index+1]`

```js
current.map((val, index) => {
  /*
  2 Elementos en current así que:

  Iteración 1:
    val = 3
    index = 0
      previous[index] = 9
      previous[index + 1] = 8

  Iteración 2:
    val = 4
    index = 1
      previous[index] = 8
      previous[index + 1] = 1

  */
}
```

Y `Math.min()` nos dará el mínimo:

```js
current.map((val, index) => {
 return val + Math.min(previous[index], previous[index + 1])
}
```

No olvidemos sumar `val` a el número más pequeño.

Ahora solo devolvemos nuestro map y tendriamos que nuestro `path.reduceRight(...)` nos devuelve una lista con un solo número dentro, así que tendriamos que guardarlo en una variables y retornar su primer valor.

## Representación

### 1er Iteración

```js
//  9 8 1
//   3 4
//    0
```

Pasa a ser

```js
//   11 5
//    0
```

### 2nda Iteración

```js
//   11 5
//    0
```

Pasa a ser

```js
//    5
```

## Código completo

```js
function getOptimalPath(path) {
  const res = path.reduceRight((previous, current) => {
    return current.map((val, index) => {
      return val + Math.min(previous[index], previous[index + 1])
    })
  })
  return res[0]
}
```
