export interface FindAllSaleProductsUseCaseInputInterface {
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
