import {Component} from '@angular/core';
import {MenuService} from "../../services/menu/menu.service";
import {MenuSection} from "../../model/menu-section.model";
import {FormBuilder, Validators} from "@angular/forms";
import {translate, TranslocoService} from "@ngneat/transloco";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TextInputDialogComponent} from "../../components/text-input-dialog/text-input-dialog.component";
import {MenuEditService} from "../../services/admin/menu-edit.service";
import {
  MenuSectionFormDialogComponent
} from "../../components/form-dialogs/menu-section-form-dialog/menu-section-form-dialog.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-menu-sections-admin',
  templateUrl: './menu-sections-admin.component.html',
  styleUrls: ['./menu-sections-admin.component.css']
})
export class MenuSectionsAdminComponent {
  getActiveLanguage = (): string => this.translateService.getActiveLang()
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
    private readonly router: Router,
    public readonly location: Location
  ) { }

  onDeleteSectionClicked() {
    this.openDeleteSectionConfirmationDialog(this.form.controls.menuSection.value!)
  }

  private deleteSection(sectionId: string) {
    this.menuEditService.deleteSection(sectionId).then((result: any) => {
      if (result.error) alert(translate('alerts.standard'))
    })
  }

  onAddSectionClicked() {
    this.openNewSectionFormDialog()
  }

  private addSection(menuSection: MenuSection) {
    this.menuEditService.addSection(menuSection).then((result: any) => {
      if (result.error) alert(translate('alerts.standard'))
    })
  }

  async onSubmitEditSection() {
    this.menuEditService.sectionIsBeingEdited(this.form.controls.menuSection.value!)
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
    this.dialog
      .open(MenuSectionFormDialogComponent, {data: {}})
      .afterClosed()
      .subscribe((result: MenuSection | null) => {
        if (result) this.addSection(result)
      })
  }
}
