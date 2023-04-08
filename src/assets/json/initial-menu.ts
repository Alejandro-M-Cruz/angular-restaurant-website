import {MenuItem} from "../../app/model/menu-item.model";
import {MenuSection} from "../../app/model/menu-section.model";

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
  imageUrl: "/assets/images/menu/pizza-menu.jpg"
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
