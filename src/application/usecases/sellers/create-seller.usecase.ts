import { Seller } from "../../../domain/entities";
import { InsertSellerRepositoryInterface } from "../../../domain/repositories/sellers";
import { CreateSellerUseCaseInterface } from "../../../domain/usecases/sellers";
import { CreateSellerInputInterface } from "../../../domain/usecases/sellers/inputs";
import { CreateSellerOutputInterface } from "../../../domain/usecases/sellers/outputs";

export class CreateSellerUseCase implements CreateSellerUseCaseInterface {
  constructor(private sellerRepository: InsertSellerRepositoryInterface) {}

  async execute(input: CreateSellerInputInterface): Promise<CreateSellerOutputInterface> {
    const seller = Seller.create(input);
    await this.sellerRepository.insert(seller);
    return seller.toJSON();
  }
}
