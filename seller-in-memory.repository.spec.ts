import { SellerInMemoryRepository } from "./seller-in-memory.repository";
import { Seller } from "./seller.entity";
import faker from "faker";
import { FindOneSellerByCodeUseCase } from "./find-one-seller-by-code.usecase";

describe('SellerInMemoryRepository Test', () => {
  const sellerProps = {
    code: faker.datatype.number(4),
    name: faker.name.findName()
  }
  it('should insert a new seller', async () => {
    const seller = Seller.create(sellerProps);
    const repository = new SellerInMemoryRepository();
    await repository.insert(seller);
    expect(repository.sellers).toHaveLength(1);
    expect(repository.sellers).toStrictEqual([seller]);
  });
  it('should find one seller', async () => {
    const seller = Seller.create(sellerProps);
    const repository = new SellerInMemoryRepository();
    await repository.insert(seller);
    const createSeller = new FindOneSellerByCodeUseCase(repository);
    const output = await createSeller.execute(seller.code);
    expect(repository.sellers).toHaveLength(1);
    expect(output).toStrictEqual(repository.sellers[0]);
  });
});
