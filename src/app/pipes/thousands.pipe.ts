import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousands'
})
export class ThousandsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
  	if (value) {
    	// return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");;
    	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  	}
  }

}
