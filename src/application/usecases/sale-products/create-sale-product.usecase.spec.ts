import faker from "faker";
import { Product, Seller } from "~/domain/entities";
import { ProductInMemoryRepository, SaleProductInMemoryRepository, SellerInMemoryRepository } from "~/infra/database/repositories/in-memoy";
import { FindOneProductBySlugUseCase } from "../products";
import { FindOneSellerByCodeUseCase } from "../sellers";
import { CreateSaleProductUseCase } from "./create-sale-product.usecase";

describe('CreateSaleProductUseCase Test', () => {
  let seller: Seller;
  let product: Product;
  let productRepository: ProductInMemoryRepository;
  let sellerRepository: SellerInMemoryRepository;
  beforeAll(async () => {
    seller = Seller.create({
      code: faker.datatype.number(4),
      name: faker.name.findName()
    });
    product = Product.create({
      name: faker.name.findName(),
      brand: faker.commerce.productAdjective(),
      price: parseFloat(faker.commerce.price())
    });
    productRepository = new ProductInMemoryRepository();
    await productRepository.insert(product);
    sellerRepository = new SellerInMemoryRepository();
    await sellerRepository.insert(seller)
  });
  it('should create new sale product', async () => {
    const repository = new SaleProductInMemoryRepository();
    const createSaleProduct = new CreateSaleProductUseCase(
      new FindOneProductBySlugUseCase(productRepository),
      new FindOneSellerByCodeUseCase(sellerRepository),
      repository
    );
    const output = await createSaleProduct.execute({
      seller: { code: seller.code },
      product: { slug: product.slug }
    });
    expect(repository.saleProducts).toHaveLength(1);
    expect(output).toStrictEqual({
      id: output.id,
      name: output.name,
      brand: output.brand,
      price: output.price,
      slug: output.slug,
      seller: {
        id: output.seller.id,
        name: output.seller.name,
        code: output.seller.code
      }
    });
  });
  it('should throw error', async () => {
    const repository = new SaleProductInMemoryRepository();
    const createSaleProduct = new CreateSaleProductUseCase(
      new FindOneProductBySlugUseCase(productRepository),
      new FindOneSellerByCodeUseCase(sellerRepository),
      repository
    );
    const promise = createSaleProduct.execute({
      seller: { code: 0 },
      product: { slug: 'no slug' }
    });
    expect(repository.saleProducts).toHaveLength(0);
    await expect(promise).rejects.toThrowError(Error);
  });
})
