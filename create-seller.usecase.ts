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
  execute(input: CreateSellerInputInterface): CreateSellerOutputInterface;
}

export class CreateSellerUseCase implements CreateSellerUseCaseInterface {
  execute(input: CreateSellerInputInterface): CreateSellerOutputInterface {
    const seller = Seller.create(input);
    return seller.toJSON();
  }
}
