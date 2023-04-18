import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {MenuSection} from "../../model/menu-section.model";
import {FormBuilder, Validators} from "@angular/forms";
import {translate, TranslocoService} from "@ngneat/transloco";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TextInputDialogComponent} from "../../components/text-input-dialog/text-input-dialog.component";
import {MenuEditService} from "../../services/admin/menu-edit.service";

@Component({
  selector: 'app-menu-sections-admin',
  templateUrl: './menu-sections-admin.component.html',
  styleUrls: ['./menu-sections-admin.component.css']
})
export class MenuSectionsAdminComponent {
  menuSections$ = this.menuService.getMenuSections()
  form = this.fb.group({
    menuSection: [null, Validators.required]
  })

  constructor(
    private readonly menuEditService: MenuEditService,
    private readonly menuService: MenuService,
    private readonly fb: FormBuilder,
    private readonly translateService: TranslocoService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) { }

  getActiveLanguage() {
    return this.translateService.getActiveLang()
  }

  onDeleteSectionClicked() {
    this.openDeleteSectionConfirmationDialog(this.form.controls.menuSection.value!)
  }

  private deleteSection(sectionId: string) {
    this.menuEditService.deleteSection(sectionId).then((result: any) => {
      if (result.error) alert(translate('errors.standard'))
    })
  }

  onAddSectionClicked() {
    this.openNewSectionFormDialog()
  }

  private addSection(menuSection: MenuSection) {
    this.menuEditService.addSection(menuSection).then((result: any) => {
      if (result.error) alert(translate('errors.standard'))
    })
  }

  async onSubmitEditSection() {
    this.menuEditService.editingSection(this.form.controls.menuSection.value!)
    await this.router.navigate(['/menu-items-admin'])
  }

  private openDeleteSectionConfirmationDialog(section: MenuSection) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: translate('confirmationTitles.deleteMenuSection'),
        message: translate('confirmations.deleteMenuSection', {
          section: section.name[this.getActiveLanguage()]
        }),
        yes: translate('confirmationOptions.yes'),
        no: translate('confirmationOptions.no')
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteSection(section.id!)
    })
  }

  private openNewSectionFormDialog() {
    const dialogRef = this.dialog.open(TextInputDialogComponent, {
      data: {
        title: translate('confirmationTitles.addMenuSection'),
        labels: [
          translate('formLabels.menuSectionName.es'),
          translate('formLabels.menuSectionName.en')
        ],
        form: this.fb.group({
          es: ['', Validators.required],
          en: ['', Validators.required]
        }),
        yes: translate('confirmationOptions.confirm'),
        no: translate('confirmationOptions.cancel')
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      const menuSection = { name: result } as MenuSection
      this.addSection(menuSection)
    })
  }
}
