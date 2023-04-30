import {Component} from '@angular/core';
import { MenuEditService } from 'src/app/services/admin/menu-edit.service';
import {translate, TranslocoService} from "@ngneat/transloco";
import {MenuService} from "../../services/menu/menu.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {MenuItem} from "../../model/menu-item.model";
import {MenuSection} from "../../model/menu-section.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {
  MenuItemFormDialogComponent,
  MenuItemFormDialogData
} from "./components/menu-item-form-dialog/menu-item-form-dialog.component";
import {
  MenuSectionFormDialogComponent
} from "../../components/form-dialogs/menu-section-form-dialog/menu-section-form-dialog.component";

@Component({
  selector: 'app-menu-items-admin',
  templateUrl: './menu-items-admin.component.html',
  styleUrls: ['./menu-items-admin.component.css']
})
export class MenuItemsAdminComponent {
  sectionBeingEdited: MenuSection
  sectionItems$: Observable<MenuItem[]>
  availableLanguages = this.translateService.getAvailableLangs() as string[]

  constructor(
    private readonly menuEditService: MenuEditService,
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly translateService: TranslocoService
  ) {
    const section = this.menuEditService.getSectionBeingEdited()
    if (!section) {
      this.router.navigate(['/menu-sections-admin'])
      return
    }
    this.sectionBeingEdited = section
    this.sectionItems$ = this.menuService.getMenuItemsBySectionId(this.sectionBeingEdited.id!)
  }

  getActiveLanguage(): string {
    return this.translateService.getActiveLang()
  }

  onDeleteItemClicked(item: MenuItem) {
    this.openDeleteItemConfirmationDialog(item)
  }

  onAddItemClicked() {
    this.openItemFormDialog()
  }

  onEditItemClicked(item: MenuItem) {
    this.openItemFormDialog(item)
  }

  async deleteItem(id: string) {
    await this.menuEditService.deleteItem(id)
  }

  openDeleteItemConfirmationDialog(item: MenuItem) {
    this.dialog.open(ConfirmationDialogComponent, {data: {
        title: translate('confirmationTitles.deleteMenuItem'),
        message: translate('confirmations.deleteMenuItem', {
          itemName: item.name[this.translateService.getActiveLang()]
        }),
        yes: translate('confirmationOptions.yes'),
        no: translate('confirmationOptions.no')
      }}).afterClosed().subscribe(async result => {
        if (result) await this.deleteItem(item.id!)
    })
  }

  openItemFormDialog(item?: MenuItem) {
    this.dialog.open(MenuItemFormDialogComponent, {
      data: { menuItemBeingUpdated: item, menuSectionBeingUpdated: this.sectionBeingEdited } as MenuItemFormDialogData
    }).afterClosed().subscribe(async result => {
      if (result) {
        item ?
          await this.menuEditService.updateItem(item.id!, await result) :
          await this.menuEditService.addItem(await result)
      }
    })
  }

  async updateSection(id: string, menuSection: MenuSection) {
    await this.menuEditService.updateSection(id, menuSection)
  }

  openSectionEditFormDialog() {
    this.dialog.open(MenuSectionFormDialogComponent, {
      data: { menuSection: this.sectionBeingEdited }
    }).afterClosed().subscribe(async (result: MenuSection | null) => {
      if (result) {
        await this.updateSection(this.sectionBeingEdited.id!, result)
        this.sectionBeingEdited = result
      }
    })
  }
}
