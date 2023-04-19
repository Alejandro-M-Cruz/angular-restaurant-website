import {Component, Inject} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {FormBuilder} from "@angular/forms";
import {MultiLanguagePropertiesService} from "../../../services/multi-language-properties.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MenuSection} from "../../../model/menu-section.model";
import {MenuEditService} from "../../../services/admin/menu-edit.service";

export interface MenuSectionFormDialogData {
  menuSection?: MenuSection
}

@Component({
  selector: 'app-menu-section-form-dialog',
  templateUrl: './menu-section-form-dialog.component.html',
  styleUrls: ['./menu-section-form-dialog.component.css']
})
export class MenuSectionFormDialogComponent {
  availableLanguages = this.translateService.getAvailableLangs() as string[]
  form = this.fb.group({
    name: this.multiLanguageService.getMultiLanguagePropertyFormGroup(this.data.menuSection, 'name')
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MenuSectionFormDialogData,
    private readonly translateService: TranslocoService,
    private readonly multiLanguageService: MultiLanguagePropertiesService,
    private readonly fb: FormBuilder
  ) { }

}
