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
        ||it.date_id.day_time.toLowerCase().includes(searchText)
        ||it.date_id.mounth_time.toLowerCase().includes(searchText)
        ||it.date_id.year_time.toLowerCase().includes(searchText)
        ||it.date_id.day == Number(searchText)
        ||it.date_id.month == Number(searchText)
        ||it.date_id.year == Number(searchText)
      });
    }

    tform(items: any[], searchText: string): any[] {
      if(!items) return [];
      if(!searchText) return items;
      searchText = searchText.toLowerCase();
      return items.filter( it => {
          return it.name.toLowerCase().includes(searchText)
          ||it.to.toLowerCase().includes(searchText)
          ||it.sender.toLowerCase().includes(searchText)
          ||it.number_of_book == Number(searchText)
          ||it.date_id.day_time.toLowerCase().includes(searchText)
          ||it.date_id.mounth_time.toLowerCase().includes(searchText)
          ||it.date_id.year_time.toLowerCase().includes(searchText)
          ||it.date_id.day == Number(searchText)
          ||it.date_id.month == Number(searchText)
          ||it.date_id.year == Number(searchText)
        });
      }

}