import { Pipe, PipeTransform } from '@angular/core';
import { Select2Option, Select2Group } from "ng-select2-component";

@Pipe({
  name: 'select2Data'
})
export class Select2DataPipe implements PipeTransform {

  transform(value: any, title:any): any {
  	let data:Select2Group[];
  	let options = [];

  	for (var i in value) {
  		options.push({label:value[i].value,value:value[i].value});
  	}

  	data = [{
      label: title,options: options
    }];

    return data;
  }

}
