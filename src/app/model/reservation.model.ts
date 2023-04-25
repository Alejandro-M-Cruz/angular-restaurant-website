export class Reservation {
  static readonly MAX_ACTIVE_RESERVATIONS_PER_USER = 5
  static readonly USER_MAX_RES_IN_SAME_DAY = 2
  static readonly MIN_DAYS_BEFOREHAND = 2
  static readonly MAX_DAYS_BEFOREHAND = 30
  static readonly MAX_CUSTOMERS = 30
  static readonly RESERVATION_TIMES = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ]
  id?: string;
  date: number;
  time: string;
  customers: number;
  userId?: string;
  isCancelled?: boolean;
}
