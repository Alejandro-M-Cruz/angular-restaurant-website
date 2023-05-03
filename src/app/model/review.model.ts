export enum ReviewsSortingMethod {
  DATE_DESC,
  DATE_ASC,
  RATING_DESC,
  RATING_ASC,
  DEFAULT = DATE_DESC
}

export interface Review {
  id?: string
  description: string
  rating: 1 | 2 | 3 | 4 | 5
  dateOfCreationOrLastUpdate?: Date
  wasUpdated?: boolean
  userId?: string
}
