## Disclaimer

La solución explicada en este documento **No es la más óptima**, puesto que la idea es explicar como resolver este código a principiantes, de todas formas, la solución más óptima que encontré, la puedes ver comentada en el archivo `index.js`

# Reto 5

Para no cansar a los renos, Papá Noel quiere dejar el máximo número de regalos haciendo el menor número posible de viajes.

Tiene un array de ciudades donde cada elemento es el número de regalos que puede dejar allí. `[12, 3, 11, 5, 7]`. Por otro lado, el límite de regalos que caben en su saco. Y, finalmente, el número de ciudades máximo que sus renos pueden visitar.

Como no quiere dejar una ciudad a medias, **si no puede dejar todos los regalos que son de esa ciudad, no deja ninguno allí.**

Crea un programa que le diga **la suma más alta de regalos** que podría repartir teniendo en cuenta el máximo de regalos que puede transportar y el número máximo de ciudades que puede visitar:

```js
const giftsCities = [12, 3, 11, 5, 7]
const maxGifts = 20
const maxCities = 3

// la suma más alta de regalos a repartir
// visitando un máximo de 3 ciudades
// es de 20: [12, 3, 5]

// la suma más alta sería [12, 7, 11]
// pero excede el límite de 20 regalos y tendría
// que dejar alguna ciudad a medias.

getMaxGifts(giftsCities, maxGifts, maxCities) // 20
```

Si no se puede realizar ningún viaje que satisface los requerimientos, el resultado debe ser 0. Más ejemplos:

```js
getMaxGifts([12, 3, 11, 5, 7], 20, 3) // 20
getMaxGifts([50], 15, 1) // 0
getMaxGifts([50], 100, 1) // 50
getMaxGifts([50, 70], 100, 1) // 70
getMaxGifts([50, 70, 30], 100, 2) // 100
getMaxGifts([50, 70, 30], 100, 3) // 100
getMaxGifts([50, 70, 30], 100, 4) // 100
```

**A tener en cuenta:**

 - maxGifts >= 1
 - giftsCities.length >= 1
 - maxCities >= 1
 - El número de maxCities puede ser mayor a giftsCities.length

# Solución al reto 5

## Análisis

Debemos encontrar la suma más alta que podemos obtener de una lista de números, con 2 condiciones

1. La suma más alta debe ser `maxGifts`
2. No sumar más de `maxCities` números 

Tomemos este ejemplo:

```js
const giftsCities = [12, 3, 11, 5, 7]
const maxGifts = 20
const maxCities = 3
```

Tenemos 5 números, de los cuales no podemos sumar al tiempo más de 3 y el máximo de la suma debe ser 20.

La suma más alta es `20 = (12 + 3 + 5)`, la suma más alta seria `12 + 11 + 7 = 30`, pero debemos recordar que nuestro máximo es `maxGifts = 20`

## ¿Qué vamos a usar? 

Iteraremos la lista de números hasta obtener todas las combinaciones posibles, además validaremos la longitud de cada elemento posible en la lista para que sea de máximo 3 números.

Sumaremos cada elemento de la lista usando `.reduce()` y luego encontraremos el valor más alto con `Math.max()`

### Conseguir todas las combinaciones posibles

Nuestro objetivo es encontrar todas las posibles sumas de máximo 3 números, por ejemplo: 

```js
let lista = [1, 2, 3]
```

Ahora crearemos una variable para nuestra lista de combinaciones y pushearemos una lista vacía y una lista que contenga al ` index = 0`, es decir, `lista[0]`

```js
let combinaciones = []
combinaciones.push(
  [], [lista[0]]
)
```

Ahora eliminaremos el primer elemento de la lista usando el método `shift()`

```js
lista.shift()
```

Debemos seguir el siguiente gráfico. Imagen tomada de [Medium.com](https://medium.com/@alexanderpavlov_18884/javascript-algorithms-backtracking-222cde11842c)

![Gráfico de iteración para encontrar las combinaciones posibles](https://miro.medium.com/max/828/1*xHV_7hMvAG5Sorp-XpsZ0g.webp)

Como puedes observar en la imagen de arriba, ahora debemos copiar nuestra lista actual de combinaciones:

```js
[ [], [1] ] // Nuestra lista actual

lista.map(x => { // Recordemos que eliminamos el primer index, es decir que el primer objeto que iterara el map sera el número 2
  const newList = combinaciones.map(combinacion => {
    let _combinacion = [...combinacion] // Esto para que no nos edite la lista original
    _combinacion_.push(x)
    /*
    combinacion es un elemento de nuestra lista, es decir:
    [] es nuestro primer elemento y
    [1] es nuestro segundo elemento

    a los dos les vamos a pushear el elemento x de la lista inicial, el cual, en caso de la primer iteración sera el numero 2.

    Nuestra nueva lista quedaria:

    [
      [2],
      [1, 2]
    ]
    */
   return _combinacion
  })
})
```

En este punto, la variable `newList` sería igual a `[ [2], [1, 2]`, debemos unir nuestra lista `combinaciones` y esta nueva lista,

```js
lista.map(x => { // Recordemos que eliminamos el primer index, es decir que el primer objeto que iterara el map sera el número 2
  const newList = combinaciones.map(combinacion => {
    ...
  })
  
  combinaciones = combinaciones.concat(newList) // concatenaremos la nueva lista.

  // Tambien se puede hacer de la siguiente manera:
  //combinaciones = [...combinaciones, ...newList]
})
```

Al terminar de iterar sobre la lista `lista`, nuestra lista `combinaciones` debería verse algo así:

```js
[
  [],
  [1],
  [2],
  [1, 2],
  [3],
  [1, 3],
  [2, 3],
  [1, 2, 3]
]
```

Para eliminar ese primer elemento vacío de la lista, volvemos a usar el método `.shift()`

```js
combinaciones.shift()
```

Ahora veamos la forma en que lo podemos implementar a nuestro problema:

```js
function getMaxGifts(giftsCities, maxGifts, maxCities) {

  let combinaciones = [];
  combinaciones.push([], [giftsCities[0]]);
  giftsCities.shift()

  giftsCities.map(x => {
    const newList = combinaciones.map(combinacion => {
      let _combinacion = [...combinacion]
      _combinacion.push(x)
      return _combinacion
    })
    combinaciones = combinaciones.concat(newList)
  })

  combinaciones.shift()
}
```

Pero acá tenemos un problema, nos está devolviendo incluso listas de más de `maxCities` números, por tanto, podemos cambiar ese `_combinacion.push(x)` por: 

```js
if(_combinacion.length < maxCities) {
  _combinacion.push(x)
}
```

Ya que tenemos la lista completa de combinaciones, solo nos queda sumar su contenido y encontrar la más grande, para esto usaremos el método `reduce()`

```js
combinaciones.map(x => {
  let sum = x.reduce((total, num) => total + num)
  return sum
})
```

Pero `sum` puede ser mayor a 20, entonces reemplazaremos ese return por una ternaria:

```js
combinaciones.map(x => {
  let sum = x.reduce((total, num) => total + num)
  return sum > maxGifts ? 0 : sum // si la suma es mayor a 20, retornara 0
})
```

Ahora tenemos la lista de sumas, pero debemos enviar como solución solo el número más alto encontrado, usaremos `Math.max()` para esto.

```js
return Math.max(
  ...combinaciones.map(x => {
    let sum = x.reduce((total, num) => total + num)
    return sum > maxGifts ? 0 : sum
  })
)
```

Debemos usar `...` antes de combinaciones, ya que `Math.max()` no recibe array como propiedad, sino que cada número debe ser una propiedad.

De esta forma el reto está resuelto.