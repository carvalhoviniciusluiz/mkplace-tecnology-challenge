import { SaleProduct } from "~/domain/entities";
import type { InsertSaleProductRepositoryInterface } from "~/domain/repositories/sale-products";
import type { FindOneProductBySlugUseCaseInterface } from "~/domain/usecases/products";
import type { CreateSaleProductUseCaseInterface } from "~/domain/usecases/sale-products";
import type { CreateSaleProductUseCaseInputInterface } from "~/domain/usecases/sale-products/inputs";
import type { CreateSaleProductUseCaseOutputInterface } from "~/domain/usecases/sale-products/outputs";
import type { FindOneSellerByCodeUseCaseInterface } from "~/domain/usecases/sellers";

export class CreateSaleProductUseCase implements CreateSaleProductUseCaseInterface {
  constructor(
    private readonly findOneProductBySlugUseCase: FindOneProductBySlugUseCaseInterface,
    private readonly findOneSellerByCodeUseCase: FindOneSellerByCodeUseCaseInterface,
    private readonly saleProductRepository: InsertSaleProductRepositoryInterface
  ) {}

  async execute(input: CreateSaleProductUseCaseInputInterface): Promise<CreateSaleProductUseCaseOutputInterface> {
    const { product, seller } = input;
    const productPromise = this.findOneProductBySlugUseCase.execute(product.slug);
    const sellerPromise = this.findOneSellerByCodeUseCase.execute(seller.code);
    const [productFound, sellerFound] = await Promise.all([productPromise, sellerPromise]);
    if(!productFound || !sellerFound) {
      throw new Error('Something went wrong, try again');
    }
    const saleProduct = SaleProduct.create({ seller: sellerFound, product: productFound });
    await this.saleProductRepository.insert(saleProduct);
    return {
      id: saleProduct.id,
      product: {
        id: productFound.id,
        name: productFound.name,
        brand: productFound.brand,
        price: productFound.price,
        slug: productFound.slug,
      },
      seller: {
        id: sellerFound.id,
        name: sellerFound.name,
        code: sellerFound.code
      }
    }
  }
}
