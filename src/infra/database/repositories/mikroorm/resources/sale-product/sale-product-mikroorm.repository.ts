import { EntityManager } from '@mikro-orm/mongodb';
import type { FindAllSaleProductsRepositoryInterface, InsertSaleProductRepositoryInterface } from "~/domain/repositories/sale-products";
import type { FindAllSaleProductsRepositoryInputInterface, InsertSaleProductRepositoryInputInterface } from "~/domain/repositories/sale-products/inputs";
import type { FindAllSaleProductsRepositoryOutputInterface } from "~/domain/repositories/sale-products/output";

export class SaleProductMikroORMRepository implements InsertSaleProductRepositoryInterface, FindAllSaleProductsRepositoryInterface {
  constructor(private repository: EntityManager) {}

  async insert(input: InsertSaleProductRepositoryInputInterface): Promise<void> {
    await this.repository.insert('SaleProduct', {
      externalId: input.id,
      seller: {
        code: Number(input.seller.code),
        name: input.seller.name
      },
      product: {
        brand: input.product.brand,
        name: input.product.name,
        price: Number(input.product.price),
        slug: input.product.slug
      }
    });
  }
  async findAll(input: FindAllSaleProductsRepositoryInputInterface): Promise<FindAllSaleProductsRepositoryOutputInterface[]> {
    const { product, seller } = input;
    let sellerCriteria: any = {};
    if(seller) {
      const { code, name } = seller;
      !!code ? sellerCriteria.code = Number(code) : undefined;
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
          $gte: Number(priceRange.minValue),
          $lt: Number(priceRange.maxValue)
        }
        : undefined;
    }
    const objects: any[] = await this.repository.fork().find('SaleProduct', {
      seller: sellerCriteria,
      product: productCriteria,
    });
    const output = objects.reduce((acc, tuple) => {
      acc.push({
        id: tuple.externalId,
        seller: {
          name: tuple.seller.name,
          code: tuple.seller.code
        },
        product: {
          brand: tuple.product.brand,
          name: tuple.product.name,
          price: tuple.product.price,
          slug: tuple.product.slug
        }
      });
      return acc;
    }, []);
    return output;
  }
}
