import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoDate',
  standalone: true
})
export class IsoDatePipe implements PipeTransform {

  transform(value: string): string | null {
    if (!value) return null;

    // Convert ISO string to Date object
    const date = new Date(value);

    // Format options for 12-hour time with AM/PM and full month name
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',  // Use 'long' for full month name, 'short' for abbreviated
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true // Ensures 12-hour format with AM/PM
    };

    // Automatically uses the user's local time zone
    return date.toLocaleString(undefined, options);
  }

}
