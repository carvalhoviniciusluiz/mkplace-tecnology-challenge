import { DataSource } from "typeorm";
import { Seller } from "~/domain/entities";
import { SellerTypeOrmRepository } from "./seller-typeorm.repository";
import { SellerSchema } from "./seller.schema";
import faker from 'faker';

describe('SellerTypeOrmRepository Test', () => {
  it('should insert a new seller', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [SellerSchema]
    });
    await dataSource.initialize();
    const repository = dataSource.getRepository(Seller);
    const sellerRepository = new SellerTypeOrmRepository(repository);
    const sellerProps = {
      code: faker.datatype.number(4),
      name: faker.name.findName()
    }
    const seller = Seller.create(sellerProps);
    await sellerRepository.insert(seller);
    const sellerFound = await repository.findOneBy({ id: seller.id });
    expect(sellerFound).toStrictEqual(seller);
  })
})
