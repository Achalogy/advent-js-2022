# Reto 16

Papá Noel está empezando a recibir un montón de cartas pero tienen un montón de problemas de formato. Para mejorar la lectura, va a escribir un programa que, dado un texto, lo formatea de acuerdo a las siguientes reglas:

 - Eliminar espacios al inicio y al final
 - Eliminar múltiples espacios en blanco y dejar sólo uno
 - Dejar un espacio después de cada coma
 - Quitar espacios antes de coma o punto
 - Las preguntas sólo deben terminar con un signo de interrogación
 - La primera letra de cada oración debe estar en mayúscula
 - Poner en mayúscula la palabra "Santa Claus" si aparece en la carta
 - Poner un punto al final de la frase si no tiene puntuación
 - Las cartas las escriben inglés y aquí 
 
Tenemos un ejemplo:

```js
fixLetter(` hello,  how are you??     do you know if santa claus exists?  i really hope he does!  bye  `)
// Hello, how are you? Do you know if Santa Claus exists? I really hope he does! Bye.

fixLetter("  Hi Santa claus. I'm a girl from Barcelona , Spain . please, send me a bike.  Is it possible?")
// Hi Santa Claus. I'm a girl from Barcelona, Spain. Please, send me a bike. Is it possible?
```

**A tener en cuenta:**

 - No te tienes que preocupar por los signos de puntuación que no sean coma, punto o interrogación.
 - Asegúrate de respetar los saltos de línea y espacios originales.

# Solución Reto 16

## Análisis

Usaremos [Expresiones Regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) para solucionarlo, comúnmente se le conoce también por el nombre de [Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) y el método `.replace()` para reemplazar algunas partes del texto que nos interesa reemplazar.

Lo haremos en el siguiente orden:

 1. Dejar un espacio después de cada coma, punto o signo de exclamación o interrogación.
 2. Eliminar múltiples espacios en blanco y dejar sólo uno.
 3. Las preguntas sólo deben terminar con un signo de interrogación.
 4. La primera letra de cada oración debe estar en mayúscula.
 5. Poner en mayúscula la palabra "Santa Claus" si aparece en la carta.
 6. Eliminar espacios al inicio y al final.
 7. Quitar espacios antes de coma o punto.
 8. La primer letra de la carta debe estar en mayúscula.
 9. Poner un punto al final de la frase si no tiene puntuación.

```
g modifier: global. Esto permite reemplazar todas las partes del texto en que se cumpla el regex

i modifier: insensitive. Quita la sensibilidad a las mayusculas
```

Si ponemos una expresión entre paréntesis, esta se guardará y la podremos usar en el `.replace()`:

```js
"string".replace(/(regex)(regex)/g, "$1 $2")
"string".replace(/(regex)(regex)/g, (string, $1, $2) => {} )

// Ya que las dos expresiones estan en parentesis, las podremos reutilizar si es necesario.
```

## Dejar un espacio después de cada signo...

Buscaremos un signo que no tenga otro signo adelante, esto para que no tengamos signos separados entre espacios. De todas formas, si hay signos repetidos, solo tomará el último.

```js
.replace(/([,.?!])([^,.?!])/g, '$1 $2')

// $1 = ([,.?!])
// $2 = ([^,.?!])
```

El símbolo `^` nos permite negar, es decir, buscar en el string, una parte donde tengamos un símbolo `([,.?!])`, pero no tengamos otro adelante `([^,.?!])`

Si no guardamos `([,.?!])`en `$2` perderemos la letra que este luego del espacio.

## Eliminar múltiples espacios en blanco y dejar solo uno

```js
letter.replace(/\s+/g, ' ')

// Reemplazaremos todos los \s (Espacios, tabulaciones y saltos de linea)
// El simbolo + significa que se puede repetir, es decir si hay 1, 2, 3, 4, o cualquier cantidad de \s, los tomara, de lo contrario tomaria uno por uno y reemplazaria un espacio con un espacio.
```

## Las preguntas sólo deben terminar con un signo de interrogación

Esto también se aplica a comas, puntos y otros signos, así que nuevamente usaremos el regex de símbolos `([,.?!])`

```js
.replace(/([,.?!]{2,})/g, $1 => $1[0])
```

`{2,}` Significa que se repita 2 veces o más. Luego tomaremos solo el index 0 del string de símbolos, por tanto, dejando solo uno.

## La primera letra de cada oración debe estar en mayúscula

Ya que el callback de replace nos da todo lo que elimina el regex, solo usaremos los demás parámetros: `$1` `$2` y `$3`.

```js
.replace(/([.?!])(\s)([A-z])/g,
  (_, $1, $2, $3) => $1 + $2 + $3.toUpperCase()
)
```

```js
// $1 | ([.?!]) -> Simbolo
// $2 | (\s) -> Un espacio
// $3 | ([A-z]) -> Cualquier letra, sea mayuscula o minuscula
```

## Poner en mayúscula la palabra "Santa Claus" si aparece en la carta

Usaremos el modificador `/gi` para que no distinga entre minúsculas o mayúsculas, por ejemplo `santa Claus` o `sAnta claUs` no sería detectado por el regex sin el modificador.

```js
.replace(/(santa claus)/gi, 'Santa Claus')
```

## Eliminar espacios al inicio y al final

Para esto solo usaremos el método `.trim()` que elimina espacios extra al inicio y al final de un string.

## Quitar espacios antes de coma o punto

```js
.replace(/\s([,.?!])/g, '$1')

// Se separa en dos partes.
// Ya que no guardamos el \s entre parentesis, el $1 sera el simbolo.

// \s
// ([,.?!]) | $1
```

## La primer letra de la carta debe estar en mayúscula

```js
.replace(/^([A-z])/g, $1 => $1.toUpperCase())
```

El inicio de la oración es el único lugar donde hay nada y luego hay una letra:

```
^ nada
([A-z]) Letra
```

Ya que estamos guardando la primer letra de la oración en `$1`, lo convertiremos en mayúscula.

## Poner un punto al final de la frase si no tiene puntuación

```js
.replace(/([^.?!])$/g, '$1.')
```

```
([^.?!]) | $1 | será cualquier cosa que no sea un símbolo de estos: . ? !
Esto significa que si hay un simbolo al final, lo dejará.

$ | Símboliza el final del string, si no ponemos esto, podremos un . luego de cada caracter del string
```

## Código Completo

```js
function fixLetter(letter) {
  let correction = letter
    .replace(/([,.?!])([^,.?!])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .replace(/([,.?!]{2,})/g, $1 => $1[0])
    .replace(/([.?!])(\s)([A-z])/g,
      (_, $1, $2, $3) => $1 + $2 + $3.toUpperCase()
    )
    .replace(/(santa claus)/gi, 'Santa Claus')
    .trim()
    .replace(/\s([,.?!])/g, '$1')
    .replace(/^([A-z])/g, $1 => $1.toUpperCase())
    .replace(/([^.?!])$/g, '$1.')

  return correction
}
```