import faker from "faker";
import { ProductInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { CreateProductUseCase } from "../create-product.usecase";
import { FindOneProductBySlugUseCase } from "./find-one-product-by-slug.usecase";

describe('FindOneProductBySlugUseCase Test', () => {
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
      price: parseFloat(faker.commerce.price()),
      slug: 'slug-test'
    });
  });
  it('should find one Product by slug', async () => {
    const findOneProductBySlugUseCase = new FindOneProductBySlugUseCase(repository);
    const output = await findOneProductBySlugUseCase.execute(productPersisted.slug);
    expect(repository.products).toHaveLength(2);
    expect(output).toStrictEqual(productPersisted);
  });
})
