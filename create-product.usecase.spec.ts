import { CreateProductUseCase } from "./create-product.usecase";
import faker from "faker";

describe('CreateProductUseCase Test', () => {
  const productProps = {
    name: faker.name.findName(),
    brand: faker.commerce.productAdjective(),
    price: parseFloat(faker.commerce.price())
  }
  it('should create new Product', () => {
    const createProduct = new CreateProductUseCase();
    const output = createProduct.execute(productProps);
    expect(output).toStrictEqual({ ...productProps, id: output.id });
  });
})
