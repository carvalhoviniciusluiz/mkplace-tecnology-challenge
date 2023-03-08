import faker from "faker";
import { Product, SaleProduct, Seller } from "../../../../domain/entities";
import { SaleProductInMemoryRepository } from "./sale-product-in-memory.repository";

describe('SaleProductInMemoryRepository Test', () => {
  const seller = Seller.create({
    code: faker.datatype.number(4),
    name: faker.name.findName()
  });
  const product = Product.create({
    name: faker.name.findName(),
    brand: faker.commerce.productAdjective(),
    price: parseFloat(faker.commerce.price())
  });
  it('should insert a new sale product', async () => {
    const saleProduct = SaleProduct.create({ seller, product });
    const repository = new SaleProductInMemoryRepository();
    await repository.insert(saleProduct);
    expect(repository.saleProducts).toHaveLength(1);
    expect(repository.saleProducts).toStrictEqual([saleProduct]);
  });
});
