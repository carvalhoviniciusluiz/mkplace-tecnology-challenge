import { Product } from "../../../../domain/entities";
import { InsertProductRepositoryInterface } from "../../../../domain/repositories/products";

export class ProductInMemoryRepository implements InsertProductRepositoryInterface {
  products: Product[] = [];
  async insert(product: Product): Promise<void> {
    this.products.push(product);
  }
}
