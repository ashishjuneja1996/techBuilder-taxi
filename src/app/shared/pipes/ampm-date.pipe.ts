import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ampmDate',
  standalone: true
})
export class AmpmDatePipe implements PipeTransform {
  transform(value: any): string | null {
    if (!value) return null;

    // Convert Unix timestamp from seconds to milliseconds
    const date = new Date(value * 1000);

    // Format options for 12-hour time with AM/PM
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
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
