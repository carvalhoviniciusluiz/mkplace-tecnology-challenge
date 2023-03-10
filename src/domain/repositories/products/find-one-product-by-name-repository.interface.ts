import type { FindOneProductByNameRepositoryOutputInterface } from "./outputs";

export interface FindOneProductByNameRepositoryInterface {
  findOneByName(value: string): Promise<FindOneProductByNameRepositoryOutputInterface | undefined>;
}
