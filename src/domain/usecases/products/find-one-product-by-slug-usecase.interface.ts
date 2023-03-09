import type { FindOneProductBySlugUseCaseOutputInterface } from "./outputs";

export interface FindOneProductBySlugUseCaseInterface {
  execute(value: string): Promise<FindOneProductBySlugUseCaseOutputInterface | undefined>;
}
