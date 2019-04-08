function handleDate(date) {
  let newDate = date.substring(0, 20);
  newDate = newDate.split("T");
  const hourDate = parseInt(newDate[0])
  const dayDate = parseInt(newDate[1]);
  const monthDate = parseInt(newDate[2]);
  const yearDate = parseInt(newDate[3]);
  newDate = newDate.join(" ");
  const infoDate = {
    date: newDate,
    hour: hourDate,
    day: dayDate,
    month: monthDate,
    year: yearDate,
  };
  
  console.log(infoDate)

  return infoDate;
}

export { handleDate };
