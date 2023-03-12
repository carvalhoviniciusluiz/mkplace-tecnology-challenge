import { MikroORM } from '@mikro-orm/mongodb';
import type { FindAllSaleProductsRepositoryInterface, InsertSaleProductRepositoryInterface } from "~/domain/repositories/sale-products";
import type { FindAllSaleProductsRepositoryInputInterface, InsertSaleProductRepositoryInputInterface } from "~/domain/repositories/sale-products/inputs";
import type { FindAllSaleProductsRepositoryOutputInterface } from "~/domain/repositories/sale-products/output";

export class SaleProductMikroORMRepository implements InsertSaleProductRepositoryInterface, FindAllSaleProductsRepositoryInterface {
  constructor(private repository: MikroORM) {}

  async insert(input: InsertSaleProductRepositoryInputInterface): Promise<void> {
    await this.repository.em.insert('SaleProduct', {
      externalId: input.id,
      seller: {
        code: input.seller.code,
        name: input.seller.name
      },
      product: {
        brand: input.product.brand,
        name: input.product.name,
        price: input.product.price,
        slug: input.product.slug
      }
    });
  }
  async findAll(input: FindAllSaleProductsRepositoryInputInterface): Promise<FindAllSaleProductsRepositoryOutputInterface[]> {
    const { product, seller } = input;
    let sellerCriteria: any = {};
    if(seller) {
      const { code, name } = seller;
      !!code ? sellerCriteria.code = code : undefined;
      !!name ? sellerCriteria.name = name : undefined;
    }
    let productCriteria: any = {};
    if(product) {
      const { brand, name, slug, priceRange } = product;
      !!brand ? productCriteria.brand = brand : undefined;
      !!name ? productCriteria.name = name : undefined;
      !!slug ? productCriteria.slug = slug : undefined;
      !!priceRange
        ? productCriteria.price = {
          $gte: priceRange.minValue,
          $lt: priceRange.maxValue
        }
        : undefined;
    }
    const output: any = await this.repository.em.fork().find('SaleProduct', {
      seller: sellerCriteria,
      product: productCriteria,
    });
    return output
  }
}
