import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {
  transform(value: string, locale: string = 'en-US'): string {
    const date = new Date(value);
    const monthName = new DatePipe(locale).transform(date, 'MMMM');
    const res = monthName ? monthName : "";
    return res;
  }
}