import { CreateProductInputInterface } from "./inputs";
import { CreateProductOutputInterface } from "./outputs";

export interface CreateProductUseCaseInterface {
  execute(input: CreateProductInputInterface): Promise<CreateProductOutputInterface>;
}
