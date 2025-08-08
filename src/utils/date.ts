/**
 * Formats a date string or Date object into a localized date string
 * @param date - Date string or Date object to format
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatDate:', date);
    return 'Invalid date';
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats a date string or Date object into a short date string
 * @param date - Date string or Date object to format
 * @returns Formatted short date string (e.g., "01/01/2023")
 */
export const formatShortDate = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatShortDate:', date);
    return 'Invalid date';
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Formats a date string or Date object into a date and time string
 * @param date - Date string or Date object to format
 * @returns Formatted date and time string (e.g., "January 1, 2023, 12:00 PM")
 */
export const formatDateTime = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatDateTime:', date);
    return 'Invalid date';
  }
  
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculates the difference in days between two dates
 * @param date1 - First date
 * @param date2 - Second date (defaults to current date)
 * @returns Difference in days
 */
export const getDaysDifference = (date1: string | Date, date2: string | Date = new Date()): number => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : new Date(date1);
  const d2 = typeof date2 === 'string' ? new Date(date2) : new Date(date2);
  
  // Check if dates are valid
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    console.warn('Invalid date(s) provided to getDaysDifference:', date1, date2);
    return 0;
  }
  
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
