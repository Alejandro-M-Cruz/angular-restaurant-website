import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {translate} from "@ngneat/transloco";
import {CustomError} from "../model/custom-error.model";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  async showErrorAlert(errorName: CustomError) {
    await Swal.fire({
      icon: 'error',
      title: translate(errorName + '.title'),
      text: translate(errorName + '.text'),
      confirmButtonText: translate('alerts.confirmButtonTexts.accept')
    })
  }


}
