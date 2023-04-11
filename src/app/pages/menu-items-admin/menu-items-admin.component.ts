import {Component, OnInit} from '@angular/core';
import { MenuEditService } from 'src/app/services/admin/menu-edit.service';
import { MenuService } from 'src/app/services/menu.service';
import {TranslocoService} from "@ngneat/transloco";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu-items-admin',
  templateUrl: './menu-items-admin.component.html',
  styleUrls: ['./menu-items-admin.component.css']
})
export class MenuItemsAdminComponent implements OnInit {
  availableLanguages = this.translateService.getAvailableLangs() as string[]
  menuSections$ = this.menuService.getMenuSections()
  editedSection = this.menuEditService.editedSection
  sectionItems$ = this.menuService.getMenuItemsBySectionId(this.editedSection!.id!)
  form = this.fb.group({
    name: this.fb.nonNullable.group({}),
    ingredients: this.fb.nonNullable.group({}),
    price: [0, Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.max(99999)
    ])],
    image: [null],
    sectionId: ['', Validators.required],
    imageUrl: []
  })

  constructor(
    private readonly menuEditService: MenuEditService,
    private readonly menuService: MenuService,
    private readonly translateService: TranslocoService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.availableLanguages.forEach(lang => {
      this.form.controls.name.addControl(lang, new FormControl(''))
      this.form.controls.ingredients.addControl(lang, new FormControl(''))
    })
  }

  getActiveLanguage() {
    return this.translateService.getActiveLang()
  }
}
