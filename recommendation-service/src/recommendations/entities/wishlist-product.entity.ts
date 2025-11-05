export class WishlistProduct {
  id?: number
  name: string
  owner: string
  des: string

  constructor(partial: Partial<WishlistProduct>) {
    Object.assign(this, partial)
  }
}

export class User {
  id?: number
  name: string
  emailid: string
  category: string[]
}

export class Product {
  id?: number
  name: string
  owner: string
  des: string
}

export class Category {
  name: string
  products: Product[]
}
