import faker from "faker";
import { ProductInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { CreateProductUseCase } from "../create-product.usecase";
import { FindOneProductByBrandUseCase } from "./find-one-product-by-brand.usecase";
import { FindOneProductByNameUseCase } from "./find-one-product-by-name.usecase";

describe('FindOneProductByBrandUseCase Test', () => {
  const repository = new ProductInMemoryRepository();
  let productPersisted: { id: string, brand: string, name: string, price: number, slug: string };
  beforeAll(async () => {
    const createProductUseCase = new CreateProductUseCase(
      new FindOneProductByBrandUseCase(repository),
      new FindOneProductByNameUseCase(repository),
      repository
    );
    await createProductUseCase.execute({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    productPersisted = await createProductUseCase.execute({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
  });
  it('should find one Product by brand', async () => {
    const findOneProductByBrandUseCase = new FindOneProductByBrandUseCase(repository);
    const output = await findOneProductByBrandUseCase.execute(productPersisted.brand);
    expect(repository.products).toHaveLength(2);
    expect(output).toStrictEqual(productPersisted);
  });
})
