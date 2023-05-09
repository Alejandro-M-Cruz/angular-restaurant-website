export class JobApplication {
  static readonly MAX_FILE_SIZE_IN_BYTES = 10000000  // 10 MB
  static readonly ALLOWED_FILE_EXTENSIONS = ['.pdf']
  static readonly ALLOWED_FILE_TYPES = ['application/pdf']
  userId: string
  userEmail: string
  fileUrl: string
  creationTimestamp: Date
}
