import {Component, Inject} from '@angular/core';
import {MenuItem} from "../../../../model/menu-item.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";
import {MultiLanguagePropertiesService} from "../../../../services/multi-language-properties.service";
import {MenuImagesService} from "../../../../services/menu-images.service";

export interface MenuItemFormDialogData {
  menuItem?: MenuItem
}

@Component({
  selector: 'app-menu-item-form-dialog',
  templateUrl: './menu-item-form-dialog.component.html',
  styleUrls: ['./menu-item-form-dialog.component.css']
})
export class MenuItemFormDialogComponent {
  availableLanguages = this.translateService.getAvailableLangs() as string[]
  form = this.fb.group({
    name: this.multiLanguageService.getMultiLanguagePropertyFormGroup(this.data.menuItem, 'name'),
    ingredients: this.multiLanguageService.getMultiLanguagePropertyFormGroup(this.data.menuItem, 'ingredients'),
    price: [this.data.menuItem ? this.data.menuItem.price : 0, Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.max(9999)
    ])],
    sectionId: [this.data.menuItem ? this.data.menuItem.sectionId : '', Validators.required],
    imageUrl: [this.data.menuItem ? this.data.menuItem.imageUrl : '']
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MenuItemFormDialogData,
    private readonly fb: FormBuilder,
    private readonly translateService: TranslocoService,
    private readonly multiLanguageService: MultiLanguagePropertiesService,
    private readonly menuImagesService: MenuImagesService
  ) {
  }

  onImageFileInputChanged(imageFile: File | null) {
    console.log(imageFile)
    this.form.controls.imageUrl.setValue(imageFile?.name)
  }

  discardSelectedImage() {
    this.form.controls.imageUrl.setValue(null)
  }
}
