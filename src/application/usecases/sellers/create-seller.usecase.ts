import { Seller } from "~/domain/entities";
import type { InsertSellerRepositoryInterface } from "~/domain/repositories/sellers";
import type { CreateSellerUseCaseInterface } from "~/domain/usecases/sellers";
import type { CreateSellerUseCaseInputInterface } from "~/domain/usecases/sellers/inputs";
import type { CreateSellerUseCaseOutputInterface } from "~/domain/usecases/sellers/outputs";

export class CreateSellerUseCase implements CreateSellerUseCaseInterface {
  constructor(private sellerRepository: InsertSellerRepositoryInterface) {}

  async execute(input: CreateSellerUseCaseInputInterface): Promise<CreateSellerUseCaseOutputInterface> {
    const seller = Seller.create(input);
    await this.sellerRepository.insert(seller);
    return seller.toJSON();
  }
}
