export const NumberFormat = (data) => {
  var number = new Intl.NumberFormat();
  return number.format(data);
}

export const convertDate = (str) => {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

