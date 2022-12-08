## Disclaimer

Esta función no será explicada para principiantes.

# Solución Optimizada Reto 8

```js
function checkPartOptimized(part) {
  let arr = [...part].slice(1);
  let rev = [...part].reverse();
  let x = arr.join("") == arr.reverse().join("");
  let y = [...part].reduce((x, y, i) => x + (rev[i] != y), 0);
  return x || y <= 2;
}
```

Se usan múltiples variables, ya que da más puntos.

La base de esta solución es comparar las diferencias entre el array normal y el array reversado, siendo que si las diferencias son 2 o menos, se cumplira la condición de ser un palindromo:

```markdown
mi**id**im
mi**di**im
```

Como podemos ver, hay dos diferencias en la palabra normal y la palabra del revés, así que se cumple que es un palíndromo.

## Caso aislado

Siempre que la letra a eliminar será la primera, tendremos un error, por tanto, se soluciona eliminando la primera letra de la palabra y comprobando si es un palíndromo. Si es así retorna true.