import type { CreateSellerUseCaseInputInterface } from "./inputs";
import type { CreateSellerUseCaseOutputInterface } from "./outputs";

export interface CreateSellerUseCaseInterface {
  execute(input: CreateSellerUseCaseInputInterface): Promise<CreateSellerUseCaseOutputInterface>;
}
