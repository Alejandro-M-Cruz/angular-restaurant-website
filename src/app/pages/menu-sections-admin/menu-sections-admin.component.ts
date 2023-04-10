import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {MenuSection} from "../../model/menu-section.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {translate, TranslocoService} from "@ngneat/transloco";
import {AdminService} from "../../services/admin/admin.service";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MultiLanguageString} from "../../model/multi-language-string";
import {TextInputDialogComponent} from "../../components/text-input-dialog/text-input-dialog.component";

@Component({
  selector: 'app-menu-sections-admin',
  templateUrl: './menu-sections-admin.component.html',
  styleUrls: ['./menu-sections-admin.component.css']
})
export class MenuSectionsAdminComponent implements OnInit {
  menuSections: MenuSection[] = []
  form = this.fb.group({
    menuSection: ['', Validators.required]
  })

  constructor(
    private readonly adminService: AdminService,
    private readonly menuService: MenuService,
    private readonly fb: FormBuilder,
    private readonly translateService: TranslocoService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) { }

  async ngOnInit() {
    this.menuSections = await this.menuService.getMenuSections()
  }

  getActiveLanguage() {
    return this.translateService.getActiveLang()
  }

  onDeleteSectionClicked() {
    const menuSection = this.menuSections.find(section => section.id === this.form.controls.menuSection.value)
    this.openDeleteSectionConfirmation(menuSection!)
  }

  deleteSection(sectionId: string) {
    this.adminService.deleteSection(sectionId)
  }

  onAddSection() {
    /*
    const newSectionForm = this.fb.group<string>({
      es: ['', Validators.required],
      en: ['', Validators.required]
    })
    */
  }

  onEditSection() {
    this.router.navigate(['/home'])
  }

  openDeleteSectionConfirmation(section: MenuSection) {
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

  openNewSectionFormDialog() {
    const dialogRef = this.dialog.open(TextInputDialogComponent, {
      data: {

      }
    })
    dialogRef.afterClosed().subscribe(result => {

    })
  }
}
