import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {translate} from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  async showErrorAlert(errorName: string) {
    console.log(errorName)
    await Swal.fire({
      icon: 'error',
      title: translate('alerts.titles.error'),
      text: translate(errorName),
      confirmButtonText: translate('alerts.confirmButtonTexts.accept')
    })
  }
}
