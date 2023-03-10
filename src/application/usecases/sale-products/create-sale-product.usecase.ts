import { SaleProduct } from "~/domain/entities";
import type { InsertSaleProductRepositoryInterface } from "~/domain/repositories/sale-products";
import { FindOneProductBySlugUseCaseInterface } from "~/domain/usecases/products";
import type { CreateSaleProductUseCaseInterface } from "~/domain/usecases/sale-products";
import type { CreateSaleProductUseCaseInputInterface } from "~/domain/usecases/sale-products/inputs";
import type { CreateSaleProductUseCaseOutputInterface } from "~/domain/usecases/sale-products/outputs";
import { FindOneSellerByCodeUseCaseInterface } from "~/domain/usecases/sellers";

export class CreateSaleProductUseCase implements CreateSaleProductUseCaseInterface {
  constructor(
    private readonly findOneProductBySlugUseCaseInterface: FindOneProductBySlugUseCaseInterface,
    private readonly findOneSellerByCodeUseCaseInterface: FindOneSellerByCodeUseCaseInterface,
    private readonly saleProductRepository: InsertSaleProductRepositoryInterface
  ) {}

  async execute(input: CreateSaleProductUseCaseInputInterface): Promise<CreateSaleProductUseCaseOutputInterface> {
    const { product, seller } = input;
    const productPromise = this.findOneProductBySlugUseCaseInterface.execute(product.slug);
    const sellerPromise = this.findOneSellerByCodeUseCaseInterface.execute(seller.code);
    const [productFound, sellerFound] = await Promise.all([productPromise, sellerPromise]);
    if(!productFound || !sellerFound) {
      throw new Error('Something went wrong, try again');
    }
    const saleProduct = SaleProduct.create({ seller: sellerFound, product: productFound });
    await this.saleProductRepository.insert(saleProduct);
    return {
      id: saleProduct.product.id,
      name: saleProduct.product.name,
      brand: saleProduct.product.brand,
      price: saleProduct.product.price,
      slug: saleProduct.product.slug,
      seller: {
        id: saleProduct.seller.id,
        name: saleProduct.seller.name,
        code: saleProduct.seller.code
      }
    }
  }
}
