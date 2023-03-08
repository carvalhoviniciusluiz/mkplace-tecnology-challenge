import { FindOneSellerByCodeRepositoryInterface } from "./seller-in-memory.repository";
import { Seller } from "./seller.entity";

interface FindOneSellerByCodeUseCaseInterface {
execute(value: number): Promise<Seller | undefined>;
}

export class FindOneSellerByCodeUseCase implements FindOneSellerByCodeUseCaseInterface {
  constructor(private sellerRepository: FindOneSellerByCodeRepositoryInterface) {}

  async execute(value: number): Promise<Seller | undefined> {
    return this.sellerRepository.findOneByCode(value);
  }
}
