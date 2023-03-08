import { Product, SaleProduct, Seller } from "../../../domain/entities";
import type { InsertSaleProductRepositoryInterface } from "../../../domain/repositories/sale-products";
import type { CreateSaleProductUseCaseInterface } from "../../../domain/usecases/sale-products";
import type { CreateSaleProductUseCaseInputInterface } from "../../../domain/usecases/sale-products/inputs";
import type { CreateSaleProductUseCaseOutputInterface } from "../../../domain/usecases/sale-products/outputs";

export class CreateSaleProductUseCase implements CreateSaleProductUseCaseInterface {
  constructor(private saleProductRepository: InsertSaleProductRepositoryInterface) {}

  async execute(input: CreateSaleProductUseCaseInputInterface): Promise<CreateSaleProductUseCaseOutputInterface> {
    const { product: productProps, seller: sellerProps } = input;
    const product = Product.create(productProps);
    const seller = Seller.create(sellerProps);
    const saleProduct = SaleProduct.create({ seller, product });
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
