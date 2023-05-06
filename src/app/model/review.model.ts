export enum ReviewsSortingMethod {
  DATE_DESC,
  DATE_ASC,
  RATING_DESC,
  RATING_ASC,
  DEFAULT = RATING_DESC
}

export type Rating = typeof Review.RATING_OPTIONS[number]

export class Review {
  [key: string]: string | Rating | Date | boolean | undefined
  static readonly MIN_DESCRIPTION_LENGTH = 15
  static readonly MAX_DESCRIPTION_LENGTH = 2000
  static readonly RATING_OPTIONS = [1, 2, 3, 4, 5]
  userId?: string
  description: string
  rating: Rating
  dateOfCreationOrLastUpdate?: Date
  wasUpdated?: boolean
}
