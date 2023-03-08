import { Seller } from "../../entities";

export interface FindOneSellerByCodeRepositoryInterface {
  findOneByCode(value: number): Promise<Seller | undefined>;
}
