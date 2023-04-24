import {Component, Inject} from '@angular/core';
import {MenuItem} from "../../../../model/menu-item.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";
import {MultiLanguagePropertiesService} from "../../../../services/multi-language-properties.service";
import {MenuImagesService} from "../../../../services/menu-images.service";
import {MenuService} from "../../../../services/menu.service";
import {MenuSection} from "../../../../model/menu-section.model";
import {AlertsService} from "../../../../services/alerts.service";
import {AlertError} from "../../../../errors/alert-error.errors";

export interface MenuItemFormDialogData {
  menuSectionBeingUpdated: MenuSection
  menuItemBeingUpdated?: MenuItem
}

@Component({
  selector: 'app-menu-item-form-dialog',
  templateUrl: './menu-item-form-dialog.component.html',
  styleUrls: ['./menu-item-form-dialog.component.css']
})
export class MenuItemFormDialogComponent {
  availableLanguages = this.translateService.getAvailableLangs() as string[]
  getActiveLanguage = (): string => this.translateService.getActiveLang()
  menuSections$ = this.menuService.getMenuSections()
  form = this.fb.group({
    name: this.multiLanguageService
      .getMultiLanguagePropertyFormGroup(this.data.menuItemBeingUpdated, 'name'),
    ingredients: this.multiLanguageService
      .getMultiLanguagePropertyFormGroup(this.data.menuItemBeingUpdated, 'ingredients'),
    price: [this.data.menuItemBeingUpdated?.price, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999)
    ]],
    sectionId: [this.data.menuSectionBeingUpdated.id, Validators.required]
  })
  uploadedImageUrl: string | null = this.data.menuItemBeingUpdated?.imageUrl ?? null
  readonly initialImageName?: string = this.uploadedImageUrl ?
    this.menuImagesService.getImageNameFromUrl(this.uploadedImageUrl) :
    undefined
  selectedImageFile: File | null = null
  selectedImageUrl: string | null = this.uploadedImageUrl
  shouldUnselectImage = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MenuItemFormDialogData,
    private readonly dialogRef: MatDialogRef<MenuItemFormDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly translateService: TranslocoService,
    private readonly multiLanguageService: MultiLanguagePropertiesService,
    private readonly menuService: MenuService,
    private readonly menuImagesService: MenuImagesService,
    private readonly alertsService: AlertsService
  ) {}

  onImageFileInputChanged(imageFile: File | null) {
    this.shouldUnselectImage = !imageFile
    this.selectedImageFile = imageFile
    if (this.selectedImageUrl) this.menuImagesService.revokeImageUrl(this.selectedImageUrl)
    this.selectedImageUrl = imageFile ? this.menuImagesService.getNotYetUploadedImageUrl(imageFile) : null
  }

  async onSubmit() {
    this.dialogRef.close(await this.getNewOrUpdatedMenuItem())
  }

  private async getNewOrUpdatedMenuItem(): Promise<MenuItem> {
    await this.updateImageUrl()
    return (this.uploadedImageUrl ? { ...this.form.value, imageUrl: this.uploadedImageUrl } : this.form.value) as MenuItem
  }

  private async updateImageUrl() {
    if (this.selectedImageFile) {
      this.uploadedImageUrl = await this.uploadMenuItemImage(this.selectedImageFile)
    } else if (this.shouldUnselectImage) {
      this.uploadedImageUrl = null
    }
  }

  private async uploadMenuItemImage(imageFile: File): Promise<string | null> {
    try {
      return this.menuImagesService.uploadImage(imageFile)
    } catch (e: any) {
      console.error(e)
      await this.alertsService.showErrorAlert(AlertError.IMAGE_UPLOAD)
      return null
    }
  }
}
