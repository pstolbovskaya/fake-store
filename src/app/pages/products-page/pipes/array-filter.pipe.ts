import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {
  transform(areaList : any[], filterValue: string, property: string): any[] {
      return areaList.filter((listing: any) => listing[property].includes(filterValue));
  }
}
