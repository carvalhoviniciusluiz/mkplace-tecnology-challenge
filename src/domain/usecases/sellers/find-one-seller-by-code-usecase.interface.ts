import { Seller } from "../../entities";

export interface FindOneSellerByCodeUseCaseInterface {
  execute(value: number): Promise<Seller | undefined>;
}
