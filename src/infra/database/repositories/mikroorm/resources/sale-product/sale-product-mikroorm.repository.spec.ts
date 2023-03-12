import { MikroORM } from '@mikro-orm/mongodb';
import { ProductPojo, SaleProductPojo, SellerPojo } from '~/domain/entities';
import { ProductMikroORMSchema } from '../product';
import { SellerMikroORMSchema } from '../seller';
import { SaleProductMikroORMSchema } from './sale-product.schema';
import faker from 'faker';
import { SaleProductMikroORMRepository } from './sale-product-mikroorm.repository';

describe('SaleProductMikroORMRepository Test', () => {

  let orm: MikroORM;

  beforeAll(async () => {
    orm = await MikroORM.init({
      entities: [SellerMikroORMSchema, ProductMikroORMSchema, SaleProductMikroORMSchema],
      clientUrl: 'mongodb://localhost:27017/mikro-orm-test',
      debug: false
    });
    await orm.schema.clearDatabase();
  });
  afterAll(() => orm.close(true));

  it('should insert new sale-product', async () => {
    const seller = new SellerPojo();
    seller.code = faker.datatype.number(4);
    seller.name = faker.name.findName();
    const product = new ProductPojo();
    product.name = faker.name.findName();
    product.brand = faker.commerce.productAdjective();
    product.price = parseFloat(faker.commerce.price());
    product.slug = faker.random.word();
    const saleProduct = new SaleProductPojo();
    saleProduct.externalId = faker.datatype.uuid();
    saleProduct.seller = seller;
    saleProduct.product = product;
    const repository = new SaleProductMikroORMRepository(orm.em);
    await repository.insert({
      id: saleProduct.externalId,
      seller: {
        id: faker.datatype.uuid(),
        name: seller.name,
        code: seller.code
      },
      product: {
        id: faker.datatype.uuid(),
        brand: product.brand,
        name: product.name,
        price: product.price,
        slug: product.slug,
      }
    });
    const found: any = await orm.em.fork().findOne('SaleProduct', {
      seller: {
        code: seller.code
      }
    });
    expect({
      externalId: found.externalId,
      seller: {
        code: found.seller.code,
        name: found.seller.name
      },
      product: {
        brand: found.product.brand,
        name: found.product.name,
        price: found.product.price,
        slug: found.product.slug
      }
    }).toEqual({
      externalId: saleProduct.externalId,
      seller: {
        code: saleProduct.seller.code,
        name: saleProduct.seller.name
      },
      product: {
        brand: saleProduct.product.brand,
        name: saleProduct.product.name,
        price: saleProduct.product.price,
        slug: saleProduct.product.slug
      }
    });
  });
  it('should find seller by code', async () => {
    const repository = new SaleProductMikroORMRepository(orm.em);
    const code = faker.datatype.number(4);
    await repository.insert({
      id: faker.datatype.uuid(),
      seller: {
        id: faker.datatype.uuid(),
        code,
        name: faker.name.findName(),
      },
      product: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        brand: faker.commerce.productAdjective(),
        price: parseFloat(faker.commerce.price()),
        slug: faker.random.word(),
      }
    });
    const output = await repository.findAll({ seller: { code } });
    expect(output).not.toBeUndefined();
  });
  it('should find seller by name', async () => {
    const repository = new SaleProductMikroORMRepository(orm.em);
    const name = faker.name.findName();
    await repository.insert({
      id: faker.datatype.uuid(),
      seller: {
        id: faker.datatype.uuid(),
        code: faker.datatype.number(4),
        name
      },
      product: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        brand: faker.commerce.productAdjective(),
        price: parseFloat(faker.commerce.price()),
        slug: faker.random.word(),
      }
    });
    const output = await repository.findAll({ seller: { name } });
    expect(output).not.toBeUndefined();
  });
  it('should find product by price', async () => {
    const repository = new SaleProductMikroORMRepository(orm.em);
    await repository.insert({
      id: faker.datatype.uuid(),
      seller: {
        id: faker.datatype.uuid(),
        code: faker.datatype.number(4),
        name: faker.name.findName()
      },
      product: {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        brand: faker.commerce.productAdjective(),
        price: 9.5,
        slug: faker.random.word(),
      }
    });
    const output = await repository.findAll({ product: {
      priceRange: {
        minValue: 8,
        maxValue: 10
      }
    } });
    expect(output).not.toBeUndefined();
  });
});
