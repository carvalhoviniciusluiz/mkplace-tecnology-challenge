import { Repository } from "typeorm";
import { Product } from "~/domain/entities";
import type { FindOneProductBySlugRepositoryInterface, InsertProductRepositoryInterface } from "~/domain/repositories/products";
import type { FindOneProductBySlugRepositoryOutputInterface } from "~/domain/repositories/products/outputs";

export class ProductTypeOrmRepository implements InsertProductRepositoryInterface, FindOneProductBySlugRepositoryInterface {
  constructor(private repository: Repository<Product>) {}

  async insert(product: Product): Promise<void> {
    await this.repository.save(product);
  }
  findOneBySlug(value: string): Promise<FindOneProductBySlugRepositoryOutputInterface> {
    return this.repository.findOneBy({ slug: value });
  }
}
