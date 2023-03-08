export interface FindAllProductsInputInterface {
  name?: string;
  brand?: string;
  seller?: string;
  priceRange?: {
    maxValue: number,
    minValue: number
  };
}
