import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
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
    sectionId: [this.data.menuItem ? this.data.menuItem.sectionId : this.data.menuSection.id, Validators.required]
  })
  imageNameControl = new FormControl(
    this.data.menuItem?.imageUrl ?
      this.menuImagesService.getImageNameFromUrl(this.data.menuItem.imageUrl) :
      ''
  )
  @ViewChild('fileInput') fileInput!: ElementRef
  selectedImageFile: File | null = null

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
    this.selectedImageFile = imageFile
    this.imageNameControl.setValue(imageFile?.name ?? null)
  }

  discardSelectedImage() {
    this.imageNameControl.setValue(null)
    this.fileInput.nativeElement.value = ''
    this.selectedImageFile = null
  }

  async onSubmit() {
    console.log('submitting form dialog', this.form.value)
    const imageUrl = this.selectedImageFile ?
      await this.uploadImage(this.selectedImageFile) :
      null
    const menuItem = (imageUrl ? {...this.form.value, imageUrl } : this.form.value) as MenuItem
    this.data.menuItem ?
      await this.editMenuItem(this.data.menuItem!.id!, menuItem) :
      await this.addMenuItem(menuItem)
  }

  private async addMenuItem(menuItem: MenuItem) {
    await this.menuEditService.addItem(menuItem)
  }

  private async editMenuItem(id: string, menuItem: MenuItem) {
    await this.menuEditService.updateItem(id, menuItem)
  }

  private async uploadImage(imageFile: File) {
    try {
      return this.menuImagesService.uploadImage(imageFile)
    } catch (e: any) {
      console.error(e)
      return null
    }
  }
}
