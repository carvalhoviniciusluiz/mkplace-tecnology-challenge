import { CreateSellerInputInterface } from "./inputs";
import { CreateSellerOutputInterface } from "./outputs";

export interface CreateSellerUseCaseInterface {
  execute(input: CreateSellerInputInterface): Promise<CreateSellerOutputInterface>;
}
