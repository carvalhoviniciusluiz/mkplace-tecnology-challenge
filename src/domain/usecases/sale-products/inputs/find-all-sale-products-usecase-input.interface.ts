export interface FindAllSaleProductsUseCaseInputInterface {
  name?: string;
  brand?: string;
  priceRange?: {
    maxValue: number,
    minValue: number
  };
  seller?: string;
}
