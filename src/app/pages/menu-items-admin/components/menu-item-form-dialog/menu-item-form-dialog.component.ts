import {Component, Inject} from '@angular/core';
import {MenuItem} from "../../../../model/menu-item.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";
import {MultiLanguagePropertiesService} from "../../../../services/multi-language-properties.service";
import {MenuImagesService} from "../../../../services/menu-images.service";
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
    sectionId: [this.data.menuItem ? this.data.menuItem.sectionId : this.data.menuSection.id, Validators.required]
  })
  readonly imageName: string = this.data.menuItem?.imageUrl ?
    this.menuImagesService.getImageNameFromUrl(this.data.menuItem.imageUrl) :
    ''
  selectedImageFile: File | null = null
  shouldUnSelectImage = false
  imageUrl?: string = this.data.menuItem?.imageUrl

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MenuItemFormDialogData,
    private readonly fb: FormBuilder,
    readonly translateService: TranslocoService,
    private readonly multiLanguageService: MultiLanguagePropertiesService,
    private readonly menuService: MenuService,
    private readonly menuImagesService: MenuImagesService
  ) { }

  onImageFileInputChanged(imageFile: File | null) {
    if (!imageFile) this.shouldUnSelectImage = true
    this.selectedImageFile = imageFile
  }

  async updateImageUrl() {
    if (this.selectedImageFile) {
      this.imageUrl = await this.uploadMenuItemImage(this.selectedImageFile)
    } else if (this.shouldUnSelectImage) {
      this.imageUrl = undefined
    }
  }

  async getNewOrUpdatedMenuItem(): Promise<MenuItem> {
    await this.updateImageUrl()
    return (this.imageUrl ? { ...this.form.value, imageUrl: this.imageUrl } : this.form.value) as MenuItem
  }

  private async uploadMenuItemImage(imageFile: File): Promise<string | undefined> {
    try {
      return this.menuImagesService.uploadImage(imageFile)
    } catch (e: any) {
      console.error(e)
      return undefined
    }
  }
}
