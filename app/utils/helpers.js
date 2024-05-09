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

export const formatYearly = (year) => {
  const start = `1-Jan-${year}`;
  const end = `31-Dec-${year}`;
  return { startDate: start, endDate: end };
};

export const getDaysForNextSixMonths = (months) => {
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  const monthsData = [];

  // Loop to calculate days for the next 6 months
  for (let i = 0; i < months; i++) {
    // Calculate the month and year for the current iteration
    const targetMonth = currentMonth + i;
    const targetYear = currentYear + Math.floor((currentMonth + i) / 12); // Handle year overflow

    // Calculate the number of days in the target month
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

    // Add month data to the array
    monthsData.push(daysInMonth);
  }
  const totalMonthDays =
    monthsData.reduce((total, days) => total + days, 0) - 1;
  return totalMonthDays;
};
