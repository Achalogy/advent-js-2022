# Reto 13

Para evitar perder datos cuando el servidor se cae, Papa Noel ha decidido hacer backups incrementales. Un hacker llamado S4vitelf le esta ayudando.

Por un lado, tenemos el **timestamp** de cuándo se hizo el último backup.

También tenemos los cambios que se han realizado en un array de arrays. Cada array interno contiene **dos elementos**: la **id** del archivo modificado y el **timestamp** de la modificación.

Tienes que crear un programa que devuelva un array con las id de los archivos que tendríamos que hacer backup porque han sido modificados desde el último backup y **ordenados de forma ascendente**. Ejemplo:

```js
const lastBackup = 1546300800
const changes = [
  [ 3, 1546301100 ],
  [ 2, 1546300800 ],
  [ 1, 1546300800 ],
  [ 1, 1546300900 ],
  [ 1, 1546301000 ]
]

getFilesToBackup(lastBackup, changes) // => [ 1, 3 ]
// El archivo con id 1 ha sido modificado dos veces
// después del último backup.

// El archivo con id 2 no ha sido modificado después
// del último backup.

// El archivo con id 3 ha sido modificado una vez
// después del último backup.

// Tenemos que hacer una copia de seguridad
// de los archivos 1 y 3.
```

**Recuerda que:**

 - Devuelve la id de los archivos que han sido modificados después del último backup.
 - Devuelve un array vacío si no hay archivos que hacer backup.
 - Recuerda que deben estar ordenados las id de forma ascendente.

# Solución Reto 13

<div align="center">
  <a href="https://youtu.be/zLWjdR-6SHc">Ver Video</a>
</div>

## Análisis Reto 13

 1. Filtrar las fechas posteriores al último backup
 2. Obtener la id
 3. Ordenar las ids
 4. Quitar las ids repetidas

## Filtrar las fechas

Para esto haremos un simple `.filter()` con la fecha de modificación que se encuentra en el index 1.

```js
let filtered = changes.filter(x => x[1] > lastBackup)
```

## Obtener las id y ordenarlas

Ya que el método map retorna una lista, lo usaremos para conseguir una lista de ids de los archivos que fueron modificados.

```js
let ids = filtered.map(x => x[0])
```

Y debemos organizarlas, así que haremos un sort:

```js
let sorted = ids.sort((a, b) => a - b)
```

## Quitar las ids Repetidas

Usaremos el objeto `Set` para obtener una lista sin repeticiones y lo convertiremos a un array usando el spread operator `...`:

```js
let flated = [...new Set(sorted)]
```

Y lo retornaremos.

## Código Completo

```js
function getFilesToBackup(lastBackup, changes) {

  let filtered = changes.filter(x => x[1] > lastBackup)
  let ids = filtered.map(x => x[0])
  let sorted = ids.sort((a, b) => a - b)
  let flated = [...new Set(sorted)]

  return flated
}
```

Este código no es muy complejo, solo necesitas conocer los métodos de los array y lo resolverlás muy fácil.
