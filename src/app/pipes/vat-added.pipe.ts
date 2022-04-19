import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded',
})
export class VatAddedPipe implements PipeTransform {
  transform(value: number, rate: number): number {
    //value: number, rate:number -->parametreler. sondaki dönüş tipi
    return value + (value * rate) / 100;
  }
}
