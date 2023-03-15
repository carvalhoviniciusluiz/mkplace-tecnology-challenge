import { DataSource } from "typeorm";
import faker from 'faker';
import { SaleProductSchema } from "./sale-product.schema";
import { Product, SaleProduct, Seller } from "~/domain/entities";
import { SellerSchema } from "../seller";
import { ProductSchema } from "../product";

describe('SaleProductSchema Test', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [SellerSchema, ProductSchema, SaleProductSchema]
    });
    await dataSource.initialize();
    const seller = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    const product = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    const saleProduct = SaleProduct.create({ seller, product });
    const repositorySeller = dataSource.getRepository(Seller);
    const repositoryProduct = dataSource.getRepository(Product);
    const repositorySaleProduct = dataSource.getRepository(SaleProduct);
    await repositorySeller.save(seller);
    await repositoryProduct.save(product);
    await repositorySaleProduct.save(saleProduct);
    const saleProductFound = await repositorySaleProduct.findOneBy({ id: saleProduct.id });
    expect(saleProduct).toStrictEqual(saleProductFound);
  })
})
