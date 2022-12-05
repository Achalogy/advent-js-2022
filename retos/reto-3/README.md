# Reto 3

Tienes una caja de regalos de Navidad que Santa Claus quiere entregar a los niños. **Cada regalo está representado por una cadena**. Santa Claus tiene un trineo que puede llevar un **peso limitado**, y cada regalo dentro de la caja tiene un peso que es igual al número de letras en el nombre del regalo.

Santa Claus también tiene una lista de renos que pueden ayudarlo a entregar los regalos. Cada reno tiene un **límite de peso máximo** que puede llevar. El límite de peso máximo de cada reno es **igual a dos veces el número de letras en su nombre**.

Tu tarea es implementar una función distributeGifts(packOfGifts, reindeers) que recibe una caja de regalos y una lista de renos y devuelve el número máximo de cajas de estos regalos que Santa Claus puede entregar a los niños. **Las cajas de regalos no se pueden dividir**.

```js
const packOfGifts = ["book", "doll", "ball"]
const reindeers = ["dasher", "dancer"]

// el pack de regalos pesa 4 + 4 + 4 = 12
// los renos pueden llevar (2 * 6) + (2 * 6) = 24
// por lo tanto, Santa Claus puede entregar 2 cajas de regalos

distributeGifts(packOfGifts, reindeers) // 2
```

Cosas a tener en cuenta:

 - Las cajas de regalo no se pueden dividir.
 - Los nombres de los regalos y los renos siempre serán mayores que 0.

# Solución al Reto 3

## Análisis

Debemos conseguir la longitud del nombre de cada reno y de cada regalo para luego dividir el peso máximo que pueden cargar los renos y el peso de cada caja, así tendremos muy probablemente un número tipo float, por tanto, tendremos que redondearlo hacia abajo, ya que no podemos dividir cajas.

## ¿Que vamos a usar? 

En esta solución solo usaremos cosas básicas de strings y arrays, como join y length.

## Conseguir longitud de las palabras

Podríamos mapear reno por reno y luego sumarlo, y hacer lo mismo con los regalos, pero simplemente podemos unir los nombres en un solo string y hayar su longitud. Es decir:

Tenemos dos renos, *Dasher* y *Dancer*, cada uno tiene 6 letras en su nombre, por lo tanto, tenemos que cada reno puede cargar `6 * 2 = 12` de peso y juntos `(6 * 2) + (6 * 2) = 24`, pero si sumamos los dos nombres, tendremos la misma respuesta, `12 * 2 = 24)`

`["Dasher", "Dancer"].join("") = DasherDancer`

```js
function distributeGifts(packOfGifts, reindeers) {
  let pesoMax = reindeers.join("").length * 2
  let pesoCaja = packOfGits.join("").length
}
```

## Dividir los pesos

Ya que podemos cargar hasta un máximo de 24 de peso y cada caja tenemos 12 de peso: `24 / 12 = 2 Cajas`, esta es una solución ideal, pero pongamos el siguiente ejemplo: 

```js
packOfGifts = ["book", "dog", "cat"]
reindeers = ["Dasher", "Dancer"]
```

Tenemos nuevamente que podemos llevar un máximo de 24 de peso, pero cada caja esta vez pesa: `4 + 3 + 3 = 10`, por lo que, `24 / 10 = 2.4`, pero... No podemos dividir cajas, por lo que el máximo de cajas sera 2.

Esto se soluciona de distintas maneras:

```js
Math.trunc(number)
Math.floor(number)
number | 0
parseInt(number)
number >> 0
```

Cualquier de estas formas te redondeará hacia abajo el número, o en otras palabras, quitara todo lo que este adelante de la coma flotante.

```js
function distributeGifts(packOfGifts, reindeers) {
  let pesoMax = reindeers.join("").length * 2
  let pesoCaja = packOfGifts.join("").length
  return (pesoMax / pesoCaja) >> 0
}
```