import type { CreateProductUseCaseInputInterface } from "./inputs";
import type { CreateProductUseCaseOutputInterface } from "./outputs";

export interface CreateProductUseCaseInterface {
  execute(input: CreateProductUseCaseInputInterface): Promise<CreateProductUseCaseOutputInterface>;
}
