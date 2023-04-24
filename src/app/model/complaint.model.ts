export class Complaint {
  static readonly MIN_LENGTH = 20
  static readonly MAX_LENGTH = 2000
  id?: string;
  creationTimestamp?: number;
  content: string;
}
