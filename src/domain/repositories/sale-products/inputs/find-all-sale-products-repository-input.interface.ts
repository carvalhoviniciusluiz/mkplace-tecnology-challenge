export interface FindAllSaleProductsRepositoryInputInterface {
  seller?: {
    code?: number;
    name?: string;
  };
  product?: {
    name?: string;
    brand?: string;
    priceRange?: {
      maxValue: number,
      minValue: number
    };
  }
}
