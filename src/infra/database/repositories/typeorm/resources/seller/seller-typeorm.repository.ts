import { Repository } from "typeorm";
import { Seller } from "~/domain/entities";
import type { FindOneSellerByCodeRepositoryInterface, InsertSellerRepositoryInterface } from "~/domain/repositories/sellers";
import type { FindOneSellerByCodeRepositoryOutputInterface } from "~/domain/repositories/sellers/outputs";

export class SellerTypeOrmRepository implements InsertSellerRepositoryInterface, FindOneSellerByCodeRepositoryInterface {
  constructor(private repository: Repository<Seller>) {}

  async insert(seller: Seller): Promise<void> {
    await this.repository.save(seller);
  }
  findOneByCode(value: number): Promise<FindOneSellerByCodeRepositoryOutputInterface> {
    return this.repository.findOneBy({ code: value });
  }
}
