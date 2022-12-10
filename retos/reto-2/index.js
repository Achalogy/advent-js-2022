function countHours(year, holidays) {
  return holidays.map(holiday => {
    let date = new Date(`${year}/${holiday}`)
    return [1, 2, 3, 4, 5].includes(date.getDay())
  }).reduce((count, extraHour) => count + extraHour) * 2
}

module.exports = countHours