import { Product } from "./product.entity";

export interface InsertProductRepositoryInterface {
  insert(product: Product): Promise<void>;
}

export class ProductInMemoryRepository implements InsertProductRepositoryInterface {
  products: Product[] = [];
  async insert(product: Product): Promise<void> {
    this.products.push(product);
  }
}
