import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {translate} from "@ngneat/transloco";
import {ActionErrorName} from "../errors/action-error.errors";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  async showErrorAlert(errorName: ActionErrorName) {
    await Swal.fire({
      icon: 'error',
      title: translate(errorName + '.title'),
      text: translate(errorName + '.text'),
      confirmButtonText: translate('alerts.confirmButtonTexts.accept')
    })
  }


}
