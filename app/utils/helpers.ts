import { PER_PAGE } from "./constants";

export function paginationMeta(page: number, totalCount: number) {
    // Calculate pagination meta data
    const totalPages = Math.ceil(totalCount / PER_PAGE);
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;
  
    // Build meta object
    const meta = {
      total_count: totalCount,
      current_page: page,
      next_page: nextPage,
      previous_page: previousPage,
      total_pages: totalPages,
      per_page: PER_PAGE,
    };
    return meta;
  }

  export function formatDateTime(date: Date | string | number): string {
    // Convert to Date object if needed
    const dateObject = new Date(date);
  
    // Verify if date is valid
    if (isNaN(dateObject.getTime())) {
      return 'Invalid date';
    }
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
  
    const formattedDate = dateObject.toLocaleDateString(undefined, dateOptions);
    const formattedTime = dateObject.toLocaleTimeString(undefined, timeOptions);
  
    return `${formattedDate} ${formattedTime}`;
  }

  export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;

    return function (...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }