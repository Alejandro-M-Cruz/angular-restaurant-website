import {Component, OnInit} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {MenuService} from "../../../../services/menu.service";
import {MenuItem} from "../../../../model/menu-item.model";
import {MenuSection} from "../../../../model/menu-section.model";

interface DisplayableMenuSection extends MenuSection {
  items: MenuItem[]
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: DisplayableMenuSection[] = []
  menuLeft: DisplayableMenuSection[] = []
  menuRight: DisplayableMenuSection[] = []

  constructor(private readonly menuService: MenuService, private readonly translationService: TranslocoService) {
  }

  async ngOnInit() {
    const menuSections = await this.menuService.getMenuSections()
    const menuItems = await this.menuService.getMenuItems()
    for (const menuSection of menuSections) {
      const sectionItems = menuItems.filter(menuItem => menuItem.sectionId === menuSection.id)
      this.menu.push({
        ...menuSection,
        items: sectionItems
      } as DisplayableMenuSection)
    }
    this.menuLeft = this.menu.slice(0, Math.round(this.menu.length / 2))
    this.menuRight = this.menu.slice(Math.round(this.menu.length / 2))
  }

  getActiveLanguage() {
    return this.translationService.getActiveLang()
  }

}
