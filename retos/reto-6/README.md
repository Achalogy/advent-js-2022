# Reto 6

Una pareja de entusiastas de la navidad ha creado una empresa de adornos navideños. El primer adorno que quieren fabricar es un cubo que se pone en los árboles.

El problema es que tienen que programar la máquina y no saben cómo hacerlo. Nos han pedido ayuda para lograrlo.

Para **crear los cubos** se le pasa un **número con el tamaño** deseado al programa y este devuelve un string con el **diseño de ese tamaño**. Por ejemplo, si le pasamos un 3, el programa debe devolver un cubo de 3x3x3:

```js
const cube = createCube(3)
```

```js
  /\_\_\_\
 /\/\_\_\_\
/\/\/\_\_\_\
\/\/\/_/_/_/
 \/\/_/_/_/
  \/_/_/_/
```

Como ves el cubo tiene tres caras visualmente. Los símbolos que se usan para construir las caras del cubo son: /, \, _ y (espacio en blanco).

Otros ejemplos de cubos:

```js
const cube = createCube(1)
```

```js
/\_\
\/_/
```

```js
const cube = createCube(2)
```

```js
 /\_\_\
/\/\_\_\
\/\/_/_/
 \/_/_/
```

**A tener en cuenta:**

 - Fíjate bien en los espacios en blanco que hay en el cubo.
 - El cubo tiene que ser simétrico.
 - Asegúrate de usar los símbolos correctos.
 - Cada nueva línea del cubo debe terminar con un salto de línea (\n) excepto la última.

# Solución al reto 6

## Análisis

Dado un número `n`, crear un cubo de `n` tamaño, por ejemplo, un cubo de `n = 3`

```js
  /\_\_\_\
 /\/\_\_\_\
/\/\/\_\_\_\
\/\/\/_/_/_/
 \/\/_/_/_/
  \/_/_/_/
```

## ¿Qué vamos a usar? 

En este reto solo usaremos conceptos básicos de arrays y el método `.repeat ()`de strings.

## ¿Cómo lo vamos a hacer? 

Dividiremos el cubo en dos partes, la superior `head` y la inferior `tail`

```js
  /\_\_\_\    // Nivel 1
 /\/\_\_\_\   // Nivel 2
/\/\/\_\_\_\  // Nivel 3

------------

\/\/\/_/_/_/  // Nivel 1
 \/\/_/_/_/   // Nivel 2
  \/_/_/_/    // Nivel 3
```

Con esto crearemos dos variables para cada parte del cubo y con un ciclo for iteraremos cada nivel de cada parte del cubo.

## Definir las variables y el ciclo a usar

```js
function createCube(size) {
  let head = []
  let tail = []
  for(let i = 1; i <= size; i++) {
  }
}
```

Usaremos `i = 1` en lugar de 0 y `i <= size`, ya que de lo contrario no se crearían los niveles suficientes.

## Niveles de `Head`

### Espacios

```js
  /\_\_\_\    // Nivel 1
 /\/\_\_\_\   // Nivel 2
/\/\/\_\_\_\  // Nivel 3
```

Como podemos ver, en el nivel 1 necesitaremos de dos espacios antes del símbolo `/`.

Por tanto: `numero de espacios = size - i`, siendo `i = 1` en la primera iteración, tendríamos 2 espacios en el nivel 1, 1 espacio en el nivel 2 y 0 espacios en el nivel 3.

### Símbolos

Como podemos ver, los símbolos podemos separarlos en dos grupos:

```js
  /\    _\_\_\    // Nivel 1
 /\/\    _\_\_\   // Nivel 2
/\/\/\    _\_\_\  // Nivel 3
```

La primera parte podemos definirla sencillamente como `"/\\".repeat(i)`, no olvidemos que para poder mostrar por pantalla el símbolo \, debemos escribirlo dos veces, de lo contrario no se mostrará.

Y la segunda parte siempre es igual, así que: `"_\\".repeat(size)`.

Todo unido nos quedaría de esta forma:

```js
head.push(" ".repeat(size - i) + "/\\".repeat(i) + "_\\".repeat(size))
```

## Niveles de Tail

### Espacios

```js
\/\/\/_/_/_/  // Nivel 1
 \/\/_/_/_/   // Nivel 2
  \/_/_/_/    // Nivel 3
```

Acá es del revés que en `head`, así que solo tendremos que mantener `i` y restarle 1, ya que en el nivel 1 no tenemos 1 espacio, tenemos 0 espacios. `" ".repeat(i - 1)`

### Símbolos

Como podemos ver, los símbolos podemos separarlos en dos grupos:

```js
\/\/\/    _/_/_/  // Nivel 1
 \/\/    _/_/_/   // Nivel 2
  \/    _/_/_/    // Nivel 3
```

Por el hecho de que acá vamos del revés, no podemos usar `i` directamente, por tanto, para conseguir los numero 3, 2 y 1 para el repeat del string, vamos a usar lo siguiente: `size - (i - 1)`, podemos hacer el ejemplo:

```js
size = 3

// Primer iteración del ciclo for
3 - (1 - 1)
3 - 0

3

// Segunda iteración del ciclo for
3 - (2 - 1)
3 - 1

2

// Tercer iteración del ciclo for
3 - (3 - 1)
3 - 2

1

```

Para tail, el string que repetiremos será: `"\\/".repeat(size - (i - 1))`

Y para la segunda parte podemos reutilizar el código de head. El push a tail nos quedarían tal que así:

```js
tail.push(" ".repeat(i - 1) + "\\/".repeat(size - (i - 1)) + "_/".repeat(size))
```

## Unir todo

Ahora que tenemos las dos partes, solo debemos unirlas:

```js
// Forma 1:
head.concat(tail)

// Forma 2 (Más rapida):
[...head, ...tail]
```

Y retornaremos esta lista unida por saltos de línea:

```js
function createCube(size) {
  let head = []
  let tail = []
  for(let i = 1; i <= size; i++) {
    head.push(" ".repeat(size - i) + "/\\".repeat(i) + "_\\".repeat(size))
    tail.push(" ".repeat(i - 1) + "\\/".repeat(size - (i - 1)) + "_/".repeat(size))
  }
  return [...head, ...tail].join("\n")
}
```