import { Seller } from "./seller.entity";

interface CreateSellerInputInterface {
  name: string;
}
interface CreateSellerOutputInterface {
  id: string;
  name: string;
}
interface CreateSellerUseCaseInterface {
  execute(input: CreateSellerInputInterface): CreateSellerOutputInterface;
}

export class CreateSellerUseCase implements CreateSellerUseCaseInterface {
  execute(input: CreateSellerInputInterface): CreateSellerOutputInterface {
    const seller = Seller.create(input);
    return seller.toJSON();
  }
}
