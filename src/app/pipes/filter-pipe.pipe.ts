import { Product } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Product[], filterText: string): Product[] {
    //ilk deger değiştirmek istediğimiz, ikincisi parametre
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    let filterValue= filterText
      ? value.filter((p: Product) =>
          p.productName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
      return filterValue;
  }
}
