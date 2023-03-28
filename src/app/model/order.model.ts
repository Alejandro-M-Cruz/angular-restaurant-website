import {MenuItem} from "./menu-item.model";

export interface Order {
  items: MenuItem[];
  creationTimestamp: Date;
  userId: string;
}
