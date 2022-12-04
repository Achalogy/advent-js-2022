countHours = (year, holidays) => {
  return holidays.reduce((count, day) => {
    let weekDay = new Date(day + '/' + year).getDay();
    return weekDay > 0 && weekDay < 6 ? count += 2 : count;
  }, 0);
}