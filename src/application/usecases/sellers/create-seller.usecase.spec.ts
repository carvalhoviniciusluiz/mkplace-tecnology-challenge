import { CreateSellerUseCase } from "./create-seller.usecase";
import faker from "faker";
import { SellerInMemoryRepository } from "~/infra/database/repositories/in-memoy";

describe('CreateSellerUseCase Test', () => {
  const sellerProps = {
    code: faker.datatype.number(4),
    name: faker.name.findName()
  }
  it('should create new Seller', async () => {
    const repository = new SellerInMemoryRepository();
    const createSeller = new CreateSellerUseCase(repository);
    const output = await createSeller.execute(sellerProps);
    expect(repository.sellers).toHaveLength(1);
    expect(output).toStrictEqual({ ...sellerProps, id: output.id });
  });
})
