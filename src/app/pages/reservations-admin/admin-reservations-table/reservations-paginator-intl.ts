import {MatPaginatorIntl} from "@angular/material/paginator";
import {translate, TranslocoService} from "@ngneat/transloco";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ReservationsPaginatorIntl extends MatPaginatorIntl {
  constructor(private readonly translateService: TranslocoService) {
    super()
    translateService.selectTranslate('reservationsPaginator.itemsPerPageLabel')
      .subscribe((t: string) => {
        this.changes.next()
        this.itemsPerPageLabel = t
      })
    translateService.selectTranslate('reservationsPaginator.nextPageLabel')
      .subscribe((t: string) => this.nextPageLabel = t)
    translateService.selectTranslate('reservationsPaginator.previousPageLabel')
      .subscribe((t: string) => this.previousPageLabel = t)
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 van ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${translate('reservationsPaginator.of')} ${length}`;
  };

}


