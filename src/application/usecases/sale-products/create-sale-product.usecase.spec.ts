import faker from "faker";
import { Product, Seller } from "../../../domain/entities";
import { SaleProductInMemoryRepository } from "../../../infra/database/repositories/in-memoy";
import { CreateSaleProductUseCase } from "./create-sale-product.usecase";

describe('CreateSaleProductUseCase Test', () => {
  const seller = Seller.create({
    code: faker.datatype.number(4),
    name: faker.name.findName()
  });
  const product = Product.create({
    name: faker.name.findName(),
    brand: faker.commerce.productAdjective(),
    price: parseFloat(faker.commerce.price())
  });
  it('should create new sale product', async () => {
    const repository = new SaleProductInMemoryRepository();
    const createSaleProduct = new CreateSaleProductUseCase(repository);
    const output = await createSaleProduct.execute({ seller, product });
    expect(repository.saleProducts).toHaveLength(1);
    expect(output).toStrictEqual({
      id: output.id,
      name: output.name,
      brand: output.brand,
      price: output.price,
      slug: output.slug,
      seller: {
        id: output.seller.id,
        name: output.seller.name,
        code: output.seller.code
      }
    });
  });
})
