import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {translate} from "@ngneat/transloco";
import {SuccessAlert} from "../alerts/success-alert.alerts";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  async showErrorAlert(errorName: string) {
    await Swal.fire({
      icon: 'error',
      title: translate('alerts.titles.error'),
      text: translate(errorName) ?? errorName,
      confirmButtonText: translate('alerts.confirmButtonTexts.accept')
    })
  }

  async showSuccessAlert(successAlertName: SuccessAlert) {
    await Swal.fire({
      icon: 'success',
      title: translate('alerts.titles.success')
    })
  }
}
