import type { FindOneProductByNameUseCaseOutputInterface } from "./outputs";

export interface FindOneProductByNameUseCaseInterface {
  execute(value: string): Promise<FindOneProductByNameUseCaseOutputInterface | undefined>;
}
