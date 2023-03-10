import faker from "faker";
import { ProductInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { CreateProductUseCase } from "../create-product.usecase";
import { FindAllProductsUseCase } from "./find-all-products.usecase";
import { FindOneProductByBrandUseCase } from "./find-one-product-by-brand.usecase";
import { FindOneProductByNameUseCase } from "./find-one-product-by-name.usecase";

describe('FindAllProductsUseCase Test', () => {
  const productProps = {
    name: faker.name.findName(),
    brand: faker.commerce.productAdjective(),
    price: 9.7
  }
  it('should return on product by price', async () => {
    const repository = new ProductInMemoryRepository();
    const createProductUseCase = new CreateProductUseCase(
      new FindOneProductByBrandUseCase(repository),
      new FindOneProductByNameUseCase(repository),
      repository
    );
    const output = await createProductUseCase.execute(productProps);
    const findAllProducts = new FindAllProductsUseCase(repository);
    expect(repository.products).toHaveLength(1);
    const filtered = await findAllProducts.execute({
      priceRange: {
        minValue: 7,
        maxValue: 11
      }
    });
    expect(filtered).toHaveLength(1);
    expect(output).toStrictEqual({ ...productProps, id: output.id });
  });
})
