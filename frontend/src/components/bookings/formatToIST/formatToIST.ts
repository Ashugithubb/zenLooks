 export function formatToIST(dateString: string | Date | undefined | null): string {
  if (!dateString) return ""; // safety

  const jsDate = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return jsDate.toLocaleString("en-GB", options).replace(/\//g, "-");
}
