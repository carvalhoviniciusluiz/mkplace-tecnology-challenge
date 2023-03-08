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
});
