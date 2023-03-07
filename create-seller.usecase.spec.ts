import { CreateSellerUseCase } from "./create-seller.usecase";
import faker from "faker";

describe('CreateSellerUseCase Test', () => {
  const sellerProps = {
    name: faker.name.findName()
  }
  it('should create new Seller', () => {
    const createSeller = new CreateSellerUseCase();
    const output = createSeller.execute(sellerProps);
    expect(output).toStrictEqual({ ...sellerProps, id: output.id });
  });
})
