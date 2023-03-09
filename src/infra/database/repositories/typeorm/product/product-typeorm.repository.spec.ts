import { DataSource } from "typeorm";
import faker from 'faker';
import { ProductSchema } from "./product.schema";
import { Product } from "~/domain/entities";
import { ProductTypeOrmRepository } from "./product-typeorm.repository";

describe('ProductTypeOrmRepository Test', () => {
  it('should insert a new product', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [ProductSchema]
    });
    await dataSource.initialize();
    const repository = dataSource.getRepository(Product);
    const productRepository = new ProductTypeOrmRepository(repository);
    const productProps = {
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    }
    const product = Product.create(productProps);
    await productRepository.insert(product);
    const productFound = await repository.findOneBy({ id: product.id });
    expect(productFound).toStrictEqual(product);
  })
})
