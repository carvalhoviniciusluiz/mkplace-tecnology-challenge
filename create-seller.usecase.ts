import { InsertSellerRepositoryInterface } from "./seller-in-memory.repository";
import { Seller } from "./seller.entity";

interface CreateSellerInputInterface {
  code: number;
  name: string;
}
interface CreateSellerOutputInterface {
  id: string;
  code: number;
  name: string;
}
interface CreateSellerUseCaseInterface {
  execute(input: CreateSellerInputInterface): Promise<CreateSellerOutputInterface>;
}

export class CreateSellerUseCase implements CreateSellerUseCaseInterface {
  constructor(private sellerRepository: InsertSellerRepositoryInterface) {}

  async execute(input: CreateSellerInputInterface): Promise<CreateSellerOutputInterface> {
    const seller = Seller.create(input);
    await this.sellerRepository.insert(seller);
    return seller.toJSON();
  }
}
