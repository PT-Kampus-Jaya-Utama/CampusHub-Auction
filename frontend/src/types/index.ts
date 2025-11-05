// User Types
export interface IUser {
  userName: string
  userPhoneNumber: string
  userGender: string
  userEmail: string
  userPassword: string
  userAadharNumber: string
  category: string[]
}

export interface UserDTO {
  username: string
  password: string
}

export interface JwtResponse {
  token: string
}

// Product Types
export interface ProductDetails {
  itemid: string
  description: string
  owner: string
}

export interface Product {
  id?: number
  productName: string
  details: ProductDetails[]
}

// Wishlist/Recommendation Product Types
export interface WishlistProduct {
  name: string
  owner: string
  des: string
}

// Rent Item Types
export interface RentItem {
  itemid?: number
  itemName: string
  itemCategory: string
  itemQuantity: number
  itemDescription: string
  itemDurationOfRent: number
  baseRent: number
}

// Bidding Item Types
export interface BidItem {
  itemId: number
  itemName: string
  itemDescription: string
  itemCategory: string
  itemQuality: string
  numberOfDaysForRent: number
  itemBaseRent: number
  minimumBiddingAmount: number
  timeLeft: number
  latestBid: number
  yourBid: number
  numberOfDaysNeeded: number
  userEmailId: string
  userName: string
  userPhoneNumber: number
  bidderEmailId: string
  biddername: string
  bidderPhoneNumber: number
}

// Auth Store Types
export interface AuthState {
  isAuthenticated: boolean
  username: string | null
  token: string | null
  login: (username: string, token: string) => void
  logout: () => void
  initialize: () => void
}
