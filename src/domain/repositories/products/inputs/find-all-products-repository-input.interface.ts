export interface FindAllProductsRepositoryInputInterface {
  name?: string;
  brand?: string;
  priceRange?: {
    maxValue: number,
    minValue: number
  };
}
