import type { FindOneProductByBrandRepositoryInterface } from "~/domain/repositories/products";
import type { FindOneProductByBrandUseCaseInterface } from "~/domain/usecases/products";
import type { FindOneProductByBrandUseCaseOutputInterface } from "~/domain/usecases/products/outputs";

export class FindOneProductByBrandUseCase implements FindOneProductByBrandUseCaseInterface {
  constructor(private productRepository: FindOneProductByBrandRepositoryInterface) {}

  execute(value: string): Promise<FindOneProductByBrandUseCaseOutputInterface> {
    return this.productRepository.findOneByBrand(value);
  }
}
