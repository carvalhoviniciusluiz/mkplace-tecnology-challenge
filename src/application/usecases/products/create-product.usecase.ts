import { Product } from "~/domain/entities";
import type { InsertProductRepositoryInterface } from "~/domain/repositories/products";
import type { CreateProductUseCaseInterface } from "~/domain/usecases/products";
import type { CreateProductUseCaseInputInterface } from "~/domain/usecases/products/inputs";
import type { CreateProductUseCaseOutputInterface } from "~/domain/usecases/products/outputs";

export class CreateProductUseCase implements CreateProductUseCaseInterface {
  constructor(private productRepository: InsertProductRepositoryInterface) {}

  async execute(input: CreateProductUseCaseInputInterface): Promise<CreateProductUseCaseOutputInterface> {
    const product = Product.create(input);
    await this.productRepository.insert(product);
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      slug: product.slug,
    }
  }
}
