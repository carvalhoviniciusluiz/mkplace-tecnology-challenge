import { DataSource } from "typeorm";
import faker from 'faker';
import { ProductSchema } from "./product.schema";
import { Product } from "~/domain/entities";

describe('ProductSchema Test', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [ProductSchema]
    });
    await dataSource.initialize();
    const account = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    const accountRepository = dataSource.getRepository(Product);
    await accountRepository.save(account);
    const accountFound = await accountRepository.findOneBy({ id: account.id });
    expect(account).toStrictEqual(accountFound);
  })
})
