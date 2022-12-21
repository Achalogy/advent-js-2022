# Reto 20

Papá Noel se ha dado cuenta de que ni con la colaboración de todos los elfos va a poder entregar todos los regalos a tiempo. Por eso va a pedir ayuda a sus amigos de Autentia.

Desde Autentia nos han indicado que necesitan un programa para saber qué equipo de renos enviar a cada país. Hay **diferentes tipos de renos** y cada uno de ellos puede llevar un peso de regalos. Por ejemplo:

```js
const reindeerTypes = [
  { type: 'Nuclear', weightCapacity: 50 },
  { type: 'Electric', weightCapacity: 10 },
  { type: 'Gasoline', weightCapacity: 5 },
  { type: 'Diesel', weightCapacity: 1 }
]
```

En el listado de regalos que tiene Papá Noel se expresa cuánto pesa cada regalo y cuál es su país destino. El peso de los regalos siempre es un número natural. Por ejemplo:

```js
const gifts = [
  { country: 'Spain', weight: 30 },
  { country: 'Spain', weight: 7 },
  { country: 'France', weight: 17 }
]
```

Autentia nos comenta que, para que el equipo de renos a enviar a cada país sea óptimo, deberíamos:

- Enviar el mayor número de renos posibles de mayor capacidad de carga
- Aprovechar al máximo el peso que cada reno puede soportar.
- **Los renos tienen un comportamiento extraño y no admiten que en el equipo haya más renos de un tipo que renos del siguiente tipo por orden descendente de capacidad de carga.**

Por ejemplo. A Francia (17) no se mandarían diecisiete renos diésel (17 * 1). Hay renos con mayor capacidad de carga, pero tampoco se mandaría un reno nuclear (50), ya que se estaría desaprovechando su capacidad. Se mandaría un reno eléctrico (10), uno gasolina (5) y dos diésel (2 * 1).

A España (37) no se podría mandar un equipo formado por tres eléctricos (3 * 10), uno gasolina (5) y dos diésel (2 * 1), ya que **no puede haber más eléctricos que a gasolina**. Tampoco dos eléctricos (2 * 10), tres gasolina (3 * 5) y dos diésel (2 * 1), pues **no puede haber más a gasolina que a diésel**. Habría que mandar dos eléctricos (2 * 10), dos a gasolina (2 * 5) y siete a diésel (7 * 1).

```js
const reindeerTypes = [
  { type: 'Nuclear', weightCapacity: 50 },
  { type: 'Electric', weightCapacity: 10 },
  { type: 'Gasoline', weightCapacity: 5 },
  { type: 'Diesel', weightCapacity: 1 }
]

const gifts = [
  { country: 'Spain', weight: 30 },
  { country: 'France', weight: 17 },
  { country: 'Italy', weight: 50 }
]

howManyReindeers(reindeerTypes, gifts)
// [{
//   country: 'Spain',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }, {
//   country: 'France',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 1 },
//     { type: 'Diesel', num: 2 }
//   ]
//  }, {
//   country: 'Italy',
//   reindeers: [
//     { type: 'Electric', num: 3 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }]
```

**A tener en cuenta:**

- Siempre habrá un tipo de reno con capacidad de carga 1.
- Siempre habrá al menos dos tipos de renos disponibles.
- No existe límite de renos de un mismo tipo a enviar siempre y cuando se ciña a las restricciones anteriormente expuestas.
- Tu función debe devolver los renos ordenados por capacidad de carga de mayor a menor.

# Solución Reto 20

## Análisis Reto 20

Debemos encontrar la forma más óptima de llevar un determinado peso usando una lista de renos, cada tipo reno tiene un peso máximo, así que tendremos que encontrar la cantidad de cada reno que debemos usar. Además de esto, **SIEMPRE** tiene que haber menos o igual cantidad de renos que los de tipo inferior.

Es decir que si tenemos:

```js
  { type: 'Nuclear', weightCapacity: 50 },
  { type: 'Electric', weightCapacity: 10 },
  { type: 'Gasoline', weightCapacity: 5 },
  { type: 'Diesel', weightCapacity: 1 }
```

No podremos tener más renos de tipo Nuclear que de tipo Eléctrico. Pero si más Eléctricos que Nucleares.

Y si debemos llevar a Italia:

```js
{ country: 'Italy', weight: 50 }
```

Tendremos que repartir los Renos de tal forma que:

```js
{ type: 'Electric', num: 3 }, // 10 * 3 = 30
{ type: 'Gasoline', num: 3 }, // 5 * 3 = 15
{ type: 'Diesel', num: 5 } // 1 * 5  = 5
```

## Filtrar los renos

No siempre podremos usar todos los tipos de reno, así que lo primero que haremos será quitar estos renos. Pero primero convertiremos nuestros datos a un formato más manejable.

```js
  { type: 'Nuclear',  weightCapacity: 50 } -> ['Nuclear',  50]
  { type: 'Electric', weightCapacity: 10 } -> ['Electric', 10]
  { type: 'Gasoline', weightCapacity: 5 }  -> ['Gasoline',  5]
  { type: 'Diesel',   weightCapacity: 1 }  -> ['Diesel',    1]
```

```js
reindeerTypes.map((x) => [x.type, x.weightCapacity])
```

Y ahora sí filtraremos de una manera sencilla:

```js
let max = gift.weight;
let reindeers = reindeerTypes
  .map((x) => [x.type, x.weightCapacity])
  .filter((x) => x[1] < max)
```

