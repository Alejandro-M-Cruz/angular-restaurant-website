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
import {MenuItemFormDialogComponent} from "./components/menu-item-form-dialog/menu-item-form-dialog.component";

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

  getActiveLanguage(): string {
    return this.translateService.getActiveLang()
  }

  onDeleteItemClicked(item: MenuItem) {
    this.openDeleteItemConfirmationDialog(item)
  }

  onAddItemClicked() {
    this.openItemEditFormDialog()
  }

  onEditItemClicked(item: MenuItem) {
    this.openItemEditFormDialog(item)
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

  openItemEditFormDialog(item?: MenuItem) {
    this.dialog.open(MenuItemFormDialogComponent, {
      data: { menuItem: item, menuSection: this.sectionBeingEdited }
    }).afterClosed().subscribe(async result => {
      console.log(result)
      if (result) {
        item ?
          await this.menuEditService.updateItem(item.id!, result) :
          await this.menuEditService.addItem(result)
      }
    })
  }
}
