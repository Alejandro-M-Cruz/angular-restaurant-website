import {Component, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {MenuSection} from "../../model/menu-section.model";
import {FormBuilder, Validators} from "@angular/forms";
import {TranslocoService} from "@ngneat/transloco";
import {AdminService} from "../../services/admin/admin.service";

@Component({
  selector: 'app-menu-sections-admin',
  templateUrl: './menu-sections-admin.component.html',
  styleUrls: ['./menu-sections-admin.component.css']
})
export class MenuSectionsAdminComponent implements OnInit {
  menuSections: MenuSection[] = []
  form = this.fb.group({
    menuSections: ['', Validators.required]
  })

  constructor(
    private readonly adminService: AdminService,
    private readonly menuService: MenuService,
    private readonly fb: FormBuilder,
    private readonly translateService: TranslocoService
  ) { }

  async ngOnInit() {
    this.menuSections = await this.menuService.getMenuSections()
  }

  getActiveLanguage() {
    return this.translateService.getActiveLang()
  }

  onDeleteSection() {
    this.adminService.deleteSection(this.form.controls.menuSections.value!)
  }

  onAddSection() {

  }

  onSubmit() {

  }
}
