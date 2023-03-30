export interface Reservation {
  [key: string]: Date | number | string;
  datetime: Date;
  customers: number;
  userId: string;
}
