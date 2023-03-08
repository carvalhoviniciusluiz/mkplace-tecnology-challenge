export interface FindAllProductsUseCaseInputInterface {
  name?: string;
  brand?: string;
  priceRange?: {
    maxValue: number,
    minValue: number
  };
}
