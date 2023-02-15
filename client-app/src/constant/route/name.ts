export enum UserRoute {
  HOME = "/",
  USER_PROFILE = "/profile",
  USER_CART = "/cart",
  USER_ORDER = "/order/:id",
  USER_PRODUCT = "/product/:id",
  USER_HISTORY = "/history",
}

export enum SellerRoute {
  SELLER_DASHBOARD = "/dashboard",
  SELLER_PRODUCT = "seller/product",
  SELLER_CATEGORY = "seller/category",
  SELLER_ORDER = "/seller/order",
}

export enum AdminRoute {
  ADMIN = "/admin",
}
