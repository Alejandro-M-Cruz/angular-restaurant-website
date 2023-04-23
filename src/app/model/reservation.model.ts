export interface Reservation {
  id?: string;
  date: number;
  time: string;
  customers: number;
  userId?: string;
  isCancelled?: boolean;
}
