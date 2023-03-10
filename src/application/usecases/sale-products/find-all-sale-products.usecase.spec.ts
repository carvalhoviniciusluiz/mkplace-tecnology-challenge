import faker from "faker";
import { Product, SaleProduct, Seller } from "~/domain/entities";
import { SaleProductInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { FindAllSaleProductsUseCase } from "./find-all-sale-products.usecase";

describe('FindAllSaleProductsUseCase Test', () => {
  let saleProduct: SaleProduct;
  beforeAll(async () => {
    const seller = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    const product = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    saleProduct = SaleProduct.create({ seller, product });
  });
  it('should return one sale product by seller code', async () => {
    const repository = new SaleProductInMemoryRepository();
    repository.insert(saleProduct);
    const createSaleProduct = new FindAllSaleProductsUseCase(repository);
    const saleProducts = await createSaleProduct.execute({
      seller: {
        code: saleProduct.seller.code
      }
    });
    expect(saleProducts).toHaveLength(1);
    expect(saleProducts[0]).toStrictEqual({
      id: saleProduct.id,
      product: {
        id: saleProduct.product.id,
        brand: saleProduct.product.brand,
        name: saleProduct.product.name,
        price: saleProduct.product.price,
        slug: saleProduct.product.slug
      },
      seller: {
        id: saleProduct.seller.id,
        name: saleProduct.seller.name,
        code: saleProduct.seller.code
      }
    });
  });
})
