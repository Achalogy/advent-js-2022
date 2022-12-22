# Reto 21

Hay muchas cartas de niños pidiendo regalos y es muy difícil que podamos hacer inventario de todos ellos. Por eso, hemos decidido crear un programa que nos dibuje una tabla con los regalos que nos piden y sus cantidades.

Para ello nos dan un array de objetos con los nombres de los regalos y sus cantidades. Escribe una función que reciba este array y devuelva una cadena con la tabla dibujada.

```js
printTable([
  { name: 'Game', quantity: 2 },
  { name: 'Bike', quantity: 1 },
  { name: 'Book', quantity: 3 }
])
```

```js
+++++++++++++++++++
| Gift | Quantity |
| ---- | -------- |
| Game | 2        |
| Bike | 1        |
| Book | 3        |
*******************
```

Otro ejemplo donde se puede ver que la tabla siempre usa sólo el espacio justo dependiendo de la longitud de los nombres de los regalos y de las cantidades.

```js
printTable([
  { name: 'PlayStation 5', quantity: 9234782374892 },
  { name: 'Book Learn Web Dev', quantity: 23531 }
])
```

```js
++++++++++++++++++++++++++++++++++++++
| Gift               | Quantity      |
| ------------------ | ------------- |
| PlayStation 5      | 9234782374892 |
| Book Learn Web Dev | 23531         |
**************************************
```

Como ves, el tamaño de las celdas depende de la longitud de los nombres de los regalos y de las cantidades, aunque como mínimo tendrán que ser del espacio de los títulos `Gift` y `Quantity` respectivamente.

La tabla usa los símbolos: `+` para el borde superior, `*` para el borde inferior, `-` para las líneas horizontales y | para las líneas verticales.

**Ten en cuenta:**

- Usa sólo el espacio que necesitas para dibujar la tabla.
- Adapta la tabla a la longitud de los nombres de los regalos y de las cantidades o los títulos de las columnas.
- No hace falta que ordenes los resultados.
- La tabla no termina con salto de línea.

# Solución Reto 21

## Análisis Reto 21

Debemos crear una table que guarde las proporciones con respecto a todos los item de la misma, es decir que sea rectangular, sin errores y con los espacios adecuados.

```js
printTable([
  { name: 'Juego', quantity: 2 },
  { name: 'Bicicleta', quantity: 1 },
  { name: 'Libro', quantity: 3 }
])
```

```js
++++++++++++++++++++++++
| Gift      | Quantity |
| --------- | -------- |
| Juego     | 2        |
| Bicicleta | 1        |
| Libro     | 3        |
************************
```

La solucionaremos por partes, primero encontraremos la longitud adecuada de cada columna, y luego haremos las filas, incluyendo la cabecera:

```js
| Gift      | Quantity |
| --------- | -------- |
| Juego     | 2        |
| Bicicleta | 1        |
| Libro     | 3        |
```

Y por último añadiremos los `+` y los `*` al inicio y al final respectivamente.

## Encontrar el tamaño de las columnas

Lo primero que haremos será convertir a un formato más sencillo de usar nuestros inputs:

```js
gifts = gifts.map(x => [x.name, '' + x.quantity])
```

Usaremos `'' + x.quantity` para convertir los números a string.

```js
  { name: 'Juego',     quantity: 2 } -> ['Juego',     '2']
  { name: 'Bicicleta', quantity: 1 } -> ['Bicibleta', '1']
  { name: 'Libro',     quantity: 3 } -> ['Libro',     '3']
```

Y añadiremos las cabeceras al inicio de la lista, usando el método `.unshift()`.

```js
  gifts.unshift(["Gift", "Quantity"])
```

```js
[
  ['Gift', 'Quantity'],
  ['Juego',       '2'],
  ['Bicibleta',   '1'],
  ['Libro',       '3']
]
```

Ahora solo iteraremos sobre la lista y encontraremos la que tenga un `length` más grande.

```js
  let lengthGift = Math.max(...gifts.map(x => x[0].length))
  let lengthQuantity = Math.max(...gifts.map(x => x[1].length))
```

## Agregar el separador entre el header y el resto de la tabla

```js
  gifts.splice(1, 0, ["-".repeat(lengthGift), "-".repeat(lengthQuantity)])
```

Lo añadiremos en el index 1, `gifts.splice(1, ...`

Hasta ahora tendremos algo como esto:

```js
[
  [ 'Gift', 'Quantity' ],
  [ '---------', '--------' ],
  [ 'Juego', '2' ],
  [ 'Bicicleta', '1' ],
  [ 'Libro', '3' ]
]
```

## Añadir los espacios

Usaremos el método `.reduce()` para ir sumando cada fila a un string separado por saltos de línea (`\n`). Además de esto usaremos el método `.padEnd()`, el cual se encarga de añadir un padding al string, este padding se define con una longitud máxima.

Es decir que si le damos a `.padEnd()` la letra a, nos devolverá `a    ` con 4 espacios al final para llegar a la longitud deseada.

Usaremos el método `.padEnd()` sobre el nombre del regalo y la cantidad y además sumaremos los `|` que definirán los límites de nuestra tabla, no olvides que las palabras están separadas por un espacio de los delimitadores de la tabla.

```js
  let tables = gifts.reduce((str, x) => str +
    "| " + x[0].padEnd(lengthGift) +
    " | " + x[1].padEnd(lengthQuantity) +
    " |" + "\n", '')
```

El string vacío que añadimos al `.reduce()` funciona para que inicie con ese valor en lugar del valor `str`, es decir, que `str = ''` y `x` será el primer valor de la lista.

```js
.reduce((str, x) => ..., '')
```

## Top y Bottom

Ahora solo nos falta crear la línea de caracteres que va arriba y abajo de la tabla, arriba irá con el carácter `+` y abajo con el `*`

```js
  let top = "+".repeat(lengthGift + lengthQuantity + 7) + "\n"
  let bottom = "*".repeat(lengthGift + lengthQuantity + 7)
```

Y ahora solo uniremos todo y lo retornaremos

```js
  return top + tables + bottom
```

## Código Completo

```js
function printTable(gifts) {
  gifts = gifts.map(x => [x.name, '' + x.quantity])
  gifts.unshift(["Gift", "Quantity"])

  let lengthGift = Math.max(...gifts.map(x => x[0].length))
  let lengthQuantity = Math.max(...gifts.map(x => x[1].length))

  gifts.splice(1, 0, ["-".repeat(lengthGift), "-".repeat(lengthQuantity)])

  let tables = gifts.reduce((str, x) => str +
    "| " + x[0].padEnd(lengthGift) +
    " | " + x[1].padEnd(lengthQuantity) +
    " |" + "\n", '')

  let top = "+".repeat(lengthGift + lengthQuantity + 7) + "\n"
  let bottom = "*".repeat(lengthGift + lengthQuantity + 7)

  return top + tables + bottom
}
```