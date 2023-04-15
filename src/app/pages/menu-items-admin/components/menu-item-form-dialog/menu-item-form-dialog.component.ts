import {Component, Inject} from '@angular/core';
import {MenuItem} from "../../../../model/menu-item.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";
import {MultiLanguagePropertiesService} from "../../../../services/multi-language-properties.service";
import {MenuImagesService} from "../../../../services/menu-images.service";
import {MenuEditService} from "../../../../services/admin/menu-edit.service";
import {MenuService} from "../../../../services/menu.service";
import {MenuSection} from "../../../../model/menu-section.model";

export interface MenuItemFormDialogData {
  menuSection: MenuSection
  menuItem?: MenuItem
}

@Component({
  selector: 'app-menu-item-form-dialog',
  templateUrl: './menu-item-form-dialog.component.html',
  styleUrls: ['./menu-item-form-dialog.component.css']
})
export class MenuItemFormDialogComponent {
  availableLanguages = this.translateService.getAvailableLangs() as string[]
  menuSections$ = this.menuService.getMenuSections()
  form = this.fb.group({
    name: this.multiLanguageService.getMultiLanguagePropertyFormGroup(this.data.menuItem, 'name'),
    ingredients: this.multiLanguageService.getMultiLanguagePropertyFormGroup(this.data.menuItem, 'ingredients'),
    price: [this.data.menuItem ? this.data.menuItem.price : 0, Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.max(9999)
    ])],
    sectionId: [this.data.menuItem ? this.data.menuItem.sectionId : this.data.menuSection.id, Validators.required],
    imageUrl: [this.data.menuItem ? this.data.menuItem.imageUrl : '']
  })
  imageFile: File | null = null

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MenuItemFormDialogData,
    private readonly fb: FormBuilder,
    readonly translateService: TranslocoService,
    private readonly multiLanguageService: MultiLanguagePropertiesService,
    private readonly menuService: MenuService,
    private readonly menuEditService: MenuEditService,
    private readonly menuImagesService: MenuImagesService
  ) { }

  onImageFileInputChanged(imageFile: File | null) {
    this.imageFile = imageFile
    this.form.controls.imageUrl.setValue(imageFile?.name)
  }

  discardSelectedImage() {
    this.form.controls.imageUrl.setValue(this.imageFile = null)
  }

  async onSubmit() {
    this.form.controls.imageUrl.disable()
    if (this.imageFile) await this.uploadImage(this.imageFile)
    this.data.menuItem ?
      this.editMenuItem(this.data.menuItem!.id!, this.form.value as MenuItem) :
      this.addMenuItem(this.form.value as MenuItem)
  }

  private addMenuItem(menuItem: MenuItem) {
    this.menuEditService.addItem(menuItem)
  }

  private editMenuItem(id: string, menuItem: MenuItem) {
    this.menuEditService.updateItem(id, menuItem)
  }

  private async uploadImage(imageFile: File) {
    try {
      const imageUrl = await this.menuImagesService.uploadImage(imageFile)
      this.form.controls.imageUrl.setValue(imageUrl)
    } catch (e: any) {
      console.error(e)

    }
  }
}
