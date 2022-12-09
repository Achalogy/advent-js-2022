# Reto 9

Una empresa que fabrica luces de Navidad nos ha pedido que le echemos una mano.

Tienen unas tiras led que son como un Array. Cada posición es un led y puede ser estar encendido (1) o apagado (0).

**Cada 7 segundos**, los leds cambian de estado de esta forma:

 - **Si el led está apagado**, se enciende si el led de su izquierda (index - 1) estaba encendido antes.
 - **Si el led está encendido**, se mantiene siempre encendido.
Nos han pedido un programa que nos diga cuantos segundos deben pasar hasta que todos los leds están encendidos. **Los segundos se expresan en un número entero**. Por ejemplo:

```js
const leds = [0, 1, 1, 0, 1]
countTime(leds) // 7
// 7 segundos ya que en el primer cambio
// todas las luces se encendieron
// 0s: [0, 1, 1, 0, 1]
// 7s: [1, 1, 1, 1, 1]

countTime([0, 0, 0, 1]) // 21
// 21 segundos ya que necesita tres cambios:
// 0s: [0, 0, 0, 1]
// 7s: [1, 0, 0, 1]
// 14s: [1, 1, 0, 1]
// 21s: [1, 1, 1, 1]

countTime([0, 0, 1, 0, 0]) // 28
// 28 segundos ya que necesita cuatro cambios:
// 0s: [0, 0, 1, 0, 0]
// 7s: [0, 0, 1, 1, 0]
// 14s: [0, 0, 1, 1, 1]
// 21s: [1, 0, 1, 1, 1]
// 28s: [1, 1, 1, 1, 1]
```

**A tener en cuenta**
 - El array siempre tendrá al menos un led encendido.
 - El array puede tener cualquier longitud.
 - Si todos los leds están encendidos, el tiempo es 0.

# Solución Reto 9

## Análisis Reto 9

Usaremos el ejemplo de una lista `[0, 1, 0, 0, 1, 0, 0, 0]`

1. Uniremos la lista

```js
[0, 1, 0, 0, 1, 0, 0, 0] -> 01001000
```

2. Separaremos el string en donde están los 1

```js
01001000 -> ["0", "00", "000"]
```

3. Ya que los 0 quedan separados, los que están a la derecha del último 1, se sumaran a los primeros 0:

```js
["0", "00", "000"] -> ["0000", "00"]
```

4. la lista de 0 más larga se multiplica por 7.

## Unir la lista y separar en donde están los 1

```js
let arr = leds.join("").split("1")
```

## Mover los 0

Los 0 que están al final de la lista, tienen que ser encendidos en consecuencia del primer 1:

```js
[0, 1, ... 1, 0, 0, 0]
[1, 1, ... 1, 0, 0, 0]
// El 1 en index = 0 enciende el ultimo 0

[1, 1, ... 1, 0, 0, 1]
```

Por tanto, podemos mover estos últimos 0 al inicio y tendremos el mismo resultado:

```js
[0, 0, 0, 0, 1, 0, 0, 1]
```

Para esto hay una solución sencilla, el método `.pop()` retorna el elemento eliminado, es decir:

```js
let arr = leds.join("").split("1") // ["0", "00", "000"]
console.log(
  arr.pop() // 000
)
```

Así que uniremos el primer string con el último, el que nos da el método `.pop()`

```js
let arr = leds.join("").split("1")
arr[0] += arr.pop()

console.log(arr) // ["0000", "00"]
```

## Encontrar el string más largo

Desde el punto de vista del ejercicio, debemos contar cuantas veces comprobamos que el 0 tiene un 1 a su izquierda para encenderse.

```js
[0, 1, 0, 0, 1, 0, 0, 0]
```

El 1 en `index = 1` tiene 4 ceros a su izquierda, es decir que 4 veces tardara en encender todos los 0 a su izquierda, mientras que el 1 en `index = 4` tiene solo 2, por tanto nuestra respusta debe ser `4 * 7 = 28`, recordemos que 7 es el número de segundos que tardar encender el led.

### String -> length

Convertiremos nuestra lista de string en una lista de sus longitudes, es decir:

```js
["0000", "00"] -> [4, 2]
```

Lo haremos con el método `.map()`, ya que retorna una lista

```js
arr.map((led) => led.length) // [4, 2]
```

### Encontrar el número más grande

```js
Math.max(...arr.map((led) => led.length)) // 4
```

### Retornar solución

```js
return Math.max(...arr.map((led) => led.length)) * 7
```

## Código completo

```js
function countTime(leds) {
  let arr = leds.join("").split("1")
  arr[0] += arr.pop()
  return Math.max(...arr.map((led) => led.length)) * 7
}
```