import { strict as assert } from 'assert';
import { isNull, isNumber, isString } from 'lodash';

export class Checker {
  //добавить проверку поля на тип данных и диапазон
  checkProduct(product) {
    this.checkId(product);
    this.checkCategoryId(product);
    this.checkTitle(product);
    this.checkAlias(product);
    this.checkContent(product);
    this.checkPrice(product);
    this.checkOldPrice(product);
    this.checkStatus(product);
    this.checkKeywords(product);
    this.checkDescription(product);
    this.checkImg(product);
    this.checkHit(product);
    this.checkCat(product);
  }

  checkId(product) {
    assert("id" in product, "Не удалось найти поле id в продукте");
    assert(isNumber(Number(product.id)), "Значение поля id имеет некорректный тип данных");
  }

  checkCategoryId(product) {
    assert("category_id" in product, "Не удалось найти поле category_id в продукте");
    assert(isNumber(Number(product.category_id)), "Значение поля category_id имеет некорректный тип данных");
    assert(((1 <= product.category_id) && (product.category_id <= 15)),
      "Значение поля category_id не лежит в заданном диапазоне");
  }

  checkTitle(product) {
    assert("title" in product, "Не удалось найти поле title в продукте");
    assert(isString(product.title) || isNull(product.title),
      "Значение поля title имеет некорректный тип данных");
  }

  checkAlias(product) {
    assert("alias" in product, "Не удалось найти поле alias в продукте");
    assert(isString(product.alias), "Значение поля alias имеет некорректный тип данных");
  }

  checkContent(product) {
    assert("content" in product, "Не удалось найти поле content в продукте");
    assert(isString(product.content) || isNull(product.content),
      "Значение поля content имеет некорректный тип данных");
  }

  checkPrice(product) {
    assert("price" in product, "Не удалось найти поле price в продукте");
    assert(isNumber(Number(product.price)), "Значение поля price имеет некорректный тип данных");
  }

  checkOldPrice(product) {
    assert("old_price" in product, "Не удалось найти поле old_price в продукте");
    assert(isNumber(Number(product.old_price)), "Значение поля old_price имеет некорректный тип данных");
  }

  checkStatus(product) {
    assert("status" in product, "Не удалось найти поле status в продукте");
    assert(isNumber(Number(product.status)), "Значение поля status имеет некорректный тип данных");
    assert(((0 <= product.status) && (product.status <= 1)),
      "Значение поля status не лежит в заданном диапазоне");
  }

  checkKeywords(product) {
    assert("keywords" in product, "Не удалось найти поле keywords в продукте");
    assert(isString(product.keywords) || isNull(product.keywords),
      "Значение поля keywords имеет некорректный тип данных");
  }

  checkDescription(product) {
    assert("description" in product, "Не удалось найти поле description в продукте");
    assert(isString(product.description) || isNull(product.description),
      "Значение поля description имеет некорректный тип данных");
  }

  checkImg(product) {
    assert("img" in product, "Не удалось найти поле img в продукте");
    assert(isString(product.img), "Значение поля img имеет некорректный тип данных");
  }

  checkHit(product) {
    assert("hit" in product, "Не удалось найти поле hit в продукте");
    assert(isNumber(Number(product.hit)), "Значение поля hit имеет некорректный тип данных");
    assert(((0 <= product.hit) && (product.hit <= 1)),
      "Значение поля hit не лежит в заданном диапазоне");
  }

  checkCat(product) {
    assert("cat" in product, "Не удалось найти поле cat в продукте");
    assert(isString(product.cat), "Значение поля cat имеет некорректный тип данных");
  }
}