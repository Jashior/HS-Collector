import { Pipe, PipeTransform } from '@angular/core';
import { map } from '../model/SetNameMapper';

@Pipe({
  name: 'friendlyName'
})
export class FriendlyNamePipe implements PipeTransform {
  transform(name: string): any {
    if (map.hasOwnProperty(name)) {
      return map[name];
    } else {
      return name;
    }
  }
}