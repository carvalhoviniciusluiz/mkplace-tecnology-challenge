import { FindAllSaleProductsRepositoryInterface } from "~/domain/repositories/sale-products";
import type { FindAllSaleProductsUseCaseInterface } from "~/domain/usecases/sale-products/find-all-sale-products-usecase.interface";
import type { FindAllSaleProductsUseCaseInputInterface } from "~/domain/usecases/sale-products/inputs";
import type { FindAllSaleProductsUseCaseOutputInterface } from "~/domain/usecases/sale-products/outputs";

export class FindAllSaleProductsUseCase implements FindAllSaleProductsUseCaseInterface {
  constructor(private readonly saleProductRepository: FindAllSaleProductsRepositoryInterface) {}

  async execute(input: FindAllSaleProductsUseCaseInputInterface): Promise<FindAllSaleProductsUseCaseOutputInterface[]> {
    return this.saleProductRepository.findAll(input);
  }
}
