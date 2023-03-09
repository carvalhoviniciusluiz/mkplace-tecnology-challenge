import { Between, FindOptionsWhere, Repository } from "typeorm";
import { Product } from "~/domain/entities";
import type { FindAllProductsRepositoryInterface, FindOneProductBySlugRepositoryInterface, InsertProductRepositoryInterface } from "~/domain/repositories/products";
import type { FindAllProductsRepositoryInputInterface } from "~/domain/repositories/products/inputs";
import type { FindAllProductsRepositoryOutputInterface, FindOneProductBySlugRepositoryOutputInterface } from "~/domain/repositories/products/outputs";

export class ProductTypeOrmRepository implements InsertProductRepositoryInterface, FindAllProductsRepositoryInterface, FindOneProductBySlugRepositoryInterface {
  constructor(private repository: Repository<Product>) {}

  async insert(product: Product): Promise<void> {
    await this.repository.save(product);
  }
  findAll(input: FindAllProductsRepositoryInputInterface): Promise<FindAllProductsRepositoryOutputInterface[]> {
    const { brand, name, priceRange } = input;
    const hasBrand = !!brand;
    const hasName = !!name;
    const hasPriceRange = !!priceRange;
    const where: FindOptionsWhere<Product> = {};
    if(hasBrand) {
      where.brand = brand;
    }
    if(hasName) {
      where.name = name;
    }
    if(hasPriceRange) {
      where.price = Between(
        priceRange.minValue,
        priceRange.maxValue
      )
    }
    return this.repository.find({ where });
  }
  findOneBySlug(value: string): Promise<FindOneProductBySlugRepositoryOutputInterface> {
    return this.repository.findOneBy({ slug: value });
  }
}
