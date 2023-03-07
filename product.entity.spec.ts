import { Product } from "./product.entity";
import faker from "faker";

describe('Product Entity', () => {
  const productProps = {
    name: faker.commerce.product(),
    brand: faker.commerce.productAdjective(),
    price: parseFloat(faker.commerce.price())
  }
  test('create new product', () => {
    const product = Product.create(productProps);
    expect(product.toJSON()).toStrictEqual({
      id: product.id,
      ...productProps,
    });
  });
  test('updateName method', () => {
    const newName = faker.name.findName();
    const product = Product.create(productProps);
    product.updateName(newName);
    expect(product.name).toBe(newName);
  });
  test('updateBrand method', () => {
    const newBrand = faker.commerce.productAdjective();
    const product = Product.create(productProps);
    product.updateBrand(newBrand);
    expect(product.brand).toBe(newBrand);
  });
  test('updatePrice method', () => {
    const newPrice = parseFloat(faker.commerce.price());
    const product = Product.create(productProps);
    product.updatePrice(newPrice);
    expect(product.price).toBe(newPrice);
  });
  test('slug attribute', () => {
    const newBrand = '/.,~!@#$%&12345';
    const newName = 'ÁÉÍ ÓÚáéíóúâê îôûàèìòùÇç';
    const product = Product.create(productProps);
    product.updateBrand(newBrand);
    product.updateName(newName);
    expect(product.slug).toBe('12345_aei-ouaeiouae-iouaeioucc');
  });
  test('updateSlug method', () => {
    const product = Product.create(productProps);
    product.updateSlug('-éîs, -éü, -óã-');
    expect(product.slug).toBe('eis-eu-oa');
  });
});
