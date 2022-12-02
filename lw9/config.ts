export class Urls {
  public static readonly BASE_URL: string = "http://shop.qatl.ru";
  //api не стоит выносить в отдельную константу
  public static readonly GET_PRODUCTS_URL: string = "/api/products";
  public static readonly ADD_PRODUCT_URL: string = "/api/addproduct";
  public static readonly EDIT_PRODUCT_URL: string = "/api/editproduct";
  public static readonly DELETE_PRODUCT_URL: string = "/api/deleteproduct";
}