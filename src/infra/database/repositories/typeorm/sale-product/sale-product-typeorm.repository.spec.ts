import { DataSource } from "typeorm";
import faker from 'faker';
import { Product, SaleProduct, Seller } from "~/domain/entities";
import { SaleProductSchema } from "./sale-product.schema";
import { SaleProductTypeOrmRepository } from "./sale-product-typeorm.repository";

describe('SaleProductTypeOrmRepository Test', () => {
  let seller: Seller;
  let product: Product;
  beforeAll(() => {
    seller = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    product = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
  });
  it('should insert a new sale product', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [SaleProductSchema]
    });
    await dataSource.initialize();
    const repository = dataSource.getRepository(SaleProduct);
    const saleProductRepository = new SaleProductTypeOrmRepository(repository);
    const saleProduct = SaleProduct.create({ seller, product});
    await saleProductRepository.insert({
      id: saleProduct.id,
      product: saleProduct.product.id,
      seller: saleProduct.seller.id,
    });
    const saleProductFound = await repository.findOneBy({ id: saleProduct.id });
    expect(saleProductFound.toJSON()).toStrictEqual(saleProduct.toJSON());
  })
})
