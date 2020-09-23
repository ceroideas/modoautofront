import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkEquipments'
})
export class CheckEquipmentsPipe implements PipeTransform {

  transform(value: any, arr: any): any {
  	if (!value) {
  		return false;
  	}
  	value = JSON.parse(value);
    let a = 0;
    for(var i in arr){
    	if (value.findIndex(x=>x==arr[i]) != -1) {
    		a++;
    	}
    }
    return (a > 0);
  }

}
