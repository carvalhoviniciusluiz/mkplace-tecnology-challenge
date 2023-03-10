export interface FindAllSaleProductsRepositoryInputInterface {
  seller?: {
    code?: number;
    name?: string;
  };
  product?: {
    name?: string;
    brand?: string;
    slug?: string;
    priceRange?: {
      maxValue: number,
      minValue: number
    };
  }
}
