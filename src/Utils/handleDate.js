function handleDate(date) {
  let newDate = date.substring(0, 10);
  newDate = newDate.split("-");
  newDate = newDate.reverse();
  const dayDate = parseInt(newDate[0]);
  const monthDate = parseInt(newDate[1]);
  const yearDate = parseInt(newDate[2]);
  newDate = newDate.join("-");
  const infoDate = {
    date: newDate,
    day: dayDate,
    month: monthDate,
    year: yearDate
  };
  return infoDate;
}

export { handleDate };
