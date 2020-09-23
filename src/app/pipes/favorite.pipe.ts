import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favorite'
})
export class FavoritePipe implements PipeTransform {

  transform(value: any,favorites:any) {
  	return favorites.find(x=>x==value);
  }

}
