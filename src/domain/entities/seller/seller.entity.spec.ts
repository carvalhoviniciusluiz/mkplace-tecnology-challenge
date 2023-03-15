import { Seller } from "./seller.entity";
import faker from "faker";

describe('Seller Entity', () => {
  const sellerProps = {
    code: faker.datatype.number(4),
    name: faker.name.findName()
  }
  test('create new seller', () => {
    const seller = Seller.create(sellerProps);
    expect(seller.toJSON()).toStrictEqual({
      id: seller.id,
      ...sellerProps,
    });
  });
  test('not create new seller if name is empty', () => {
    expect(() => {
      Seller.create({
        ...sellerProps,
        name: undefined
      })
    }).toThrow('name is requered');
  });
  test('updateCode method', () => {
    const newCode = faker.datatype.number(4);
    const seller = Seller.create(sellerProps);
    seller.updateCode(newCode);
    expect(seller.code).toBe(newCode);
  });
  test('updateName method', () => {
    const newName = faker.name.findName();
    const seller = Seller.create(sellerProps);
    seller.updateName(newName);
    expect(seller.name).toBe(newName);
  });
  test('genCode static method', () => {
    const code = Seller.genCode();
    expect(code).toBeDefined();
    expect(String(code).length).toBe(4);
  });
});
