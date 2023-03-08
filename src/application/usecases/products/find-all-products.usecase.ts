import { FindAllProductsRepositoryInterface } from "../../../domain/repositories/products";
import { FindAllProductsUseCaseInterface } from "../../../domain/usecases/products";
import { FindAllProductsInputInterface } from "../../../domain/usecases/products/inputs";

export class FindAllProductsUseCase implements FindAllProductsUseCaseInterface {
  constructor(private productRepository: FindAllProductsRepositoryInterface) {}

  async execute(input: FindAllProductsInputInterface) {
    const products = await this.productRepository.findAll(input);
    return products.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      slug: product.slug,
    }));
  }
}
