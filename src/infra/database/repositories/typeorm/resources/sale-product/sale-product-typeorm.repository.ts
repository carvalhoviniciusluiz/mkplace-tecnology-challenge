import { Repository } from "typeorm";
import { SaleProduct } from "~/domain/entities";
import type { FindAllSaleProductsRepositoryInterface, InsertSaleProductRepositoryInterface } from "~/domain/repositories/sale-products";
import type { FindAllSaleProductsRepositoryInputInterface, InsertSaleProductRepositoryInputInterface } from "~/domain/repositories/sale-products/inputs";
import type { FindAllSaleProductsRepositoryOutputInterface } from "~/domain/repositories/sale-products/output";

export class SaleProductTypeOrmRepository implements InsertSaleProductRepositoryInterface, FindAllSaleProductsRepositoryInterface {
  constructor(private repository: Repository<SaleProduct>) {}

  async insert(saleProduct: InsertSaleProductRepositoryInputInterface): Promise<void> {
    await this.repository.save(saleProduct);
  }
  async findAll(input: FindAllSaleProductsRepositoryInputInterface): Promise<FindAllSaleProductsRepositoryOutputInterface[]> {
    const { product, seller } = input;
    const queryBuilder = this.repository.createQueryBuilder('saleProduct');
    queryBuilder
      .select([
        'saleProduct.id',
        'product.id',
        'product.brand',
        'product.name',
        'product.slug',
        'product.price',
        'seller.id',
        'seller.name',
        'seller.code'
      ])
      .innerJoin('saleProduct.seller', 'seller')
      .innerJoin('saleProduct.product', 'product');

    if (seller) {
      const { code, name } = seller;
      if (code) {
        queryBuilder.andWhere('seller.code = :code', { code });
      }
      if (name) {
        queryBuilder.andWhere('seller.name = :name', { name });
      }
    }

    if (product) {
      const { brand, name, slug, priceRange } = product;
      if (brand) {
        queryBuilder.andWhere('product.brand = :brand', { brand });
      }
      if (name) {
        queryBuilder.andWhere('product.name = :name', { name });
      }
      if (slug) {
        queryBuilder.andWhere('product.slug = :slug', { slug });
      }
      if (priceRange) {
        queryBuilder.andWhere('product.price BETWEEN :minValue AND :maxValue', {
          minValue: priceRange.minValue,
          maxValue: priceRange.maxValue
        });
      }
    }

    const saleProducts = await queryBuilder.getMany();

    return saleProducts.map(saleProduct => ({
      id: saleProduct.id,
      seller: {
        id: saleProduct.seller.id,
        name: saleProduct.seller.name,
        code: saleProduct.seller.code
      },
      product: {
        id: saleProduct.product.id,
        brand: saleProduct.product.brand,
        name: saleProduct.product.name,
        price: saleProduct.product.price,
        slug: saleProduct.product.slug
      }
    }));
  }

}
