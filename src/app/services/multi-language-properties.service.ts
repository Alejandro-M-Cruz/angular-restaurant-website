import { Injectable } from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MultiLanguagePropertiesService {
  constructor(private readonly translateService: TranslocoService) { }

  getMultiLanguagePropertyFormGroup(object: any, property: string): FormGroup {
    const formGroup = new FormGroup({})
    for (const lang of this.translateService.getAvailableLangs() as string[]) {
      formGroup.addControl(
        lang,
        new FormControl(object?.[property]?.[lang] ?? '',Validators.required)
      )
    }
    return formGroup
  }
}
