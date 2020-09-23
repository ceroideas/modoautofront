import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equipments'
})
export class EquipmentsPipe implements PipeTransform {

  transform(value: any, v): unknown {
  	if (value === undefined) {
  		return false;
  	}
  	value = JSON.parse(value);
    return value.findIndex(x=>x==v) != -1;
  }

}
