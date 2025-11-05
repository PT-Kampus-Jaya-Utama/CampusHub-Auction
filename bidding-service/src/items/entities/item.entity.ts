export class Item {
  // Item Details
  itemId: number
  itemName: string
  itemDescription: string
  itemCategory: string
  itemQuality: string
  numberOfDaysForRent: number
  itemBaseRent: number

  // Bidding Details
  minimumBiddingAmount: number
  timeLeft: number
  latestBid: number
  yourBid: number
  numberOfDaysNeeded: number

  // Rented User Details
  userEmailId: string
  userName: string
  userPhoneNumber: number

  // Bidding User Details
  bidderEmailId: string
  biddername: string
  bidderPhoneNumber: number

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial)
  }
}
