import faker from "faker";
import { ProductInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { CreateProductUseCase } from "../create-product.usecase";
import { FindOneProductByBrandUseCase } from "./find-one-product-by-brand.usecase";
import { FindOneProductByNameUseCase } from "./find-one-product-by-name.usecase";

describe('FindOneProductByBrandUseCase Test', () => {
  const repository = new ProductInMemoryRepository();
  let createProductUseCase: CreateProductUseCase;
  beforeAll(async () => {
    createProductUseCase = new CreateProductUseCase(
      new FindOneProductByBrandUseCase(repository),
      new FindOneProductByNameUseCase(repository),
      repository
    );
  });
  it('should find one Product by brand', async () => {
    await createProductUseCase.execute({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    const product = await createProductUseCase.execute({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    const findOneProductByBrandUseCase = new FindOneProductByBrandUseCase(repository);
    const output = await findOneProductByBrandUseCase.execute(product.brand);
    expect(repository.products).toHaveLength(2);
    expect(output).toStrictEqual(product);
  });
})
