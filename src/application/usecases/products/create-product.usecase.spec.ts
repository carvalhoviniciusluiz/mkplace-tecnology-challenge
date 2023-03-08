import { CreateProductUseCase } from "./create-product.usecase";
import faker from "faker";
import { ProductInMemoryRepository } from "../../../infra/database/repositories/in-memoy";

describe('CreateProductUseCase Test', () => {
  const productProps = {
    name: faker.name.findName(),
    brand: faker.commerce.productAdjective(),
    price: parseFloat(faker.commerce.price())
  }
  it('should create new Product', async () => {
    const repository = new ProductInMemoryRepository();
    const createProduct = new CreateProductUseCase(repository);
    const output = await createProduct.execute(productProps);
    expect(repository.products).toHaveLength(1);
    expect(output).toStrictEqual({ ...productProps, id: output.id });
  });
})
