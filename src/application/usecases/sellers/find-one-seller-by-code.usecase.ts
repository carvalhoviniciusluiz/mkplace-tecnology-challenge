import type { FindOneSellerByCodeRepositoryInterface } from "~/domain/repositories/sellers";
import type { FindOneSellerByCodeUseCaseInterface } from "~/domain/usecases/sellers";
import type { FindOneSellerByCodeUseCaseOutputInterface } from "~/domain/usecases/sellers/outputs";

export class FindOneSellerByCodeUseCase implements FindOneSellerByCodeUseCaseInterface {
  constructor(private sellerRepository: FindOneSellerByCodeRepositoryInterface) {}

  async execute(value: number): Promise<FindOneSellerByCodeUseCaseOutputInterface | undefined> {
    return this.sellerRepository.findOneByCode(value);
  }
}
