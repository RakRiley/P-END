import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
        return it.name.toLowerCase().includes(searchText)
        ||it.to.toLowerCase().includes(searchText)
        ||it.sender.toLowerCase().includes(searchText)
        ||it.number_of_book == Number(searchText)
        ||it.day_time.toLowerCase().includes(searchText)
        ||it.mounth_time.toLowerCase().includes(searchText)
        ||it.year_time.toLowerCase().includes(searchText)
        // ||it.day == Number(searchText)
        // ||it.month == Number(searchText)
        // ||it.year == Number(searchText)
      });
    }


}