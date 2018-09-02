import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterii'
})
export class FilterPipeii implements PipeTransform {

  transform(items: any[], shText: string): any[] {
    if(!items) return [];
    if(!shText) return items;
    shText = shText.toLowerCase();
    return items.filter( it => {
        return it.name.toLowerCase().includes(shText)
        ||it.to.toLowerCase().includes(shText)
        ||it.sender.toLowerCase().includes(shText)
        ||it.number_of_book == Number(shText)
        ||it.day_time.toLowerCase().includes(shText)
        ||it.mounth_time.toLowerCase().includes(shText)
        ||it.year_time.toLowerCase().includes(shText)
        // ||it.day == Number(searchText)
        // ||it.month == Number(searchText)
        // ||it.year == Number(searchText)
      });
    }


}