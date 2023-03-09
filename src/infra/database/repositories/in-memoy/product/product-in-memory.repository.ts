import type { FindAllProductsRepositoryInterface, InsertProductRepositoryInterface, FindOneProductBySlugRepositoryInterface } from "~/domain/repositories/products";
import type { FindAllProductsRepositoryInputInterface, InsertProductRepositoryInputInterface } from "~/domain/repositories/products/inputs";
import type { FindAllProductsRepositoryOutputInterface, FindOneProductBySlugRepositoryOutputInterface } from "~/domain/repositories/products/outputs";

interface ProductsDataInterface {
  id: string;
  name: string;
  brand: string;
  price: number;
  slug: string;
}

export class ProductInMemoryRepository implements InsertProductRepositoryInterface, FindAllProductsRepositoryInterface, FindOneProductBySlugRepositoryInterface {
  products: ProductsDataInterface[] = [];
  async insert(product: InsertProductRepositoryInputInterface): Promise<void> {
    this.products.push(product);
  }

  async findAll(input?: FindAllProductsRepositoryInputInterface): Promise<FindAllProductsRepositoryOutputInterface[]> {
    const hasInput = !!Object.keys(input ?? {}).length;
    if(!hasInput) {
      return this.products;
    }

    const { brand, name, priceRange } = input!;

    function inRange(number: number, start: number, end: number) {
      return number >= Math.min(start, end) && number < Math.max(start, end)
    }

    const productFiltered = this.products.reduce((acc: FindAllProductsRepositoryOutputInterface[], product: ProductsDataInterface) => {
      const hasBrand = product.brand === brand;
      const hasName =  product.name === name;
      const hasRange = !!priceRange
        ? inRange(product.price, priceRange.minValue, priceRange.maxValue)
        : false

      if(hasBrand || hasName || hasRange) {
        acc.push(product);
      }

      return acc;
    }, [] as FindAllProductsRepositoryOutputInterface[]);
    return productFiltered;
  }

  async findOneBySlug(value: string): Promise<FindOneProductBySlugRepositoryOutputInterface> {
    return this.products.find(product => product.slug === value);
  }
}
