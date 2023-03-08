import type { FindAllSaleProductsRepositoryInterface, InsertSaleProductRepositoryInterface } from "../../../../../domain/repositories/sale-products";
import type { FindAllSaleProductsRepositoryInputInterface, InsertSaleProductRepositoryInputInterface } from "../../../../../domain/repositories/sale-products/inputs";
import type { FindAllSaleProductsRepositoryOutputInterface } from "../../../../../domain/repositories/sale-products/output";

interface SaleProductsDataInterface {
  id: string;
  seller: {
    id: string;
    name: string;
    code: number;
  },
  product: {
    id: string;
    brand: string;
    name: string;
    price: number;
    slug: string;
  }
}
export class SaleProductInMemoryRepository implements InsertSaleProductRepositoryInterface, FindAllSaleProductsRepositoryInterface {
  saleProducts: SaleProductsDataInterface[] = [];
  async insert(saleProduct: InsertSaleProductRepositoryInputInterface): Promise<void> {
    this.saleProducts.push({
      id: saleProduct.id,
      seller: {
        id: saleProduct.seller.id,
        name: saleProduct.seller.name,
        code: saleProduct.seller.code,
      },
      product: {
        id: saleProduct.product.id,
        brand: saleProduct.product.brand,
        name: saleProduct.product.name,
        price: saleProduct.product.price,
        slug: saleProduct.product.slug,
      }
    });
  }
  async findAll(input: FindAllSaleProductsRepositoryInputInterface): Promise<FindAllSaleProductsRepositoryOutputInterface[]> {
    function inRange(number: number, start: number, end: number) {
      return number >= Math.min(start, end) && number < Math.max(start, end)
    }

    const saleProductFiltered = this.saleProducts.reduce((acc: FindAllSaleProductsRepositoryOutputInterface[], { id, product, seller }: FindAllSaleProductsRepositoryOutputInterface) => {
      const hasBrand = product.brand === input.product?.brand;
      const hasName =  product.name === input.product?.name;
      const hasRange = !!input.product?.priceRange
        ? inRange(product.price, input.product.priceRange.minValue, input.product.priceRange.maxValue)
        : false
      const hasSeller = !!seller && (
        seller.name === input.seller?.name || seller.code === input.seller?.code
      );

      if(hasBrand || hasName || hasRange || hasSeller) {
        acc.push({ id, product, seller });
      }

      return acc;
    }, [] as FindAllSaleProductsRepositoryOutputInterface[]);

    return saleProductFiltered;
  }
}
