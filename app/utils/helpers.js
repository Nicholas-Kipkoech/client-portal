export const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (serverTime) => {
  if (serverTime) {
    const date = new Date(serverTime);
    const day = date.getDate();
    const month = Months[date.getMonth()];
    const year = date.getFullYear();
    return day + "-" + month + "-" + year;
  }
  return "";
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

export const getCoverDates = () => {
  // Get today's date and time
  const currentDate = new Date();

  // Create a new date object for 1 year from today
  const oneYearLater = new Date(currentDate);
  oneYearLater.setFullYear(currentDate.getFullYear() + 1);

  // Set the date to one day before (subtract 1 day)
  oneYearLater.setDate(oneYearLater.getDate() - 1);

  // Set the time of oneYearLater to 23:59:59 (one second before midnight)
  oneYearLater.setHours(23, 59, 59, 0);

  // Format the dates in "DD Month YYYY HH:mm" format
  const coverDateFrom = formatDateWithTime(currentDate);
  const coverDateTo = formatDateWithTime(oneYearLater);

  return {
    coverDateFrom,
    coverDateTo,
  };
};

// Helper function to format date with time in "DD Month YYYY HH:mm" format
function formatDateWithTime(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

// Helper function to get month name from month index
function getMonthName(monthIndex) {
  return Months[monthIndex];
}
