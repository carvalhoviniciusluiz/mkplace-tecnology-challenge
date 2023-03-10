import faker from "faker";
import { ProductInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { CreateProductUseCase } from "../create-product.usecase";
import { FindOneProductByBrandUseCase } from "./find-one-product-by-brand.usecase";
import { FindOneProductByNameUseCase } from "./find-one-product-by-name.usecase";
import { FindOneProductBySlugUseCase } from "./find-one-product-by-slug.usecase";

describe('FindOneProductBySlugUseCase Test', () => {
  const repository = new ProductInMemoryRepository();
  let createProductUseCase: CreateProductUseCase;
  beforeAll(async () => {
    createProductUseCase = new CreateProductUseCase(
      new FindOneProductByBrandUseCase(repository),
      new FindOneProductByNameUseCase(repository),
      repository
    );
  });
  it('should find one Product by slug', async () => {
    await createProductUseCase.execute({
      name: 'product 1',
      brand: 'brand 1',
      price: parseFloat(faker.commerce.price())
    });
    const product2 = await createProductUseCase.execute({
      name: 'product 2',
      brand: 'brand 2',
      price: parseFloat(faker.commerce.price()),
      slug: 'slug-test'
    });
    const findOneProductBySlugUseCase = new FindOneProductBySlugUseCase(repository);
    const output = await findOneProductBySlugUseCase.execute(product2.slug);
    expect(repository.products).toHaveLength(2);
    expect(output).toStrictEqual(product2);
  });
})
