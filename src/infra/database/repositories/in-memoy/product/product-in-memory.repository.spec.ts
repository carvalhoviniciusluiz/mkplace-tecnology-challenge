import faker from "faker";
import { Product } from "../../../../../domain/entities";
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
    expect(repository.products).toStrictEqual([product.toJSON()]);
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
    const repository = new ProductInMemoryRepository();
    const productsFiltered = await repository.findAll({});
    expect(productsFiltered).toHaveLength(0);
  });
  it('should return all', async () => {
    const product = Product.create(productProps);
    const repository = new ProductInMemoryRepository();
    await repository.insert(product);
    await repository.insert(product);
    const productsFiltered1 = await repository.findAll({});
    expect(productsFiltered1).toHaveLength(2);
    const productsFiltered2 = await repository.findAll();
    expect(productsFiltered2).toHaveLength(2);
  });
  it('should return one product by slug', async () => {
    const product1 = Product.create(productProps);
    const product2 = Product.create({
      ...productProps,
      slug: 'slug-test'
    });
    const repository = new ProductInMemoryRepository();
    await repository.insert(product1);
    await repository.insert(product2);
    const productFound = await repository.findOneBySlug(product2.slug);
    expect(repository.products).toHaveLength(2);
    expect(productFound).toStrictEqual(product2.toJSON());
  });
});
