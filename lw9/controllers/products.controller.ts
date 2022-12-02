import got from "got";
import { URLSearchParams } from "url";
import { Urls } from "../config";

export class ProductsController {
  async getAllProducts(): Promise<any> {
    const response = await got.get(Urls.BASE_URL + Urls.GET_PRODUCTS_URL);
    try {
      response.body = JSON.parse(response.body);
    } catch { }
    return response;
  }

  async createProduct(data): Promise<any> {
    const response = await got.post(Urls.BASE_URL + Urls.ADD_PRODUCT_URL, {
      json: data
    });
    try {
      response.body = JSON.parse(response.body);
    } catch { }
    return response;
  }

  async editProduct(data): Promise<any> {
    const response = await got.post(Urls.BASE_URL + Urls.EDIT_PRODUCT_URL, {
      json: data
    });
    try {
      response.body = JSON.parse(response.body);
    } catch { }
    return response;
  }

  async deleteProductById(id: string): Promise<any> {
    const response = await got.get(Urls.BASE_URL + Urls.DELETE_PRODUCT_URL, {
      searchParams: new URLSearchParams({ id: id})
    });
    try {
      response.body = JSON.parse(response.body);
    } catch { }
    return response;
  }
}