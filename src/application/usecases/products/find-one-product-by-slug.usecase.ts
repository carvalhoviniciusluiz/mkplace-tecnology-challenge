import type { FindOneProductBySlugRepositoryInterface } from "~/domain/repositories/products";
import type { FindOneProductBySlugUseCaseInterface } from "~/domain/usecases/products/find-one-product-by-slug-usecase.interface";
import type { FindOneProductBySlugUseCaseOutputInterface } from "~/domain/usecases/products/outputs";

export class FindOneProductBySlugUseCase implements FindOneProductBySlugUseCaseInterface {
  constructor(private productRepository: FindOneProductBySlugRepositoryInterface) {}

  execute(value: string): Promise<FindOneProductBySlugUseCaseOutputInterface> {
    return this.productRepository.findOneBySlug(value);
  }
}
