import faker from "faker";
import { Product } from "../../../../domain/entities";
import { ProductInMemoryRepository } from "./product-in-memory.repository";

describe('ProductInMemoryRepository Test', () => {
  const productProps = {
    name: faker.name.findName(),
    brand: faker.commerce.productAdjective(),
    price: parseFloat(faker.commerce.price())
  }
  it('should insert a new product', async () => {
    const product = Product.create(productProps);
    const repository = new ProductInMemoryRepository();
    await repository.insert(product);
    expect(repository.products).toHaveLength(1);
    expect(repository.products).toStrictEqual([product]);
  });
  it('should filter product by brand', async () => {
    const product = Product.create(productProps);
    const repository = new ProductInMemoryRepository();
    await repository.insert(product);
    const productsFiltered = await repository.findAll({
      brand: product.brand
    });
    expect(productsFiltered).toHaveLength(1);
  });
  it('should filter product by name', async () => {
    const product = Product.create(productProps);
    const repository = new ProductInMemoryRepository();
    await repository.insert(product);
    const productsFiltered = await repository.findAll({
      name: product.name
    });
    expect(productsFiltered).toHaveLength(1);
  });
  it('should filter product by price', async () => {
    const product = Product.create({
      ...productProps,
      price: 9.5
    });
    const repository = new ProductInMemoryRepository();
    await repository.insert(product);
    const productsFiltered = await repository.findAll({
      priceRange: {
        minValue: 9,
        maxValue: 10
      }
    });
    expect(productsFiltered).toHaveLength(1);
  });
  it('should return empty list', async () => {
    const product = Product.create(productProps);
    const repository = new ProductInMemoryRepository();
    await repository.insert(product);
    const productsFiltered = await repository.findAll({});
    expect(productsFiltered).toHaveLength(0);
  });
});
