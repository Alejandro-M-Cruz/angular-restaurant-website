import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItem} from "../../../../model/menu-item.model";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input() availableLanguages!: string[]
  @Input() menuItem!: MenuItem
  @Output() menuItemDeleted = new EventEmitter<MenuItem>()
  @Output() menuItemEdited = new EventEmitter<MenuItem>()

  deleteItem() {
    this.menuItemDeleted.emit(this.menuItem)
  }

  editItem() {
    this.menuItemEdited.emit(this.menuItem)
  }
}
