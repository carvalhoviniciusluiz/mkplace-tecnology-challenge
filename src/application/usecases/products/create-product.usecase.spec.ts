import { CreateProductUseCase } from "./create-product.usecase";
import faker from "faker";
import { ProductInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { FindOneProductByBrandUseCase, FindOneProductByNameUseCase } from "./finders";

describe('CreateProductUseCase Test', () => {
  const productProps = {
    name: faker.name.findName(),
    brand: faker.commerce.productAdjective(),
    price: parseFloat(faker.commerce.price())
  }
  it('should create new Product', async () => {
    const repository = new ProductInMemoryRepository();
    const createProductUseCase = new CreateProductUseCase(
      new FindOneProductByBrandUseCase(repository),
      new FindOneProductByNameUseCase(repository),
      repository
    );
    const output = await createProductUseCase.execute(productProps);
    expect(repository.products).toHaveLength(1);
    expect(output).toStrictEqual({ ...productProps, id: output.id });
  });
})
