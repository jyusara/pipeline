import { format, tzDate } from '@formkit/tempo';

export function parseDate(date: string | Date, timeZone: string = 'America/Bogota'): any {
  const zoneDate = tzDate(date, timeZone);
  return format(zoneDate, 'D-MM-YYYY, HH:mm:ss a', 'en');
}
