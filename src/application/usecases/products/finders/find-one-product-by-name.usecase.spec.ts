import faker from "faker";
import { ProductInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { CreateProductUseCase } from "../create-product.usecase";
import { FindOneProductByNameUseCase } from "./find-one-product-by-name.usecase";

describe('FindOneProductByNameUseCase Test', () => {
  const repository = new ProductInMemoryRepository();
  let productPersisted: { id: string, brand: string, name: string, price: number, slug: string };
  beforeAll(async () => {
    const createProduct = new CreateProductUseCase(repository);
    await createProduct.execute({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    productPersisted = await createProduct.execute({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
  });
  it('should find one Product by name', async () => {
    const findOneProductByNameUseCase = new FindOneProductByNameUseCase(repository);
    const output = await findOneProductByNameUseCase.execute(productPersisted.name);
    expect(repository.products).toHaveLength(2);
    expect(output).toStrictEqual(productPersisted);
  });
})
