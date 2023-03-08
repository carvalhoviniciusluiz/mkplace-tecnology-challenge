import faker from "faker";
import { Product, SaleProduct, Seller } from "../../../../domain/entities";
import { SaleProductInMemoryRepository } from "./sale-product-in-memory.repository";

describe('SaleProductInMemoryRepository Test', () => {
  let seller: Seller;
  let product: Product;
  beforeAll(() => {
    seller = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    product = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
  });
  it('should insert a new sale product', async () => {
    const saleProduct = SaleProduct.create({ seller, product });
    const repository = new SaleProductInMemoryRepository();
    await repository.insert({
      id: saleProduct.id,
      seller: seller.toJSON(),
      product: {
        ...product.toJSON(),
        slug: product.slug
      }
    });
    expect(repository.saleProducts).toHaveLength(1);
    expect(repository.saleProducts).toStrictEqual([{
      id: saleProduct.id,
      seller: seller.toJSON(),
      product: {
        ...product.toJSON(),
        slug: product.slug
      }
    }]);
  });
  it('should filter sale product by product price', async () => {
    const productMock1 = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: 9.4
    });
    const productMock2 = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: 100
    });
    const saleProduct1 = SaleProduct.create({ seller, product: productMock1 });
    const saleProduct2 = SaleProduct.create({ seller, product: productMock2 });
    const repository = new SaleProductInMemoryRepository();
    await repository.insert({
      id: saleProduct1.id,
      seller: seller.toJSON(),
      product: {
        ...productMock1.toJSON(),
        slug: productMock1.slug
      }
    });
    await repository.insert({
      id: saleProduct2.id,
      seller: seller.toJSON(),
      product: {
        ...productMock2.toJSON(),
        slug: productMock2.slug
      }
    });
    expect(repository.saleProducts).toHaveLength(2);
    const saleProductsFiltered = await repository.findAll({
      product: {
        priceRange: {
          minValue: 8,
          maxValue: 11
        }
      }
    });
    expect(saleProductsFiltered).toHaveLength(1);
    expect(saleProductsFiltered[0]).toStrictEqual({
      id: saleProduct1.id,
      seller: {
        id: saleProduct1.seller.id,
        name: saleProduct1.seller.name,
        code: saleProduct1.seller.code
      },
      product: {
        id: saleProduct1.product.id,
        brand: saleProduct1.product.brand,
        name: saleProduct1.product.name,
        price: saleProduct1.product.price,
        slug: saleProduct1.product.slug
      }
    });
  });
  it('should filter sale product by seller code', async () => {
    const sellerMock1 = Seller.create({
      code: 1984,
      name: faker.name.findName()
    });
    const sellerMock2 = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    const saleProduct1 = SaleProduct.create({ seller: sellerMock1, product });
    const saleProduct2 = SaleProduct.create({ seller: sellerMock2, product });
    const repository = new SaleProductInMemoryRepository();
    await repository.insert(saleProduct1);
    await repository.insert(saleProduct2);
    expect(repository.saleProducts).toHaveLength(2);
    const saleProductsFiltered = await repository.findAll({
      seller: {
        code: 1984
      }
    });
    expect(saleProductsFiltered).toHaveLength(1);
    expect(saleProductsFiltered[0]).toStrictEqual({
      id: saleProduct1.id,
      seller: {
        id: saleProduct1.seller.id,
        name: saleProduct1.seller.name,
        code: saleProduct1.seller.code
      },
      product: {
        id: saleProduct1.product.id,
        brand: saleProduct1.product.brand,
        name: saleProduct1.product.name,
        price: saleProduct1.product.price,
        slug: saleProduct1.product.slug
      }
    });
  });
  it('should filter sale product by seller name', async () => {
    const sellerMock1 = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    const sellerMock2 = Seller.create({
      code: faker.datatype.number(4),
      name: 'vinicius'
    });
    const saleProduct1 = SaleProduct.create({ seller: sellerMock1, product });
    const saleProduct2 = SaleProduct.create({ seller: sellerMock2, product });
    const repository = new SaleProductInMemoryRepository();
    await repository.insert(saleProduct1);
    await repository.insert(saleProduct2);
    expect(repository.saleProducts).toHaveLength(2);
    const saleProductsFiltered = await repository.findAll({
      seller: {
        name: 'vinicius'
      }
    });
    expect(saleProductsFiltered).toHaveLength(1);
    expect(saleProductsFiltered[0]).toStrictEqual({
      id: saleProduct2.id,
      seller: {
        id: saleProduct2.seller.id,
        name: saleProduct2.seller.name,
        code: saleProduct2.seller.code
      },
      product: {
        id: saleProduct2.product.id,
        brand: saleProduct2.product.brand,
        name: saleProduct2.product.name,
        price: saleProduct2.product.price,
        slug: saleProduct2.product.slug
      }
    });
  });
  it('should filter sale product and return empty list', async () => {
    const saleProduct1 = SaleProduct.create({ seller, product });
    const saleProduct2 = SaleProduct.create({ seller, product });
    const repository = new SaleProductInMemoryRepository();
    await repository.insert(saleProduct1);
    await repository.insert(saleProduct2);
    expect(repository.saleProducts).toHaveLength(2);
    const saleProductsFiltered = await repository.findAll({});
    expect(saleProductsFiltered).toHaveLength(0);
  });
});
