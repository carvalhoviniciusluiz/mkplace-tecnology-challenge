import { SaleProduct } from "./sale-product.entity";
import faker from "faker";
import { Product } from "../product/product.entity";
import { Seller } from "../seller/seller.entity";

describe('SaleProduct Entity', () => {
  const saleProductProps = {
    seller: Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    }),
    product: Product.create({
      name: faker.commerce.product(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    })
  }
  test('create new saleProduct', () => {
    const saleProduct = SaleProduct.create(saleProductProps);
    expect(saleProduct.toJSON()).toStrictEqual({
      id: saleProduct.id,
      seller: saleProductProps.seller.id,
      product: saleProductProps.product.id,
    });
  });
  test('updateSeller method', () => {
    const newSeller = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    const saleProduct = SaleProduct.create(saleProductProps);
    saleProduct.updateSeller(newSeller);
    expect(saleProduct.seller).toStrictEqual(newSeller);
  })
  test('updateProduct method', () => {
    const newProduct = Product.create({
      name: faker.commerce.product(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    const saleProduct = SaleProduct.create(saleProductProps);
    saleProduct.updateProduct(newProduct);
    expect(saleProduct.product).toStrictEqual(newProduct);
  })
});
