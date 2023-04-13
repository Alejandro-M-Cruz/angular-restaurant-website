import {Component} from '@angular/core';
import { MenuEditService } from 'src/app/services/admin/menu-edit.service';
import {translate, TranslocoService} from "@ngneat/transloco";
import {MenuService} from "../../services/menu.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {MenuItem} from "../../model/menu-item.model";
import {MenuSection} from "../../model/menu-section.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-menu-items-admin',
  templateUrl: './menu-items-admin.component.html',
  styleUrls: ['./menu-items-admin.component.css']
})
export class MenuItemsAdminComponent {
  availableLanguages = this.translateService.getAvailableLangs() as string[]
  sectionBeingEdited!: MenuSection
  sectionItems$!: Observable<MenuItem[]>

  constructor(
    private readonly menuEditService: MenuEditService,
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly translateService: TranslocoService
  ) {
    if (!this.menuEditService.editedSection) {
      this.router.navigate(['/menu-sections-admin'])
      return
    }
    this.sectionBeingEdited = this.menuEditService.editedSection
    this.sectionItems$ = this.menuService.getMenuItemsBySectionId(this.sectionBeingEdited.id!)
  }

  onDeleteItemClicked(item: MenuItem) {
    this.openDeleteItemConfirmationDialog(item)
  }

  onEditItemClicked(item: MenuItem) {
    this.openEditItemFormDialog(item)
  }

  deleteItem(id: string) {
    this.menuEditService.deleteItem(id)
  }

  openDeleteItemConfirmationDialog(item: MenuItem) {
    this.dialog.open(ConfirmationDialogComponent, {data: {
        title: translate('confirmationTitles.deleteMenuItem'),
        message: translate('confirmations.deleteMenuItem', {
          itemName: item.name[this.translateService.getActiveLang()]
        }),
        yes: translate('confirmationOptions.yes'),
        no: translate('confirmationOptions.no')
      }}).afterClosed().subscribe(result => {
        if (result) this.deleteItem(item.id!)
    })
  }

  openEditItemFormDialog(item: MenuItem) {

  }

  /*sectionBeingEdited = this.menuEditService.editedSection
  availableLanguages = this.translateService.getAvailableLangs() as string[]
  menuSections$!: Observable<MenuSection[]>
  sectionItems$!: Observable<MenuItem[]>
  form = this.fb.group({
    name: this.sectionBeingEdited ?
      this.getMultiLanguagePropertyFormGroup(this.sectionBeingEdited, 'name')
      : new FormGroup({}),
    items: this.fb.array([])
  })
  initialValue!: DisplayableMenuSection

  constructor(
    private readonly menuEditService: MenuEditService,
    private readonly menuService: MenuService,
    private readonly translateService: TranslocoService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.sectionBeingEdited) {
      this.router.navigate(['/menu-sections-admin'])
      return
    }
    this.menuSections$ = this.menuService.getMenuSections()
    this.sectionItems$ = this.menuService.getMenuItemsBySectionId(this.sectionBeingEdited!.id!)
    this.sectionItems$.subscribe(items => this.initFormControls(items))
    this.initialValue = this.form.value as DisplayableMenuSection
    this.detectFormValueChanges()
  }

  private getMultiLanguagePropertyFormGroup(sectionOrItem: MenuSection | MenuItem, property: string): FormGroup {
    const formGroup = this.fb.nonNullable.group({})
    for (const lang of this.availableLanguages) {
      formGroup.addControl(
        lang,
        new FormControl(sectionOrItem[property][lang], Validators.required)
      )
    }
    return formGroup
  }

  private getMenuItemFormGroup(item: MenuItem): FormGroup {
    return this.fb.group({
      name: this.getMultiLanguagePropertyFormGroup(item, 'name'),
      ingredients: this.getMultiLanguagePropertyFormGroup(item, 'ingredients'),
      price: [item.price, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(99999)
      ])],
      sectionId: [item.sectionId, Validators.required],
      imageUrl: [item.imageUrl]
    })
  }

  private initFormControls(items: MenuItem[]) {
    for (const item of items)
      (this.form.get('items') as FormArray).push(this.getMenuItemFormGroup(item))
  }

  private detectFormValueChanges() {
    this.form.valueChanges.subscribe(value => {
      if (this.initialValue === value as DisplayableMenuSection) return
      console.log('Form value changed', value)
    })
  }

  getActiveLanguage(): string {
    return this.translateService.getActiveLang()
  }

  onUndoChangesClicked() {

  }

  newItem() {

  }

  deleteItem() {

  }

  saveChanges() {

  }*/
}
