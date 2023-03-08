import type { FindOneSellerByCodeUseCaseOutputInterface } from "./outputs";

export interface FindOneSellerByCodeUseCaseInterface {
  execute(value: number): Promise<FindOneSellerByCodeUseCaseOutputInterface | undefined>;
}
