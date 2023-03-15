import { DataSource } from "typeorm";
import faker from 'faker';
import { Product, SaleProduct, Seller } from "~/domain/entities";
import { SaleProductSchema } from "./sale-product.schema";
import { SaleProductTypeOrmRepository } from "./sale-product-typeorm.repository";
import { ProductSchema, ProductTypeOrmRepository } from "../product";
import { SellerSchema, SellerTypeOrmRepository } from "../seller";

describe('SaleProductTypeOrmRepository Test', () => {
  it('should insert a new sale product', async () => {
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
    const saleProduct = SaleProduct.create({ seller, product});
    const repositorySeller = dataSource.getRepository(Seller);
    const repositoryProduct = dataSource.getRepository(Product);
    const repositorySaleProduct = dataSource.getRepository(SaleProduct);
    const sellerRepository = new SellerTypeOrmRepository(repositorySeller);
    const productRepository = new ProductTypeOrmRepository(repositoryProduct);
    const saleProductRepository = new SaleProductTypeOrmRepository(repositorySaleProduct);
    await sellerRepository.insert(seller);
    await productRepository.insert(product);
    await saleProductRepository.insert(saleProduct);
    const saleProductFound = await repositorySaleProduct.findOneBy({ id: saleProduct.id });
    expect(saleProductFound).toStrictEqual(saleProduct);
  });
})
