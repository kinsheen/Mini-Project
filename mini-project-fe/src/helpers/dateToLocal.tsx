export function formatLocalDateToISO(date: string) {
  const dateObject = new Date(date); // Create a Date object

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");
  const milliseconds = String(dateObject.getMilliseconds()).padStart(3, "0");

  // Construct the ISO-like string in local time
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

export function formattedSelectedDate() {
  const date = localStorage.getItem("selectedDate")
  const formattedDate = formatLocalDateToISO(date || "")
  return formatDate(formattedDate)
}

export const formattedTaskDate = (date: string) => {
  return formatDate(date)
}

export const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
  return formattedDate
}

export const getHourMinute = (date: string) => {
  const formattedDate = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  return formattedDate
}

