import type { FindOneProductBySlugRepositoryOutputInterface } from "./outputs";

export interface FindOneProductBySlugRepositoryInterface {
  findOneBySlug(value: string): Promise<FindOneProductBySlugRepositoryOutputInterface | undefined>;
}
