# Reto 2

Un millonario ha comprado una red social y no trae buenas noticias. Ha anunciado que **cada vez que una jornada de trabajo se pierde por un día festivo**, habrá que compensarlo con **dos horas extra otro día de ese mismo año**.

Obviamente la gente que trabaja en la empresa no le ha hecho ni pizca de gracia y están **preparando un programa que les diga el número de horas extras que harían** en el año si se aplicara la nueva norma.

Al ser trabajo de oficina, su horario laboral es **de lunes a viernes**. Así que sólo tienes que preocuparte de los días festivos que caen en esos días.

Dado un año y un array con las fechas de los días festivos, devuelve el número de horas extra que se harían ese año:

```js
const year = 2022
const holidays = ['01/06', '04/01', '12/25'] // formato MM/DD

// 01/06 es el 6 de enero, jueves. Cuenta.
// 04/01 es el 1 de abril, un viernes. Cuenta.
// 12/25 es el 25 de diciembre, un domingo. No cuenta.

countHours(year, holidays) // 2 días -> 4 horas extra en el año
```

Cosas a tener en cuenta y consejos:

 - El año puede ser bisiesto. Haz las comprobaciones que necesitas para ello, si fuese necesario.
 - Aunque el 31 de diciembre sea festivo, las horas extra se harán el mismo año y no el siguiente.
 - El método Date.getDay() te devuelve el día de la semana de una fecha. El 0 es domingo, el 1 es lunes, etc.

# Solución al Reto 2

## Análisis

Debemos recibir una lista de días festivos y validar cuáles de ellos caen en horario de trabajo (lunes a viernes). Si cumple esta condición tendremos que sumar 2 horas al total de horas a recuperar.

Por lo tanto, si tenemos dos días festivos de la lista que caen en un martes y un jueves, los trabajadores tendrían que recuperar 4 horas.

## ¿Qué vamos a usar? 

Usaremos el objeto Date que nos sirve para manejar fechas de una manera mucho más sencilla, para más información de este objeto revisa [Date - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)

También en esta solución usé la función Reduce, más info en [Array.prototype.reduce()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), esto ejecuta una función reductora sobre cada elemento de un array, retornando un solo valor. Por ejemplo:

```js
const lista = [2, 4, 6]
const res = lista.reduce((total, numero) => total numero)

console.log(res) // 12
```

Una solución sin usar reduce iteraría sobre la lista y sumaria cada valor a una variable.

## Solución propuesta

### Iterar la lista de días festivos

```js
function countHours(years, holidays) {
  return holidays.map(holiday => {})
}
```

El mismo uso que se le da en el reto anterior, si necesitas la explicación puedes ir a [Reto 1](https://github.com/Achalogy/advent-js-2022/tree/main/retos/reto1/README.me)

### Guardar en una variable la fecha

Vamos a usar el objeto `Date` de JavaScript

```js
function countHours(years, holidays) {
  return holidays.map(holiday => {
    let date = new Date(`${year}/${holiday}`)
  })
}
```

Unimos el año con la fecha de la lista `${year}/${holiday}`, esto porque es necesario distinguir entre años bisiestos y JavaScript lo hace por defecto.

### Definir si es un día entre semana o fin de semana

Este Objeto `Date` nos permite preguntar algunos datos como el año, el día, el mes, entre otros. Pero lo que necesitamos es el día de la semana, es decir, si es lunes o sábado.

| Día | Número |
| --- | ------ |
| Domingo | 0 |
| Lunes | 1 |
| Martes | 2 |
| Miércoles | 3 |
| Jueves | 4 |
| Viernes | 5 |
| Sábado | 6 |

Podemos consultar el día de la semana de esta forma:

```js
date.getDay()
```

Entonces, si este número está en el rango de 1 a 5, podemos ir sumando 2 horas a las horas que los trabajadores tendrán que recuperar.

En este caso usaré una lista con los números del 1 al 5 y usando la función `.includes` validaré si el número que retorna la función `.getDay()` del objeto `Date` está entre Lunes y Viernes, o al contrario es Sábado o Domingo.

```js
[1, 2, 3, 4, 5].includes(
  date.getDay()
)
```

Pero esto nos dará como resultado o un True o un False, por lo tanto, usaré una **ternaria** `condicion ? verdadero : falso`

```js
[1, 2, 3, 4, 5].includes(
  date.getDay()
) ? 1 : 0
```

Con esto, retornará 1 si hace parte de la semana, o 0 si es fin de semana.

### Calcular las horas extra a recuperar

Hasta ahora tenemos:

```js
function countHours(year, holidays) {
  return holidays.map(holiday => {
    let date = new Date(`${year}/${holiday}`)
    return(
      [1,2,3,4,5].includes(
        date.getDay()
      ) ? 1 : 0
    )
  })
```

Esto nos retornaría una lista de 1 y 0, Por ejemplo: `[1, 0, 1]`

Usaremos la función `.reduce()` en esta lista para sumar todos los números, dando en el ejemplo de arriba un 2, luego multiplicaremos por 2 este número, ya que son 2 horas por día festivo.

```js
  return holidays.map(holiday => {
    let date = new Date(`${year}/${holiday}`)
    return(
      [1, 2, 3, 4, 5].includes(
        date.getDay()
      ) ? 1 : 0
    )
  }).reduce((count, horaExtra) => count + horaExtra) * 2
```