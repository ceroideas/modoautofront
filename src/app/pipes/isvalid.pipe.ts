import { Pipe, PipeTransform } from '@angular/core';
declare var moment:any;

@Pipe({
  name: 'isvalid'
})
export class IsvalidPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value)
  	if (value) {
  		let until = moment(value);
  		let now = moment();

  		if (until > now) {
  			return true;
  		}
  	}
    return null;
  }

}