Y por último, para algunas pruebas, ordenaremos los renos de menor a mayor:

```js
let max = gift.weight;
let reindeers = reindeerTypes
  .map((x) => [x.type, x.weightCapacity])
  .filter((x) => x[1] < max)
  .sort((a, b) => a[1] - b[1]); // Menor a Mayor
```

Ahora en este punto tendríamos una lista así, claro, dependiendo de cada test, tendremos solo los renos que lleven un peso menor al que se debe de llevar:

```js
[
  ['Nuclear',  50],
  ['Electric', 10],
  ['Gasoline',  5],
  ['Diesel',    1],
]
```

## Formato de Respuesta

Construiremos el formato en que enviaremos los renos, ya que este debe ser un objeto con `type` y `num` siendo la cantidad de renos:

```js
{ type: 'Electric', num: 3 }
```

```js
let res = reindeers.map(([type]) => ({
    type,
    num: 0,
  }));

/*
[
  { type: 'Diesel', num: 0 },
  { type: 'Gasoline', num: 0 },
  { type: 'Electric', num: 0 },
  { type: 'Nuclear', num: 0 }
]
*/

```

Ya con nuestra lista, podremos ir sumando la cantidad de renos, no debemos por preocuparnos por renos con `num=0` porque para eso los filtramos al inicio.

## Encontrar la cantidad de cada de reno

### Ejemplo:

```js
const reindeerTypes = [
  { type: 'Electric', weightCapacity: 10 },
  { type: 'Gasoline', weightCapacity: 5 },
  { type: 'Diesel', weightCapacity: 1 }
]

const gifts = [
  { country: 'Spain', weight: 30 },
]

howManyReindeers(reindeerTypes, gifts)
```

Seguiremos el siguiente diagrama:

![Diagrama](https://i.imgur.com/IzuHZBk.jpg)

### Slices de suma

Lo primero que haremos será encontrar los slices que tendremos que hacer, es decir, lo que está encerrado en rojo:

![Diagrama Slices](https://i.imgur.com/qFcimv1.jpg)

Para esto iteraremos nuestra lista usando el método `.map()`:

```js

// reindeers = [
//   [ 'Diesel', 1 ],
//   [ 'Gasoline', 5 ],
//   [ 'Electric', 10 ]
// ]

reindeers.map((_, i) => {
  let sliced = reindeers.slice(0, reindeers.length - i)

  // Iterara sobre los 3 elementos y sliced será igual a:

  // [ [ 'Diesel', 1 ], [ 'Gasoline', 5 ], [ 'Electric', 10 ] ]

  // [ [ 'Diesel', 1 ], [ 'Gasoline', 5 ] ]
  
  // [ [ 'Diesel', 1 ] ]

})

```

### Sumar el slice

Sumaremos usando el método `.reduce()`

```js
let sliced = reindeers.slice(0, reindeers.length - i)
let sum = sliced.reduce((sum, e) => sum + e[1], 0);
```

### Sumar `num` en los tipos de reno que hacen parte del slice

![Diagrama sumas](https://i.imgur.com/ksZZiRd.jpg)

Ya que nuestra lista `res` está en el mismo orden que nuestra lista `sliced`, podremos iterar sobre la lista `sliced` y usar su index para editar en la lista `res`:

```js
sliced.map((_, i) => {
  res[i].num += Math.floor(max / sum);
});
```

Y sumaremos la división de `max` y la suma del slice, pero sin los decimales.

### Asignar el nuevo `max`

Solo nos queda poner que `max` sea igual al residuo de la división:

```js
reindeers.map((_, i) => {
  let sliced = reindeers.slice(0, reindeers.length - i)
  let sum = sliced.reduce((sum, e) => sum + e[1], 0);
  sliced.map((_, i) => {
    res[i].num += Math.floor(max / sum);
  });
  max %= sum; // máx = residuo de max / sum
});
```

## Retornar con el formato

Debemos retornar una lista con cada ciudad:

```js
[
  // Inicio de una ciudad
  {
    country: 'Spain',
    reindeers: [
      { type: 'Electric', num: 1 },
      { type: 'Gasoline', num: 3 },
      { type: 'Diesel', num: 5 }
    ]
  },
  // Inicio de otra
  {...},
  {...}
]
```

Aunque en nuestro ejemplo solo tenemos una ciudad, de todas formas hay que retornarla en una lista.

```js
function howManyReindeers(reindeerTypes, gifts) {
  return gifts.map((gift) => {
    let max = gift.weight;
    let reindeers = ...

    let res = ...

    reindeers.map((_, i) => {
      ...
    });

    return {
      country: gift.country,
      reindeers: res.reverse(),
    };
  });
}
```

## Código Completo

```js
function howManyReindeers(reindeerTypes, gifts) {
  return gifts.map((gift) => {
    let max = gift.weight;
    let reindeers = reindeerTypes
      .map((x) => [x.type, x.weightCapacity])
      .filter((x) => x[1] < max)
      .sort((a, b) => a[1] - b[1]); // Menor a Mayor

    let res = reindeers.map(([type]) => ({
      type,
      num: 0,
    }));

    reindeers.map((_, i) => {
      let sliced = reindeers.slice(0, reindeers.length - i)
      let sum = sliced.reduce((sum, e) => sum + e[1], 0);
      sliced.map((_, i) => {
        res[i].num += Math.floor(max / sum);
      });
      max %= sum;
    });

    return {
      country: gift.country,
      reindeers: res.reverse(),
    };
  });
}
```