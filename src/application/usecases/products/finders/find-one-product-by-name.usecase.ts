import type { FindOneProductByNameRepositoryInterface } from "~/domain/repositories/products";
import type { FindOneProductByNameUseCaseInterface } from "~/domain/usecases/products";
import type { FindOneProductByNameUseCaseOutputInterface } from "~/domain/usecases/products/outputs";

export class FindOneProductByNameUseCase implements FindOneProductByNameUseCaseInterface {
  constructor(private productRepository: FindOneProductByNameRepositoryInterface) {}

  execute(value: string): Promise<FindOneProductByNameUseCaseOutputInterface> {
    return this.productRepository.findOneByName(value);
  }
}
