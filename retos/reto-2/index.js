function countHours(year, holidays) {
  return holidays.map(holiday => { // Retorna una lista de 1 y 0 [1, 0, 1]
    let date = new Date(`${year}/${holiday}`)
    return(
      [1,2,3,4,5].includes(
        date.getDay() // getDay devuelve el número del dia de la semana, domingo = 0.
      ) ? 1 : 0 // En lugar de retornar True o False, retornara 1 o 0
    )
  }).reduce((count, extraHour) => count + extraHour) * 2 // Con la lista de 1 y 0, va a sumar todos los números dentro y lo multiplicara por 2
}

module.exports = countHours