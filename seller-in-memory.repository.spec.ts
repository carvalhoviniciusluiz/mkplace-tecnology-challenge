import { SellerInMemoryRepository } from "./seller-in-memory.repository";
import { Seller } from "./seller.entity";
import faker from "faker";

describe('SellerInMemoryRepository Test', () => {
  it('should insert a new seller', async () => {
    const sellerProps = {
      code: faker.datatype.number(4),
      name: faker.name.findName()
    }
    const seller = Seller.create(sellerProps);
    const repository = new SellerInMemoryRepository();
    await repository.insert(seller);
    expect(repository.sellers).toHaveLength(1);
    expect(repository.sellers).toStrictEqual([seller]);
  })
})
