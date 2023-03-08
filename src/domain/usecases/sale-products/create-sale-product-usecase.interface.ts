import { CreateSaleProductInputInterface } from "./inputs";
import { CreateSaleProductOutputInterface } from "./outputs";

export interface CreateSaleProductUseCaseInterface {
  execute(input: CreateSaleProductInputInterface): Promise<CreateSaleProductOutputInterface>;
}
