import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'features'
})
export class FeaturesPipe implements PipeTransform {

  transform(value: any, type, s = null): any {

    if (type == 'list_of_features') {

      let filter = value.filter(x=>x.feature.section_id == s.id);
      // console.log(filter);
      return filter;

    }else if (type == 'filters'){
      return JSON.parse(value)[s];
    }else{

    	if (typeof value === 'string') {
    		value = JSON.parse(value);

    		return typeof value[type] === 'undefined' ? '...' : value[type];

    	}
      else{
  	  	if (value) {
  		    let f = value.find(x=>x.feature.input_name == type);
  		    if (f) {
  		    	return f.value+' '+((f.unit != 'NULL') ? f.unit : '');
  		    }
  	  	}
    	}

    	return "...";
    }
  }

}
