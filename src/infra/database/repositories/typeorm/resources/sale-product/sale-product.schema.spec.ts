import { DataSource } from "typeorm";
import faker from 'faker';
import { SaleProductSchema } from "./sale-product.schema";
import { Product, SaleProduct, Seller } from "~/domain/entities";

describe('SaleProductSchema Test', () => {
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
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [SaleProductSchema]
    });
    await dataSource.initialize();
    const saleProduct = SaleProduct.create({ seller, product });
    const repository = dataSource.getRepository(SaleProduct);
    await repository.save(saleProduct.toJSON() as any);
    const saleProductFound = await repository.findOneBy({ id: saleProduct.id });
    expect(saleProduct.toJSON()).toStrictEqual(saleProductFound.toJSON());
  })
})
