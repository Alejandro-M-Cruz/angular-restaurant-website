import {Component, Input, OnInit} from '@angular/core';
import {MenuSection} from "../../../../model/menu-section.model";
import {TranslocoService} from "@ngneat/transloco";
import {MenuItem} from "../../../../model/menu-item.model";
import {MenuService} from "../../../../services/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: MenuSection[] = []
  menuLeft: MenuSection[] = []
  menuRight: MenuSection[] = []

  constructor(private readonly menuService: MenuService, private readonly translationService: TranslocoService) {
  }

  async ngOnInit() {
    this.menu = await this.menuService.getMenu()
    this.menuLeft = this.menu.slice(0, Math.round(this.menu.length / 2))
    this.menuRight = this.menu.slice(Math.round(this.menu.length / 2))
  }

  getActiveLanguage() {
    return this.translationService.getActiveLang()
  }

  async storeMenuItems() {
    const menuItem: MenuItem = {
      name: {
        es: "Margarita",
        en: "Margarita"
      },
      ingredients: {
        es: "Salsa de tomate, queso y orégano",
        en: "Tomato sauce, cheese and oregano"
      },
      price: 8.99,
      imageSrc: "/assets/images/menu/pizza-menu.jpg"
    }

    const menuSections: MenuSection[] = [
      {
        name: {
          es: "Entrantes",
          en: "Starters"
        },
        items: [
          menuItem,
          menuItem,
          menuItem,
          menuItem,
          menuItem
        ]
      },
      {
        name: {
          es: "Pizzas",
          en: "Pizzas"
        },
        items: [
          menuItem,
          menuItem,
          menuItem,
          menuItem,
          menuItem
        ]
      },
      {
        name: {
          es: "Pasta",
          en: "Pasta"
        },
        items: [
          menuItem,
          menuItem,
          menuItem,
          menuItem,
          menuItem
        ]
      },
      {
        name: {
          es: "Postres",
          en: "Desserts"
        },
        items: [
          menuItem,
          menuItem,
          menuItem,
          menuItem,
          menuItem
        ]
      }
    ]
    for (const menuSection of menuSections) {
      await this.menuService.addMenuSection(menuSection)
    }
  }
}
