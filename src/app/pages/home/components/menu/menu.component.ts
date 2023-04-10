import {Component, OnInit} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {MenuService} from "../../../../services/menu.service";
import {MenuItem} from "../../../../model/menu-item.model";
import {MenuSection} from "../../../../model/menu-section.model";
import {map, Observable} from "rxjs";

interface DisplayableMenuSection extends MenuSection {
  items: MenuItem[]
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuLeft?: DisplayableMenuSection[]
  menuRight?: DisplayableMenuSection[]

  constructor(private readonly menuService: MenuService, private readonly translationService: TranslocoService) {}

  ngOnInit() {
    const subscription = this.menuService.getMenuSections().subscribe(menuSections => {
      const itemsSubscription = this.menuService.getMenuItems().pipe(map(menuItems => {
        return this.getDisplayableMenu(menuSections, menuItems)
      })).subscribe(menu => {
        this.menuLeft = menu.slice(0, Math.round(menu.length / 2))
        this.menuRight = menu.slice(Math.round(menu.length / 2))
        itemsSubscription.unsubscribe()
      })
      subscription.unsubscribe()
    })
  }

  getDisplayableMenu(menuSections: MenuSection[], menuItems: MenuItem[]) {
    const menu: DisplayableMenuSection[] = []
    for (const menuSection of menuSections) {
      const sectionItems = menuItems.filter(item => item.sectionId === menuSection.id)
      menu.push({
        ...menuSection,
        items: sectionItems
      } as DisplayableMenuSection)
    }
    return menu
  }

  getActiveLanguage() {
    return this.translationService.getActiveLang()
  }
}
