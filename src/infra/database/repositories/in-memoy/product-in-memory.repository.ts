import { Product } from "../../../../domain/entities";
import { FindAllProductsRepositoryInterface, InsertProductRepositoryInterface } from "../../../../domain/repositories/products";
import { FindAllProductsRepositoryInputInterface } from "../../../../domain/repositories/products/inputs";

export class ProductInMemoryRepository implements InsertProductRepositoryInterface, FindAllProductsRepositoryInterface {
  products: Product[] = [];
  async insert(product: Product): Promise<void> {
    this.products.push(product);
  }
  async findAll(input: FindAllProductsRepositoryInputInterface): Promise<Product[]> {
    const { brand, name, priceRange } = input;

    function inRange(number: number, start: number, end: number) {
      return number >= Math.min(start, end) && number < Math.max(start, end)
    }

    const productFiltered = this.products.reduce((acc: Product[], product: Product) => {
      const hasBrand = product.brand === brand;
      const hasName =  product.name === name;
      const hasRange = !!priceRange
        ? inRange(product.price, priceRange.minValue, priceRange.maxValue)
        : false

      if(hasBrand || hasName || hasRange) {
        acc.push(product);
      }

      return acc;
    }, [] as Product[]);
    return productFiltered;
  }
}
