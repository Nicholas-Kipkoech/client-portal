export const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (serverTime) => {
  const date = new Date(serverTime);
  const day = date.getDate();
  const month = Months[date.getMonth()];
  const year = date.getFullYear();
  return day + "-" + month + "-" + year;
};

export const format3months = () => {
  const date = new Date(Date.now());
  const today = date.getDate();
  const month = Months[date.getMonth()];
  const nextMonth = Months[date.getMonth() + 3];
  const year = date.getFullYear();
  const systemDate = today + "-" + month + "-" + year;
  const next3Month = today + "-" + nextMonth + "-" + year;
  return { systemDate: systemDate, next3Month: next3Month };
};
