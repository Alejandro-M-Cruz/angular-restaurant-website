import { Injectable } from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {MenuItem} from "../model/menu-item.model";
import {FormBuilder, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MultiLanguagePropertiesService {
  constructor(private readonly translateService: TranslocoService, private readonly fb: FormBuilder) { }

  getMultiLanguagePropertyFormGroup(object: any, property: string) {
    const formGroup = this.fb.nonNullable.group({})
    for (const lang of this.translateService.getAvailableLangs() as string[])
      formGroup.addControl(lang, new FormControl(object ? object[property][lang] : ''))
    return formGroup
  }


}
