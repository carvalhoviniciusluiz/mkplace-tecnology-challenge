import type { FindOneProductByBrandRepositoryOutputInterface } from "./outputs";

export interface FindOneProductByBrandRepositoryInterface {
  findOneByBrand(value: string): Promise<FindOneProductByBrandRepositoryOutputInterface | undefined>;
}
