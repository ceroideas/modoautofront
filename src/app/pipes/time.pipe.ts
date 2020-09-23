import { Pipe, PipeTransform } from '@angular/core';
declare var moment:any;

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: unknown, add = null): unknown {
  	if (add) {
    	return moment(value).format('DD.MM.YY HH:mm')
  	}
    return moment(value).format('DD.MM.YY')
  }

}
