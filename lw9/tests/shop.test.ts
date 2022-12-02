import { strict as assert } from 'assert';
import * as lodash from 'lodash';
import testData from "./test-cases";

import { ProductsController } from "../controllers/products.controller";
import { Checker } from "../checker";

function checkServerResponse(responseBody, isCorrect) {
  assert(!responseBody.HTTPError, "Ошибка сервера");

  if (isCorrect) {
    assert(responseBody.status != 0, "Статус ответа сервера - 'неудача'");
  } else {
    assert(responseBody.status == 0, "Статус ответа сервера - 'успех'");
  }
}

describe("Магазин", function () {
  let productsController = new ProductsController();
  let checker = new Checker();

  let idOfCreatedProducts: any[] = [];

  afterEach(() => {
    if (idOfCreatedProducts.length > 0) {
      idOfCreatedProducts.forEach(async function (id) {
        await productsController.deleteProductById(id);
      });
      idOfCreatedProducts = [];
    }
  });

  //JSON.parse вынести в controller
  //вынести проверку на статус и ошибку сервера

  it("Успешное получение всех товаров", async () => {
    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;

    getResponseBody.forEach((product) => {
      checker.checkProduct(product);
    });

    assert(getResponseBody.length > 0, "Cписок товаров пуст");
    checkServerResponse(getResponseBody, true);
  });
   
  it("Успешное создание товара", async () => {
    const createResponse = await productsController.createProduct(testData.validProductForCreate);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;
    let product = getResponseBody.find(item => item.id == createResponseBody.id);

    checker.checkProduct(product);
    //много параметров в lodash.omit, добавить товар для сравнения с большим кол-вом полей, чем у validProductForCreate
    product = lodash.omit(product, ["id"]);
    assert(lodash.isEqual(testData.validProductAfterCreate, product), "Изменяемый и измененный товар различны");

    checkServerResponse(createResponseBody, true);
  });
 
  //createProduct возвращает html-документ
  it("Неуспешное создание товара с невалидными данными", async () => {
    //все поля невалидные
    let createResponse = await productsController.createProduct(testData.invalidProductForCreate);
    let createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    let getResponse = await productsController.getAllProducts();
    let getResponseBody = getResponse.body;
    let product = getResponseBody.find(item => item.id == createResponseBody.id);

    assert(!product, "Невалидный товар обнаружен в списке всех товаров");

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(createResponseBody, false);


    //значение поля category_id не лежит в заданном диапазоне
    createResponse = await productsController.createProduct(testData.invalidCategoryIdInProductForCreate);
    createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    product = getResponseBody.find(item => item.id == createResponseBody.id);

    assert(!product, "Невалидный товар обнаружен в списке всех товаров");

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(createResponseBody, false);


    //значение поля status не лежит в заданном диапазоне
    createResponse = await productsController.createProduct(testData.invalidStatusInProductForCreate);
    createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    product = getResponseBody.find(item => item.id == createResponseBody.id);

    assert(!product, "Невалидный товар обнаружен в списке всех товаров");

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(createResponseBody, false);


    //значение поля hit не лежит в заданном диапазоне
    createResponse = await productsController.createProduct(testData.invalidHitInProductForCreate);
    createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    product = getResponseBody.find(item => item.id == createResponseBody.id);

    assert(!product, "Невалидный товар обнаружен в списке всех товаров");

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(createResponseBody, false);
  });

  //createProduct возвращает html-документ
  it("Неуспешное создание товара с пустыми данными", async () => {
    const createResponse = await productsController.createProduct(testData.emptyProduct);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;
    const product = getResponseBody.find(item => item.id == createResponseBody.id);

    assert(!product, "Пустой товар обнаружен в списке всех товаров");

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(createResponseBody, false);
  });

  it("Успешное редактирование товара", async () => {
    const createResponse = await productsController.createProduct(testData.validProductForCreate);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    let getResponse = await productsController.getAllProducts();
    let getResponseBody = getResponse.body;
    let product = getResponseBody.find(item => item.id == createResponseBody.id);

    product = { ...product, ...testData.validProductForEdit };

    const editResponse = await productsController.editProduct(product);
    const editResponseBody = editResponse.body;

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    let newProduct = getResponseBody.find(item => item.id == createResponseBody.id);

    checker.checkProduct(newProduct);
    //alias отличаются, т.к у product - 'заголовок', а у newProduct - 'заголовок-id'
    product = lodash.omit(product, ["alias"]);
    newProduct = lodash.omit(newProduct, ["alias"]);
    assert(lodash.isEqual(product, newProduct), "Изменяемый и измененный товар различны");

    checkServerResponse(editResponseBody, true);
  });
  
  //editProduct возвращает html-документ
  it("Неуспешное редактирование товара невалидными данными", async () => {
    const createResponse = await productsController.createProduct(testData.validProductForCreate);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    let getResponse = await productsController.getAllProducts();
    let getResponseBody = getResponse.body;
    let product = getResponseBody.find(item => item.id == createResponseBody.id);

    product = { ...product, ...testData.invalidProductForEdit };

    const editResponse = await productsController.editProduct(product);
    const editResponseBody = editResponse.body;

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    let newProduct = getResponseBody.find(item => item.id == createResponseBody.id);

    product = lodash.pick(product, ["title", "status"]);
    newProduct = lodash.pick(newProduct, ["title", "status"]);
    assert(!lodash.isEqual(product, newProduct), "Изменяемый и измененный товар одинаковы");

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(editResponseBody, false);
  });
  
  //editProduct возвращает html-документ
  it("Неуспешное редактирование товара пустыми данными", async () => {
    const createResponse = await productsController.createProduct(testData.validProductForCreate);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    let getResponse = await productsController.getAllProducts();
    let getResponseBody = getResponse.body;
    let product = getResponseBody.find(item => item.id == createResponseBody.id);

    product = { ...product, ...testData.emptyProduct };

    const editResponse = await productsController.editProduct(product);
    const editResponseBody = editResponse.body;

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    let newProduct = getResponseBody.find(item => item.id == createResponseBody.id);

    //alias отличаются, т.к у product - 'заголовок', а у newProduct - 'заголовок-id'
    product = lodash.omit(product, ["alias"]);
    newProduct = lodash.omit(newProduct, ["alias"]);
    assert(lodash.isEqual(product, newProduct), "Изменяемый и измененный товар различны");

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(editResponseBody, false);
  });

  it("Неуспешное редактирование несуществующего товара", async () => {
    const editResponse = await productsController.editProduct(testData.nonexistentProduct);
    const editResponseBody = editResponse.body;

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;
    let product = getResponseBody.find(item => item.id == testData.nonexistentProduct.id);

    assert(!product, "Невалидный товар обнаружен в списке всех товаров");

    checkServerResponse(editResponseBody, false);
  });

  it("Успешное удаление товара", async () => {
    const createResponse = await productsController.createProduct(testData.validProductForCreate);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    const deleteResponse = await productsController.deleteProductById(createResponseBody.id);
    const deleteResponseBody = deleteResponse.body;

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;
    const product = getResponseBody.find(item => item.id == createResponseBody.id);

    assert(!product, "Удалённый товар присутствует в списке товаров");

    checkServerResponse(deleteResponseBody, true);
  });

  it("Неуспешное удаление несуществующего товара", async () => {
    const deleteResponse = await productsController.deleteProductById(testData.nonexistentProduct.id);
    const deleteResponseBody = deleteResponse.body;

    checkServerResponse(deleteResponseBody, false);
  });

  it('Генерация поля alias у создаваемых товаров', async () => {
    const firstCreateResponse = await productsController.createProduct(testData.validProductForCreate);
    const firstCreateResponseBody = firstCreateResponse.body;
    const secondCreateResponse = await productsController.createProduct(testData.validProductForCreate);
    const secondCreateResponseBody = secondCreateResponse.body;
    const thirdCreateResponse = await productsController.createProduct(testData.validProductForCreate);
    const thirdCreateResponseBody = thirdCreateResponse.body;

    idOfCreatedProducts.push(firstCreateResponseBody.id);
    idOfCreatedProducts.push(secondCreateResponseBody.id);
    idOfCreatedProducts.push(thirdCreateResponseBody.id);

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;

    const firstProduct = getResponseBody.find(item => item.id == firstCreateResponseBody.id);
    const secondProduct = getResponseBody.find(item => item.id == secondCreateResponseBody.id);
    const thirdProduct = getResponseBody.find(item => item.id == thirdCreateResponseBody.id);

    assert(firstProduct.alias == "new-watch",
      "Значение поля alias не соответствует формату 'заголовок'");

    assert(secondProduct.alias == "new-watch-0",
      "Значение поля alias не соответствует формату 'заголовок-0'");

    assert(thirdProduct.alias == "new-watch-0-0",
      "Значение поля alias не соответствует формату 'заголовок-0-0'");
  });

  it('Генерация поля alias у редактируемых товаров', async () => {
    const firstCreateResponse = await productsController.createProduct(testData.validProductForCreate);
    const firstCreateResponseBody = firstCreateResponse.body;
    const secondCreateResponse = await productsController.createProduct(testData.validProductForCreate);
    const secondCreateResponseBody = secondCreateResponse.body;
    const thirdCreateResponse = await productsController.createProduct(testData.validProductForCreate);
    const thirdCreateResponseBody = thirdCreateResponse.body;

    idOfCreatedProducts.push(firstCreateResponseBody.id);
    idOfCreatedProducts.push(secondCreateResponseBody.id);
    idOfCreatedProducts.push(thirdCreateResponseBody.id);

    let getResponse = await productsController.getAllProducts();
    let getResponseBody = getResponse.body;

    let firstProduct = getResponseBody.find(item => item.id == firstCreateResponseBody.id);
    await productsController.editProduct({ ...firstProduct, ...testData.validProductForEdit });
    let secondProduct = getResponseBody.find(item => item.id == secondCreateResponseBody.id);
    await productsController.editProduct({ ...secondProduct, ...testData.validProductForEdit });
    let thirdProduct = getResponseBody.find(item => item.id == thirdCreateResponseBody.id);
    await productsController.editProduct({ ...thirdProduct, ...testData.validProductForEdit });

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;

    firstProduct = getResponseBody.find(item => item.id == firstCreateResponseBody.id);
    secondProduct = getResponseBody.find(item => item.id == secondCreateResponseBody.id);
    thirdProduct = getResponseBody.find(item => item.id == thirdCreateResponseBody.id);

    assert(firstProduct.alias == "new-new-watch",
      "Значение поля alias не соответствует формату 'заголовок'");

    assert(secondProduct.alias == "new-new-watch-" + secondProduct.id,
      "Значение поля alias не соответствует формату 'заголовок-id'");

    assert(thirdProduct.alias == "new-new-watch-" + thirdProduct.id,
      "Значение поля alias не соответствует формату 'заголовок-id'");
  });
});