import { Product } from "../../../domain/entities";
import { InsertProductRepositoryInterface } from "../../../domain/repositories/products";
import { CreateProductUseCaseInterface } from "../../../domain/usecases/products";
import { CreateProductInputInterface } from "../../../domain/usecases/products/inputs";
import { CreateProductOutputInterface } from "../../../domain/usecases/products/outputs";

export class CreateProductUseCase implements CreateProductUseCaseInterface {
  constructor(private productRepository: InsertProductRepositoryInterface) {}

  async execute(input: CreateProductInputInterface): Promise<CreateProductOutputInterface> {
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
