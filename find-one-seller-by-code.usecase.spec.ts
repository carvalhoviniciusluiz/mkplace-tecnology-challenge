import faker from "faker";
import { CreateSellerUseCase } from "./create-seller.usecase";
import { FindOneSellerByCodeUseCase } from "./find-one-seller-by-code.usecase";
import { SellerInMemoryRepository } from "./seller-in-memory.repository";

describe('FindOneSellerByCodeUseCase Test', () => {
  const repository = new SellerInMemoryRepository();
  let sellerPersisted: { code: number };
  beforeAll(async () => {
    const createSeller = new CreateSellerUseCase(repository);
    sellerPersisted = await createSeller.execute({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
  });
  it('should find one Seller', async () => {
    const createSeller = new FindOneSellerByCodeUseCase(repository);
    const output = await createSeller.execute(sellerPersisted.code);
    expect(repository.sellers).toHaveLength(1);
    expect(output).toStrictEqual(repository.sellers[0]);
  });
})
