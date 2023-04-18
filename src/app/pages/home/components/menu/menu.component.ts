import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {MenuService} from "../../../../services/menu.service";
import {MenuItem} from "../../../../model/menu-item.model";
import {DisplayableMenuSection, MenuSection} from "../../../../model/menu-section.model";
import {map} from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuLeft?: DisplayableMenuSection[]
  menuRight?: DisplayableMenuSection[]
  page?:string;
  @Output() messageEvent = new EventEmitter<MenuItem>();

  constructor(private readonly menuService: MenuService, private readonly translationService: TranslocoService,private activeRoute:ActivatedRoute) {}

  ngOnInit() {
    const sub = this.menuService.getMenuSections().subscribe(menuSections => {
      const itemsSub = this.menuService.getMenuItems().pipe(map(menuItems => {
        return this.getDisplayableMenu(menuSections, menuItems)
      })).subscribe(menu => {
        this.menuLeft = menu.slice(0, Math.round(menu.length / 2))
        this.menuRight = menu.slice(Math.round(menu.length / 2))
        itemsSub.unsubscribe()
      })
      sub.unsubscribe()
    })
    this.page =this.activeRoute.snapshot.routeConfig?.title as string;

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

  sendMessage(item:MenuItem) {
    this.messageEvent.emit(item);
  }
}
