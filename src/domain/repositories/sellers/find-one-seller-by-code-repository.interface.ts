import type { FindOneSellerByCodeRepositoryOutputInterface } from "./outputs";

export interface FindOneSellerByCodeRepositoryInterface {
  findOneByCode(value: number): Promise<FindOneSellerByCodeRepositoryOutputInterface | undefined>;
}
