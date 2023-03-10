import { DataSource, Repository } from "typeorm";
import faker from 'faker';
import { ProductSchema } from "./product.schema";
import { Product } from "~/domain/entities";
import { ProductTypeOrmRepository } from "./product-typeorm.repository";

describe('ProductTypeOrmRepository Test', () => {
  const makeSut = async (): Promise<[ProductTypeOrmRepository, Repository<Product>]> => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [ProductSchema]
    });
    await dataSource.initialize();
    const repository = dataSource.getRepository(Product);
    const productRepository = new ProductTypeOrmRepository(repository);
    return [productRepository, repository];
  }
  it('should insert a new product', async () => {
    const [productRepository, repository] = await makeSut();
    const productProps = {
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    }
    const product = Product.create(productProps);
    await productRepository.insert(product);
    const productFound = await repository.findOneBy({ id: product.id });
    expect(productFound).toStrictEqual(product);
  });
  describe('findAll method', () => {
    function getProductInstance(price?: number) {
      return Product.create({
        name: faker.name.findName(),
        brand: faker.commerce.productAdjective(),
        price: price ?? parseFloat(faker.commerce.price())
      });
    }
    it('should return on list with 3 items', async () => {
      const [productRepository] = await makeSut();
      for (let index = 0; index < 3; index++) {
        const product = getProductInstance();
        await productRepository.insert(product);
      }
      const productsFiltered = await productRepository.findAll({});
      expect(productsFiltered).toHaveLength(3);
    });
    it('should filter by price range', async () => {
      const [productRepository] = await makeSut();
      const product1 = getProductInstance(5.5);
      const product2 = getProductInstance(4.7);
      const product3 = getProductInstance(9.2);
      await productRepository.insert(product1);
      await productRepository.insert(product2);
      await productRepository.insert(product3);
      const productsFiltered = await productRepository.findAll({
        priceRange: {
          minValue: 8,
          maxValue: 10
        }
      });
      expect(productsFiltered).toHaveLength(1);
      expect(productsFiltered[0].id).toBe(product3.id);
    });
  });
  it('should return product by slug', async () => {
    const [productRepository] = await makeSut();
    const product1 = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    const product2 = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price()),
      slug: 'slug-test'
    });
    await productRepository.insert(product1);
    await productRepository.insert(product2);
    const productFound = await productRepository.findOneBySlug('slug-test');
    expect(productFound).toStrictEqual(product2);
  });
  it('should return product by brand', async () => {
    const [productRepository] = await makeSut();
    const product1 = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    await productRepository.insert(product1);
    const productFound = await productRepository.findOneByBrand(product1.brand);
    expect(productFound).toStrictEqual(product1);
  });
  it('should return product by name', async () => {
    const [productRepository] = await makeSut();
    const product1 = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    await productRepository.insert(product1);
    const productFound = await productRepository.findOneByName(product1.name);
    expect(productFound).toStrictEqual(product1);
  });
});
