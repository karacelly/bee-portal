export function dateTimeToString(dateTime) {
  var dateOptions = { year: "numeric", month: "short", day: "numeric" };
  var timeOptions = {
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
    hour: "2-digit",
    minute: "2-digit",
  };
  dateTime = dateTime.toDate();
  return (
    dateTime.toLocaleDateString("en-US", dateOptions) +
    ", " +
    dateTime.toLocaleTimeString("id-ID", timeOptions)
  );
}

export function getMultipleSelectValues(select) {
  let result = [];
  let options = select && select.options;
  let opt;

  for (let i = 0; i < options.length; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}
