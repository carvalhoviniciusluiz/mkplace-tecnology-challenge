import { Seller } from "../../../domain/entities";
import { FindOneSellerByCodeRepositoryInterface } from "../../../domain/repositories/sellers";
import { FindOneSellerByCodeUseCaseInterface } from "../../../domain/usecases/sellers";

export class FindOneSellerByCodeUseCase implements FindOneSellerByCodeUseCaseInterface {
  constructor(private sellerRepository: FindOneSellerByCodeRepositoryInterface) {}

  async execute(value: number): Promise<Seller | undefined> {
    return this.sellerRepository.findOneByCode(value);
  }
}
