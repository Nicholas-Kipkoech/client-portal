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
