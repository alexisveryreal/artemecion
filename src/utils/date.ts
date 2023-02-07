/**
 *
 * @param date any date input
 * @returns date in MM/dd/yyyy format
 */
export const formatDate = (date: Date) => {
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const day = `0${date.getUTCDate()}`.slice(-2);
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

/**
 *
 * @param date any date input
 * @returns date in YYYY-MM-DD format for default date input
 */
export const defaultDateInput = (date: Date) => {
  return date.toISOString().split("T")[0] as unknown as Date;
};
