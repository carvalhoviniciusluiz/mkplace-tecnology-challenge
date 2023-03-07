import { Seller } from "./seller.entity";
import faker from "faker";

describe('Seller Entity', () => {
  const sellerProps = {
    name: faker.name.findName()
  }
  test('create new seller', () => {
    const seller = Seller.create(sellerProps);
    expect(seller.toJSON()).toStrictEqual({
      id: seller.id,
      ...sellerProps,
    });
  });

  test('updateName method', () => {
    const newName = faker.name.findName();
    const seller = Seller.create(sellerProps);
    seller.updateName(newName);
    expect(seller.name).toBe(newName);
  })
});
