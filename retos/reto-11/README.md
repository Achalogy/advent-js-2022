# Reto 11

Papa Noél está un poco preocupado porque los preparativos están llevando mucho tiempo. Hace poco se ha sacado una certificación de Scrum y ha decidido usar la metodología para organizar el trabajo de sus elfos.

Le dicen la duración esperada de las tareas con un string con el formato hh:mm:ss y en el mismo formato cuánto tiempo llevan trabajando en ella.

Pero Papa Noél no se entera rápidamente si falta o mucho para que termine, así que nos ha pedido que hagamos un programa que nos indique la porción de la tarea que ya se ha completado.

Por ejemplo, si la tarea dura `03:00:00` y llevan trabajando `01:00:00` entonces ya han completado 1/3 de la tarea. En código:

```js
getCompleted('01:00:00', '03:00:00') // '1/3'
getCompleted('02:00:00', '04:00:00') // '1/2'
getCompleted('01:00:00', '01:00:00') // '1/1'
getCompleted('00:10:00', '01:00:00') // '1/6'
getCompleted('01:10:10', '03:30:30') // '1/3'
getCompleted('03:30:30', '05:50:50') // '3/5
```

**Ten en cuenta:**

 - El formato de la hora es hh:mm:ss.
 - El formato de la salida es un string a/b donde a es la porción de la tarea que ya se ha completado y b es la porción de la tarea que falta por completar.
 - La porción siempre se muestra con la menor fracción posible. (por ejemplo, nunca se mostraría 2/4 porque se puede representar como 1/2).
 - Si ya se ha completado la tarea, la fracción sería 1/1.
 - Ningun elfo ha sido maltradado durante la ejecución de este reto ni han tenido que usar Scrum de verdad.

# Solución Reto 11

## Análisis Reto 11

1. Convertir las horas dadas a segundos
2. Encontrar Máximo Común Divisor (MCD) usando el [Algoritmo de Euclides](https://es.wikipedia.org/wiki/Algoritmo_de_Euclides)
3. Dividir Numerador y Denominador en su MCD
4. Retornar los números en forma de fracción

## Convertir las horas dadas a segundos

Primero separaremos la hora dada en array `[HH, MM, SS]` (Horas, minutos y segundos)

```js
  part = part.split(":")
  total = total.split(":")
```

Ya que estos son string, tendremos que usar un `+` antes de la string para convertirlos a número.

 - 1 Minuto son 60 Segundos
 - 1 Hora son 60 minutos, es decir `60 * 60 = 3600` segundos
 - 1 Segundo es 1 Segundo, así que solo lo convertimos a número

```js
let partRed = +part[0] * 3600 + +part[1] * 60 + +part[2]
let totalRed = +total[0] * 3600 + +total[1] * 60 + +total[2]
```

##  Encontrar MCD

 > En las matemáticas, se define el máximo común divisor (abreviado MCD) de dos o más números enteros al mayor número entero que los divide sin dejar residuo alguno. [Wikipedia](https://es.wikipedia.org/wiki/M%C3%A1ximo_com%C3%BAn_divisor)

Para esto usaremos el [Algoritmo de Euclides](https://es.wikipedia.org/wiki/Algoritmo_de_Euclides):


Usaremos de ejemplo:` getCompleted('02:20:20', '03:30:30')`

```js
  part  = ["02", "20", "20"]
  total = ["03", "30", "30"]

  partRed  = 8420
  totalRed = 12630
```

![Explicación Gráfica](https://i.imgur.com/LMK85dh.jpg)

| Paso |                  Operación                   |
| :--: | :------------------------------------------: |
|  1   | 8420 dividido entre 12630 es 0 y sobran 8420 |
|  2   | 12630 dividido entre 8420 es 1 y sobran 4210 |
|  3   |   8420 dividido entre 4210 es 2 y sobra 0    |

Siendo el MCD el último Divisor hasta que el residuo sea 0.

### Aplicación a JavaScript

Crearemos una función llamada MCD, la cual recibirá las propiedades: `a = partRed, b = totalRed`

```js
const MCD = (a, b) => {
  let c;
  while (b) {
    c = b
    b = a % b
    a = c
  }
  return a
}
```

Entonces, mientras b no sea 0 `while(b)`, haremos lo siguiente:

1. Guardar b ya que lo volveremos a usar `c = b`
2. b ahora será el residuo de la división `a / b `, encontramos el residuo usando `a % b`
3. Convertimos a en c

### Primera Iteración del While

![Primera Iteración, Gráfico](https://i.imgur.com/3MUzkze.jpg)

1. `c = b` - `c = 12630`
2. `b = a % b` - `b = 8420 % 12630` - `b = 8420`
3. `a = c` - `a = 12630`

### Segunda Iteración del While

![Segunda Iteración, Gráfico](https://i.imgur.com/omOIwub.jpg)

1. `c = b` - `c = 8420`
2. `b = a % b` - `b = 12630 % 8420` - `b = 4210`
3. `a = c` - `a = 8420`

### Tercera Iteración del While

![Tercera Iteración, Gráfico](https://i.imgur.com/NPvOsvZ.jpg)

1. `c = b` - `c = 4210`
2. `b = a % b` - `b = 8420 % 4210` - `b = 0`
3. `a = c` - `a = 4210`

Ya que `b = 0`, retornamos `a`

## Dividir la fracción en el MCD

```js
partRed  = 8420
totalRed = 12630

  const MCDof = MCD(partRed, totalRed) // 4210

  const partEnd = partRed / MCDof // 2
  const totalEnd = totalRed / MCDof // 3
```

## Retornar en forma de string

```js
return partEnd + "/" + totalEnd
```

## Código completo

```js
function getCompleted(part, total) {
  const MCD = (a, b) => {
    let c;
    while (b) {
      c = b
      b = a % b
      a = c
    }
    return a
  }

  part = part.split(":")
  total = total.split(":")

  let partRed = +part[0] * 3600 + +part[1] * 60 + +part[2]
  let totalRed = +total[0] * 3600 + +total[1] * 60 + +total[2]
  const MCDof = MCD(partRed, totalRed)

  const partEnd = partRed / MCDof
  const totalEnd = totalRed / MCDof

  return partEnd + "/" + totalEnd
}
```