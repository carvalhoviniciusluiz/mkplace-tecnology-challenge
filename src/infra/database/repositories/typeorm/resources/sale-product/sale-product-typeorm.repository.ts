import { Repository } from "typeorm";
import { SaleProduct } from "~/domain/entities";
import type { FindAllSaleProductsRepositoryInterface, InsertSaleProductRepositoryInterface } from "~/domain/repositories/sale-products";
import type { FindAllSaleProductsRepositoryInputInterface, InsertSaleProductRepositoryInputInterface } from "~/domain/repositories/sale-products/inputs";
import type { FindAllSaleProductsRepositoryOutputInterface } from "~/domain/repositories/sale-products/output";

export class SaleProductTypeOrmRepository implements InsertSaleProductRepositoryInterface, FindAllSaleProductsRepositoryInterface {
  constructor(private repository: Repository<SaleProduct>) {}

  async insert(saleProduct: InsertSaleProductRepositoryInputInterface): Promise<void> {
    await this.repository.save({
      id: saleProduct.id,
      product: saleProduct.product.id,
      seller: saleProduct.seller.id
    } as any);
  }
  async findAll(input: FindAllSaleProductsRepositoryInputInterface): Promise<FindAllSaleProductsRepositoryOutputInterface[]> {
    const { product, seller } = input;
    let sqlRaw = `\n
SELECT
  sale_products.id "saleProductId",
  products.id "productId", products.brand "productBrand", products.name "productName", products.slug "productSlug", products.price "productPrice",
  sellers.id "sellerId", sellers.name "sellerName", sellers.code "sellerCode"
FROM
  sale_products
INNER JOIN products
  ON products.id::uuid = sale_products.product_id::uuid
INNER JOIN sellers
  ON sellers.id::uuid = sale_products.seller_id::uuid
WHERE 1=1\n`;
    if(seller) {
      const { code, name } = seller;
      !!code ? sqlRaw += `AND sellers.code = ${code}\n` : undefined;
      !!name ? sqlRaw += `AND sellers.name = '${name}'\n` : undefined;
    }
    if(product) {
      const { brand, name, slug, priceRange } = product;
      !!brand ? sqlRaw += `AND products.brand = '${brand}'\n` : undefined;
      !!name ? sqlRaw += `AND products.name = '${name}'\n` : undefined;
      !!slug ? sqlRaw += `AND products.slug = '${slug}'\n` : undefined;
      !!priceRange ? sqlRaw += `AND products.price BETWEEN ${priceRange.minValue} AND ${priceRange.maxValue}\n` : undefined;
    }
    const tuples: any[] = await this.repository.query(sqlRaw + ';');
    const output = tuples.reduce((acc, tuple) => {
      acc.push({
        id: tuple.saleProductId,
        seller: {
          id: tuple.sellerId,
          name: tuple.sellerName,
          code: tuple.sellerCode
        },
        product: {
          id: tuple.productId,
          brand: tuple.productBrand,
          name: tuple.productName,
          price: tuple.productPrice,
          slug: tuple.productSlug
        }
      });
      return acc;
    }, []);
    return output;
  }
}
