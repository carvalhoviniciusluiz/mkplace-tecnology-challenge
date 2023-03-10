import type { FindOneProductByBrandUseCaseOutputInterface } from "./outputs";

export interface FindOneProductByBrandUseCaseInterface {
  execute(value: string): Promise<FindOneProductByBrandUseCaseOutputInterface | undefined>;
}
