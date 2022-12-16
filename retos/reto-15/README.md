# Reto 15

Una pareja está poniendo el árbol de navidad. El chico es un motivado de los adornos navideños y quiere que quede perfectamente equilibrado. Tiene tres tipos de decoraciones:

 - Bolas de colores : `B`
 - Regalos pequeños : `R`
 - Piñas de pino : `P`

El árbol de navidad es un triángulo que hay que generar. Ya tienen la base montada, que sería la primera fila, y a partir de ahí tienen que **ir colocando las decoraciones hacía arriba siguiendo una fórmula.**

```js
Arriba coloca  :     P     R     B     P
Si abajo tiene :    P P   B P   R P   B R
```

Las combinaciones también son al revés. Por ejemplo, si abajo es `B P`, arriba es `R`. Pero también será `R` si abajo es `P B`. También si abajo tienes dos veces la misma letra, arriba será la misma letra. Por ejemplo, si abajo es `B B`, arriba es `B`.

Con estas reglas, podríamos ver el árbol que generaríamos con la base `B P R P`:

```js
   R
  P B
 R B B
B P R P
```

Escribe un programa que reciba el string `B P R P` y devuelva un array con la representación del árbol.

```js
decorateTree('B P R P')
// [
// 'R',
// 'P B',
// 'R B B',
// 'B P R P'
// ]

decorateTree('B B') // ['B', 'B B']
```

**Ten en cuenta que:**

 - El programa recibe siempre la cadena de texto que representa la base del árbol.
 - Hay que generar el árbol completo, es decir, la base y las filas que se generan a partir de ella, hasta arriba.
 - Hay que seguir la fórmula para saber qué decoración colocar en cada posición.

# Solución Reto 15

## Análisis Reto 15

Por cada nivel iremos iterando sobre grupos de dos letras para comprobar que letra debe ir sobre ellas:

```js
decorateTree('B P R P')

// B P  -> R
// P R  -> B
// R P  -> B

/*
 R B B
B P R P
*/

// Siguiente nivel:

// R B  -> P
// B B  -> B

/*
  P B
 R B B
B P R P
*/

// Siguiente nivel:

// P B  -> R

/*
   R
  P B
 R B B
B P R P
*/
```

## Iterar sobre cada nivel:

Lo primero que haremos será convertir nuestro input en un array de caracteres: 

```js
decorateTree('B P R P')
base = base.split(" ") // ["B", "P", "R", "P"]
```

Con esto crearemos un Array nuevo con la misma longitud que la lista `base`:

```js
let list = new Array(base.length).fill(base)
```

Lo llenaremos con listas iguales a `base` para ahorrar código, ya que en realidad solo necesitamos que el primer elemento tenga la lista `base`.

Con un reduce, concatenaremos al `acumulador` el nuevo nivel, así luego lo podremos seleccionar y hacer nuevamente este procedimiento hasta que la lista llegue al nivel en donde solo hay una letra, por tanto la punta del árbol.

## Slices

Haremos slices de 2 palabras por cada nivel del árbol es decir:

```js
B P R P

Slice 1: BP
Slice 2: PR
Slice 3: RP

```

Y aunque es mejor solución encontrar cuál es el faltante (BP -> R), AdventJS califica mejor con un diccionario, así que lo implementaremos:

```js
const dict = {
  "PP": "P",
  "BB": "B",
  "RR": "R",
  "BP": "R",
  "PB": "R",
  "BR": "P",
  "RB": "P",
  "PR": "B",
  "RP": "B"
}
```

Así que iniciaremos haciendo nuestro reduce a la lista que creamos anteriormente (`_` significa que no lo usaremos):

```js
list.reduce((total, _) => 
  total.concat(

  ), [base]
)
```

Ya que vamos a concatenar arrays, nuestra posición inicial será base encerrada en otro array:

```js
[["B", "P", "R", "P"]]
```

Por el hecho de que concat suma el contenido de dos arrays en uno, tendremos que aportar también cada nivel encerrado en un arrray:

```js
[["B", "P", "R", "P"]].concat(["R", "B", "B"])
// [["B", "P", "R", "P"], ["R", "B", "B"]]
```

Ahora crearemos una array con la `longitud = longitud nivel anterior + 1` y lo llenaremos con cualquier caracter, lo importante es que se pueda iterar sobre esta lista.

```js
new Array(total.at(-1).length - 1).fill("-")
```

E iteraremos con el método `.map()`, dentro de este map tomaremos los slices de letras, los uniremos y buscaremos en el diccionario que letra debemos poner en el nivel superior del árbol.

```js
dict[total.at(-1).slice(i, i + 2).join("")]
```

Las iteraciones se verían de esta manera:

```js
new Array(total.at(-1).length - 1).fill("-") // ["-", "-", "-"]
.map((_, i) => {
  return dict[total.at(-1).slice(i, i + 2).join("")]

  // total.at(-1) es el nivel al final de la lista
  // Haremos un slice desde i hasta i+2, es decir en la primer iteración, 0 hasta 0+2
  // Lo uniremos

  // B P R P

  Slice 1: BP // i = 0

  Slice 2: PR // i = 1
  Slice 3: RP // i = 2
})
```

Y ya que estamos retornando el valor que nos da el diccionario, retornaremos la lista completa del siguiente nivel.

En este punto nuestro código se debe ver de esta forma:

```js
function decorateTree(base) {

  ...

  return list.reduce((total, x) =>
    total.concat(
      [new Array(total.at(-1).length - 1).fill("-").map((_, i) => {
        return dict[total.at(-1).slice(i, i + 2).join("")]
      })]
    ), [base]
  )
}
```

Y nos retornaría, algo como esto:

```js
[ [ 'B', 'P', 'R', 'P' ],
  [ 'R', 'B', 'B' ],
  [ 'P', 'B' ],
  [ 'R' ],
  [] ]
```

Así que trabajaremos con el slice desde el `index 0` hasta la longitud - 1, esto para eliminar esa lista vacía. Luego haremos un `.map()` para convertir está lista, en lugar de una lista de arrays, en una lista de strings, ya que es como debemos enviar la respuesta.

```js
[ 'B P R P',
  'R B B',
  'P B',
  'R' ]
```

Por último le daremos la vuelta con el método `.reverse()` y estaría completo.

```js
[ 'R',
  'P B',
  'R B B',
  'B P R P' ]
```

## Código Completo

```js
function decorateTree(base) {

  const dict = {
    "PP": "P",
    "BB": "B",
    "RR": "R",
    "BP": "R",
    "PB": "R",
    "BR": "P",
    "RB": "P",
    "PR": "B",
    "RP": "B"
  }

  base = base.split(" ")
  let list = new Array(base.length).fill(base)
  return list.reduce((total, x) =>
    total.concat(
      [new Array(total.at(-1).length - 1).fill("-").map((_, i) => {
        return dict[total.at(-1).slice(i, i + 2).join("")]
      })]
    ), [base]
  ).slice(0, base.length).map(x => x.join(" ")).reverse()
}
```