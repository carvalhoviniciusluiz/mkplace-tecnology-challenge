import { DataSource } from "typeorm";
import { Seller } from "~/domain/entities";
import { SellerSchema } from "./seller.schema";
import faker from 'faker';
import { ProductSchema } from "../product";

describe('SellerSchema Test', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [SellerSchema, ProductSchema]
    });
    await dataSource.initialize();
    const account = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    const accountRepository = dataSource.getRepository(Seller);
    await accountRepository.save(account);
    const accountFound = await accountRepository.findOneBy({ id: account.id });
    expect(account).toStrictEqual(accountFound);
  })
})
