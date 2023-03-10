import type { FindAllProductsRepositoryInterface, InsertProductRepositoryInterface, FindOneProductBySlugRepositoryInterface, FindOneProductByBrandRepositoryInterface, FindOneProductByNameRepositoryInterface } from "~/domain/repositories/products";
import type { FindAllProductsRepositoryInputInterface, InsertProductRepositoryInputInterface } from "~/domain/repositories/products/inputs";
import type { FindAllProductsRepositoryOutputInterface, FindOneProductByBrandRepositoryOutputInterface, FindOneProductByNameRepositoryOutputInterface, FindOneProductBySlugRepositoryOutputInterface } from "~/domain/repositories/products/outputs";

interface ProductsDataInterface {
  id: string;
  name: string;
  brand: string;
  price: number;
  slug: string;
}

export class ProductInMemoryRepository
  implements InsertProductRepositoryInterface, FindAllProductsRepositoryInterface, FindOneProductBySlugRepositoryInterface, FindOneProductByBrandRepositoryInterface, FindOneProductByNameRepositoryInterface {
  products: ProductsDataInterface[] = [];
  async insert(product: InsertProductRepositoryInputInterface): Promise<void> {
    this.products.push({
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      slug: product.slug,
    });
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
  async findOneByBrand(value: string): Promise<FindOneProductByBrandRepositoryOutputInterface> {
    return this.products.find(product => product.brand === value);
  }
  async findOneByName(value: string): Promise<FindOneProductByNameRepositoryOutputInterface> {
    return this.products.find(product => product.name === value);
  }
}
