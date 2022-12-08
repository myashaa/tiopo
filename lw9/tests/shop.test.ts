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

    checkServerResponse(getResponseBody, true);

    getResponseBody.forEach((product) => {
      checker.checkProduct(product);
    });

    assert(getResponseBody.length > 0, "Cписок товаров пуст");
  });

  it("Успешное создание товара", async () => {
    const createResponse = await productsController.createProduct(testData.validProductForCreate);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    checkServerResponse(createResponseBody, true);

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;
    let product = getResponseBody.find(item => item.id == createResponseBody.id);

    checker.checkProduct(product);
    //много параметров в lodash.omit, добавить товар для сравнения с большим кол-вом полей, чем у validProductForCreate
    product = lodash.omit(product, ["id"]);
    assert(lodash.isEqual(testData.validProductAfterCreate, product), "Изменяемый и измененный товар различны");
  });

  const tests = [
    { args: testData.invalidProductForCreate, expected: false },
    { args: testData.invalidCategoryIdInProductForCreate, expected: false },
    { args: testData.invalidStatusInProductForCreate, expected: false },
    { args: testData.invalidHitInProductForCreate, expected: false }
  ];

  //createProduct возвращает html-документ
  tests.forEach(({ args, expected }) => {
    it("Неуспешное создание товара с невалидными данными", async () => {
      let createResponse = await productsController.createProduct(args);
      let createResponseBody = createResponse.body;

      idOfCreatedProducts.push(createResponseBody.id);

      //при неуспешном запросе должен возвращаться статус 0
      checkServerResponse(createResponseBody, expected);

      let getResponse = await productsController.getAllProducts();
      let getResponseBody = getResponse.body;
      let product = getResponseBody.find(item => item.id == createResponseBody.id);

      assert(!product, "Невалидный товар обнаружен в списке всех товаров");
    });
  });

  //createProduct возвращает html-документ
  it("Неуспешное создание товара с пустыми данными", async () => {
    const createResponse = await productsController.createProduct(testData.emptyProduct);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(createResponseBody, false);

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;
    const product = getResponseBody.find(item => item.id == createResponseBody.id);

    assert(!product, "Пустой товар обнаружен в списке всех товаров");
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

    checkServerResponse(editResponseBody, true);

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    let newProduct = getResponseBody.find(item => item.id == createResponseBody.id);

    checker.checkProduct(newProduct);
    //alias отличаются, т.к у product - 'заголовок', а у newProduct - 'заголовок-id'
    product = lodash.omit(product, ["alias"]);
    newProduct = lodash.omit(newProduct, ["alias"]);
    assert(lodash.isEqual(product, newProduct), "Изменяемый и измененный товар различны");
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

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(editResponseBody, false);

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    let newProduct = getResponseBody.find(item => item.id == createResponseBody.id);

    product = lodash.pick(product, ["title", "status"]);
    newProduct = lodash.pick(newProduct, ["title", "status"]);
    assert(!lodash.isEqual(product, newProduct), "Изменяемый и измененный товар одинаковы");
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

    //при неуспешном запросе должен возвращаться статус 0
    checkServerResponse(editResponseBody, false);

    getResponse = await productsController.getAllProducts();
    getResponseBody = getResponse.body;
    let newProduct = getResponseBody.find(item => item.id == createResponseBody.id);

    //alias отличаются, т.к у product - 'заголовок', а у newProduct - 'заголовок-id'
    product = lodash.omit(product, ["alias"]);
    newProduct = lodash.omit(newProduct, ["alias"]);
    assert(lodash.isEqual(product, newProduct), "Изменяемый и измененный товар различны");
  });

  it("Неуспешное редактирование несуществующего товара", async () => {
    const editResponse = await productsController.editProduct(testData.nonexistentProduct);
    const editResponseBody = editResponse.body;

    checkServerResponse(editResponseBody, false);

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;
    let product = getResponseBody.find(item => item.id == testData.nonexistentProduct.id);

    assert(!product, "Невалидный товар обнаружен в списке всех товаров");
  });

  it("Успешное удаление товара", async () => {
    const createResponse = await productsController.createProduct(testData.validProductForCreate);
    const createResponseBody = createResponse.body;

    idOfCreatedProducts.push(createResponseBody.id);

    const deleteResponse = await productsController.deleteProductById(createResponseBody.id);
    const deleteResponseBody = deleteResponse.body;

    checkServerResponse(deleteResponseBody, true);

    const getResponse = await productsController.getAllProducts();
    const getResponseBody = getResponse.body;
    const product = getResponseBody.find(item => item.id == createResponseBody.id);

    assert(!product, "Удалённый товар присутствует в списке товаров");
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

    assert(firstProduct.alias == "name",
      "Значение поля alias не соответствует формату 'заголовок'");

    assert(secondProduct.alias == "name-0",
      "Значение поля alias не соответствует формату 'заголовок-0'");

    assert(thirdProduct.alias == "name-0-0",
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

    assert(firstProduct.alias == "update-name",
      "Значение поля alias не соответствует формату 'заголовок'");

    assert(secondProduct.alias == "update-name-" + secondProduct.id,
      "Значение поля alias не соответствует формату 'заголовок-id'");

    assert(thirdProduct.alias == "update-name-" + thirdProduct.id,
      "Значение поля alias не соответствует формату 'заголовок-id'");
  });
});